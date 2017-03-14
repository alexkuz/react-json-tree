// @flow
import test from 'ava';

import hexToRgb from '../../src/utils/hexToRgb';

test('should convert hex to rgb', t => {
  t.is(hexToRgb('invalid color'), null);
  t.deepEqual(hexToRgb('#00CCFF'), { r: 0, g: 204, b: 255 });
});
