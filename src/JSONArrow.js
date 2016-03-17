import React from 'react';

const styles = {
  base: {
    display: 'inline-block',
    marginLeft: 0,
    marginTop: 8,
    'float': 'left',
    transition: '150ms',
    WebkitTransition: '150ms',
    MozTransition: '150ms',
    WebkitTransform: 'rotateZ(-90deg)',
    MozTransform: 'rotateZ(-90deg)',
    transform: 'rotateZ(-90deg)',
    position: 'relative'
  },
  container: {
    display: 'inline-block',
    padding: '2 5',
    cursor: 'pointer'
  },
  containerDouble: {
    padding: '2 10'
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
    let containerStyle = {
      ...styles.container
    };
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
      containerStyle = {
        ...containerStyle,
        ...styles.containerDouble
      };
    }
    style = {
      ...style,
      ...this.props.style
    };
    return (
      <div style={containerStyle} onClick={this.props.onClick}>
        <div style={{ ...color, ...style }}>
          {this.props.double &&
            <div style={{ ...color, ...styles.inner, ...styles.arrow }} />
          }
        </div>
      </div>
    );
  }
}
