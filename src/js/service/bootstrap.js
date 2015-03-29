import Q from 'q';
import debug from 'core/debug';
import { Parse } from 'parse';

class BootstrapService {
  run() {
    debug.init();
    Parse.initialize("EVYQ3z8RxbmAwigJXTpGXHu7bzeMY8DEJOJSxVYj", "iHa7fkaXNIWZAUvmjyDftPXpzJjSRsGTb5blnjcY");

    // TODO: Load initial data here.
    return Promise.resolve();
  }
}

export default new BootstrapService();
