const meow = require('meow')
const fs = require('fs-extra')
const chalk = require('chalk')
const createSite = require('./createSite')
const createArticle = require('./createArticle')
const okmarvin = require('@okmarvin/okmarvin')
const path = require('path')
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
    if (type === 'post' || type === 'page') {
      return createArticle(type, dir)
    }
  }
  if (cmd === 'build') {
    process.env.NODE_ENV = 'production'
    const { clean } = cli.flags
    const cwd = process.cwd()
    if (clean) {
      // clean dist first
      fs.remove(path.join(cwd, 'dist'), err => {
        if (err) console.error(err)
        okmarvin()
      })
    } else {
      okmarvin()
    }
  }
}
