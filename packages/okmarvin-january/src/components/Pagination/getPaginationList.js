export default function (totalPages, currentPage, credit = 5) {
  if (totalPages <= credit) {
    return [...Array(totalPages).keys()].map(k => k + 1)
  }
  let result = [1, totalPages] // always show the first, last
  credit = credit - 2
  if (currentPage !== 1 && currentPage !== totalPages) {
    result = result.concat(currentPage)
    credit = credit - 1
  } else {}
  let i = 1
  let count = 0
  while (credit > 0) {
    if (count % 2 === 0) {
      // left
      if (currentPage - i > 1) {
        result = result.concat(currentPage - i)
        credit--
      }
    } else {
      // right
      if (currentPage + i < totalPages) {
        result = result.concat(currentPage + i)
        credit--
      }
    }
    count++
    if (count % 2 === 0) {
      i++
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
