import Q from 'q';
import debug from 'core/debug';

class BootstrapService {
  run() {
    debug.init();

    return Promise.resolve();
  }
}

export default new BootstrapService();
