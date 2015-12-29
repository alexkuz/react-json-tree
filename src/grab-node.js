import React from 'react';
import objType from './obj-type';
import JSONObjectNode from './JSONObjectNode';
import JSONArrayNode from './JSONArrayNode';
import JSONIterableNode from './JSONIterableNode';
import JSONValueNode from './JSONValueNode';

export default function({
  getItemString,
  getRenderedLabel,
  getRenderedValue,
  initialExpanded = false,
  key,
  previousData,
  styles,
  theme,
  value
}) {
  const nodeType = objType(value);

  const sharedProps = {
    getItemString,
    getRenderedLabel,
    getRenderedValue,
    initialExpanded,
    key,
    keyName: key,
    nodeType,
    previousData,
    styles,
    theme,
    value
  };

  const containerProps = {
    ...sharedProps,
    data: value,
    getItemString,
    initialExpanded,
    keyName: key
  };

  if (nodeType === 'Object') {
    return <JSONObjectNode {...containerProps} />;
  } else if (nodeType === 'Array') {
    return <JSONArrayNode {...containerProps} />;
  } else if (nodeType === 'Iterable') {
    return <JSONIterableNode {...containerProps} />;
  } else if (nodeType === 'String') {
    return <JSONValueNode {...sharedProps} />;
  } else if (nodeType === 'Number') {
    return <JSONValueNode {...sharedProps} />;
  } else if (nodeType === 'Boolean') {
    return <JSONValueNode {...sharedProps} valueGetter={raw => raw ? 'true' : 'false'} />;
  } else if (nodeType === 'Date') {
    return <JSONValueNode {...sharedProps} valueGetter={raw => raw.toISOString()} />;
  } else if (nodeType === 'Null') {
    return <JSONValueNode {...sharedProps} valueGetter={() => null} />;
  } else if (nodeType === 'Undefined') {
    return <JSONValueNode {...sharedProps} valueGetter={() => undefined} />;
  } else if (nodeType === 'Function') {
    return <JSONValueNode {...sharedProps} valueGetter={raw => raw.toString()} />;
  }
  return false;
}
