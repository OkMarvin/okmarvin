const format = require('date-fns/format')
const ejs = require('ejs')
/**
 * Return HTML string
 * @param {string} templateStr ejs template string
 * @param {object} data data for ejs template
 */
module.exports = (templateStr, data) => {
  return ejs.render(templateStr, { data, format })
}
