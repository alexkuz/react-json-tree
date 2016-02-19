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
    const len = Object.keys(data).length;
    itemString = len + ' key' + (len !== 1 ? 's' : '');
  }
  return getItemString('Object', data, itemType, itemString);
}

// Returns the child nodes for each entry in iterable.
// If we have generated them previously we return from cache; otherwise we create them.
export function getChildNodes({
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
  for (let key in data) {
    if (Object.getPrototypeOf(data) === null || data.hasOwnProperty(key)) {
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
        value: data[key],
        valueRenderer,
        allExpanded
      });

      if (node !== false) {
        childNodes.push(node);
      }
    }
  }

  return childNodes;
}

// Configures <JSONNestedNode> to render an Object
export default function({ ...props }) {
  return (
    <JSONNestedNode
      {...props}
      getChildNodes={getChildNodes}
      nodeType='Object'
      nodeTypeIndicator='{}'
      renderItemString={renderItemString}
    />
  );
}
