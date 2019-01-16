'use strict'

const meow = require('meow')
const logger = require('@parcel/logger')
const inquirer = require('inquirer')

const createSite = require('./createSite')
const createArticle = require('./createArticle')
const createTheme = require('./createTheme')
const buildSite = require('./buildSite')
const serveSite = require('./serveSite')

module.exports = async function (args) {
  const cli = meow(
    `
  Usage
    $ okmarvin <cmd> <type> [<path>|<title>] [--option]

  Options
    --clean, Clean destination directory before building
    --source, Where okmarvin should find your files
    --dest, Where to put built site
    --log-level, Set log level
  
  Examples
    $ okmarvin new site <path>
    $ okmarvin new post <title>
    $ okmarvin new page <title>
    $ okmarvin new draft <title>
    $ okmarvin serve
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
        dest: {
          type: 'string',
          default: '_site'
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
  let [cmd, type] = cli.input
  if (!cmd) {
    cli.showHelp()
    process.exit(0)
  }

  switch (cmd) {
    case 'new':
      if (!type) {
        const { type: _type } = await inquirer.prompt([
          {
            type: 'list',
            name: 'type',
            message: 'Which one do you want to new?',
            choices: [
              {
                name: 'Site',
                value: 'site'
              },
              {
                name: 'Post',
                value: 'post'
              },
              {
                name: 'Page',
                value: 'page'
              },
              {
                name: 'Draft',
                value: 'draft'
              },
              {
                name: 'Theme',
                value: 'theme'
              }
            ]
          }
        ])
        type = _type
      }
      switch (type) {
        case 'site':
          let [, , dir] = cli.input
          if (!dir) {
            const { dir: _dir } = await inquirer.prompt([
              {
                type: 'input',
                name: 'dir',
                message: 'Please input your site name:'
              }
            ])
            dir = _dir
          }
          createSite({ ...cli, input: [cmd, type, dir] })
          break
        case 'post':
        case 'page':
        case 'draft':
          let [, , title] = cli.input
          if (!title) {
            const { title: _title } = await inquirer.prompt([
              {
                type: 'input',
                name: 'title',
                message: `Please input your ${type} title:`,
                default: `this is default ${type} title`
              }
            ])
            title = _title
          }
          createArticle({ ...cli, input: [cmd, type, title] })
          break
        case 'theme':
          let [, , name, framework] = cli.input
          if (!name) {
            const { name: _name } = await inquirer.prompt([
              {
                type: 'input',
                name: 'name',
                message: 'Please input your theme name:'
              }
            ])
            name = _name
          }
          if (!framework) {
            const { framework: _framework } = await inquirer.prompt([
              {
                type: 'list',
                name: 'framework',
                message: 'Which framework do you wan to use?',
                choices: [
                  {
                    name: 'React.js',
                    value: 'react'
                  },
                  {
                    name: 'Vue.js',
                    value: 'vue'
                  }
                ]
              }
            ])
            framework = _framework
          }
          return createTheme(name, framework)

        default:
          logger.error(`Type '${type}' is not supported`)
          process.exit(0)
      }
      break

    case 'build':
      buildSite(cli)
      break

    case 'serve':
      serveSite(cli)
      break

    default:
      logger.error(`Command '${cmd}' is not supported`)
      process.exit(0)
  }
}
