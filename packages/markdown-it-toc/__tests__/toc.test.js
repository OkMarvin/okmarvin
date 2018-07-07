const md = require('markdown-it')({
  html: true,
  linkify: true,
  typography: true
}).use(require('../index'), {
  hMax: 2
})
const md2 = require('markdown-it')({
  html: true,
  linkify: true,
  typography: true
}).use(require('../index'), {
  hMax: 2,
  title: ''
})

test('toc should be generated', () => {
  expect(md.render('{:toc}\n# 标题一')).toBe(
    `<nav class="toc" role="directory">
<h2 class="toc__heading">Table of contents</h2><ol>
<li><a href="#${encodeURI('标题一')}">标题一</a></li>
</ol>
</nav>
<h1><a id="标题一" name="标题一" class="anchor" href="#标题一"></a>标题一</h1>
`
  )
})
test('toc heading not added', () => {
  expect(md2.render('{:toc}\n# 标题')).toBe(
    `<nav class="toc" role="directory">
<ol>
<li><a href="#${encodeURI('标题')}">标题</a></li>
</ol>
</nav>
<h1><a id="标题" name="标题" class="anchor" href="#标题"></a>标题</h1>
`
  )
})
test('toc should be generated where {:toc} locates', () => {
  expect(md.render('# heading1\n{:toc}')).toBe(
    `<h1><a id="heading1" name="heading1" class="anchor" href="#heading1"></a>heading1</h1>
<nav class="toc" role="directory">
<h2 class="toc__heading">Table of contents</h2><ol>
<li><a href="#${encodeURI('heading1')}">heading1</a></li>
</ol>
</nav>
`
  )
})
test('heading 3 should be ignored when hMax set to 2', () => {
  expect(md.render(`{:toc}
# heading1_
## heading2_
### heading3_`)).toBe(
    `<nav class="toc" role="directory">
<h2 class="toc__heading">Table of contents</h2><ol>
<li><a href="#heading1_">heading1_</a>
<ol>
<li><a href="#heading2_">heading2_</a></li>
</ol>
</li>
</ol>
</nav>
<h1><a id="heading1_" name="heading1_" class="anchor" href="#heading1_"></a>heading1_</h1>
<h2><a id="heading2_" name="heading2_" class="anchor" href="#heading2_"></a>heading2_</h2>
<h3><a id="heading3_" name="heading3_" class="anchor" href="#heading3_"></a>heading3_</h3>
`
  )
})
describe('blank toc', () => {
  test('toc should be generated', () => {
    expect(md.render('{:toc}\nhello markdown')).toBe(
      `<nav class="toc" role="directory">
</nav>
<p>hello markdown</p>
`
    )
  })
})
