// @flow
import React from 'react';
import test from 'ava';
import renderer from 'react-test-renderer';

import JSONNestedNode from '../src/JSONNestedNode';

import createStylingFromTheme from '../src/utils/createStylingFromTheme';

const styling = createStylingFromTheme(undefined);

test('should render JSONNestedNode', t => {
  const tree = (
    <JSONNestedNode
      value={[]}
      styling={styling}
      nodeType="Array"
      hideRoot
      collectionLimit={10}
      keyPath={['root']}
      renderLabel={() => {}}
      sortObjectKeys
      isCustomNode={() => false}
      renderValue={() => {}}
      shouldExpandNode={() => false}
      postprocessValue={v => v}
      renderItemPreview={() => {}}
    />
  );

  t.snapshot(renderer.create(tree).toJSON());
});
