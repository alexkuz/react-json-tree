import React, { Component } from 'react';
import JSONTree from 'react-json-tree';

export default class App extends Component {
  render() {
    const data = {
      array: [1, 2, 3],
      bool: true,
      object: {
        foo: 'bar'
      }
    };

    return (
      <JSONTree data={ data } />
    );
  }
}
