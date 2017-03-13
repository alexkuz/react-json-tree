// @flow
import type { NestedType } from '../types';

export default function createItemTypeText(nodeType: NestedType): string {
  switch (nodeType) {
    case 'Error':
      return 'Error';
    case 'WeakMap':
      return 'WeakMap';
    case 'WeakSet':
      return 'WeakSet';
    case 'Array':
      return '[]';
    case 'Iterable':
    case 'Map':
      return 'Map';
    case 'Set':
      return 'Set';
    default:
      return '{}';
  }
}
