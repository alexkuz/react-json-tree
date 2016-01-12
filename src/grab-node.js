import React from 'react';
import objType from './obj-type';
import JSONObjectNode from './JSONObjectNode';
import JSONArrayNode from './JSONArrayNode';
import JSONIterableNode from './JSONIterableNode';
import JSONValueNode from './JSONValueNode';

export default function({
  getItemString,
  initialExpanded = false,
  key,
  labelRenderer,
  previousData,
  styles,
  theme,
  value,
  valueRenderer
}) {
  const nodeType = objType(value);

  const simpleNodeProps = {
    getItemString,
    initialExpanded,
    key,
    keyName: key,
    labelRenderer,
    nodeType,
    previousData,
    styles,
    theme,
    value,
    valueRenderer
  };

  const nestedNodeProps = {
    ...simpleNodeProps,
    data: value,
    initialExpanded,
    keyName: key
  };

  switch (nodeType) {
    case 'Object':
      return <JSONObjectNode {...nestedNodeProps} />;
    case 'Array':
      return <JSONArrayNode {...nestedNodeProps} />;
    case 'Iterable':
      return <JSONIterableNode {...nestedNodeProps} />;
    case 'String':
      return <JSONValueNode {...simpleNodeProps} valueGetter={raw => `"${raw}"`} />;
    case 'Number':
      return <JSONValueNode {...simpleNodeProps} />;
    case 'Boolean':
      return <JSONValueNode {...simpleNodeProps} valueGetter={raw => raw ? 'true' : 'false'} />;
    case 'Date':
      return <JSONValueNode {...simpleNodeProps} valueGetter={raw => raw.toISOString()} />;
    case 'Null':
      return <JSONValueNode {...simpleNodeProps} valueGetter={() => 'null'} />;
    case 'Undefined':
      return <JSONValueNode {...simpleNodeProps} valueGetter={() => 'undefined'} />;
    case 'Function':
      return <JSONValueNode {...simpleNodeProps} valueGetter={raw => raw.toString()} />;
    default:
      return false;
  }
}
