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

## License

[MIT](LICENSE)
