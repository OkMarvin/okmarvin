const md = require('markdown-it')({
  html: true,
  linkify: true,
  typography: true
}).use(require('../index'))

test('heading should be rendered', () => {
  expect(md.render('# 标题一')).toBe(
    `<h1><a id="标题一" name="标题一" class="anchor" href="#标题一"></a>标题一</h1>\n`
  )
})

test('**strong** should be fixed with -', () => {
  expect(md.render('# 标题**一**')).toBe(
    `<h1><a id="标题-一" name="标题-一" class="anchor" href="#标题-一"></a>标题<strong>一</strong></h1>\n`
  )
})

test('space should be replaced with -', () => {
  expect(md.render('# heading one')).toBe(
    `<h1><a id="heading-one" name="heading-one" class="anchor" href="#heading-one"></a>heading one</h1>\n`
  )
})

test('headings should be rendered', () => {
  expect(md.render('# heading1\n## heading2')).toBe(
    `<h1><a id="heading1" name="heading1" class="anchor" href="#heading1"></a>heading1</h1>\n<h2><a id="heading2" name="heading2" class="anchor" href="#heading2"></a>heading2</h2>\n`
  )
})

test('< should be removed from id & href', () => {
  expect(md.render('# heading >')).toBe(
    `<h1><a id="heading" name="heading" class="anchor" href="#heading"></a>heading &gt;</h1>\n`
  )
})
