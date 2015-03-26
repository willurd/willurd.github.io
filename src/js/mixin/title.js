var title = require('core/title');

var titleMixin = {
  title(value) {
    if (this.titleSet) {
      title.swap(value);
    } else {
      title.push(value);
    }

    this.titleSet = true;
  },

  componentWillUnmount() {
    if (this.titleSet) {
      title.pop();
    }
  }
};

export default titleMixin;
