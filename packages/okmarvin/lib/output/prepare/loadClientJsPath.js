module.exports = function (conn, callback) {
  const { clientJsManifest = {} } = conn
  if (clientJsManifest['client.js']) {
    callback(null, `/static/js/${clientJsManifest['client.js']}`)
  } else {
    callback(null, '')
  }
}
