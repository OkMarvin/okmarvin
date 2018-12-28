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
    files: {
      items: {
        properties: {}
      }
    }
  }
}
