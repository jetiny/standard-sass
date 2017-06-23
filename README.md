# standard-sass

[![NPM version](https://img.shields.io/npm/v/standard-sass.svg?style=flat-square)](https://www.npmjs.com/package/standard-sass)
[![Dependency Status](https://david-dm.org/jetiny/standard-sass.png)](https://david-dm.org/jetiny/standard-sass)
[![devDependency Status](https://david-dm.org/jetiny/standard-sass/dev-status.png)](https://david-dm.org/jetiny/standard-sass#info=devDependencies)
[![Build Status](https://travis-ci.org/jetiny/standard-sass.svg?branch=master)](https://travis-ci.org/jetiny/standard-sass)
[![License](https://img.shields.io/github/license/indexzero/http-server.svg?style=flat-square)](https://github.com/indexzero/http-server)

`standard-sass` is a simple, zero-configuration, `standalone`(Independent) command-line sass(css) style linter (use [sass-lint](https://www.npmjs.com/package/sass-lint))  like [standard-js](https://standardjs.com).

### Installing globally:

Installation via `npm`:

     npm install standard-sass -g

This will install `standard-sass` globally so that it may be run from the command line.

### Usage:

    ssass <sass-path-pattern> [options]
The default `<sass-path-pattern>` is `s+(a|c)ss/**/*.s+(a|c)ss` and `css/**/*.css`

The default `[options]` is `-q -v`

```js
  Usage: standard-sass [options] <pattern>

  Options:

    -h, --help                output usage information
    -V, --version             output the version number
    -c, --config [path]       path to custom config file
    -i, --ignore [pattern]    pattern to ignore. For multiple ignores, separate each pattern by `, ` within a string
    -q, --no-exit             do not exit on errors
    -v, --verbose             verbose output
    -f, --format [format]     pass one of the available eslint formats
    -o, --output [output]     the path and filename where you would like output to be written
    -s, --syntax [syntax]     syntax to evaluate the file(s) with (either sass or scss)
    --max-warnings [integer]  Number of warnings to trigger nonzero exit code
```
