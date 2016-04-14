import React from 'react';

export default class JSONArrow extends React.Component {
  render() {
    const { styling, double, open } = this.props;

    return (
      <div {...styling('arrowContainer', double)}
           onClick={this.props.onClick}>
        <div {...styling(['arrow', 'arrowSign'], open)}>
          {this.props.double &&
            <div {...styling(['arrowSign', 'arrowSignInner'])} />
          }
        </div>
      </div>
    );
  }
}
