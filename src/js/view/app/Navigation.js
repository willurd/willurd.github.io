import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

const NavItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  render: function () {
    let { router } = this.context;
    let isActive = router.isActive(this.props.to, this.props.params, this.props.query);
    let classes = classNames({
      NavItem: true,
      active: isActive
    });
    let link = (
      <Link {...this.props}>{this.props.children}</Link>
    );
    return <li className={classes}>{link}</li>;
  }
});

const Navigation = React.createClass({
  getInitialState() {
    return {
      items: [
        { to: 'home', label: 'Home' },
        { to: 'resume', label: 'Resume' }
      ]
    };
  },

  render() {
    return (
      <ul className='Navigation'>
        {this.state.items.map(item =>
          <NavItem key={item.to} {...item}>{item.label}</NavItem>
        )}
      </ul>
    );
  }
});

export default Navigation;
