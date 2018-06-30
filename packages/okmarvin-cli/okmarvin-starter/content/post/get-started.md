---
title: Get started
date: 2018-06-28
---

First, install `okmarvin` globally with npm:

```bash
$ npm install -g okmarvin
```
Then create your site:

```bash
$ okmarvin new site my-blog
```

After finishing your contents, just build your site:

```bash
$ okmarvin build
```
You'll get your static site under `dist` directory.

## Change theme

By default, okmarvin use `@okmarvin/january` theme. But you can change it in `_config.yml` file:

```yaml
theme: what-ever-theme-you-want
```
Of course, you should install the theme first:

```bash
$ npm install what-ever-theme-you-want
```