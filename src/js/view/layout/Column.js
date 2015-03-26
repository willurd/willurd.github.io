var React = require('react');

var Column = React.createClass({
  propTypes: {
    size: React.PropTypes.number.isRequired,
    style: React.PropTypes.object
  },

  render() {
    return (
      <div className={'col-md-' + this.props.size} style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Column;
