import React from 'react';
import {createRenderer} from 'react-addons-test-utils';
import test from 'ava';

import JSONTree from '../src/index';
import JSONNode from '../src/JSONNode';

const BASIC_DATA = {a: 1, b: 'c'};

function render(component) {
  const renderer = createRenderer();
  renderer.render(component);
  return renderer.getRenderOutput();
}

test('should render basic tree', t => {
  const result = render(<JSONTree data={BASIC_DATA}/>);

  t.is(result.type, 'ul');
  t.is(result.props.children.type.name, JSONNode.name);
});
