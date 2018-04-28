// https://github.com/michael-ciniawsky/postcss-load-config

const replaceTagSelectorMap = require('postcss-mpvue-wxss/lib/wxmlTagMap')

const optopns = {
  cleanSelector: ['*'],
  remToRpx: 32,
  replaceTagSelector: Object.assign(replaceTagSelectorMap, {
    '*': 'view, text'
  })
}

module.exports = {
  "plugins": {
    "postcss-mpvue-wxss": optopns
  }
}
