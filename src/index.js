// @flow

// ES6 + inline style port of JSONViewer https://bitbucket.org/davevedder/react-json-viewer/
// all credits and original code to the author
// Dave Vedder <veddermatic@gmail.com> http://www.eskimospy.com/
// port by Daniele Zannotti http://www.github.com/dzannotti <dzannotti@me.com>

import React from 'react';
import JSONNode from './JSONNode';
import createStylingFromTheme from './utils/createStylingFromTheme';

import { StylingFunction, Theme } from 'react-base16-styling';
import {
  ShouldExpandNode,
  KeyPath,
  PostprocessValue,
  IsCustomNode,
  RenderItemPreview,
  RenderLabel,
  RenderValue,
  Sorter
} from './types';

type DefaultProps = {
  shouldExpandNode: ShouldExpandNode,
  hideRoot: boolean,
  keyPath: KeyPath,
  postprocessValue: PostprocessValue,
  isCustomNode: IsCustomNode,
  collectionLimit: number,
  children?: {
    renderItemPreview?: RenderItemPreview,
    renderLabel?: RenderLabel,
    renderValue?: RenderValue
  }
};

type Props = DefaultProps & {
  data: Object | Array<any>,
  theme?: Theme,
  keyPath: KeyPath,
  postprocessValue: PostprocessValue,
  sortObjectKeys: Sorter | boolean
};

type State = {
  styling: StylingFunction
};

const identity = value => value;
const expandRootNode = (keyName, data, level) => level === 0;
const defaultRenderItemPreview = (type, data, itemType, itemString) => (
  <span>{itemType}{itemString ? ' · ' + itemString : ''}</span>
);
const defaultRenderLabel = ([label]) => <span>{label}:</span>;
const noCustomNode = () => false;

function getStateFromProps(props) {
  return {
    styling: createStylingFromTheme(props.theme)
  };
}

export default class JSONTree
  extends React.Component<DefaultProps, Props, State> {
  state: State;

  static defaultProps = {
    shouldExpandNode: expandRootNode,
    hideRoot: false,
    keyPath: ['root'],
    postprocessValue: identity,
    isCustomNode: noCustomNode,
    collectionLimit: 50,
    children: {}
  };

  constructor(props: Props) {
    super(props);
    this.state = getStateFromProps(props);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (['theme'].find(k => nextProps[k] !== this.props[k])) {
      this.setState(getStateFromProps(nextProps));
    }
  }

  shouldComponentUpdate(nextProps: Props) {
    return !!Object.keys(nextProps).find(
      k =>
        k === 'keyPath'
          ? nextProps[k].join('/') !== this.props[k].join('/')
          : nextProps[k] !== this.props[k]
    );
  }

  render() {
    const {
      data: value,
      keyPath,
      postprocessValue,
      hideRoot,
      children,
      isCustomNode,
      shouldExpandNode,
      sortObjectKeys
    } = this.props;

    const { styling } = this.state;

    return (
      <ul {...styling(['tree', 'treeColor'])}>
        <JSONNode
          {...{
            postprocessValue,
            hideRoot,
            styling,
            isCustomNode,
            shouldExpandNode,
            sortObjectKeys
          }}
          renderItemPreview={
            children.renderItemPreview || defaultRenderItemPreview
          }
          renderLabel={children.renderLabel || defaultRenderLabel}
          renderValue={children.renderValue || identity}
          keyPath={hideRoot ? [] : keyPath}
          value={postprocessValue(value)}
        />
      </ul>
    );
  }
}
