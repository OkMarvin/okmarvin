const meow = require('meow')
const logger = require('@parcel/logger')
const createSite = require('./createSite')
const createArticle = require('./createArticle')
const createTheme = require('./createTheme')
const buildSite = require('./buildSite')
const inquirer = require('inquirer')
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
      const [, , dir] = cli.input
      if (!dir) {
        return inquirer
          .prompt([
            {
              type: 'input',
              name: 'dir',
              message: 'Please input your site name:'
            }
          ])
          .then(({ dir }) => {
            return createSite({ ...cli, input: [cmd, type, dir] })
          })
      }
      return createSite(cli)
    }
    if (type === 'post' || type === 'page' || type === 'draft') {
      const [, , title] = cli.input
      if (!title) {
        return inquirer
          .prompt([
            {
              type: 'input',
              name: 'title',
              message: `Please input your ${type} title:`
            }
          ])
          .then(({ title }) => {
            return createArticle({ ...cli, input: [cmd, type, title] })
          })
      }
      return createArticle(cli)
    }
    if (type === 'theme') {
      const [, , name] = cli.input
      if (!name) {
        return inquirer
          .prompt([
            {
              type: 'input',
              name: 'name',
              message: 'Please input your theme name:'
            }
          ])
          .then(answers => {
            return createTheme(answers['name'])
          })
      }
      return createTheme(name)
    }
    logger.error(`Type '${type}' is not supported`)
  }
  if (cmd === 'build') {
    buildSite(cli)
  }
}
