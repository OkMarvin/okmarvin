export default function (totalPages, currentPage, credit = 5) {
  // FIXME might need a better algorithm
  if (totalPages < 6) {
    return [...Array(totalPages).keys()].map(k => k + 1)
  }
  let result = [1, totalPages] // always keep the first, last
  credit = credit - 2
  if (currentPage !== 1 && currentPage !== totalPages) {
    result = result.concat(currentPage)
    credit = credit - 1
  } else {}
  for (let i = 1, len = credit; i <= len; i++) {
    if (credit === 0) break
    if (currentPage - i > 1) {
      result = result.concat(currentPage - i)
      credit = credit - 1
    }
    if (currentPage + i < totalPages) {
      result = result.concat(currentPage + i)
      credit = credit - 1
    }
  }
  // find where to insert ...
  result = result.sort((a, b) => a - b).map((v, idx) => {
    if (result[idx + 1] && result[idx + 1] - v > 1) {
      return [v, '...']
    }
    return v
  })
  return result.reduce((acc, v) => acc.concat(v), [])
}
