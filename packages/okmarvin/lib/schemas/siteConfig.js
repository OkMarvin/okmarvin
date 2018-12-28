module.exports = {
  required: ['title', 'description', 'author', 'url'],
  properties: {
    lang: {
      type: 'string'
    },
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
    themeColor: {
      type: 'string'
    },
    rss: {
      type: 'boolean'
    },
    paginate: {
      type: 'number'
    },
    favicon: {
      pattern: '(.gif|.png|.ico)$'
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
    layoutHierarchy: {
      properties: {
        'index.js': {
          items: {
            type: 'string'
          },
          'post.js': {
            items: {
              type: 'string'
            }
          },
          'page.js': {
            items: {
              type: 'string'
            }
          },
          'tag.js': {
            items: {
              type: 'string'
            }
          },
          'category.js': {
            items: {
              type: 'string'
            }
          },
          '404.js': {
            items: {
              type: 'string'
            }
          }
        }
      }
    },
    menu: {
      items: {
        required: ['text', 'permalink'],
        properties: {
          text: {
            type: 'string'
          },
          permalink: {
            pattern: '^/[^./]*(.html|.htm|/)??$'
            /**
             * /hello-world
             * /hello-world/
             * /hello-world.htm
             * /hello-world.html
             */
          }
        }
      }
    }
  }
}
