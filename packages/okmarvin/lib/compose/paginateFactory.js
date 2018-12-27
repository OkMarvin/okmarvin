const chunk = require('lodash/chunk')
module.exports = function (data, paginate, fields, permalinkFormat) {
  if (!paginate || (paginate && data.length < paginate + 1)) {
    return [
      {
        ...fields,
        data
      }
    ]
  }
  const arr = chunk(data, paginate)
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
        data: arr[i],
        paginator
      })
    } else {
      result = result.concat({
        ...fields,
        title: `${fields.title} - Page ${i + 1}`,
        data: arr[i],
        paginator,
        permalink: permalinkFormat.replace(/:num/, i + 1)
      })
    }
  }
  return result
}
