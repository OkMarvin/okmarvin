const meow = require('meow')
const chalk = require('chalk')
const createSite = require('./createSite')
const createArticle = require('./createArticle')
const okmarvin = require('@okmarvin/okmarvin')
const buildSite = require('./buildSite')
const checkUpdate = require('./checkUpdate')
module.exports = async function (args) {
  const cli = meow(
    `
  Usage
    $ okmarvin <cmd> <type> [<path>|<title>]

  Options
    --clean Clean dist directory before building
  
  Examples
    $ okmarvin new site <path>
    $ okmarvin new post <title>
    $ okmarvin new page <title>
    $ okmarvin new draft <title>
    $ okmarvin new theme <path>
  `,
    {
      flags: {
        clean: {
          type: 'boolean'
        }
      }
    }
  )
  const [cmd, type, dir] = cli.input
  if (cmd !== 'new' && cmd !== 'build') {
    console.error(chalk.red(`'${cmd}' command not supported`))
    process.exit()
  }
  if (cmd === 'new') {
    if (type === 'site') {
      return createSite(dir, checkUpdate)
    }
    if (type === 'post' || type === 'page' || type === 'draft') {
      return createArticle(type, dir)
    }
  }
  if (cmd === 'build') {
    buildSite(cli, okmarvin)
  }
}
