---
title: Why okmarvin
date: 2018-6-15
tags:
  - introduction
---

## Why another static site generator

Have you ever wrote any CSS, you'll find it hard to maintain because all CSS rules live in one global scope. We learn [BEM](http://getbem.com/) and other tricks, hoping our CSS won't go wild, but we could fail most of the time.

That's why I thought most static site generators out there are broken in term of CSS. They're still writing CSS in global scope while scoped CSS is a much better choice these days.

So I created okmarvin.With scoped CSS and component as your templates, you have better developer experience which brings better result.

## Why not GatsbyJS, etc.

We could group static site generators into two categories depending on whether HTML, CSS, JavaScript are modularized :

|            | Hexo, Hugo, etc. | GatsbyJS, react-static, phenomic, etc. |
| ---------- | ---------------- | -------------------------------------- |
| HTML       | ✗                | ✓                                      |
| CSS        | ✗                | ✓                                      |
| JavaScript | ✗                | ✓                                      |

So GatsbyJS alike looks perfect regarding my demand, why not just use those static site generators but to create another one?

There're two main reasons as for me:

1. They're overkill for simple static site like a blog without many dynamic UIs.
2. They have steep learning curve if you don't know React/Vue/etc.

## Caveats of okmarvin

Currently okmarvin only supports templates built with React.js, but we consider adding more supports like Vue in future.
