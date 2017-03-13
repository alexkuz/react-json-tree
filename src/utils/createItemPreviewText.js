// @flow
import type { NestedType } from '../types';

function createObjectPreviewText(data) {
  const len = Object.getOwnPropertyNames(data).length;
  return `${len} ${len !== 1 ? 'keys' : 'key'}`;
}

function createArrayPrevew(data) {
  return `${data.length} ${data.length !== 1 ? 'items' : 'item'}`;
}

function createIterablePreviewText(data, limit) {
  let count = 0;
  let hasMore = false;
  if (Number.isSafeInteger(data.size)) {
    count = data.size;
  } else {
    // eslint-disable-next-line no-unused-vars
    for (const entry of data) {
      if (limit && count + 1 > limit) {
        hasMore = true;
        break;
      }
      count += 1;
    }
  }
  return `${hasMore ? '>' : ''}${count} ${count !== 1 ? 'entries' : 'entry'}`;
}

export default function createItemPreviewText(
  nodeType: NestedType,
  data: any,
  limit?: number
): string {
  switch (nodeType) {
    case 'WeakMap':
    case 'WeakSet':
      return '';
    case 'Array':
      return createArrayPrevew(data);
    case 'Iterable':
    case 'Map':
    case 'Set':
      return createIterablePreviewText(data, limit);
    default:
      return createObjectPreviewText(data);
  }
}
