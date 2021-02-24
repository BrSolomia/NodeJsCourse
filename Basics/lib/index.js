"use strict";

var _readline = _interopRequireDefault(require("readline"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const consoleLine = _readline.default.createInterface({
  input: process.stdin,
  output: process.stdout
});

const reverseString = str => {
  return str.split('').reverse().join('');
};

consoleLine.on('line', line => {
  console.log(reverseString(line));
  consoleLine.close();
});