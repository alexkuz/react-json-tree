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
    let count = 0;
    if (Number.isSafeInteger(data.size)) {
      count = data.size;
    } else {
      for (const entry of data) { // eslint-disable-line no-unused-vars
        count += 1;
      }
    }
    itemString = count + ' entr' + (count !== 1 ? 'ies' : 'y');
  }
  return getItemString('Iterable', data, itemType, itemString);
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
  for (const entry of data) {
    let key = null;
    let value = null;
    if (Array.isArray(entry)) {
      [key, value] = entry;
    } else {
      key = childNodes.length;
      value = entry;
    }

    let previousDataValue;
    if (typeof previousData !== 'undefined' && previousData !== null) {
      previousDataValue = previousData[key];
    }

    const node = grabNode({
      getItemString,
      key,
      labelRenderer,
      previousData: previousDataValue,
      styles,
      theme,
      value,
      valueRenderer,
      allExpanded
    });

    if (node !== false) {
      childNodes.push(node);
    }
  }

  return childNodes;
}

// Configures <JSONNestedNode> to render an iterable
export default function({ ...props }) {
  return (
    <JSONNestedNode
      {...props}
      getChildNodes={getChildNodes}
      nodeType='Iterable'
      nodeTypeIndicator='()'
      renderItemString={renderItemString}
    />
  );
}
