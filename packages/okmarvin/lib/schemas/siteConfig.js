module.exports = {
  properties: {
    title: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    author: {
      type: 'string'
    },
    url: {
      type: 'string',
      format: 'url'
    },
    toc: {
      type: 'boolean'
    },
    theme: {
      type: 'string'
    },
    rss: {
      type: 'boolean'
    },
    paginate: {
      type: 'number'
    },
    favicon: {
      type: 'string'
    },
    logo: {
      type: 'string'
    },
    github: {
      type: 'string'
    },
    twitter: {
      type: 'string'
    },
    google_analytics: {
      type: 'string'
    },
    menu: {
      items: {
        required: ['text', 'permalink'],
        properties: {
          text: {
            type: 'string'
          },
          permalink: {
            type: 'string'
          }
        }
      }
    }
  }
}
