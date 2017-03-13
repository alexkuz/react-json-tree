// @flow
import React from 'react';

import type { ValueType, RenderLabel, KeyPath, RenderValue } from './types';
import type { StylingFunction } from 'react-base16-styling';

type Props = {
  nodeType: ValueType,
  styling: StylingFunction,
  renderLabel: RenderLabel,
  keyPath: KeyPath,
  renderValue: RenderValue,
  value: any
};

const VALUE_RENDERERS = {
  String: raw => `"${raw}"`,
  Boolean: raw => raw ? 'true' : 'false',
  Date: raw => raw.toISOString(),
  Null: () => 'null',
  Undefined: () => 'undefined',
  Function: raw => raw.toString(),
  Symbol: raw => raw.toString()
};

/**
 * Renders simple values (eg. strings, numbers, booleans, etc)
 */

const JSONValueNode = (
  {
    nodeType,
    styling,
    renderLabel,
    keyPath,
    renderValue,
    value
  }: Props
) => {
  const renderedValue = VALUE_RENDERERS.hasOwnProperty(nodeType)
    ? VALUE_RENDERERS[nodeType](value)
    : value;

  return (
    <li {...styling(['value', 'valueColor'], nodeType, keyPath)}>
      <label
        {...styling(
          ['label', 'labelColor', 'valueLabel', 'valueLabelColor'],
          nodeType,
          keyPath
        )}
      >
        {renderLabel(keyPath, nodeType, false, false)}
      </label>
      <span {...styling(['valueText', 'valueTextColor'], nodeType, keyPath)}>
        {renderValue(renderedValue, value, ...keyPath)}
      </span>
    </li>
  );
};

export default JSONValueNode;
