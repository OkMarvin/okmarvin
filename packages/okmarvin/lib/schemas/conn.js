module.exports = {
  required: [
    'root',
    'from',
    'to',
    'builtAt',
    'okmarvinConfig',
    'siteConfig',
    'files'
  ],
  properties: {
    root: {
      type: 'string'
    },
    from: {
      type: 'string'
    },
    to: {
      type: 'string'
    },
    builtAt: {
      type: 'integer'
    },
    okmarvinConfig: {
      properties: {}
    },
    siteConfig: {
      properties: {}
    },
    files: { // should we seperate files here??? what about post, page
      items: {
        properties: {}
      }
    }
  }
}
