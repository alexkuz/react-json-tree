// ES6 + inline style port of JSONViewer https://bitbucket.org/davevedder/react-json-viewer/
// all credits and original code to the author
// Dave Vedder <veddermatic@gmail.com> http://www.eskimospy.com/
// port by Daniele Zannotti http://www.github.com/dzannotti <dzannotti@me.com>

import React, { PropTypes } from 'react';
import JSONNode from './JSONNode';
import createStylingFromTheme from './createStylingFromTheme';

const identity = value => value;

function checkLegacyTheming(theme, props) {
  const deprecatedStylingMethodsMap = {
    getArrowStyle: 'arrow',
    getListStyle: 'nestedNodeChildren',
    getItemStringStyle: 'nestedNodeItemString',
    getLabelStyle: 'label',
    getValueStyle: 'valueText'
  };

  const deprecatedStylingMethods = Object.keys(deprecatedStylingMethodsMap)
    .filter(name => props[name]);

  if (deprecatedStylingMethods.length > 0) {
    if (typeof theme === 'string') {
      theme = {
        extend: theme
      };
    } else {
      theme = { ...theme };
    }

    deprecatedStylingMethods.forEach(name => {
      console.error( // eslint-disable-line no-console
        `Styling method "${name}" is deprecated, use "theme" property instead`
      );

      theme[deprecatedStylingMethodsMap[name]] = ({ style }, ...args) => ({
        style: {
          ...style,
          ...props[name](...args)
        }
      });
    });
  }

  return theme;
}

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
    isLightTheme: PropTypes.bool,
    keyPath: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    postprocessValue: PropTypes.func,
    sortObjectKeys: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
  };

  static defaultProps = {
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

  render() {
    const {
      data: value,
      keyPath,
      postprocessValue,
      hideRoot,
      theme,
      isLightTheme,
      ...rest
    } = this.props;

    const styling = createStylingFromTheme(checkLegacyTheming(theme, rest), null, isLightTheme);

    return (
      <ul {...styling('tree')}>
        <JSONNode
          {...{ postprocessValue, hideRoot, styling, ...rest }}
          keyPath={hideRoot ? [] : keyPath}
          value={postprocessValue(value)}
        />
      </ul>
    );
  }
}
