module.exports = require('babel-jest').createTransformer({
  presets: [['es2015', { loose: true }], 'stage-2', 'react'],
})
