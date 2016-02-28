// ES6 + inline style port of JSONViewer https://bitbucket.org/davevedder/react-json-viewer/
// all credits and original code to the author
// Dave Vedder <veddermatic@gmail.com> http://www.eskimospy.com/
// port by Daniele Zannotti http://www.github.com/dzannotti <dzannotti@me.com>

import React from 'react';
import grabNode from './grab-node';
import objType from './obj-type';
import solarized from './themes/solarized';
import { getChildNodes as getObjectChildNodes } from './JSONObjectNode';
import { getChildNodes as getIterableChildNodes } from './JSONIterableNode';

const styles = {
  tree: {
    border: 0,
    padding: 0,
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 2,
    marginRight: 0,
    fontSize: '0.90em',
    listStyle: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none'
  }
};

const getEmptyStyle = () => ({});
const identity = value => value;

export default class JSONTree extends React.Component {
  static propTypes = {
    data: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object
    ]).isRequired,
    hideRoot: React.PropTypes.bool
  };

  static defaultProps = {
    expandRoot: true,
    expandAll: false,
    hideRoot: false,
    keyPath: ['root'],
    theme: solarized,
    getArrowStyle: getEmptyStyle,
    getListStyle: getEmptyStyle,
    getItemStringStyle: getEmptyStyle,
    getLabelStyle: getEmptyStyle,
    getValueStyle: getEmptyStyle,
    getItemString: (type, data, itemType, itemString) => <span>{itemType} {itemString}</span>,
    labelRenderer: identity,
    valueRenderer: identity
  };

  constructor(props) {
    super(props);
  }

  render() {
    const getStyles = {
      getArrowStyle: this.props.getArrowStyle,
      getListStyle: this.props.getListStyle,
      getItemStringStyle: this.props.getItemStringStyle,
      getLabelStyle: this.props.getLabelStyle,
      getValueStyle: this.props.getValueStyle
    };

    const {
      data: value,
      expandRoot: initialExpanded,
      expandAll: allExpanded,
      getItemString,
      labelRenderer,
      valueRenderer,
      keyPath,
      previousData,
      theme
    } = this.props;

    let nodeToRender;
    let getChildNodes = objType(value) === 'Iterable' ? getIterableChildNodes : getObjectChildNodes;

    if (!this.props.hideRoot) {
      nodeToRender = grabNode({
        getItemString,
        initialExpanded,
        allExpanded,
        keyPath,
        previousData,
        styles: getStyles,
        theme,
        labelRenderer,
        value,
        valueRenderer
      });
    } else {
      nodeToRender = getChildNodes({
        data: value,
        getItemString,
        labelRenderer,
        previousData,
        styles: getStyles,
        theme,
        valueRenderer,
        allExpanded,
        keyPath: []
      });
    }

    return (
      <ul style={{
        ...styles.tree,
        ...this.props.style
      }}>
        {nodeToRender}
      </ul>
    );
  }
}
