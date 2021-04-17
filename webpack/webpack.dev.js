const { merge } = require('webpack-merge')
const common = require('./webpack.common')

console.log(merge)
module.exports = merge(common, {
  devtool: 'inline-source-map',
  mode: 'development'
})
