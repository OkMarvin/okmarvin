module.exports = {
  required: [
    'root',
    'dest',
    'builtAt',
    'okmarvinConfig',
    'site',
    'files'
  ],
  properties: {
    root: {
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
    site: {
      properties: {}
    },
    files: { // should we seperate files here??? what about post, page
      items: {
        properties: {}
      }
    }
  }
}
