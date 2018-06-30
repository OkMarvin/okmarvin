const meow = require('meow')
const fs = require('fs-extra')
const chalk = require('chalk')
const site = require('./site')
const theme = require('./theme')
const okmarvin = require('@okmarvin/okmarvin')
const path = require('path')
const pkg = require('../package.json')
const checkForUpdate = require('update-check')
module.exports = async function (args) {
  const cli = meow(
    `
  Usage
    $ okmarvin <cmd> <type> <path>

  Options
    --clean Clean dist directory before building
  
  Examples
    $ okmarvin new site <path>
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
    if (!dir) {
      console.error(chalk.red('Please provide a path'))
      process.exit()
    }
    if (fs.pathExistsSync(dir)) {
      console.error(chalk.red(`'${dir}' path not empty, please try another`))
      process.exit()
    }
    if (type === 'site') {
      // check update
      let update = null

      try {
        update = await checkForUpdate(pkg)
      } catch (err) {
        console.error(`Failed to check for updates: ${err}`)
      }

      if (update) {
        console.log(`The latest version is ${update.latest}. Please update!`)
      }
      return site(dir)
    }
    if (type === 'theme') {
      return theme(dir)
    }
  }
  if (cmd === 'build') {
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
