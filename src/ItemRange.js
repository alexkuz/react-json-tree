import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import JSONArrow from './JSONArrow';

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
    const { styling, styles, from, to, getChildNodes } = this.props;

    return (this.state.expanded ?
      <div {...styling('itemRange', this.state.expanded)}>
        {getChildNodes(this.props, from, to)}
      </div> :
      <div {...styling('itemRange', this.state.expanded)}
           onClick={this.handleClick}>
        <JSONArrow
          styling={styling}
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
