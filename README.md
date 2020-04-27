<p align="center">
  <img src="./exceptional-expressions-logo.png" alt="exceptional expressions" width="400" />
</p>

<h1 align="center">Regex Expression Builder</h2>

<p align="center">
  <a href="https://david-dm.org/ohitslaurence/exceptional-expressions">
    <img src="https://david-dm.org/ohitslaurence/exceptional-expressions/status.svg?style=flat" alt="dependency" />
  </a>
  <a href="https://travis-ci.org/ohitslaurence/exceptional-expressions">
    <img src="https://travis-ci.org/ohitslaurence/exceptional-expressions.svg?branch=master" alt="travis" />
    </a>
   <a href="https://www.npmjs.com/package/exceptional-expressions">
    <img src="https://img.shields.io/npm/v/exceptional-expressions?color=blue" alt="npm" />
    </a>
    <a href="https://codecov.io/gh/ohitslaurence/exceptional-expressions">
    <img src="https://codecov.io/gh/ohitslaurence/exceptional-expressions/branch/master/graph/badge.svg" alt="codecov" />
    </a>
</p>

<p align="center">
  <b>An incredible way to build efficient, concise and human readable regular expressions.</b></br>
  <sub>Made with ❤️ by <a href="https://github.com/ohitslaurence">ohitslaurence</a></sub>
</p>

<br />

## Installing

Using yarn:

```bash
$ yarn add exceptional-expressions
```

Using npm:

```bash
$ npm install exceptional-expressions
```

Using bower:

```bash
$ bower install exceptional-expressions
```

## Hello World

```javascript
import { ExpBuilder, or, Constants, anythingBut } from 'exceptional-expressions;

const builder = new ExpBuilder('ig');

builder
  .beginsWith(or(['hello', 'goodbye']))
  .followedBy(Constants.whitespace)
  .endsWith(anythingBut('world'));

builder.matchesString('Hello World'); // false
builder.matchesString('Goodbye Earth'); // true
builder.matchesString('hello world'); // false
builder.matchesString('helloearth'); // false

```

## Examples

The exceptional expressions builder class exposes many methods for chaining expressions in various combinations. These methods, combined with the various utility functions provide extensive functionality such as named grouping, or and optional chaining, exclusions and many more.

```javascript
// Optional chaining
import { ExpBuilder, or, Constants, Sequences } from 'exceptional-expressions;

const builder = new ExpBuilder('g');

builder
  .beginsWith('(a)')
  .orBeginsWith('(b)')
  .followedBy(Constants.whitespace)
  .followedBy(or([Constants.word, Sequences.numbers(3)]));

builder.matchesString('(a) Test');  // true
builder.matchesString('(b) word');  // true
builder.matchesString('(a)string'); // false
builder.matchesString('(a) 123');  // true

builder.getMatches('(a) first extra test string (b) second');
// ['(a) first']

builder.toRegex(); // /^(?:(?:\(a\))|(?:\(b\)))\s(?:(?:[A-Za-z']+\b)|(?:[\d]{3}))/g

```

Named groups allow you to group chunks of your expression and then extract that chunk by the name that you gave it. This functionality seeks to improve on the `regex.exec(string)` method, which requires you to keep careful track on the ordering of your regex capture groups in order to determine which array index your group will be extracted into.

```javascript
// Named groups
import { ExpBuilder, group, Constants } from 'exceptional-expressions;

const builder = new ExpBuilder('g');

builder
  .contains(group([Constants.word, '.', Constants.word], 'username'))
  .followedBy('@')
  .followedBy(
    group([
      group(Constants.word, 'company'), '.', group(Constants.word, 'tld')
    ], 'domain')
  );

builder.getCaptureGroups();
// ['username', 'domain', 'company', 'tld']

builder.matchesString('test.person@example.com');
// true

builder.getMatchesWithGroups('test.person@example.com, another.guy@test.io')
/* [{
      match: 'test.person@example.com',
      groups:
         {
           username: 'test.person',
           domain: 'example.com',
           company: 'example',
           tld: 'com'
         }
     },
     {
       match: 'another.guy@test.io',
       groups:
         {
           username: 'another.guy',
           domain: 'test.io',
           company: 'test',
           tld: 'io'
         }
    }]
*/

builder.getMatchesByGroup('test.person@example.com, another.guy@test.io', 'company')
// ['example', 'test']

```

## License

[MIT](LICENSE)
