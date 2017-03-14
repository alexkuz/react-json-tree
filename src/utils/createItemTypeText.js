// @flow
import type { NestedType } from '../types';

export default function createItemTypeText(nodeType: NestedType): string {
  switch (nodeType) {
    case 'Error':
    case 'WeakMap':
    case 'WeakSet':
    case 'Iterable':
    case 'Map':
    case 'Set':
      return nodeType;
    case 'Array':
      return '[]';
    default:
      return '{}';
  }
}
