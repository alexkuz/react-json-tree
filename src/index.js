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
const getRenderedDefault = text => text;

export default class JSONTree extends React.Component {
  static propTypes = {
    data: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object
    ]).isRequired
  };

  static defaultProps = {
    expandRoot: true,
    keyName: 'root',
    theme: solarized,
    getArrowStyle: getEmptyStyle,
    getListStyle: getEmptyStyle,
    getItemStringStyle: getEmptyStyle,
    getLabelStyle: getEmptyStyle,
    getRenderedLabel: getRenderedDefault,
    getValueStyle: getEmptyStyle,
    getRenderedValue: getRenderedDefault,
    getItemString: (type, data, itemType, itemString) => <span>{itemType} {itemString}</span>
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
      getItemString,
      getRenderedLabel,
      getRenderedValue,
      keyName: key,
      previousData,
      theme
    } = this.props;

    const rootNode = grabNode({
      getItemString,
      getRenderedLabel,
      getRenderedValue,
      initialExpanded,
      key,
      previousData,
      styles: getStyles,
      theme,
      value
    });

    return (
      <ul style={{
        ...styles.tree,
        ...this.props.style
      }}>
        {rootNode}
      </ul>
    );
  }
}
