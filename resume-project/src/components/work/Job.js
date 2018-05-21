// @flow

import React, { Component } from 'react';
import cx from 'classnames';
import ExternalLink from '../lib/ExternalLink';

type Props = {
  className?: string,
  children: string,
  start: string,
  end: string,
  company?: string,
  companyHref?: string,
  title: string,
  layout: 'left' | 'right',
};

class Job extends Component<Props> {
  static defaultProps = {
    layout: 'left',
  };

  render() {
    const { className, children, start, end, company, companyHref, title, layout } = this.props;

    return (
      <div className={cx('item', className)}>
        <div className={cx('details', { layout })}>
          <h4 className="title">{title}<Company name={company} href={companyHref} /></h4>
        </div>

        {children && (
          <div className="description">
            {children}
          </div>
        )}
      </div>
    );
  }
}

const Company = ({ name, href }) => {
  if (name) {
    return <span> at {href ? <ExternalLink href={href} label={name} /> : name}</span>;
  }

  return null;
};

export default Job;
