const fs = require('fs-extra')
const path = require('path')
const logger = require('@parcel/logger')
const inquirer = require('inquirer')
const react = require('./react')
const html = require('./html')
const server = require('./server')
module.exports = async function (name, framework) {
  const target = path.join(process.cwd(), 'themes', name)

  if (fs.pathExistsSync(target)) {
    const { override } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'override',
        message: `${name} already exist, do you want to override it?`
      }
    ])
    if (!override) {
      return
    }
  }

  // clean target first
  fs.removeSync(target)

  // copy starter
  fs.copySync(
    path.join(__dirname, '..', '..', 'theme-starter', framework),
    target
  )

  const packageJson = path.join(target, 'package.json')
  switch (framework) {
    case 'react':
      fs.outputFileSync(packageJson, react(name))
      break

    default:
      break
  }

  // write index.html
  fs.outputFileSync(path.join(target, 'index.html'), html(name))

  // write server.js
  fs.outputFileSync(
    path.join(target, 'server.js'),
    server(path.relative(target, process.cwd()))
  )

  logger.success(`'themes/${name}' created successfully!`)
}
