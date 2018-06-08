// we have some old javascript in this file
var MinScreen = 4
// get the elment
var backToTop = document.getElementById('backToTop')
// bind click handler
backToTop && backToTop.addEventListener('click', function () {
  window.scrollTo(0, 0)
})
// get height of viewport
var vh = Math.max(
  document.documentElement.clientHeight,
  window.innerHeight || 0
)
function requestTick (direction) {
  if (!ticking) {
    window.requestAnimationFrame(function () {
      ticking = false
      if (direction === 'up' && window.scrollY > vh * 1.5) {
        // show backToTop button
        if (backToTop.className.indexOf('d-flex') === -1) {
          window.requestAnimationFrame(() => backToTop.classList.add('d-flex'))
        }
      } else {
        if (backToTop.className.indexOf('d-flex') !== -1) {
          window.requestAnimationFrame(() => backToTop.classList.remove('d-flex'))
        }
      }
    })
  }
  ticking = true
}
var latestScrollPosition = 0
var ticking = false
window.addEventListener('scroll', function () {
  // document shorter than 4 screens
  // just return
  if (Math.floor(document.body.scrollHeight / vh) < MinScreen) return
  // ah, longer than 4 screens
  const direction = window.scrollY > latestScrollPosition ? 'down' : 'up'
  requestTick(direction)
  latestScrollPosition = window.scrollY
})
