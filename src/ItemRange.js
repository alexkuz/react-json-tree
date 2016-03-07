import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import JSONArrow from './JSONArrow';

const STYLES = {
  itemRange: {
    margin: '8px 0 8px 14px',
    cursor: 'pointer'
  }
};


export default class ItemRange extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };

    this.handleClick = this.handleClick.bind(this);
  }

  static propTypes = {
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    const { theme, styles, from, to, getChildNodes } = this.props;

    return (this.state.expanded ?
      <div style={{ color: theme.base0D, ...styles.label }}>
        {getChildNodes(this.props, from, to)}
      </div> :
      <div style={{ color: theme.base0D, ...STYLES.itemRange, ...styles.label }}
           onClick={this.handleClick}>
        <JSONArrow
          theme={theme}
          open={false}
          onClick={this.handleClick}
          style={styles.getArrowStyle(false)}
          double />
        {`${from} ... ${to}`}
      </div>
    );
  }

  handleClick() {
    this.setState({ expanded: !this.state.expanded });
  }
}
