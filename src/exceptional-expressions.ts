// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
export default class ExpressionBuilder {
  private beginsWithExpression: string = '';
  private internal: Array<string> = [];
  private endsWithExpression: string = '';

  public getRegularExpression() {
    return this.buildExpression();
  }

  private buildExpression() {
    const start = this.beginsWithExpression.length ? `^${this.beginsWithExpression}` : '';
    const end = this.endsWithExpression.length ? `${this.endsWithExpression}$` : '';

    return new RegExp(`${start}${end}`, 'g');
  }

  public followedBy(expression: any): ExpressionBuilder {
    this.internal.push(this.insertExpression(expression));
    return this;
  }

  public endsWith(expression: any): ExpressionBuilder {
    this.endsWithExpression = this.insertExpression(expression);
    return this;
  }

  /**
   * Set expression to match the begining of th
   *
   * @param expression
   *
   * @return {ExpressionBuilder}
   */
  public beginsWith(expression: any): ExpressionBuilder {
    this.beginsWithExpression = this.insertExpression(expression);

    return this;
  }

  /**
   * Handle escaping of string characters
   *
   * @param {string} string The string to be escaped
   *
   * @return {string}
   */
  private escapeString(string: string): string {
    return string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\u002d');
  }

  private insertExpression(string: string) : string {
    if (this.isInternalRegex(string)) {
      return this.formatInternalExpression(string);
    }
    return this.escapeString(string);
  }

  private isInternalRegex(string: string) : boolean {
    return typeof string === 'string' && string.length > 2 && string.charAt(0) === '~' && string.charAt(1) === '~';
  }

  private formatInternalExpression(string: string) : string {
    return string.substring(2);
  }
}
