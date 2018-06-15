---
title: Why okmarvin
date: 2018-6-15
---

Have you ever wrote any CSS, you'll find them hard to maintain because of one global scope.

We learn [BEM](http://getbem.com/) and other tricks, hoping our css files won't go wild. But we could fail most of the time.

That's why I thought most static site generators are broken in term of CSS. You're still writing css in global scope while scoped CSS is prevailing these days in front end developing.

What if we could write scoped css in templates for static site generator? Since React.js already support server side rendering, it could be a great candidate for static site generator.

That's why I created okmarvin with Node.js. Another static site generator, but with better theme developer experience.

In many ways, okmarvin is same as Hexo, Jekyll, Hugo, etc., you have templates and data they would collect then build static site for you. But okmarvin let you write scoped CSS, and components in your templates, no more global CSS rules, no more old partials.

Also, you can tweak theme easily, with live reloading. It's how we develop theme for okmarvin.

## Why not gatsbyjs, etc.

Depending on whether HTML, CSS, JavaScript are modularized we can group static site generators into two categories:

| -          | Hexo, Hugo, etc. | GatsbyJS, react-static, phenomic, etc. |
| ---------- | -------------- | ----------------------------------- |
| HTML       | ✗              | ✓                                   |
| CSS        | ✗              | ✓                                   |
| JavaScript | ✗              | ✓                                   |

So gatsbyjs alike looks perfect regarding my demand, why not just use these static site generators?

There're two reasons for me:

1. I think It's overkill for simple static site, they all render your site into an Single-page application after loaded. (If i'm wrong please correct me.)
2. I have to learn lots of new APIs.

## Drawback

Sounds too perfect for okmarvin right?

Currently okmarvin only supports templates built with React.js + [jsxstyle](https://github.com/smyte/jsxstyle), we might add more supports like Vue in future.

Also, There's one thing okmarvin don't do it good, the client side JavaScript.

As you might know, in React.js, you can write event handlers for your components, but in okmarvin, you write JavaScript code like how you do in Hexo, Hugo, etc., but in a special `client/index.j`s file. okmarvin won't ship React.js runtime for the static page, or it would become another gatsbyjs, that's not what I want.