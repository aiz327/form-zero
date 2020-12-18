import { type } from "os";

  // Internal function for creating a `toString`-based type tester.
  function tagTester(name) {
    var tag = '[object ' + name + ']';
    return function(obj) {
      return toString.call(obj) === tag;
    };
  }

  export const isString = tagTester('String');

  export const isNumber = tagTester('Number');

  export const isDate = tagTester('Date');

  export const sRegExp = tagTester('RegExp');

  export const isArray =  Array.isArray || tagTester('Array');

  export const isFunc = (source) => typeof source === "function";