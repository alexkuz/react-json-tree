// @flow
import React from 'react';

import type { StylingFunction } from 'react-base16-styling';
import type { NestedType } from './types';

type Props = {
  styling: StylingFunction,
  arrowStyle: 'single' | 'double',
  expanded: boolean,
  nodeType: NestedType,
  onClick: (e: SyntheticMouseEvent) => void
};

const JSONArrow = (
  {
    styling,
    arrowStyle,
    expanded,
    nodeType,
    onClick
  }: Props
) => (
  <div
    {...styling(['arrowContainer', 'arrowContainerColor'], arrowStyle)}
    onClick={onClick}
  >
    <div
      {...styling(
        ['arrow', 'arrowColor', 'arrowSign', 'arrowSignColor'],
        nodeType,
        expanded,
        arrowStyle
      )}
    >
      {'\u25B6'}
      {arrowStyle === 'double' &&
        <div
          {...styling([
            'arrowInner',
            'arrowInnerColor',
            'arrowSign',
            'arrowSignColor'
          ])}
        >
          {'\u25B6'}
        </div>}
    </div>
  </div>
);

export default JSONArrow;
