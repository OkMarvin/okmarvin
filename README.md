# okmarvin

[![Build Status](https://travis-ci.org/OkMarvin/okmarvin.svg?branch=master)](https://travis-ci.org/OkMarvin/okmarvin)

okmarvin is an opinionated static site generator with **Component** built in React as template.

## Developing

okmarvin is a monorepo managed with [lerna](https://github.com/lerna/lerna).

1. Install `yarn` first
2. Clone this repo
3. Run `yarn lerna bootstrap` to bootstrap

## Demo

Please check [my blog](https://blog.zfanw.com).

## Performance

On iMac (Retina 5K, 27-inch, 2017) with 40 GB 2400 MHz DDR4:

```
$ okmarvin build --log-level 4 --clean true
[23:51:16]: Ok Marvin, lets do it.
[23:51:16]: Collected 62 markdown files
[23:51:16]: layouts kept the same
[23:51:16]: ✨  Read in 89ms
[23:51:16]: ✨  Parsed 62 files in 303ms
[23:51:17]: ✨  Rendered 116 files in 207ms
[23:51:17]: ✨  116 files generated.
[23:51:17]: Total memory used: 97.32MB
[23:51:17]: ✨  Built in 690ms
[23:51:17]: ✨  Your site is ready under 'dist' directory.
````