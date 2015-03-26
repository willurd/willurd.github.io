var React = require('react');
var config = require('core/config');
var titleMixin = require('mixins/title');
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
      <div class='App'>
        <Container>
          <h1>William Bowers</h1>
          <RouteHandler />
        </Container>
      </div>
    );
  }
});

module.exports = App;
