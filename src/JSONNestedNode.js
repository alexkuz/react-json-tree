// @flow
import React from 'react';
import JSONArrow from './JSONArrow';
import getCollectionEntries from './utils/getCollectionEntries';
import JSONNode from './JSONNode';
import ItemRange from './ItemRange';
import createItemPreviewText from './utils/createItemPreviewText';
import createItemTypeText from './utils/createItemTypeText';
import isExpandable from './utils/isExpandable';

/**
 * Renders nested values (eg. objects, arrays, lists, etc.)
 */

import type {
  NestedType,
  RenderItemPreview,
  RenderLabel,
  Sorter,
  KeyPath,
  ShouldExpandNode,
  IsCustomNode,
  RenderValue,
  PostprocessValue
} from './types';
import type { StylingFunction } from 'react-base16-styling';

type DefaultProps = {
  circularCache: mixed[],
  level: number,
  collectionLimit: number
};

type Props = DefaultProps & {
  value: any,
  renderItemPreview: RenderItemPreview,
  nodeType: NestedType,
  hideRoot: boolean,
  styling: StylingFunction,
  collectionLimit: number,
  keyPath: KeyPath,
  renderLabel: RenderLabel,
  shouldExpandNode: ?ShouldExpandNode,
  sortObjectKeys: Sorter<string> | boolean,
  isCircular?: boolean,
  isCustomNode: IsCustomNode,
  renderValue: RenderValue,
  shouldExpandNode: ShouldExpandNode,
  postprocessValue: PostprocessValue
};

type State = {
  expanded: boolean
};

function renderChildNodes(props, from, to) {
  const {
    nodeType,
    value,
    collectionLimit,
    circularCache,
    keyPath,
    postprocessValue,
    sortObjectKeys,
    styling,
    isCustomNode,
    renderItemPreview,
    renderLabel,
    renderValue,
    shouldExpandNode
  } = props;
  const childNodes = [];

  const collectionEntries = getCollectionEntries(
    nodeType,
    value,
    sortObjectKeys,
    collectionLimit,
    from,
    to
  );

  collectionEntries.forEach(entry => {
    if (entry.isRange) {
      childNodes.push(
        <ItemRange
          styling={styling}
          nodeType={nodeType}
          key={`ItemRange--${entry.from}-${entry.to}`}
          from={entry.from}
          to={entry.to}
          renderChildNodes={(from, to) => renderChildNodes(props, from, to)}
        />
      );
    } else {
      const { key, value } = entry;
      const isCircular = circularCache.indexOf(value) !== -1;

      const node = (
        <JSONNode
          styling={styling}
          {...{
            postprocessValue,
            collectionLimit,
            isCustomNode,
            renderItemPreview,
            renderLabel,
            isCircular,
            renderValue,
            shouldExpandNode,
            sortObjectKeys
          }}
          key={`Node--${key}`}
          keyPath={[key, ...keyPath]}
          value={postprocessValue(value)}
          circularCache={[...circularCache, value]}
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

function getStateFromProps(props) {
  // calculate individual node expansion if necessary
  const expanded = props.shouldExpandNode && !props.isCircular
    ? props.shouldExpandNode(props.keyPath, props.value, props.level)
    : false;
  return {
    expanded
  };
}

export default class JSONNestedNode
  extends React.Component<DefaultProps, Props, State> {
  state: State;

  static defaultProps = {
    circularCache: [],
    level: 0,
    collectionLimit: 0
  };

  constructor(props: Props) {
    super(props);
    this.state = getStateFromProps(props);
  }

  componentWillReceiveProps(nextProps: Props) {
    const nextState = getStateFromProps(nextProps);
    if (getStateFromProps(this.props).expanded !== nextState.expanded) {
      this.setState(nextState);
    }
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return !!Object.keys(nextProps).find(
      key =>
        key !== 'circularCache' &&
        (key === 'keyPath'
          ? nextProps[key].join('/') !== this.props[key].join('/')
          : nextProps[key] !== this.props[key])
    ) || nextState.expanded !== this.state.expanded;
  }

  render() {
    const {
      renderItemPreview,
      nodeType,
      value,
      hideRoot,
      styling,
      collectionLimit,
      keyPath,
      renderLabel,
      level
    } = this.props;
    const { expanded } = this.state;
    const renderedChildren = expanded || (hideRoot && level === 0)
      ? renderChildNodes({ ...this.props, level: level + 1 })
      : null;

    const itemTypeText = createItemTypeText(nodeType);
    const itemPreviewText = createItemPreviewText(
      nodeType,
      value,
      collectionLimit
    );
    const renderedItemPreview = renderItemPreview(
      nodeType,
      value,
      itemTypeText,
      itemPreviewText
    );
    const expandable = isExpandable(nodeType, value);
    const stylingArgs = [keyPath, nodeType, expanded, expandable];

    return hideRoot
      ? <li {...styling(['rootNode', 'rootNodeColor'], ...stylingArgs)}>
          <ul
            {...styling(
              ['rootNodeChildren', 'rootNodeChildrenColor'],
              ...stylingArgs
            )}
          >
            {renderedChildren}
          </ul>
        </li>
      : <li {...styling(['nestedNode', 'nestedNodeColor'], ...stylingArgs)}>
          {expandable &&
            <JSONArrow
              arrowStyle="single"
              styling={styling}
              nodeType={nodeType}
              expanded={expanded}
              onClick={this.handleClick}
            />}
          <label
            {...styling(
              [
                'label',
                'labelColor',
                'nestedNodeLabel',
                'nestedNodeLabelColor'
              ],
              ...stylingArgs
            )}
            onClick={expandable && this.handleClick}
          >
            {renderLabel(...stylingArgs)}
          </label>
          <span
            {...styling(
              ['nestedNodeItemPreview', 'nestedNodeItemPreviewColor'],
              ...stylingArgs
            )}
            onClick={expandable && this.handleClick}
          >
            {renderedItemPreview}
          </span>
          <ul
            {...styling(
              ['nestedNodeChildren', 'nestedNodeChildrenColor'],
              ...stylingArgs
            )}
          >
            {renderedChildren}
          </ul>
        </li>;
  }

  handleClick = () => this.setState({ expanded: !this.state.expanded });
}
