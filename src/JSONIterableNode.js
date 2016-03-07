import React from 'react';
import JSONNestedNode from './JSONNestedNode';

// Returns the "n Items" string for this node, generating and caching it if it hasn't been created yet.
function createItemString(data, limit) {
  let count = 0;
  let hasMore = false;
  if (Number.isSafeInteger(data.size)) {
    count = data.size;
  } else {
    for (const entry of data) { // eslint-disable-line no-unused-vars
      if (limit && count + 1 > limit) {
        hasMore = true;
        break;
      }
      count += 1;
    }
  }
  return `${hasMore ? '>' : ''}${count} ${count !== 1 ? 'entries' : 'entry'}`;
}

// Configures <JSONNestedNode> to render an iterable
export default function({ ...props }) {
  return (
    <JSONNestedNode
      {...props}
      nodeType='Iterable'
      nodeTypeIndicator='()'
      createItemString={createItemString}
    />
  );
}
