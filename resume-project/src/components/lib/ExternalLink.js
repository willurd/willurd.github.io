// @flow

import React, { Component } from 'react';

type Props = {
  href: string,
  label?: Node,
  children?: Node,
};

class About extends Component<Props> {
  render() {
    const { href, label, children } = this.props;

    return (
      <a target="_blank" rel="noopener noreferrer" href={href}>{label || children}</a>
    );
  }
}

export default About;
