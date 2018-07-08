const chalk = require('chalk')
const fs = require('fs-extra')
const path = require('path')
const { format } = require('date-fns')
const invariant = require('invariant')
module.exports = function (type = 'post', title) {
  invariant(title, chalk.red(`Please specify ${type} title`))
  const cwd = process.cwd()
  const target = path.join(cwd, 'content', type, title, 'index.md')
  invariant(
    !fs.pathExistsSync(target),
    chalk.red(
      `File ${target} existed`
    )
  )
  const data = `---
title: ${title}
date: ${format(new Date(), 'YYYY-MM-DD')}
---`
  fs.outputFile(
    target,
    data,
    err => {
      if (err) return console.error(err)
      console.log(
        chalk.green(
          `${target} created`
        )
      )
    }
  )
}
