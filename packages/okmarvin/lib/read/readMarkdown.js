const fs = require('fs')
const matter = require('gray-matter')
const ajv = require('../helpers/ajv')
const TOML = require('@iarna/toml')
module.exports = function (filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, fileContent) => {
      if (err) return reject(err)
      const file = matter(fileContent, {
        excerpt: true,
        excerpt_separator: '<!-- end -->', // might allow user configuration?
        engines: {
          toml: TOML.parse.bind(TOML) // allow user to user TOML in front matter with ---toml
        }
      })
      if (
        !ajv.validate(
          {
            required: ['content', 'data', 'isEmpty'],
            properties: {
              content: {
                type: 'string'
              },
              isEmpty: {
                const: false // front matter can't be empty
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
                    type: 'string'
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
          },
          file
        )
      ) {
        const [error] = ajv.errors
        return console.log(
          '🤖 : Oops! Something is wrong, ',
          filePath,
          error.message
        )
      }
      resolve([filePath, file])
    })
  })
}
