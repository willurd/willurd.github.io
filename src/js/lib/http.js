import request from 'superagent';
import { Logger } from 'lib/log';

const log = Logger.get('core/http');

const httpMethods = ['get', 'post'];
const dataTypes = ['text', 'json'];
const dataTypeConverters = {
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

const http = {
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

export default http;
