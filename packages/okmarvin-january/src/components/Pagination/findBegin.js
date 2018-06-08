module.exports = function (total, current, max = 10) {
  if (total > max) {
    return Math.min(
      total - max, Math.max(1, current - (max / 2))
    )
  } else {
    return 1
  }
}
