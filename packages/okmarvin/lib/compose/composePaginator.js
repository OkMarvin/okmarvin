module.exports = function (fields, permalinkFormat, list, paginate, callback) {
  if (!paginate) {
    callback(null, [
      {
        ...fields,
        list
      }
    ])
  } else {
    if (list.length < paginate + 1) {
      return callback(null, [{ ...fields, list }])
    }
    const num = Math.ceil(list.length / paginate)
    let results = []
    for (let i = 0; i < num; i++) {
      let paginator = {
        current: i + 1,
        total: num,
        permalinkFormat
      }
      if (i === 0) {
        results = results.concat({
          ...fields,
          list: list.slice(i * paginate, i * paginate + paginate),
          paginator
        })
      } else {
        results = results.concat({
          ...fields,
          title: fields.title + ' - Page ' + (i + 1),
          list: list.slice(i * paginate, i * paginate + paginate),
          paginator,
          permalink: permalinkFormat.replace(/:num/, i + 1)
        })
      }
    }
    callback(null, results)
  }
}
