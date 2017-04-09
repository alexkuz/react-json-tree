import React, { Component } from 'react';
import CaymanTheme from './components/CaymanTheme';
import CodePreview from './components/CodePreview';
import JSONTree from 'react-json-tree';
import Immutable from 'immutable';
import pkg from 'react-json-tree/package.json';

import { literals, longString, nested, iterables } from './examples/values';
import { hiddenRoot, customRenderers } from './examples/customRender';
import { invertedTheme } from './examples/customStyling';

class App extends Component {
  render() {
    return (
      <CaymanTheme
        title={pkg.name}
        description={pkg.description}
        repoUrl={pkg.homepage}
        version={pkg.version}
      >
        <h2>Value types</h2>
        <h3>Literals and other non-nested values</h3>
        <CodePreview codeText={literals} scope={{ JSONTree }} />
        <h3>Long string wrapping</h3>
        <CodePreview codeText={longString} scope={{ JSONTree }} />
        <h3>Objects and arrays</h3>
        <CodePreview codeText={nested} scope={{ JSONTree }} />
        <h3>Iterable entities</h3>
        <CodePreview codeText={iterables} scope={{ JSONTree, Immutable }} />

        <h2>Render customization</h2>
        <h3>Hidden root</h3>
        <CodePreview codeText={hiddenRoot} scope={{ JSONTree, Immutable }} />
        <h3>Custom renderers</h3>
        <CodePreview
          codeText={customRenderers}
          scope={{ JSONTree, Immutable }}
        />

        <h2>Styling customization</h2>
        <h3>Inverted theme</h3>
        <CodePreview
          previewBackground="#1a191a"
          codeText={invertedTheme}
          scope={{ JSONTree, Immutable }}
        />
      </CaymanTheme>
    );
  }
}

export default App;
