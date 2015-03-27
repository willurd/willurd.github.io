import { compact } from 'lib/fp';

class Title {
  constructor() {
    this.values = [];
  }

  set(index, value) {
    this.values[index] = value;
    this.renderTitle();
  }

  title() {
    return compact(this.values).join(' | ');
  }

  renderTitle() {
    document.title = this.title();
  }
};

export default new Title();
