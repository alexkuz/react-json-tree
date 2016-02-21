// ES6 + inline style port of JSONViewer https://bitbucket.org/davevedder/react-json-viewer/
// all credits and original code to the author
// Dave Vedder <veddermatic@gmail.com> http://www.eskimospy.com/
// port by Daniele Zannotti http://www.github.com/dzannotti <dzannotti@me.com>

import React from 'react';
import grabNode from './grab-node';
import solarized from './themes/solarized';

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
    shouldExpandNode: (keyName, data, level) => level === 0, // expands root by default,
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
    valueRenderer: identity,
    postprocessValue: identity,
    isCustomNode: () => false,
    collectionLimit: 50
  };

  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.expandRoot) {
      console.error('The expandRoot property is deprecated, use "shouldExpandNode: () => false" instead');
    }

    if (this.props.expandAll) {
      console.error('The expandAll property is deprecated, use "shouldExpandNode: () => true" instead');
    }

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
      style,
      keyPath,
      postprocessValue,
      hideRoot,
      ...rest
    } = this.props;

    let nodeToRender;

    nodeToRender = grabNode({
      initialExpanded,
      allExpanded,
      keyPath: hideRoot ? [] : keyPath,
      styles: getStyles,
      value: postprocessValue(value),
      postprocessValue,
      hideRoot,
      ...rest
    });

    return (
      <ul style={{
        ...styles.tree,
        ...style
      }}>
        {nodeToRender}
      </ul>
    );
  }
}
