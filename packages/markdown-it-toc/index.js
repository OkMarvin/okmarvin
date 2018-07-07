// As far as I can see, it's not easy to write a markdown-it plugin.
// so this project will have a lot of comments.
'use strict'
const innertext = require('innertext')
const GithubSlugger = require('github-slugger')
const slugger = new GithubSlugger()
const slugger2 = new GithubSlugger()
const clone = require('clone')
module.exports = function (md, options) {
  // we clone a clean md for later use
  let md2 = clone(md)
  // let's begin with a default options
  // users should override most of the options to avoid conflict
  options = Object.assign({}, {
    class: 'toc', // default class name for the table of contents block
    hMin: 1, // min heading number, i.e. h1
    hMax: 6, // max heading number, i.e. h6
    enableHeadingIcon: false, // render icon inside heading links
    headingAnchorClass: 'anchor', // anchor will have a class for styling
    // https://github.com/jch/html-pipeline/issues/135#issuecomment-54322489
    // check the link above, it's a complicated case since we would use ids here.
    headingAnchorPrefix: '', // ids could conflict with other elements
    title: 'Table of contents'
  }, options)
  // svg icon
  var icon = '<svg' + ' height="16" version="1.1" viewbox="0 0 16 16" width="16"><path d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'
  // we'll need the state object later, let's grab one
  var gstate
  // grab the state
  // there're many core rules, they are executed one by one
  // normalize, block, inline, linkify, replacements, smartquotes
  // we just push a new rule into the chain to grab what they output
  // check the source code below:
  // https://github.com/markdown-it/markdown-it/tree/master/lib/rules_core
  md.core.ruler.push('grab_state', function (state) {
    // this is what we have in state object
    // https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/state_core.js
    gstate = state
  })
  // two things to do
  // 1. add anchor to headings
  // 2. compose toc markdown from headings then render to html with md helper
  // now handle the heading_open
  // it's a complex case, check
  // https://github.com/markdown-it/markdown-it/issues/28
  md.renderer.rules.heading_open = function (tokens, idx, opts, env, renderer) {
    // after markdown parsed into tokens, renderer will render them into html
    // rules under renderer define how to render them
    // for example, if we just return <h2> here,
    // then all headings will get a <h2> opening tag.
    // of course it's wrong
    // we can get those heading_open tokens with tokens[idx]
    // but it's just open tag, so there's no content
    // we need the next one, i.e., heading body
    // wait, what if the next one is not heading body? any chance?
    // I don't know
    var token = tokens[idx + 1]
    // the type is inline with attributes like `children`, `content`
    // we'll try the children, they are parsed into tokens too
    // content are still in markdown
    // we only want to handle headings with children
    if (token.children.length) {
      let rendered = md2.renderer.renderInline(token.children, options, env)
      // we need to strip html tag
      let anchor = slugger.slug(
        innertext(rendered)
          .replace(/[<>]/g, '') // remove < >
          .toLocaleLowerCase()
      )
      // new Token(type, tag, nesting),
      // and set the attr
      let linkOpen = new gstate.Token('link_open', 'a', 1)
      linkOpen.attrSet('id', options.headingAnchorPrefix + anchor)
      linkOpen.attrSet('name', options.headingAnchorPrefix + anchor)
      linkOpen.attrSet('class', options.headingAnchorClass)
      linkOpen.attrSet('href', '#' + options.headingAnchorPrefix + anchor)
      let linkText = new gstate.Token('html_inline', '', 0)
      if (options.enableHeadingIcon) {
        linkText.content = icon
      }
      let linkClose = new gstate.Token('link_close', 'a', -1)
      token.children = [linkOpen, linkText, linkClose].concat(token.children)
    }
    // we make use of what md already has
    return md2.renderer.renderToken(tokens, idx, options, env, renderer)
  }
  // great, we transformed headings already
  // now, how to add toc?
  // first, we need a toc mark, like # for heading 1, ** for strong
  // and we need to tell markdown-it to parse it as block
  md.block.ruler.before('reference', 'toc', toc, { alt: [] })
  function toc (state, startLine, endLine, silent) {
    var token
    // https://github.com/markdown-it/markdown-it/blob/master/lib/rules_block/state_block.js
    // this could be tough job
    // bMarks:
    // line begin offsets
    // tShift:
    // offsets of the first non-space characters (tabs not expanded)
    var start = state.bMarks[startLine] + state.tShift[startLine]
    var mark = state.eMarks[startLine]

    // line should be at least 5 chars - {:toc}
    if (start + 5 > mark) return false
    if (state.src.charCodeAt(start) !== 0x7B/* { */) return false
    if (state.src.charCodeAt(start + 1) !== 0x3A/* : */) return false
    // if it's indented more than 3 spaces, it should be a code block
    if (state.sCount[startLine] - state.blkIndent >= 4) { return false }
    state.line = startLine + 1

    // we'll wrap the toc list inside a div.toc
    token = state.push('toc_open', 'nav', 1)
    token.markup = ''
    token.attrSet('class', 'toc')
    token.attrSet('role', 'directory')
    token.map = [ startLine, state.line ]
    token = state.push('toc_body', '', 0)
    token.markup = '{:toc}'
    token.map = [ startLine, state.line ]
    token = state.push('toc_close', 'nav', -1)
    token.markup = ''

    return true
  }
  md.renderer.rules.toc_body = function (tokens, idx, opts, env, renderer) {
    var headings = []
    for (let i = 0, len = gstate.tokens.length; i < len; i++) {
      if (gstate.tokens[i].type !== 'heading_open') continue
      let heading = gstate.tokens[i + 1]
      let children = heading.children
      if (children && children.length) {
        let rendered = md.renderer.renderInline(children)
        let postfix = slugger2.slug(
          innertext(rendered)
            .replace(/[<>]/g, '') // In case the heading contains `<stuff>`
            .toLowerCase() // because `slug` doesn't lowercase
        )
        // yeah, there're many edge cases not handled yet, will handle it
        // when i have one.
        // the highest heading should be the first one
        // of course someone might have:
        // ##
        // ###
        // #
        // ##
        // but is it right?
        headings = headings.concat({
          href: postfix,
          content: gstate.tokens[i + 1].content,
          level: gstate.tokens[i].tag.substr(1, 1)
        })
      }
    }
    // we finally got the headings,
    // now generate the html
    // we don't want to generate ourself
    // let's make use of what markdown-it has again
    // first, we generate a markdown from headings
    var nodes = []
    // find out the top level in heading
    // we'll use it for indent later
    var levels = headings.map(function (heading) {
      return heading.level * 1
    })
    var topLevel = Math.min.apply(null, levels)
    headings.forEach(function (heading) {
      if (heading.level < options.hMin || heading.level > options.hMax) {
        return
      }
      // level decide the indent
      nodes.push(' '.repeat((heading.level - topLevel) * 4) + `1. [` + heading.content + '](#' + options.headingAnchorPrefix + heading.href + ')')
    })
    var tocTokens = md2.parse(nodes.join('\n'), {})
    var tocHTML = md.renderer.render(tocTokens)
    if (headings.length) {
      if (options.title) {
        tocHTML = `<h2 class="${options.class}__heading">${options.title}</h2>` + tocHTML
      }
    }
    return tocHTML
  }
}
