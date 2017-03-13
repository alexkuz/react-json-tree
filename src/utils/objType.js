// @flow
import type { AnyType } from '../types';

export default function objType(obj: any): AnyType {
  const type = Object.prototype.toString.call(obj).slice(8, -1);
  if (type === 'Object' && typeof obj[Symbol.iterator] === 'function') {
    return 'Iterable';
  }

  return type;
}
