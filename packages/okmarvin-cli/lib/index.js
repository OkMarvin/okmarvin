const meow = require('meow')
const logger = require('@parcel/logger')
const createSite = require('./createSite')
const createArticle = require('./createArticle')
const buildSite = require('./buildSite')
module.exports = async function (args) {
  const cli = meow(
    `
  Usage
    $ okmarvin <cmd> <type> [<path>|<title>] [--option]

  Options
    --clean, Clean destination directory before building
    --source, Where okmarvin should find your files
    --destination, Where to put built site
    --log-level, Set log level
  
  Examples
    $ okmarvin new site <path>
    $ okmarvin new post <title>
    $ okmarvin new page <title>
    $ okmarvin new draft <title>
  `,
    {
      flags: {
        clean: {
          type: 'boolean',
          default: true
        },
        source: {
          type: 'string',
          default: 'content'
        },
        destination: {
          type: 'string',
          default: 'dist'
        },
        logLevel: {
          type: 'string',
          default: 3
        },
        benchmark: {
          type: 'string',
          default: false
        }
      }
    }
  )
  const [cmd, type] = cli.input
  if (!cmd) {
    cli.showHelp()
  }
  if (cmd !== 'new' && cmd !== 'build') {
    logger.error(`Command '${cmd}' is not supported`)
  }
  if (cmd === 'new') {
    if (type === 'site') {
      return createSite(cli)
    }
    if (type === 'post' || type === 'page' || type === 'draft') {
      return createArticle(cli)
    }
    logger.error(`Type '${type}' is not supported`)
  }
  if (cmd === 'build') {
    buildSite(cli)
  }
}
