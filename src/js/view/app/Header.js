import React from 'react';
import resource from 'core/resource';

var Photo = React.createClass({
  render() {
    return (
      <div className='Photo'>
        <img src={resource.img('me.jpg')} />
      </div>
    );
  }
});

var Header = React.createClass({
  render() {
    var whatami = [
      'Software Engineer',
      'Lifelong Learner',
      'Advocate for Users'
    ];

    return (
      <div className='Header'>
        <Photo />
        <h1>WILLIAM BOWERS</h1>
        <p>{whatami.join(' · ')}</p>
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
