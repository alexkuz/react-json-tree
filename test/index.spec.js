// @flow
import React from 'react';
import test from 'ava';
import renderer from 'react-test-renderer';

import JSONTree from '../src/index';

test('should render basic tree', t => {
  const tree = renderer.create(<JSONTree data={{ a: 1, b: 'c' }} />);
  t.snapshot(tree.toJSON());
  tree.update(<JSONTree data={[1, 2, 'a', 'b']} theme="monokai" />);
  t.snapshot(tree.toJSON());
});
