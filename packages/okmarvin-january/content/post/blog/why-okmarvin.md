---
title: Why okmarvin
date: 2018-6-15
tags:
  - introduction
---

Have you ever wrote any CSS, you'll find them hard to maintain because all CSS rules live in one global scope.

We learn [BEM](http://getbem.com/) and other tricks, hoping our css files won't go wild. But we could fail most of the time.

That's why I thought most static site generators are broken in term of CSS. You're still writing css in global scope while scoped CSS is a better choice these days.

okmarvin is another static site generator, but with better theme developer experience. You write scoped CSS, and components for your templates, no more global CSS rules, no more partials.

## Why not gatsbyjs, etc.

Depending on whether HTML, CSS, JavaScript are modularized we can group static site generators into two categories:

| -          | Hexo, Hugo, etc. | GatsbyJS, react-static, phenomic, etc. |
| ---------- | -------------- | ----------------------------------- |
| HTML       | ✗              | ✓                                   |
| CSS        | ✗              | ✓                                   |
| JavaScript | ✗              | ✓                                   |

So gatsbyjs alike looks perfect regarding my demand, why not just use these static site generators?

There're two reasons as for me:

1. It's overkill for simple static site like a blog, they will all render your site into an Single-page application after loaded.
2. They have lots of new APIs.

## Caveats

Currently okmarvin only supports templates built with React.js + [jsxstyle](https://github.com/smyte/jsxstyle), we might add more supports like Vue in future.

Also, okmarvin can't modularize the client side JavaScript.

As you might know, in React.js you can write event handlers for your components, but in okmarvin you should write vanilla JavaScript code like how you do in Hexo, Hugo, etc., but in a special `client/index.js` file. okmarvin won't ship React.js runtime for the static page, or it would become another gatsbyjs, that's not what I want.