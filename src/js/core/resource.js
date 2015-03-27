import path from 'path';

function resource(...parts) {
  return path.join('static', ...parts);
}

resource.img = (...parts) => {
  return resource('img', ...parts);
};

export default resource;
