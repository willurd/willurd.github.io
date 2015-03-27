import React from 'react';
import screen from 'lib/screen';
import { flatMap } from 'lib/fp';

const themes = [
  [ '#F2A199', '#E43664', '#54A0A6', '#5D4C40' ],
  [ '#3F95A1', '#5FB0BB', '#E5001A', '#181F22', '#3C5C60' ],
  [ '#F90324', '#215DB0' ],
  [ '#F8A6AA', '#91C1B4', '#EFC236', '#E3373F', '#A5CD52', '#E05F0B', '#94D9D5', '#674026' ],
  // [ '#', '#', '#', '#', '#' ],
];

const Stripes = React.createClass({
  getDefaultProps() {
    return {
      theme: themes[0],
      colorHeight: 15,
      width: 15
    };
  },

  componentDidMount() {
    this.draw();
    screen.on('resize', this.draw);
  },

  componentWillUnmount() {
    screen.removeListener('resize', this.draw);
  },

  draw() {
    let { theme, colorHeight } = this.props;
    let c = this.refs.canvas.getDOMNode();
    let ctx = c.getContext('2d');
    let { width, height } = screen.size();

    ctx.clearRect(0, 0, c.width, c.height);
    c.height = height;

    // TODO: Randomize theme to find the best order of colors.

    let y = 0;
    let colors = flatMap(theme, color => [color, '#FFF']);

    for (let i = 0; y < height; i = (i + 1) % colors.length, y += colorHeight) {
      let color = colors[i];
      ctx.fillStyle = color;
      ctx.fillRect(0, y, c.width, colorHeight);
    }
  },

  render() {
    let { width } = this.props;
    let style = {};
    style[this.props.position] = 0;

    return (
      <canvas className='Stripes' ref='canvas' width={width} style={style}></canvas>
    );
  }
});

export default Stripes;
