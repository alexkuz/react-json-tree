// @flow
import React from 'react';
import objType from './utils/objType';
import JSONValueNode from './JSONValueNode';
import JSONNestedNode from './JSONNestedNode';

import type {
  RenderItemPreview,
  KeyPath,
  RenderLabel,
  RenderValue,
  IsCustomNode,
  ShouldExpandNode,
  Sorter,
  PostprocessValue
} from './types';
import type { StylingFunction } from 'react-base16-styling';

type Props = {
  renderItemPreview: RenderItemPreview,
  keyPath: KeyPath,
  renderLabel: RenderLabel,
  styling: StylingFunction,
  value: any,
  renderValue: RenderValue,
  isCustomNode: IsCustomNode,
  hideRoot: boolean,
  isCircular?: boolean,
  shouldExpandNode: ShouldExpandNode,
  sortObjectKeys: boolean | Sorter,
  postprocessValue: PostprocessValue,
  level: number,
  collectionLimit: number
};

const JSONNode = (
  {
    renderItemPreview,
    keyPath,
    renderLabel,
    styling,
    value,
    renderValue,
    isCustomNode,
    hideRoot,
    isCircular,
    shouldExpandNode,
    sortObjectKeys,
    postprocessValue,
    level,
    collectionLimit
  }: Props
) => {
  const nodeType = isCustomNode(value) ? 'Custom' : objType(value);

  const valueNodeProps = {
    renderItemPreview,
    key: keyPath[0],
    keyPath,
    renderLabel,
    nodeType,
    styling,
    value,
    renderValue
  };

  const nestedNodeProps = {
    ...valueNodeProps,
    value,
    isCustomNode,
    hideRoot,
    isCircular,
    shouldExpandNode,
    sortObjectKeys,
    postprocessValue,
    level,
    collectionLimit
  };

  switch (nodeType) {
    case 'Object':
    case 'Error':
    case 'WeakMap':
    case 'WeakSet':
    case 'Array':
    case 'Iterable':
    case 'Map':
    case 'Set':
      return <JSONNestedNode {...nestedNodeProps} />;
    default:
      return <JSONValueNode {...valueNodeProps} />;
  }
};

export default JSONNode;
