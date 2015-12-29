import React from 'react';
import JSONNestedNode from './JSONNestedNode';
import grabNode from './grab-node';

// Returns the child nodes for each entry in iterable.
// If we have generated them previously we return from cache; otherwise we create them.
function getChildNodes(context) {
  if (context.state.expanded && context.needsChildNodes) {
    let childNodes = [];
    for (const entry of context.props.data) {
      let key = null;
      let value = null;
      if (Array.isArray(entry)) {
        [key, value] = entry;
      } else {
        key = childNodes.length;
        value = entry;
      }

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
    }
    context.needsChildNodes = false;
    context.renderedChildren = childNodes;
  }
  return context.renderedChildren;
}

// Returns the "n Items" string for this node, generating and caching it if it hasn't been created yet.
function getItemString(itemType, context) {
  if (!context.itemString) {
    const { data } = context.props;
    let count = 0;
    if (Number.isSafeInteger(data.size)) {
      count = data.size;
    } else {
      for (const entry of data) { // eslint-disable-line no-unused-vars
        count += 1;
      }
    }
    context.itemString = count + ' entr' + (count !== 1 ? 'ies' : 'y');
  }
  return context.props.getItemString('Iterable', context.props.data, itemType, context.itemString);
}

// Configures <JSONNestedNode> to render an iterable
export default function({ ...props }) {
  return (
    <JSONNestedNode
      {...props}
      getChildNodes={getChildNodes}
      getItemStringWrapper={getItemString}
      nodeType='Iterable'
      nodeTypeIndicator='()'
    />
  );
}
