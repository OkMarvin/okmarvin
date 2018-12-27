const chunk = require('lodash/chunk')
module.exports = function (list, paginate, fields, permalinkFormat) {
  if (!paginate || (paginate && list.length < paginate + 1)) {
    return [
      {
        ...fields,
        list
      }
    ]
  }
  const arr = chunk(list, paginate)
  let result = []
  for (let i = 0; i < arr.length; i++) {
    let paginator = {
      current: i + 1,
      total: arr.length,
      permalinkFormat
    }
    if (i === 0) {
      result = result.concat({
        ...fields,
        list: arr[i],
        paginator
      })
    } else {
      result = result.concat({
        ...fields,
        title: `${fields.title} - Page ${i + 1}`,
        list: arr[i],
        paginator,
        permalink: permalinkFormat.replace(/:num/, i + 1)
      })
    }
  }
  return result
}
