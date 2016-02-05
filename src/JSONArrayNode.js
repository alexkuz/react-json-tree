import React from 'react';
import JSONNestedNode from './JSONNestedNode';
import grabNode from './grab-node';

// Returns the "n Items" string for this node, generating and caching it if it hasn't been created yet.
function renderItemString({
  data,
  getItemString,
  itemString,
  itemType
}) {
  if (!itemString) {
    itemString = data.length + ' item' + (data.length !== 1 ? 's' : '');
  }
  return getItemString('Array', data, itemType, itemString);
}

// Returns the child nodes for each entry in iterable.
// If we have generated them previously we return from cache; otherwise we create them.
function getChildNodes({
  data,
  getItemString,
  labelRenderer,
  previousData,
  styles,
  theme,
  valueRenderer,
  allExpanded
}) {
  const childNodes = [];
  data.forEach((value, key) => {
    let previousDataValue;
    if (typeof previousData !== 'undefined' && previousData !== null) {
      previousDataValue = previousData[key];
    }

    const node = grabNode({
      getItemString,
      key,
      labelRenderer,
      previousData: previousDataValue,
      renderItemString,
      styles,
      theme,
      value,
      valueRenderer,
      allExpanded
    });

    if (node !== false) {
      childNodes.push(node);
    }
  });

  return childNodes;
}

// Configures <JSONNestedNode> to render an Array
export default function JSONArrayNode({ ...props }) {
  return (
    <JSONNestedNode
      {...props}
      getChildNodes={getChildNodes}
      nodeType='Array'
      nodeTypeIndicator='[]'
      renderItemString={renderItemString}
    />
  );
}
