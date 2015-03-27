import _ from 'lodash';

function TRIM(strings, ...args) {
  // Merge the strings and template arguments without modifying anything.
  let string = _.reduce(strings.slice(0, strings.length), (acc, string) => {
    return acc + string + (args.length ? args.shift() : '');
  }, '');

  // Get all but the first and last lines.
  let lines = _(string.split('\n'))
    .chain()
    .rest()
    .initial()
    .value();

  if (!lines.length) {
    return '';
  }

  // Find the base indentation, in case there are lines that have different levels
  // of indentaiton.
  let baseIndentationMatch = lines[0].match(/^\s*/);
  let baseIndentation = baseIndentationMatch ? baseIndentationMatch[0] : '';
  let baseIndentationRegex = new RegExp('^' + baseIndentation);

  return lines
    .map(line => line.replace(baseIndentationRegex, ''))
    .join('\n');
}

export default TRIM;
