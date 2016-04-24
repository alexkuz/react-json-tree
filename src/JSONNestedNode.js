import React, { PropTypes } from 'react';
import JSONArrow from './JSONArrow';
import getCollectionEntries from './getCollectionEntries';
import JSONNode from './JSONNode';
import ItemRange from './ItemRange';
import shouldPureComponentUpdate from 'react-pure-render/function';

/**
 * Renders nested values (eg. objects, arrays, lists, etc.)
 */

function renderChildNodes(props, from, to) {
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
        <ItemRange
          {...props}
          key={`ItemRange--${entry.from}-${entry.to}`}
          from={entry.from}
          to={entry.to}
          renderChildNodes={renderChildNodes}
        />
      );
    } else {
      const { key, value } = entry;
      const isCircular = circularCache.indexOf(value) !== -1;

      const node = (
        <JSONNode
          {...props}
          {...{ postprocessValue, collectionLimit }}
          key={`Node--${key}`}
          keyPath={[key, ...keyPath]}
          value={postprocessValue(value)}
          circularCache={[...circularCache, value]}
          initialExpanded={false}
          allExpanded={isCircular ? false : allExpanded}
          hideRoot={false}
        />
      );

      if (node !== false) {
        childNodes.push(node);
      }
    }
  });

  return childNodes;
}

export default class JSONNestedNode extends React.Component {
  static propTypes = {
    getItemString: PropTypes.func.isRequired,
    nodeTypeIndicator: PropTypes.any,
    nodeType: PropTypes.string.isRequired,
    data: PropTypes.any,
    hideRoot: PropTypes.bool.isRequired,
    createItemString: PropTypes.func.isRequired,
    styling: PropTypes.func.isRequired,
    collectionLimit: PropTypes.number,
    keyPath: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ).isRequired,
    labelRenderer: PropTypes.func.isRequired,
    shouldExpandNode: PropTypes.func,
    level: PropTypes.number.isRequired,
    initialExpanded: PropTypes.bool,
    allExpanded: PropTypes.bool
  };

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
    const shouldExpandNode = props.shouldExpandNode ?
        props.shouldExpandNode(props.keyPath, props.data, props.level) : false;
    this.state = {
      expanded: props.initialExpanded || props.allExpanded || shouldExpandNode,
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
    const renderedChildren = expanded ?
      renderChildNodes({ ...this.props, level: this.props.level + 1 }) : null;

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
    const stylingArgs = [nodeType, expanded, keyPath];

    return hideRoot ? (
      <ul>
        {renderedChildren}
      </ul>
    ) : (
      <li {...styling('nestedNode', ...stylingArgs)}>
        <JSONArrow
          styling={styling}
          nodeType={nodeType}
          expanded={expanded}
          onClick={this.handleClick}
        />
        <label
          {...styling(['label', 'nestedNodeLabel'], ...stylingArgs)}
          onClick={::this.handleClick}
        >
          {labelRenderer(...keyPath)}:
        </label>
        <span
          {...styling('nestedNodeItemString', ...stylingArgs)}
          onClick={this.handleClick}
        >
          {renderedItemString}
        </span>
        <ul {...styling('nestedNodeChildren', ...stylingArgs)}>
          {renderedChildren}
        </ul>
      </li>
    );
  }

  handleClick = () => this.setState({ expanded: !this.state.expanded });
}
