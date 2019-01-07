module.exports = {
  required: [
    'root',
    'source',
    'dest',
    'builtAt',
    'okmarvinConfig',
    'siteConfig',
    'files'
  ],
  properties: {
    root: {
      type: 'string'
    },
    source: {
      type: 'string'
    },
    dest: {
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
