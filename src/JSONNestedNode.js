import React from 'react';
import reactMixin from 'react-mixin';
import { ExpandedStateHandlerMixin } from './mixins';
import JSONArrow from './JSONArrow';
import getCollectionEntries from './getCollectionEntries';
import grabNode from './grabNode';
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
      const isCircular = circularCache.indexOf(value) !== -1;

      const node = grabNode({
        ...props,
        keyPath: [key, ...keyPath],
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

@reactMixin.decorate(ExpandedStateHandlerMixin)
export default class JSONNestedNode extends React.Component {
  static defaultProps = {
    data: [],
    initialExpanded: false,
    allExpanded: false,
    circularCache: [],
    level: 0
  };

  constructor(props) {
    super(props);

    // calculate individual node expansion if necessary
    const shouldExpandNode = this.props.shouldExpandNode ?
        this.props.shouldExpandNode(this.props.keyName, this.props.data, this.props.level) : false;
    this.state = {
      expanded: this.props.initialExpanded || this.props.allExpanded || shouldExpandNode,
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
      createItemString,
      styling,
      collectionLimit,
      keyPath,
      labelRenderer
    } = this.props;
    const expanded = this.state.expanded;
    const renderedChildren = expanded ? getChildNodes({...this.props, level: this.props.level + 1}) : null;

    const itemType = (
      <span {...styling('nestedNodeItemType', expanded)}>
        {nodeTypeIndicator}
      </span>
    );
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
      <li {...styling('nestedNode', expanded, keyPath)}>
        <JSONArrow
          styling={styling}
          open={expanded}
          onClick={::this.handleClick} />
        <label {...styling('nestedNodeLabel', expanded, keyPath)}
               onClick={::this.handleClick}>
          {labelRenderer(...keyPath)}:
        </label>
        <span {...styling('nestedNodeItemString', expanded, keyPath)}
              onClick={::this.handleClick}>
          {renderedItemString}
        </span>
        <ul {...styling('nestedNodeChildren', expanded, keyPath)}>
          {renderedChildren}
        </ul>
      </li>
    );
  }
}
