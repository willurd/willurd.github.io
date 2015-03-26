(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var Alt = require("alt");

module.exports = window.alt = new Alt();


},{"alt":"alt"}],2:[function(require,module,exports){
"use strict";

var React = require("react");
var router = require('./router.js');

var _require = require('./../lib/log.js');

var Logger = _require.Logger;

var bootstrapService = require('./../service/bootstrap.js');

var log = Logger.get("core/app");

bootstrapService.run().then(function () {
  router.run(function (Handler) {
    try {
      React.render(React.createElement(Handler, null), document.body);
    } catch (e) {
      log.error("Error performing initial render:", e.stack || e);
    }
  });
})["catch"](function (e) {
  log.error("Error bootstrapping application:", e.stack || e);
});


},{"./../lib/log.js":9,"./../service/bootstrap.js":11,"./router.js":5,"react":"react"}],3:[function(require,module,exports){
"use strict";

var config = {
  debug: {
    actions: true,
    globals: true,
    logging: true
  }
};

module.exports = config;


},{}],4:[function(require,module,exports){
"use strict";

var alt = require('./alt.js');
var config = require('./config.js');

var _require = require('./../lib/log.js');

var Logger = _require.Logger;

var actionLog = Logger.get("alt/action");
var actionLogMethod = actionLog.debug.bind(actionLog);

var debug = {
  init: function init() {
    this.setupActions();
    this.setupGlobals();
  },

  setupActions: function setupActions() {
    if (!config.debug.actions) {
      return;
    }

    alt.dispatcher.register(actionLogMethod);
  },

  setupGlobals: function setupGlobals() {
    if (config.debug.globals) {
      return;
    }

    Object.assign(window, {
      action: {},

      core: {
        alt: require('./alt.js'),
        config: require('./config.js'),
        router: require('./router.js'),
        title: require('./title.js'),
        types: require('./types.js')
      },

      lib: {
        http: require('./../lib/http.js')
      },

      model: {},

      service: {},

      store: {}
    });
  }
};

module.exports = debug;


},{"./../lib/http.js":8,"./../lib/log.js":9,"./alt.js":1,"./config.js":3,"./router.js":5,"./title.js":6,"./types.js":7}],5:[function(require,module,exports){
"use strict";

var React = require("react");
var Router = require("react-router");
var App = require('./../view/app/App.js');

var Route = Router.Route;

var router = Router.create({
  routes: React.createElement(Route, { handler: App, path: "/" })
});

module.exports = router;


},{"./../view/app/App.js":12,"react":"react","react-router":"react-router"}],6:[function(require,module,exports){
"use strict";

var stack = [];

function renderTitle() {
  document.title = stack.reverse().join(" | ");
}

var title = {
  push: function push(value) {
    stack.push(value);
    renderTitle();
  },

  swap: function swap(value) {
    stack[stack.length - 1] = value;
    renderTitle();
  },

  pop: function pop() {
    stack.pop();
  }
};

module.exports = title;


},{}],7:[function(require,module,exports){
"use strict";

var types = {};

module.exports = types;


},{}],8:[function(require,module,exports){
"use strict";

var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

var request = require("superagent");

var _require = require('./log.js');

var Logger = _require.Logger;

var log = Logger.get("core/http");

var httpMethods = ["get", "post"];
var dataTypes = ["text", "json"];
var dataTypeConverters = {
  text: function (text) {
    return text;
  },
  json: function (text) {
    return JSON.parse(text);
  }
};

function promisedRequest(httpMethod, url, data, dataType) {
  return new Promise(function (resolve, reject) {
    log.debug("Making " + httpMethod + " request to " + url);

    request[httpMethod](url, data, function (res) {
      if (res.ok) {
        resolve(dataTypeConverters[dataType](res.text));
      } else {
        reject(res.error);
      }
    });
  });
}

var http = {
  get: function get(url, dataType) {
    return promisedRequest("get", url, {}, dataType);
  },

  post: function post(url, data, dataType) {
    return promisedRequest("post", url, data, dataType);
  }
};

dataTypes.forEach(function (dataType) {
  httpMethods.forEach(function (httpMethod) {
    http[httpMethod][dataType] = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return http[httpMethod].apply(http, _toConsumableArray(args.concat([dataType])));
    };
  });
});

module.exports = http;


},{"./log.js":9,"superagent":"superagent"}],9:[function(require,module,exports){
"use strict";

var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var config = require('./../core/config.js');

var loggers = {};
var logFunctions = ["debug", "error", "info", "log", "warn"];

var Logger = (function () {
  function Logger(name) {
    var _this = this;

    _classCallCheck(this, Logger);

    this.name = name;

    logFunctions.forEach(function (fn) {
      return _this[fn] = _this.logger.bind(_this, fn);
    });
  }

  _createClass(Logger, {
    logger: {
      value: function logger(type) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        if (!config.debug.logging) {
          return;
        }

        console[type].apply(console, _toConsumableArray(["%c[" + this.name + "]", "color: #777"].concat(args)));
      }
    }
  }, {
    get: {
      value: function get(name) {
        if (!(name in loggers)) {
          loggers[name] = new Logger(name);
        }

        return loggers[name];
      }
    }
  });

  return Logger;
})();

var log = Logger.get("log");
log.Logger = Logger;

module.exports = log;


},{"./../core/config.js":3}],10:[function(require,module,exports){
"use strict";

var title = require('./../core/title.js');

var titleMixin = {
  title: (function (_title) {
    var _titleWrapper = function title(_x) {
      return _title.apply(this, arguments);
    };

    _titleWrapper.toString = function () {
      return _title.toString();
    };

    return _titleWrapper;
  })(function (value) {
    if (this.titleSet) {
      title.swap(value);
    } else {
      title.push(value);
    }

    this.titleSet = true;
  }),

  componentWillUnmount: function componentWillUnmount() {
    if (this.titleSet) {
      title.pop();
    }
  }
};

module.exports = titleMixin;


},{"./../core/title.js":6}],11:[function(require,module,exports){
"use strict";

var Q = require("q");
var debug = require('./../core/debug.js');

var bootstrapService = {
  run: function run() {
    debug.init();

    // TODO: Load initial data here.
    return Promise.resolve();
  }
};

module.exports = bootstrapService;


},{"./../core/debug.js":4,"q":"q"}],12:[function(require,module,exports){
"use strict";

var React = require("react");
var config = require('./../../core/config.js');
var titleMixin = require('./../../mixin/title.js');

var _require = require("react-router");

var RouteHandler = _require.RouteHandler;

var App = React.createClass({
  displayName: "App",

  mixins: [titleMixin],

  componentDidMount: function componentDidMount() {
    this.title("William Bowers");
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "App" },
      React.createElement(
        "h1",
        null,
        "William Bowers"
      ),
      React.createElement(RouteHandler, null)
    );
  }
});

module.exports = App;


},{"./../../core/config.js":3,"./../../mixin/title.js":10,"react":"react","react-router":"react-router"}]},{},[2]);
