import React from 'react';
import config from 'core/config';
import titleMixin from 'mixin/title';
import { RouteHandler } from 'react-router';
import Header from 'view/app/Header';
import Stripes from 'view/app/Stripes';

const AppContainer = React.createClass({
  render() {
    return (
      <div className='AppContainer'>
        <Stripes position='left' />
        <Stripes position='right' />
        <App />
      </div>
    );
  }
});

const App = React.createClass({
  mixins: [
    titleMixin
  ],

  componentDidMount() {
    this.title('William Bowers');
  },

  render() {
    return (
      <div className='App'>
        <Header />
        <RouteHandler />
      </div>
    );
  }
});

module.exports = AppContainer;
