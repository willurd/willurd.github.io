// @flow

import React, { Component } from 'react';
import cx from 'classnames';
import ExternalLink from '../lib/ExternalLink';
import './Job.css';

type Props = {
  className?: string,
  children: string,
  start: string,
  end: string,
  company?: string,
  companyHref?: string,
  logo?: string,
  title: string,
  layout: 'left' | 'right',
};

class Job extends Component<Props> {
  static defaultProps = {
    layout: 'left',
  };

  render() {
    const { className, children, start, end, company, companyHref, logo, title, layout } = this.props;
    const classes = cx('Job item', className, {
      left: layout === 'left',
      right: layout === 'right',
    });

    return (
      <div className={classes}>
        <div className={cx('details')}>
          {company && <h4 className="company"><Company name={company} href={companyHref} logo={logo} /></h4>}
          <h5 className="title">{title}</h5>
          <div className="timeframe">{start} — {end}</div>
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

const Company = ({ name, href, logo }) => {
  if (!href) {
    return name;
  }

  return (
    <ExternalLink href={href}>
      {logo ? <img className="logo" alt={name} src={logo} /> : name}
    </ExternalLink>
  );
};

export default Job;
