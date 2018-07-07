## Why another markdown-it table of contents plugin?

Most of the table of contents plugins for markdown-it out there wrap toc in `<p></p>`, i.e. they are inlined. When you have `ul` tag inside `p`, browsers would render it as:

```html
<p></p>
<ol></ol>
<p></p>
```
It's ugly.

In `@okmarvin/markdown-it-toc`, it will be wrapped in a `nav`:

```html
<nav class="toc">
<h2 class="toc__heading">Table of contents</h2>
<ol></ol>
</nav>
```

## Usage

```js
var md = require('markdown-it')({
  html: true,
  linkify: true,
  typography: true
}).use(require('@okmarvin/markdown-it-toc'))
md.render('{:toc}\n# heading one')
```
Remember to add placeholder `{:toc}` to where you want table of contents be inserted in your markdown file.

## Options

You can specify options too:

|Name|Description|Default|
|---|---|---|
|class|css class for table of contents' container|`toc`|
|hMin|minimum heading level toc will show|1|
|hMax|maximun heading level toc will show|6|
|enableHeadingIcon|add an icon to heading anchor|`false`|
|headingAnchorClass|class for heading anchor|`anchor`|
|headingAnchorPrefix|prefix for heading anchor|``|
|title|Heading|`Table of contents`|