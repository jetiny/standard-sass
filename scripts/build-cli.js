const {executeRollup, fse, errorExit} = require('rollup-standalone')
const pkg = require('../package.json')

executeRollup({
  entry: require.resolve('sass-lint/bin/sass-lint.js'),
  dest: 'dist/sass-cli.js',
  format: 'cjs',
  uglifyOptions: true,
  patterns: [
    {
      match: /sass\-lint\.js/,
      test: `#!/usr/bin/env node`,
      replace: ``
    },
    {
      test: `meta = require('../package.json'),`,
      replace: ``
    },
    {
      test: `meta.version`,
      replace: `"${pkg.version}"`
    },
    {
      match: /sass\-lint\.js/,
      test: `require('../index')`,
      replace: `"require_index"`,
      restore: `require('./sass-lint.js')`
    },
    {
      match: /sass\-lint\.js/,
      test: `detectPattern(null, config);`,
      replace: `program.exit = true;
  program.verbose = true;
  detectPattern(null, config);
`
    },
    {
      match: /sass\-lint\.js/,
      test: `lint.failOnError(detects, configOptions, configPath);`,
      replace: ` try {
          lint.failOnError(detects, configOptions, configPath);
        } catch (err) {
          console.error('sass-lint fail.')
          process.exit(1)
        }`
    }
  ]
}, (bundle, res) => {
  res.code = '#!/usr/bin/env node\n' + res.code
})
