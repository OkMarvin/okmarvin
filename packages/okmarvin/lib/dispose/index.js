'use strict'

const async = require('neo-async')

const compose = require('./compose')
const validation = require('./validation')

const findPostSiblings = require('./findPostSiblings')
const collectTaxonomy = require('./collectTaxonomy')
const findRelatedPostsByTags = require('./findRelatedPostsByTags')

module.exports = (conn, callback) => {
  async.waterfall(
    [
      async.constant(conn),
      collectTaxonomy,
      compose,
      validation,
      findPostSiblings,
      findRelatedPostsByTags
    ],
    callback
  )
}
