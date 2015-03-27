import React from 'react';
import resource from 'core/resource';
import { interleave, times } from 'lib/fp';

var Photo = React.createClass({
  render() {
    return (
      <div className='Photo'>
        <img src={resource.img('me.jpg')} />
      </div>
    );
  }
});

var Whatami = React.createClass({
  getInitialState() {
    return {
      ima: [
        'Software Engineer',
        'Product builder',
        'Lifelong learner',
        'Advocate for users'
      ]
    };
  },

  render() {
    var things = this.state.ima.map(thing => <span key={thing} className='thing'>{thing}</span>);
    var spacers = times(things.length - 1, i => <span key={i} className='spacer'>&middot;</span>);
    var children = interleave(things, spacers);

    return (
      <div className='Whatami'>
        {children}
      </div>
    );
  }
});

var Header = React.createClass({
  render() {
    return (
      <div className='Header'>
        <Photo />
        <h1>WILLIAM BOWERS</h1>
        <Whatami />
        <p className='email'>
          <em>william.bowers</em>
          <span> [at] </span>
          <em>gmail</em>
          <span> [dot] </span>
          <em>com</em>
        </p>
      </div>
    );
  }
});

export default Header;
