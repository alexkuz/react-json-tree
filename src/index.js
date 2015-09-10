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

export default class JSONTree extends React.Component {
  static propTypes = {
    data: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object
    ]).isRequired
  };

  static defaultProps = {
    theme: solarized
  };

  constructor(props) {
    super(props);
  }

  render() {
    const keyName = this.props.keyName || 'root';
    const rootNode = grabNode(keyName, this.props.data, this.props.previousData, this.props.theme, true);
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
