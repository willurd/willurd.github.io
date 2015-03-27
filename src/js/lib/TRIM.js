import _ from 'lodash';

function TRIM(strings, ...args) {
  // Merge the strings and template arguments without modifying anything.
  var string = _.reduce(strings.slice(0, strings.length), (acc, string) => {
    return acc + string + (args.length ? args.shift() : '');
  }, '');

  // Get all but the first and last lines.
  var lines = _(string.split('\n'))
    .chain()
    .rest()
    .initial()
    .value();

  if (!lines.length) {
    return '';
  }

  // Find the base indentation, in case there are lines that have different levels
  // of indentaiton.
  var baseIndentationMatch = lines[0].match(/^\s*/);
  var baseIndentation = baseIndentationMatch ? baseIndentationMatch[0] : '';
  var baseIndentationRegex = new RegExp('^' + baseIndentation);

  return lines
    .map(line => line.replace(baseIndentationRegex, ''))
    .join('\n');
}

export default TRIM;
