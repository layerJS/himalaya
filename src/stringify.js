let { arrayIncludes } = require('./compat');

function formatAttributes (attributes) {
  return attributes.reduce((attrs, attribute) => {
    const {key, value} = attribute
    if (value === null) {
      return `${attrs} ${key}`
    }
    const quoteEscape = value.indexOf('\'') !== -1
    const quote = quoteEscape ? '"' : '\''
    return `${attrs} ${key}=${quote}${value}${quote}`
  }, '')
}

function toHTML (tree, options) {
  return tree.map(node => {
    if (node.type === 'text') {
      return node.content
    }
    if (node.type === 'comment') {
      return `<!--${node.content}-->`
    }
    const { tagName, attributes, children } = node
    const safeTag = tagName.toLowerCase();
    const isSelfClosing = arrayIncludes(options.voidTags, safeTag) || options.isSelfClosing(safeTag)
    return isSelfClosing
      ? `<${tagName}${formatAttributes(attributes)}>`
      : `<${tagName}${formatAttributes(attributes)}>${toHTML(children, options)}</${tagName}>`
  }).join('')
}

module.exports = {
  formatAttributes, toHTML
};
