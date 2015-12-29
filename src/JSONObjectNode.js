import React from 'react';
import JSONNestedNode from './JSONNestedNode';
import grabNode from './grab-node';

// Returns the child nodes for each entry in iterable.
// If we have generated them previously we return from cache; otherwise we create them.
function getChildNodes(context) {
  if (context.state.expanded && context.needsChildNodes) {
    const obj = context.props.data;
    let childNodes = [];
    for (let k in obj) {
      if (obj.hasOwnProperty(k)) {
        let previousData;
        if (typeof context.props.previousData !== 'undefined' && context.props.previousData !== null) {
          previousData = context.props.previousData[k];
        }
        const node = grabNode({
          ...context.props,
          key: k,
          previousData,
          value: obj[k]
        });
        if (node !== false) {
          childNodes.push(node);
        }
      }
    }
    context.needsChildNodes = false;
    context.renderedChildren = childNodes;
  }
  return context.renderedChildren;
}

// Returns the "n Items" string for context node, generating and caching it if it hasn't been created yet.
function getItemString(itemType, context) {
  if (!context.itemString) {
    const len = Object.keys(context.props.data).length;
    context.itemString = len + ' key' + (len !== 1 ? 's' : '');
  }
  return context.props.getItemString('Object', context.props.data, itemType, context.itemString);
}

// Configures <JSONNestedNode> to render an Object
export default function({ ...props }) {
  return (
    <JSONNestedNode
      {...props}
      getChildNodes={getChildNodes}
      getItemStringWrapper={getItemString}
      nodeType='Object'
      nodeTypeIndicator='{}'
    />
  );
}
