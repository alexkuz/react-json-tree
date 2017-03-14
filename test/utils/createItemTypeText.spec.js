// @flow
import test from 'ava';

import createItemTypeText from '../../src/utils/createItemTypeText';

test('should create type text', t => {
  ['Error', 'WeakMap', 'Set'].forEach(type =>
    t.is(createItemTypeText(type), type));
  t.is(createItemTypeText('Array'), '[]');
  t.is(createItemTypeText('Object'), '{}');
});
