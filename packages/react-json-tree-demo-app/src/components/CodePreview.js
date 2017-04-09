import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Playground from 'component-playground';

import './cayman-code-theme.css';

class PurePlayground extends PureComponent {
  render() {
    return (
      <Playground
        codeText={this.props.codeText}
        scope={{ React, ReactDOM, ...this.props.scope }}
        noRender={false}
        theme="cayman"
      />
    );
  }
}

export default class CodePreview extends PureComponent {
  state = {
    tab: 'code'
  };

  componentDidMount() {
    this.setState(s => ({ ...s, tab: 'preview' }));
  }

  render() {
    const { scope, codeText, previewBackground } = this.props;
    const { tab } = this.state;

    return (
      <CodePreviewStyled tab={tab} previewBackground={previewBackground}>
        <TabSwitch tab={tab}>
          <Tab
            selected={tab === 'preview'}
            onClick={() => this.setState(s => ({ ...s, tab: 'preview' }))}
          >
            preview
          </Tab>
          <Tab
            selected={tab === 'code'}
            onClick={() => this.setState(s => ({ ...s, tab: 'code' }))}
          >
            code
          </Tab>
        </TabSwitch>
        <PurePlayground codeText={codeText} scope={scope} />
      </CodePreviewStyled>
    );
  }
}

const CodePreviewStyled = styled.div`
  & .playground {
    margin: 10px auto;
    border: 1px solid #e9ebec;
    border-radius: 2px;
  }

  & .playgroundStage {
    height: 100%;
  }

  .playgroundError {
    padding: 10px;
    font-size: 14px;
    color: white;
    background: #f3484c;
    white-space: pre-wrap;
    font-family: inconsolata, monospace;
  }

  & .playgroundCode {
    display: ${p => p.tab === 'code' ? 'block' : 'none'};
    overflow: auto;

    & .CodeMirror {
      padding: 10px 15px;
      height: 100%;
      font-size: 16px;
    }
  }

  & .playgroundPreview {
    display: ${p => p.tab === 'preview' ? 'block' : 'none'};
    background: ${p => p.previewBackground || 'inherit'};
    overflow: auto;
    font-size: 16px;
  }

  & .previewArea {
    padding: 15px;
  }

  & .previewArea:empty {
    padding: 0;
  }
`;

const TabSwitch = styled.div`
  display: flex;
  font-size: 14px;
`;

const Tab = styled.div`
  margin-right: 10px;
  cursor: pointer;
  color: #1e6bb8;
  border-bottom: 1px dashed #1e6bb8;
  opacity: ${p => p.selected ? 0.8 : 0.5};
  transition: opacity 0.2s ease-out;
  &:hover {
    opacity: 1;
  }
`;
