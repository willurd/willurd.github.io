function storeListenerMixin() {
  let stores = Array.prototype.slice.call(arguments);

  return {
    getInitialState() {
      return this.getState();
    },

    componentDidMount() {
      stores.forEach((store) => store.listen(this._storeListener_onChange));
    },

    componentWillUnmount() {
      stores.forEach((store) => store.unlisten(this._storeListener_onChange));
    },

    _storeListener_onChange() {
      this.setState(this.getState());
    }
  };
}

export default storeListenerMixin;
