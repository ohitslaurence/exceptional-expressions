import {
  matches,
  handleOptionalWrapping,
  validateExpression,
  wrapOrExpression,
  assertExists,
  assertOneExists,
  assertDoesntExist,
  validateFlags,
  extractMatches,
  extractMatchesWithGroup,
  IGroupings,
} from './utils';
export default class ExpressionBuilder {
  private beginsWithExpression: string | null = null;
  private internal: Array<string> = [];
  private endsWithExpression: string | null = null;
  private flags: string;
  private groups: Array<string> = [];

  public constructor(flags: string = 'g') {
    this.flags = validateFlags(flags);
  }

  public matchesString(string: string): boolean {
    return matches(string, this.buildExpression());
  }

  public countMatches(string: string): number {
    return extractMatches(string, this.buildExpression()).length;
  }

  public getMatches(string: string): Array<string> {
    return extractMatches(string, this.buildExpression());
  }

  public getMatchesWithGroups(string: string): IGroupings[] {
    return extractMatchesWithGroup(string, this.buildExpression(), this.getCaptureGroups());
  }

  public getCaptureGroups(): Array<string | number> {
    return this.groups.map((group, index) => (group.startsWith('__') ? index + 1 : group));
  }

  public toRegex(): RegExp {
    return this.buildExpression();
  }

  public getFlags(): Array<string> {
    return this.flags.split('');
  }

  public reset(): void {
    this.beginsWithExpression = null;
    this.endsWithExpression = null;
    this.internal = [];
    this.groups = [];
  }

  private buildExpression(): RegExp {
    const start: string = this.beginsWithExpression ? `^${this.beginsWithExpression}` : '';
    const internal: string = this.internal.reduce((total, expression) => {
      return total + expression;
    }, '');
    const end: string = this.endsWithExpression ? `${this.endsWithExpression}$` : '';

    return new RegExp(`${start}${internal}${end}`, this.flags);
  }

  public contains(expression: any): ExpressionBuilder {
    assertDoesntExist(
      this.getFirstInternalExpression(),
      'contains can only be used as the first internal expression'
    );

    const validated: string = validateExpression(expression);
    this.internal.push(this.handleInternalTransformation(validated));

    return this;
  }

  public orContains(expression: any): ExpressionBuilder {
    assertExists<string | null>(
      this.getLastInternalExpression(),
      'orContains by must be preceeded by a contains expression'
    );

    const validated: string = validateExpression(expression);

    this.internal[this.internal.length - 1] = this.handleInternalTransformation(
      wrapOrExpression(this.internal[this.internal.length - 1], validated)
    );

    return this;
  }

  public optionallyFollowedBy(expression: any): ExpressionBuilder {
    return this.followedBy(expression, true);
  }

  public followedBy(expression: any, optional: boolean = false): ExpressionBuilder {
    assertOneExists<string | null>(
      [this.beginsWithExpression, this.getFirstInternalExpression()],
      'followedBy by must be preceeded by beginsWith or a contains statement'
    );

    const validated: string = validateExpression(expression);
    this.internal.push(
      this.handleInternalTransformation(handleOptionalWrapping(validated, optional))
    );

    return this;
  }

  public orFollowedBy(expression: any): ExpressionBuilder {
    assertExists<string | null>(
      this.getLastInternalExpression(),
      'orFollowedBy by must be preceeded by a followedBy or a contains expression'
    );

    const validated: string = validateExpression(expression);

    this.internal[this.internal.length - 1] = this.handleInternalTransformation(
      wrapOrExpression(this.internal[this.internal.length - 1], validated)
    );

    return this;
  }

  private getLastInternalExpression(): string | null {
    return this.internal[this.internal.length - 1] || null;
  }

  private getFirstInternalExpression(): string | null {
    return this.internal[0] || null;
  }

  public optionallyEndsWith(expression: string) {
    return this.endsWith(expression, true);
  }

  public endsWith(expression: any, optional: boolean = false): ExpressionBuilder {
    const validated: string = validateExpression(expression);

    this.endsWithExpression = this.handleInternalTransformation(
      handleOptionalWrapping(validated, optional)
    );

    return this;
  }

  public orEndsWith(expression: any): ExpressionBuilder {
    assertExists<string | null>(
      this.endsWithExpression,
      'orEndsWith must be preceeded by a endsWith statement'
    );

    const validated: string = validateExpression(expression);

    //TODO extract the optional wrapping and reapply?
    this.endsWithExpression = this.handleInternalTransformation(
      wrapOrExpression(this.endsWithExpression, validated)
    );

    return this;
  }

  public optionallyBeginsWith(expression: any): ExpressionBuilder {
    return this.beginsWith(expression, true);
  }

  public beginsWith(expression: any, optional: boolean = false): ExpressionBuilder {
    const validated: string = validateExpression(expression);

    this.beginsWithExpression = this.handleInternalTransformation(
      handleOptionalWrapping(validated, optional)
    );

    return this;
  }

  public orBeginsWith(expression: any): ExpressionBuilder {
    assertExists<string | null>(
      this.beginsWithExpression,
      'orBeginsWith must be preceeded by a beginsWith statement'
    );

    const validated: string = this.handleInternalTransformation(validateExpression(expression));

    //TODO extract the optional wrapping and reapply?
    this.beginsWithExpression = this.handleInternalTransformation(
      wrapOrExpression(this.beginsWithExpression, validated)
    );

    return this;
  }

  private handleInternalTransformation(expression: any): string {
    return this.extractInternalGroups(expression);
  }

  private extractInternalGroups(expression: string): string {
    const groupRx: RegExp = /(\[\|([a-z0-9A-Z_-]+)\|\])(.*)(\[\|\2\|\])/;
    let transformed: string = expression;
    while (matches(transformed, groupRx)) {
      const group: RegExpExecArray = groupRx.exec(transformed) as RegExpExecArray;
      transformed = transformed.replace(groupRx, '$3');
      this.groups.push(group[2]);
    }
    return transformed;
  }
}
