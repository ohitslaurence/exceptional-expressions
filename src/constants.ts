/**
 * Constants are assumed to insert directly into a RegExp object, hence the double escapes
 */
export default {
  whitespace: '~~\\s',
  newline: '~~\\n|\\r',
  number: '~~\\d',
  symbol: '~~[\\-!\\$%±§#\\^@&*\\(\\)_+|~=`{}\\[\\]:";\'<>\\?,\\.\\/]',
  word: "~~[A-Za-z']+\\b",
  anything: '~~.'
  // email:
  //   '~~(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))'
};
