module.exports = function (promise) {
  return promise.then(data => [null, data]).catch(err => [err])
}
