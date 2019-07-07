# okmarvin

[![Build Status](https://travis-ci.org/OkMarvin/okmarvin.svg?branch=master)](https://travis-ci.org/OkMarvin/okmarvin)

okmarvin is an opinionated static site generator with **Component** as template which could be written in React.js, Vue.js, etc. as long as they support server side render.

## Usage

First install `okmarvin` with `npm` or `yarn`:

```
$ npm install -g okmarvin-cli
```

Then create a new site with:

```
$ okmarvin new site
```

You can find more commands with `okmarvin` command.

## Developing

okmarvin is a monorepo managed with [lerna](https://github.com/lerna/lerna).

1. Install `yarn` first
2. Clone this repo
3. Run `yarn lerna bootstrap` to bootstrap

## Performance

Bulid [my blog](https://blog.zfanw.com) on iMac (Retina 5K, 27-inch, 2017) with 40 GB 2400 MHz DDR4:

```
$ okmarvin build --log-level 4
[22:13:38]: Collected 60 markdown files
[22:13:38]: ✨  Read in 69ms
[22:13:38]: Parsed 60 files in 2ms
[22:13:38]: ✨  Parsed 112 markdown contents in 173ms
[22:13:38]: ✨  Wrote 112 files in 229ms.
[22:13:38]: File assets copied in 23ms
[22:13:38]: rss memory used: 109.09MB
[22:13:38]: ✨  Built in 516ms
[22:13:38]: ✨  Your site is ready under '_site' directory.
```
