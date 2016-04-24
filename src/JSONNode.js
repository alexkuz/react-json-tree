import React, { PropTypes } from 'react';
import objType from './objType';
import JSONObjectNode from './JSONObjectNode';
import JSONArrayNode from './JSONArrayNode';
import JSONIterableNode from './JSONIterableNode';
import JSONValueNode from './JSONValueNode';

const JSONNode = ({
  getItemString,
  initialExpanded = false,
  keyPath,
  labelRenderer,
  styling,
  value,
  valueRenderer,
  isCustomNode,
  ...rest
}) => {
  const nodeType = isCustomNode(value) ? 'Custom' : objType(value);

  const simpleNodeProps = {
    getItemString,
    initialExpanded,
    key: keyPath[0],
    keyPath,
    labelRenderer,
    nodeType,
    styling,
    value,
    valueRenderer
  };

  const nestedNodeProps = {
    ...rest,
    ...simpleNodeProps,
    data: value,
    isCustomNode
  };

  switch (nodeType) {
    case 'Object':
    case 'Error':
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
      return <JSONValueNode {...simpleNodeProps} valueGetter={raw => (raw ? 'true' : 'false')} />;
    case 'Date':
      return <JSONValueNode {...simpleNodeProps} valueGetter={raw => raw.toISOString()} />;
    case 'Null':
      return <JSONValueNode {...simpleNodeProps} valueGetter={() => 'null'} />;
    case 'Undefined':
      return <JSONValueNode {...simpleNodeProps} valueGetter={() => 'undefined'} />;
    case 'Function':
    case 'Symbol':
      return <JSONValueNode {...simpleNodeProps} valueGetter={raw => raw.toString()} />;
    case 'Custom':
      return <JSONValueNode {...simpleNodeProps} />;
    default:
      return null;
  }
};

JSONNode.propTypes = {
  getItemString: PropTypes.func.isRequired,
  initialExpanded: PropTypes.bool.isRequired,
  keyPath: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  labelRenderer: PropTypes.func.isRequired,
  styling: PropTypes.func.isRequired,
  value: PropTypes.any,
  valueRenderer: PropTypes.func.isRequired,
  isCustomNode: PropTypes.func.isRequired
};

export default JSONNode;

