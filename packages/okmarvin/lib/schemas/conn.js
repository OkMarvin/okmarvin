module.exports = {
  required: ['okmarvinConfig', 'siteConfig', 'files'],
  properties: {
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
