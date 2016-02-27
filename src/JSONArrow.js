import React from 'react';

const styles = {
  base: {
    display: 'inline-block',
    marginLeft: 0,
    marginTop: 8,
    marginRight: 5,
    'float': 'left',
    transition: '150ms',
    WebkitTransition: '150ms',
    MozTransition: '150ms',
    WebkitTransform: 'rotateZ(-90deg)',
    MozTransform: 'rotateZ(-90deg)',
    transform: 'rotateZ(-90deg)',
    position: 'relative'
  },
  baseDouble: {
    marginRight: 10
  },
  arrow: {
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderTopWidth: 5,
    borderTopStyle: 'solid'
  },
  open: {
    WebkitTransform: 'rotateZ(0deg)',
    MozTransform: 'rotateZ(0deg)',
    transform: 'rotateZ(0deg)'
  },
  inner: {
    position: 'absolute',
    top: 0,
    left: -5
  }
};

export default class JSONArrow extends React.Component {
  render() {
    let style = {
      ...styles.base,
      ...styles.arrow
    };
    const color = {
      borderTopColor: this.props.theme.base0D
    };
    if (this.props.open) {
      style = {
        ...style,
        ...styles.open
      };
    }
    if (this.props.double) {
      style = {
        ...style,
        ...styles.baseDouble
      };
    }
    style = {
      ...style,
      ...this.props.style
    };
    return (
      <div style={{ ...color, ...style }} onClick={this.props.onClick}>
        {this.props.double &&
          <div style={{ ...color, ...styles.inner, ...styles.arrow }} />
        }
      </div>
    );
  }
}
