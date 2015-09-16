import React from 'react';
import reactMixin from 'react-mixin';
import { ExpandedStateHandlerMixin } from './mixins';
import JSONArrow from './JSONArrow';
import grabNode from './grab-node';

const styles = {
  base: {
    position: 'relative',
    paddingTop: 3,
    paddingBottom: 3,
    marginLeft: 14
  },
  label: {
    margin: 0,
    padding: 0,
    display: 'inline-block'
  },
  span: {
    cursor: 'default'
  },
  spanType: {
    marginLeft: 5,
    marginRight: 5
  }
};

@reactMixin.decorate(ExpandedStateHandlerMixin)
export default class JSONObjectNode extends React.Component {
  defaultProps = {
    data: [],
    initialExpanded: false
  };
  // cache store for the number of items string we display
  itemString = false;

  // flag to see if we still need to render our child nodes
  needsChildNodes = true;

  // cache store for our child nodes
  renderedChildren = [];

  constructor(props) {
    super(props);
    this.state = {
      expanded: this.props.initialExpanded,
      createdChildNodes: false
    };
  }

  // Returns the child nodes for each element in the object. If we have
  // generated them previously, we return from cache, otherwise we create
  // them.
  getChildNodes() {
    if (this.state.expanded && this.needsChildNodes) {
      const obj = this.props.data;
      let childNodes = [];
      for (let k in obj) {
        if (obj.hasOwnProperty(k)) {
          let prevData;
          if (typeof this.props.previousData !== 'undefined' && this.props.previousData !== null) {
            prevData = this.props.previousData[k];
          }
          const node = grabNode(k, obj[k], prevData, this.props.theme, this.props.styles, this.props.getItemString);
          if (node !== false) {
            childNodes.push(node);
          }
        }
      }
      this.needsChildNodes = false;
      this.renderedChildren = childNodes;
    }
    return this.renderedChildren;
  }

  // Returns the "n Items" string for this node, generating and
  // caching it if it hasn't been created yet.
  getItemString(itemType) {
    if (!this.itemString) {
      const len = Object.keys(this.props.data).length;
      this.itemString = len + ' key' + (len !== 1 ? 's' : '');
    }
    return this.props.getItemString('Object', this.props.data, this.itemString, itemType);
  }

  render() {
    let childListStyle = {
      padding: 0,
      margin: 0,
      listStyle: 'none',
      display: (this.state.expanded) ? 'block' : 'none'
    };
    let containerStyle;
    let spanStyle = {
      ...styles.span,
      color: this.props.theme.base0B
    };
    containerStyle = {
      ...styles.base
    };
    if (this.state.expanded) {
      spanStyle = {
        ...spanStyle,
        color: this.props.theme.base03
      };
    }
    return (
      <li style={containerStyle}>
        <JSONArrow theme={this.props.theme} open={this.state.expanded} onClick={::this.handleClick} style={this.props.styles.getArrowStyle(this.state.expanded)} />
        <label style={{
          ...styles.label,
          color: this.props.theme.base0D,
          ...this.props.styles.getLabelStyle('Object', this.state.expanded)
        }} onClick={::this.handleClick}>
          {this.props.keyName}:
        </label>
        <span style={{
          ...spanStyle,
          ...this.props.styles.getPreviewStyle('Object', this.state.expanded)
        }} onClick={::this.handleClick}>
          {this.getItemString(<span style={styles.spanType}>&#123;&#125;</span>)}
        </span>
        <ul style={{
          ...childListStyle,
          ...this.props.styles.getListStyle('Object', this.state.expanded)
        }}>
          {this.getChildNodes()}
        </ul>
      </li>
    );
  }
}
