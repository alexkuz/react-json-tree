import React from 'react';
import objType from './obj-type';
import JSONObjectNode from './JSONObjectNode';
import JSONArrayNode from './JSONArrayNode';
import JSONIterableNode from './JSONIterableNode';
import JSONStringNode from './JSONStringNode';
import JSONNumberNode from './JSONNumberNode';
import JSONBooleanNode from './JSONBooleanNode';
import JSONNullNode from './JSONNullNode';
import JSONDateNode from './JSONDateNode';
import JSONUndefinedNode from './JSONUndefinedNode';

export default function(key, value, prevValue, theme, styles, getItemString, initialExpanded = false) {
  const nodeType = objType(value);
  if (nodeType === 'Object') {
    return <JSONObjectNode data={value} previousData={prevValue} theme={theme} initialExpanded={initialExpanded} keyName={key} key={key} styles={styles} getItemString={getItemString} />;
  } else if (nodeType === 'Array') {
    return <JSONArrayNode data={value} previousData={prevValue} theme={theme} initialExpanded={initialExpanded} keyName={key} key={key} styles={styles} getItemString={getItemString} />;
  } else if (nodeType === 'Iterable') {
    return <JSONIterableNode data={value} previousData={prevValue} theme={theme} initialExpanded={initialExpanded} keyName={key} key={key} styles={styles} getItemString={getItemString} />;
  } else if (nodeType === 'String') {
    return <JSONStringNode keyName={key} previousValue={prevValue} theme={theme} value={value} key={key} styles={styles} />;
  } else if (nodeType === 'Number') {
    return <JSONNumberNode keyName={key} previousValue={prevValue} theme={theme} value={value} key={key} styles={styles} />;
  } else if (nodeType === 'Boolean') {
    return <JSONBooleanNode keyName={key} previousValue={prevValue} theme={theme} value={value} key={key} styles={styles} />;
  } else if (nodeType === 'Date') {
    return <JSONDateNode keyName={key} previousValue={prevValue} theme={theme} value={value} key={key} styles={styles} />;
  } else if (nodeType === 'Null') {
    return <JSONNullNode keyName={key} previousValue={prevValue} theme={theme} value={value} key={key} styles={styles} />;
  } else if (nodeType === 'Undefined') {
    return <JSONUndefinedNode keyName={key} previousValue={prevValue} theme={theme} value={value} key={key} styles={styles} />;
  }
  return false;
}
