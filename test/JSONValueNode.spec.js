// @flow
import React from 'react';
import test from 'ava';
import renderer from 'react-test-renderer';

import JSONValueNode from '../src/JSONValueNode';

import createStylingFromTheme from '../src/utils/createStylingFromTheme';

const styling = createStylingFromTheme(undefined);

function createValueNode(nodeType, value) {
  return renderer
    .create(
      <JSONValueNode
        value={value}
        styling={styling}
        nodeType={nodeType}
        keyPath={['root']}
        renderLabel={() => {}}
        renderValue={() => {}}
      />
    )
    .toJSON();
}

test('should render JSONValueNode', t => {
  t.snapshot(createValueNode('String', ''));
  t.snapshot(createValueNode('Null', null));
  t.snapshot(createValueNode('Undefined', undefined));
  t.snapshot(createValueNode('Boolean', true));
  t.snapshot(createValueNode('Date', new Date()));
  t.snapshot(createValueNode('Function', () => {}));
  t.snapshot(createValueNode('Symbol', Symbol('test')));
  t.snapshot(createValueNode('Custom', ''));
});
