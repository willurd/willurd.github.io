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
    return (
      <div className='Header'>
        <Photo />
        <h1>William Bowers</h1>
      </div>
    );
  }
});

export default Header;
