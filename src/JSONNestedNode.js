import React from 'react';
import reactMixin from 'react-mixin';
import { ExpandedStateHandlerMixin } from './mixins';
import JSONArrow from './JSONArrow';
import getCollectionEntries from './getCollectionEntries';
import grabNode from './grab-node';
import ItemRange from './ItemRange';
import shouldPureComponentUpdate from 'react-pure-render/function';

/**
 * Renders nested values (eg. objects, arrays, lists, etc.)
 */

function getChildNodes(props, from, to) {
  const {
    nodeType,
    data,
    collectionLimit,
    previousData,
    circularCache,
    keyPath,
    postprocessValue,
    allExpanded
  } = props;
  const childNodes = [];

  getCollectionEntries(nodeType, data, collectionLimit, from, to).forEach(entry => {
    if (entry.to) {
      childNodes.push(
        <ItemRange {...props}
                   key={`ItemRange${entry.from}-${entry.to}`}
                   from={entry.from}
                   to={entry.to}
                   getChildNodes={getChildNodes} />
      );
    } else {
      const { key, value } = entry;
      let previousDataValue;
      if (typeof previousData !== 'undefined' && previousData !== null) {
        previousDataValue = previousData[key];
      }
      const isCircular = circularCache.indexOf(value) !== -1;

      const node = grabNode({
        ...props,
        keyPath: [key, ...keyPath],
        previousData: previousDataValue,
        value: postprocessValue(value),
        postprocessValue,
        collectionLimit,
        circularCache: [...circularCache, value],
        initialExpanded: false,
        allExpanded: isCircular ? false : allExpanded,
        hideRoot: false
      });

      if (node !== false) {
        childNodes.push(node);
      }
    }
  });

  return childNodes;
}

const STYLES = {
  base: {
    position: 'relative',
    paddingTop: 3,
    paddingBottom: 3,
    marginLeft: 14
  },
  label: {
    margin: 0,
    padding: 0,
    display: 'inline-block',
    cursor: 'pointer'
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
export default class JSONNestedNode extends React.Component {
  static defaultProps = {
    data: [],
    initialExpanded: false,
    allExpanded: false,
    circularCache: []
  };

  constructor(props) {
    super(props);
    this.state = {
      expanded: this.props.initialExpanded || this.props.allExpanded,
      createdChildNodes: false
    };
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    const {
      getItemString,
      nodeTypeIndicator,
      nodeType,
      data,
      hideRoot,
      styles,
      createItemString,
      theme,
      collectionLimit,
      keyPath,
      labelRenderer
    } = this.props;
    const expanded = this.state.expanded;
    const childListStyle = {
      padding: 0,
      margin: 0,
      listStyle: 'none',
      display: expanded ? 'block' : 'none'
    };
    let spanStyle = {
      ...STYLES.span,
      color: theme.base0B
    };
    const containerStyle = {
      ...STYLES.base
    };

    if (expanded) {
      spanStyle = {
        ...spanStyle,
        color: theme.base03
      };
    }

    const renderedChildren = expanded ? getChildNodes(this.props) : null;

    const itemType = <span style={STYLES.spanType}>{nodeTypeIndicator}</span>;
    const renderedItemString = getItemString(
      nodeType,
      data,
      itemType,
      createItemString(data, collectionLimit)
    );

    return hideRoot ? (
      <div>
        {renderedChildren}
      </div>
    ) : (
      <li style={containerStyle}>
        <JSONArrow
          theme={theme}
          open={expanded}
          onClick={::this.handleClick}
          style={styles.getArrowStyle(expanded)} />
        <label
          style={{
            ...STYLES.label,
            color: theme.base0D,
            ...styles.getLabelStyle(nodeType, expanded)
          }}
          onClick={::this.handleClick}>
          {labelRenderer(...keyPath)}:
        </label>
        <span
          style={{
            ...spanStyle,
            ...styles.getItemStringStyle(nodeType, expanded)
          }}
          onClick={::this.handleClick}>
          {renderedItemString}
        </span>
        <ul style={{
              ...childListStyle,
              ...styles.getListStyle(nodeType, expanded)
            }}>
          {renderedChildren}
        </ul>
      </li>
    );
  }
}
