// @flow
import React from 'react';
import test from 'ava';
import renderer from 'react-test-renderer';

import JSONTree from '../src/index';

const BASIC_DATA = { a: 1, b: 'c' };

test('should render basic tree', t => {
  t.snapshot(renderer.create(<JSONTree data={BASIC_DATA} />).toJSON());
});
