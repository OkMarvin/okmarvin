# okmarvin

[![Build Status](https://travis-ci.org/OkMarvin/okmarvin.svg?branch=master)](https://travis-ci.org/OkMarvin/okmarvin)

okmarvin is an opinionated static site generator with **Component** built in React/vue/Preact/* as template.

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
[20:23:57]: Ok Marvin, lets do it.
[20:23:57]: Collected 62 markdown files
[20:23:57]: layouts kept the same
[20:23:57]: ✨  Read in 97ms
[20:23:57]: ✨  Parsed in 319ms
[20:23:57]: ✨  Rendered in 212ms
[20:23:57]: ✨  116 files generated.
[20:23:57]: Total memory used: 99.49MB
[20:23:57]: ✨  Built in 728ms
[20:23:57]: ✨  Your site is ready under 'dist' directory.
````