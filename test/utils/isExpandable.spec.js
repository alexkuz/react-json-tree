// @flow
import test from 'ava';

import isExpandable from '../../src/utils/isExpandable';

test('should check if object is expandable', t => {
  t.is(isExpandable('Array', []), false);
  t.is(isExpandable('Array', [0]), true);
  t.is(isExpandable('Object', {}), false);
  t.is(isExpandable('Object', { a: 1 }), true);
  t.is(isExpandable('Map', new Map()), true);
});
