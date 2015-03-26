var isHoveredMixin = {
  getInitialState() {
    return {
      isHovered: false
    };
  },

  componentDidMount() {
    var el = this.getDOMNode();

    el.addEventListener('mouseenter', this._isHovered_onMouseEnter, false);
    el.addEventListener('mouseleave', this._isHovered_onMouseLeave, false);
  },

  componentWillUnmount() {
    var el = this.getDOMNode();

    el.removeEventListener('mouseenter', this._isHovered_onMouseEnter, false);
    el.removeEventListener('mouseleave', this._isHovered_onMouseLeave, false);
  },

  _isHovered_onMouseEnter() {
    this.setState({ isHovered: true });
  },

  _isHovered_onMouseLeave() {
    this.setState({ isHovered: false });
  }
};

module.exports = isHoveredMixin;
