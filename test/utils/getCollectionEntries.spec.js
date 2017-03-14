// @flow
import test from 'ava';

import getCollectionEntries from '../../src/utils/getCollectionEntries';

test('should get collection entries', t => {
  t.deepEqual(
    getCollectionEntries('Object', { c: 0, b: 1, a: 2 }, undefined, 100),
    [
      {
        isRange: false,
        key: 'c',
        value: 0
      },
      {
        isRange: false,
        key: 'b',
        value: 1
      },
      {
        isRange: false,
        key: 'a',
        value: 2
      }
    ]
  );
});

test('should get sorted collection entries', t => {
  t.deepEqual(getCollectionEntries('Object', { c: 0, b: 1, a: 2 }, true, 100), [
    {
      isRange: false,
      key: 'a',
      value: 2
    },
    {
      isRange: false,
      key: 'b',
      value: 1
    },
    {
      isRange: false,
      key: 'c',
      value: 0
    }
  ]);
});

const arr = Array.from({ length: 20 }).map((_, i) => i);

test('should get array entries', t => {
  t.deepEqual(
    getCollectionEntries('Array', arr, undefined, 100),
    arr.map(i => ({ isRange: false, key: i, value: i }))
  );

  t.deepEqual(getCollectionEntries('Array', arr, undefined, 10), [
    ...[0, 1, 2, 3, 4, 5].map(i => ({ isRange: false, key: i, value: i })),
    { isRange: true, from: 6, to: 15 },
    ...[16, 17, 18, 19].map(i => ({ isRange: false, key: i, value: i }))
  ]);
});

var iterable = {
  [Symbol.iterator]: function*() {
    for (let i = 0; i < Infinity; i++)
      yield i;
  }
};

test('should get iterable entries', t => {
  t.deepEqual(getCollectionEntries('Iterable', iterable, undefined, 5), [
    ...[0, 1, 2, 3, 4].map(i => ({ isRange: false, key: i, value: i })),
    { isRange: true, from: 5, to: 9 }
  ]);
});
