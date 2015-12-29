import React from 'react';
import JSONNestedNode from './JSONNestedNode';
import grabNode from './grab-node';

// Returns the child nodes for each entry in iterable.
// If we have generated them previously we return from cache; otherwise we create them.
function getChildNodes(context) {
  if (context.state.expanded && context.needsChildNodes) {
    let childNodes = [];
    context.props.data.forEach((value, key) => {
      let previousData;
      if (typeof context.props.previousData !== 'undefined' && context.props.previousData !== null) {
        previousData = context.props.previousData[key];
      }
      const node = grabNode({
        ...context.props,
        key,
        previousData,
        value
      });
      if (node !== false) {
        childNodes.push(node);
      }
    });
    context.needsChildNodes = false;
    context.renderedChildren = childNodes;
  }
  return context.renderedChildren;
}

// Returns the "n Items" string for this node, generating and caching it if it hasn't been created yet.
function getItemString(itemType, context) {
  if (!context.itemString) {
    context.itemString = context.props.data.length + ' item' + (context.props.data.length !== 1 ? 's' : '');
  }
  return context.props.getItemString('Array', context.props.data, itemType, context.itemString);
}

// Configures <JSONNestedNode> to render an Array 
export default function JSONArrayNode({ ...props }) {
  return (
    <JSONNestedNode
      {...props}
      getChildNodes={getChildNodes}
      getItemStringWrapper={getItemString}
      nodeType='Array'
      nodeTypeIndicator='[]'
    />
  );
}
