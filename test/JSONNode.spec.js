// @flow
import React from 'react';
import test from 'ava';
import renderer from 'react-test-renderer';

import JSONNode from '../src/JSONNode';

import createStylingFromTheme from '../src/utils/createStylingFromTheme';

const styling = createStylingFromTheme(undefined);

test('should render JSONNode', t => {
  t.snapshot(
    renderer
      .create(
        <JSONNode
          value={null}
          styling={styling}
          nodeType="Null"
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
      )
      .toJSON()
  );
});
