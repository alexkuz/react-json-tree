// ES6 + inline style port of JSONViewer https://bitbucket.org/davevedder/react-json-viewer/
// all credits and original code to the author
// Dave Vedder <veddermatic@gmail.com> http://www.eskimospy.com/
// port by Daniele Zannotti http://www.github.com/dzannotti <dzannotti@me.com>

import React, { PropTypes } from 'react';
import grabNode from './grabNode';
import createStylingFromTheme from './createStylingFromTheme';

const identity = value => value;

export default class JSONTree extends React.Component {
  static propTypes = {
    data: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]).isRequired,
    hideRoot: PropTypes.bool,
    theme: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ]),
    isLightTheme: PropTypes.bool
  };

  static defaultProps = {
    expandRoot: true,
    expandAll: false,
    shouldExpandNode: (keyName, data, level) => level === 0, // expands root by default,
    hideRoot: false,
    keyPath: ['root'],
    getItemString: (type, data, itemType, itemString) => <span>{itemType} {itemString}</span>,
    labelRenderer: identity,
    valueRenderer: identity,
    postprocessValue: identity,
    isCustomNode: () => false,
    collectionLimit: 50,
    isLightTheme: true
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

    const deprecatedStylingMethods = [
      'getArrowStyle',
      'getListStyle',
      'getItemStringStyle',
      'getLabelStyle',
      'getValueStyle'
    ].filter(name => this.props[name]);

    deprecatedStylingMethods
      .forEach(name => console.error(`Styling method "${name}" is deprecated, use "theme" property instead`));

    // TODO: theming fallback

    const {
      data: value,
      expandRoot: initialExpanded,
      expandAll: allExpanded,
      style,
      keyPath,
      postprocessValue,
      hideRoot,
      theme,
      isLightTheme,
      ...rest
    } = this.props;

    const styling = createStylingFromTheme(theme, null, isLightTheme);

    let nodeToRender;

    nodeToRender = grabNode({
      initialExpanded,
      allExpanded,
      keyPath: hideRoot ? [] : keyPath,
      value: postprocessValue(value),
      postprocessValue,
      hideRoot,
      styling,
      ...rest
    });

    return (
      <ul {...styling('tree')}>
        {nodeToRender}
      </ul>
    );
  }
}
