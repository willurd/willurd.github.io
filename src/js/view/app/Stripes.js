import React from 'react';
import screen from 'lib/screen';

var Stripes = React.createClass({
  componentDidMount() {
    this.draw();
    screen.on('resize', this.draw);
  },

  componentWillUnmount() {
    screen.removeListener('resize', this.draw);
  },

  draw() {
    var c = this.refs.canvas.getDOMNode();
    var ctx = c.getContext('2d');
    var { width, height } = screen.size();

    c.height = height;

  },

  render() {
    var style = {};
    style[this.props.position] = 0;

    return (
      <canvas className='Stripes' ref='canvas' width={100} style={style}></canvas>
    );
  }
});

export default Stripes;
