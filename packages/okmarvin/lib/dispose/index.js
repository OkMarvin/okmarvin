'use strict'

const compose = require('./compose')
const validation = require('./validation')

const findPostSiblings = require('./findPostSiblings')
const collectTaxonomy = require('./collectTaxonomy')
const findRelatedPostsByTags = require('./findRelatedPostsByTags')

module.exports = conn => {
  conn = { ...collectTaxonomy(conn) }
  conn = { ...findPostSiblings(conn) }
  conn = { ...findRelatedPostsByTags(conn) }
  conn = { ...compose(conn) }
  conn = { ...validation(conn) }

  return conn
}
