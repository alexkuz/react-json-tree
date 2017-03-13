// @flow
import type { NestedType } from '../types';

export default function isExpandable(nodeType: NestedType, data: any): boolean {
  switch (nodeType) {
    case 'Array':
      return data.length > 0;
    case 'Iterable':
    case 'Map':
    case 'Set':
      return true;
    default:
      return Object.getOwnPropertyNames(data).length > 0;
  }
}
