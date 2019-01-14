'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  APIPATH: '"http://vue-course-api.herokuapp.com"',
  CUSTOMPATH: '"jacobhsu"',
})
