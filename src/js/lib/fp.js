const flattener = (acc, subList) => acc.concat(subList);

export function flatten(list) {
  return list.reduce(flattener, []);
}

export function flatMap(list, fn) {
  return flatten(list.map(fn));
}
