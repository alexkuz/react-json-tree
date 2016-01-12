import React from 'react';
import reactMixin from 'react-mixin';
import { SquashClickEventMixin } from './mixins';
import hexToRgb from './utils/hexToRgb';

/**
 * Renders simple values (eg. strings, numbers, booleans, etc)
 */

const styles = {
  base: {
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 0,
    marginLeft: 14,
    WebkitUserSelect: 'text',
    MozUserSelect: 'text'
  },
  label: {
    display: 'inline-block',
    marginRight: 5
  }
};

@reactMixin.decorate(SquashClickEventMixin)
export default class JSONValueNode extends React.Component {
  static defaultProps = {
    valueGetter: value => value
  }

  render() {
    let backgroundColor = 'transparent';
    if (this.props.previousValue !== this.props.value) {
      const bgColor = hexToRgb(this.props.theme.base06);
      backgroundColor = `rgba(${bgColor.r}, ${bgColor.g}, ${bgColor.b}, 0.1)`;
    }

    return (
      <li style={{ ...styles.base, backgroundColor }} onClick={::this.handleClick}>
        <label style={{
          ...styles.label,
          color: this.props.theme.base0D,
          ...this.props.styles.getLabelStyle(this.props.nodeType, true)
        }}>
          {this.props.labelRenderer(this.props.keyName)}:
        </label>
        <span style={{
          color: this.props.valueColor,
          ...this.props.styles.getValueStyle(this.props.nodeType, true)
        }}>{this.props.valueRenderer(this.props.valueGetter(this.props.value))}</span>
      </li>
    );
  }
}
