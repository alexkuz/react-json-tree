import React, { Component } from 'react';

export default class CaymanTheme extends Component {
  render() {
    const { title, description, repoUrl, version, children } = this.props;

    return (
      <div className="page">
        <section className="page-header-fixed">
          <div className="page-header-inner">
            <h1 className="project-name">{title}</h1>
            <span className="project-version">v{version}</span>
          </div>
        </section>
        <section className="page-header">
          <div className="page-header-inner">
            <div className="page-title">
              <h1 className="project-name">{title}</h1>
              <p className="project-tagline">{description}</p>
              <p className="project-version">Latest version: {version}</p>
            </div>
            <div className="btns">
              <a href={repoUrl} className="btn">View on GitHub</a>
              <a href={`${repoUrl}/archive/v${version}.zip`} className="btn">
                Download .zip
              </a>
              <a href={`${repoUrl}/archive/v${version}.tar.gz`} className="btn">
                Download .tar.gz
              </a>
            </div>
          </div>
        </section>

        <section className="main-content">
          {children}
        </section>
      </div>
    );
  }
}
