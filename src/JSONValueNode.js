import React, { PropTypes } from 'react';

/**
 * Renders simple values (eg. strings, numbers, booleans, etc)
 */

export default class JSONValueNode extends React.Component {
  static propTypes = {
    nodeType: PropTypes.string.isRequired,
    styling: PropTypes.func.isRequired,
    labelRenderer: PropTypes.func.isRequired,
    keyPath: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ).isRequired,
    valueRenderer: PropTypes.func.isRequired,
    value: PropTypes.any,
    valueGetter: PropTypes.func
  };

  static defaultProps = {
    valueGetter: value => value
  };

  constructor() {
    super();
    this.state = { hover: false };
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  render() {
    const { hover } = this.state;
    const {
      nodeType, styling, labelRenderer, keyPath, valueRenderer, value, valueGetter
    } = this.props;
    return (
      <li
        {...styling('value', nodeType, keyPath, hover)}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        <label {...styling(['label', 'valueLabel'], nodeType, keyPath)}>
          {labelRenderer(keyPath, nodeType, false, false)}
        </label>
        <span {...styling('valueText', nodeType, keyPath)}>
          {valueRenderer(valueGetter(value), value, ...keyPath)}
        </span>
      </li>
    );
  }

  handleMouseOver(e) {
    e.stopPropagation();
    this.setState({ hover: true });
  }

  handleMouseOut() {
    this.setState({ hover: false });
  }
}
