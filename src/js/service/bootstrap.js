import Q from 'q';
import debug from 'core/debug';

class BootstrapService {
  run() {
    debug.init();

    // TODO: Load initial data here.
    return Promise.resolve();
  }
}

export default new BootstrapService();
