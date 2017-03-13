// @flow
import React from 'react';
import JSONArrow from './JSONArrow';

import type { NestedType, RenderChildNodes } from './types';
import type { StylingFunction } from 'react-base16-styling';

type Props = {
  styling: StylingFunction,
  from: number,
  to: number,
  renderChildNodes: RenderChildNodes,
  nodeType: NestedType
};

type State = {
  expanded: boolean
};

export default class ItemRange extends React.PureComponent<void, Props, State> {
  state = { expanded: false };

  render() {
    const { styling, from, to, renderChildNodes, nodeType } = this.props;

    return this.state.expanded
      ? <div {...styling(['itemRange', 'itemRangeColor'], this.state.expanded)}>
          {renderChildNodes(this.props, from, to)}
        </div>
      : <div
          {...styling(['itemRange', 'itemRangeColor'], this.state.expanded)}
          onClick={this.handleClick}
        >
          <JSONArrow
            nodeType={nodeType}
            styling={styling}
            expanded={false}
            onClick={this.handleClick}
            arrowStyle="double"
          />
          {`${from} ... ${to}`}
        </div>;
  }

  handleClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };
}
