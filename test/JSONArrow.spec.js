// @flow
import React from 'react';
import test from 'ava';
import renderer from 'react-test-renderer';

import JSONArrow from '../src/JSONArrow';

import createStylingFromTheme from '../src/utils/createStylingFromTheme';

const styling = createStylingFromTheme(undefined);

test('should render JSONArrow', t => {
  t.snapshot(
    renderer
      .create(
        <JSONArrow
          styling={styling}
          arrowStyle="double"
          expanded
          onClick={() => {}}
          nodeType="Array"
        />
      )
      .toJSON()
  );
});
