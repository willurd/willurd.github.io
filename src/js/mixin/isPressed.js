var isPressedMixin = {
  getInitialState() {
    return {
      isPressed: false
    };
  },

  componentDidMount() {
    var el = this.getDOMNode();

    el.addEventListener('mousedown', this._isPressed_OnMouseDown, false);
    el.addEventListener('mouseup', this._isPressed_onMouseUp, false);
    el.addEventListener('mouseleave', this._isPressed_onMouseUp, false);
  },

  componentWillUnmount() {
    var el = this.getDOMNode();

    el.removeEventListener('mousedown', this._isPressed_OnMouseDown, false);
    el.removeEventListener('mouseup', this._isPressed_onMouseUp, false);
    el.removeEventListener('mouseleave', this._isPressed_onMouseUp, false);
  },

  _isPressed_OnMouseDown() {
    this.setState({ isPressed: true });
  },

  _isPressed_onMouseUp() {
    this.setState({ isPressed: false });
  }
};

module.exports = isPressedMixin;
