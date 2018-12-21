module.exports = {
  required: ['content', 'data', 'isEmpty'],
  properties: {
    content: {
      type: 'string'
    },
    isEmpty: {
      const: false
    },
    data: {
      required: ['title', 'date'],
      properties: {
        title: {
          type: 'string'
        },
        author: {
          type: 'string'
        },
        excerpt: {
          type: 'string'
        },
        date: {
          type: ['string', 'object']
        },
        dateModified: {
          type: ['string', 'object']
        },
        permalink: {
          pattern: '^/(?!static/)' // do not begin with preserved `/static/`
        },
        toc: {
          type: 'boolean'
        },
        tags: {
          items: {
            type: 'string'
          }
        }
      }
    }
  }
}
