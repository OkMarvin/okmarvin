'use strict'

const finalhandler = require('finalhandler')
const http = require('http')
const serveStatic = require('serve-static')
const getPort = require('get-port')
const path = require('path')

module.exports = function (cli) {
  const { dest } = cli.flags
  var serve = serveStatic(path.join(process.cwd(), dest), {
    index: ['index.html', 'index.htm']
  })

  // Create server
  var server = http.createServer(function onRequest (req, res) {
    serve(req, res, finalhandler(req, res))
  })
  getPort({ port: 3000 }).then(port => {
    server.listen(port).on('listening', () => {
      console.log(`Server running on http://localhost:${port}`)
    })
  })
}
