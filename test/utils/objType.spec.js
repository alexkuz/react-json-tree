// @flow
import test from 'ava';

import objType from '../../src/utils/objType';

var iterable = {
  [Symbol.iterator]: function*() {
    for (;;)
      yield 0;
  }
};

test('should determine the correct type', t => {
  t.is(objType({}), 'Object');
  t.is(objType([]), 'Array');
  t.is(objType(new Map()), 'Map');
  t.is(objType(new WeakMap()), 'WeakMap');
  t.is(objType(new Set()), 'Set');
  t.is(objType(new WeakSet()), 'WeakSet');
  t.is(objType(new Error()), 'Error');
  t.is(objType(new Date()), 'Date');
  t.is(objType(() => {}), 'Function');
  t.is(objType(''), 'String');
  t.is(objType(true), 'Boolean');
  t.is(objType(null), 'Null');
  t.is(objType(undefined), 'Undefined');
  t.is(objType(10), 'Number');
  t.is(objType(Symbol.iterator), 'Symbol');
  t.is(objType(iterable), 'Iterable');
});
