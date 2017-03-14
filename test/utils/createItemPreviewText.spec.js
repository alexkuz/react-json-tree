// @flow
import test from 'ava';

import createItemPreviewText from '../../src/utils/createItemPreviewText';

var iterable = {
  [Symbol.iterator]: function*() {
    for (;;)
      yield 0;
  }
};

test('should create preview text', t => {
  t.is(createItemPreviewText('WeakMap', new WeakMap()), '');
  t.is(createItemPreviewText('Array', [1, 2, 3]), '3 items');
  t.is(createItemPreviewText('Set', new Set([1, 2, 3])), '3 entries');
  t.is(createItemPreviewText('Set', new Set([1, 2, 3]), 2), '3 entries');
  t.is(createItemPreviewText('Iterable', iterable, 10), '>10 entries');
  t.is(createItemPreviewText('Object', { a: 1, b: 2, c: 3 }), '3 keys');
});
