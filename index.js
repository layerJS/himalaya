let himalaya = require('./src/index');
let TagsHelper = require('../../helpers/htmltags');

himalaya.parseDefaults.isSelfClosing = function (tag) {
  return TagsHelper.isSelfClosing(tag) || TagsHelper.canBeSelfClosing(tag);
};

module.exports = himalaya;
