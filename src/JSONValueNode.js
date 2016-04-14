import React from 'react';
import reactMixin from 'react-mixin';
import { SquashClickEventMixin } from './mixins';

/**
 * Renders simple values (eg. strings, numbers, booleans, etc)
 */

@reactMixin.decorate(SquashClickEventMixin)
export default class JSONValueNode extends React.Component {
  static defaultProps = {
    valueGetter: value => value
  };

  render() {
    const {
      nodeType,
      styling,
      labelRenderer,
      keyPath,
      valueRenderer,
      value,
      valueGetter
    } = this.props;

    return (
      <li {...styling(['value', `value--${nodeType}`], nodeType, keyPath)}
          onClick={::this.handleClick}>
        <label {...styling(['valueLabel', `valueLabel--${nodeType}`], nodeType, keyPath)}>
          {labelRenderer(...keyPath)}:
        </label>
        <span {...styling(['valueText', `valueText--${nodeType}`], nodeType, keyPath)}>
          {valueRenderer(valueGetter(value), value)}
        </span>
      </li>
    );
  }
}
