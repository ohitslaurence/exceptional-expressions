import { matches, handleOptionalWrapping, validateExpression, wrapOrExpression } from './utils';
export default class ExpressionBuilder {
  private beginsWithExpression: string = '';
  private internal: Array<string> = [];
  private endsWithExpression: string = '';

  public matchesString(string: string): boolean {
    return matches(string, this.buildExpression());
  }

  public toRegex(): RegExp {
    return this.buildExpression();
  }

  public reset(): void {
    this.beginsWithExpression = '';
    this.endsWithExpression = '';
    this.internal = [];
  }

  private buildExpression(): RegExp {
    const start: string = this.beginsWithExpression.length ? `^${this.beginsWithExpression}` : '';
    const internal: string = this.internal.reduce((total, expression) => {
      return total + expression;
    }, '');
    const end: string = this.endsWithExpression.length ? `${this.endsWithExpression}$` : '';

    return new RegExp(`${start}${internal}${end}`, 'g');
  }

  public optionallyFollowedBy(expression: any): ExpressionBuilder {
    return this.followedBy(expression, true);
  }

  public followedBy(expression: any, optional: boolean = false): ExpressionBuilder {
    if (!this.beginsWithExpression.length && !this.getFirstInternalExpression()) {
      throw new Error('followedBy by must be preceeded by beginsWith or a contains statement');
    }
    const validated: string = validateExpression(expression);
    this.internal.push(handleOptionalWrapping(validated, optional));

    return this;
  }

  public orFollowedBy(expression: any): ExpressionBuilder {
    if (!this.getLastInternalExpression()) {
      throw new Error('orFollowedBy by must be preceeded by a followedBy or a contains expression');
    }
    const validated: string = validateExpression(expression);

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

    this.endsWithExpression = handleOptionalWrapping(validated, optional);

    return this;
  }

  public optionallyBeginsWith(expression: any) {
    return this.beginsWith(expression, true);
  }

  public beginsWith(expression: any, optional: boolean = false): ExpressionBuilder {
    const validated: string = validateExpression(expression);

    this.beginsWithExpression = handleOptionalWrapping(validated, optional);

    return this;
  }

  public orBeginsWith(expression: any): ExpressionBuilder {
    if (!this.beginsWithExpression.length) {
      throw new Error('orBeginsWith must be preceeded by a beginsWith statement');
    }

    const validated: string = validateExpression(expression);

    //TODO extract the optional wrapping and reapply?
    this.beginsWithExpression = wrapOrExpression(this.beginsWithExpression, validated);

    return this;
  }
}
