import { EventEmitter } from 'events';

class Screen extends EventEmitter {
  constructor() {
    window.addEventListener('resize', () => {
      this.emit('resize', this.size());
    });
  }

  size() {
    return {
      height: this.height(),
      width: this.width()
    };
  }

  height() {
    return window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
  }

  width() {
    return window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
  }
}

export default new Screen();
