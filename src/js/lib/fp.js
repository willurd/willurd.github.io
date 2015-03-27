const flattener = (acc, subList) => acc.concat(subList);

export function identity(value) {
  return value;
}

export function flatten(list) {
  return list.reduce(flattener, []);
}

export function flatMap(list, fn) {
  return flatten(list.map(fn));
}

export function range(count) {

}

export function times(count, fn) {
  var result = [];

  for (var i = 0; i < count; i++) {
    result.push(fn(i));
  }

  return result;
}

export function interleave(...lists) {
  let first = lists[0];
  return times(first.length, identity).reduce((acc, index) => {
    lists.forEach(list => list[index] !== undefined && acc.push(list[index]));
    return acc;
  }, []);
}
