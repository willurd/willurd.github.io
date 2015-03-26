var request = require('superagent');
var { Logger } = require('lib/log');

var log = Logger.get('core/http');

var httpMethods = ['get', 'post'];
var dataTypes = ['text', 'json'];
var dataTypeConverters = {
  text: (text) => text,
  json: (text) => JSON.parse(text)
};

function promisedRequest(httpMethod, url, data, dataType) {
  return new Promise((resolve, reject) => {
    log.debug(`Making ${httpMethod} request to ${url}`);

    request[httpMethod](url, data, function(res) {
      if (res.ok) {
        resolve(dataTypeConverters[dataType](res.text));
      } else {
        reject(res.error);
      }
    });
  });
}

var http = {
  get(url, dataType) {
    return promisedRequest('get', url, {}, dataType);
  },

  post(url, data, dataType) {
    return promisedRequest('post', url, data, dataType);
  }
};

dataTypes.forEach(dataType => {
  httpMethods.forEach(httpMethod => {
    http[httpMethod][dataType] = (...args) => {
      return http[httpMethod](...args.concat([ dataType ]));
    };
  });
});

module.exports = http;
