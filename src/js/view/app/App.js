var React = require('react');
var config = require('core/config');
var titleMixin = require('mixin/title');
var { RouteHandler } = require('react-router');

var App = React.createClass({
  mixins: [
    titleMixin
  ],

  componentDidMount() {
    this.title('William Bowers');
  },

  render() {
    return (
      <div className='App'>
        <h1>William Bowers</h1>
        <RouteHandler />
      </div>
    );
  }
});

module.exports = App;
