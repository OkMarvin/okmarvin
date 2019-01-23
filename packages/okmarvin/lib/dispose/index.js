/**
 * We'll use dispose in client side too
 * make sure it don't include any async/promise function
 * or it will break client/index.js
 */
'use strict'

const compose = require('./compose')
const validation = require('./validation')

const findPostSiblings = require('./findPostSiblings')
const collectTaxonomy = require('./collectTaxonomy')
const findRelatedPostsByTags = require('./findRelatedPostsByTags')

module.exports = conn => {
  conn = { ...collectTaxonomy(conn) }
  conn = { ...compose(conn) }
  conn = { ...validation(conn) }
  conn = { ...findPostSiblings(conn) }
  conn = { ...findRelatedPostsByTags(conn) }
  return conn
}
