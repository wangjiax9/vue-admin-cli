'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://10.242.9.155:7300/mock/5b67f13f5d5f7e10b825d256/admin"'
  BASE_API: '"http://localhost:8888/admin"'
})
