'use strict'
let data = Object.create(null)
function getType (obj) {
  return Object.prototype.toString.call(obj).slice(8, -1)
}
const ConfigStore = {
  get: (key) => {
    if (typeof key !== 'undefined') {
      return data[key]
    }
    return data
  },
  add: function (obj, value) {
    const type = getType(obj)
    if (type === 'String') {
      if (obj && typeof value !== 'undefined') {
        data = { ...data, [obj]: value }
      }
    }
    if (type === 'Object') {
      Object.keys(obj).forEach(k => {
        data = { ...data, [k]: obj[k] }
      })
    }
  },
  clear: () => {
    data = Object.create(null)
  }
}
Object.freeze(ConfigStore)
module.exports = ConfigStore
