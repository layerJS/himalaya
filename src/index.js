let { parser } = require('./parser');
let { lexer } = require('./lexer');
let { format } = require('./format');
let { toHTML } = require('./stringify');
let { voidTags, closingTags, childlessTags, closingTagAncestorBreakers } = require('./tags');

const parseDefaults = {
  voidTags,
  closingTags,
  childlessTags,
  closingTagAncestorBreakers,
  includePositions: false,
  isSelfClosing: (tag) => false
};

function parse(str, options = {}) {
  options = Object.assign({}, parseDefaults, options)
  const tokens = lexer(str, options)
  const nodes = parser(tokens, options)
  return format(nodes, options)
}

function stringify(ast, options = parseDefaults) {
  return toHTML(ast, options)
}

module.exports = {
  parse, stringify, parseDefaults
};
