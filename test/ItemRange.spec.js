// @flow
import React from 'react';
import test from 'ava';
import renderer from 'react-test-renderer';

import ItemRange from '../src/ItemRange';

import createStylingFromTheme from '../src/utils/createStylingFromTheme';

const styling = createStylingFromTheme(undefined);

test('should render ItemRange', t => {
  const tree = renderer.create(
    <ItemRange
      styling={styling}
      from={0}
      to={10}
      renderChildNodes={(from, to) => null}
      nodeType="Array"
    />
  );
  t.snapshot(tree.toJSON());
});
