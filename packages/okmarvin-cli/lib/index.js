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
  switch (cmd) {
    case 'new':
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
          break
      }
      break

    case 'build':
      buildSite(cli)
      break

    default:
      logger.error(`Command '${cmd}' is not supported`)
      break
  }
}
