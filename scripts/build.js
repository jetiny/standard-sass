const {executeRollup, fse, errorExit} = require('rollup-standalone')
const {dirname, resolve} = require('path')

let ruleMaps = fse.readdirSync(resolve(dirname(require.resolve('sass-lint/lib/rules.js')), 'rules')).sort();

let commonjsRequire = {
  test: `function commonjsRequire`,
  replace: 'function NoCommonRequire',
  restore (code) {
    return code.replace(`function commonjsRequire`, 'function NoopRequire')
  },
  noopRequire (code) {
    return code.replace(/commonjsRequire/g, 'require')
  }
}

let ruleArray = JSON.stringify(ruleMaps)
let ruleRequires = ruleMaps.map((name) => `    cacheRules.push(require('./rules/${name}'));`).join('\n').trim()
let ruleReplace = `var cacheRules = [];
  ${ruleRequires}
  rules = ${ruleArray};
`

executeRollup({
  entry: require.resolve('sass-lint'),
  dest: 'dist/sass-lint.js',
  format: 'cjs',
  uglifyOptions: true,
  patterns: [
    {
      test: `'eslint/lib/formatters/' + format`,
      replace: `'eslint/lib/formatters/stylish.js'`
    },
    {
      test: `loadRule = require(rules[ruleSearch]);`,
      replace: `loadRule = cacheRules[ruleSearch];`
    },
    {
      test: `rules = fs.readdirSync(path.join(__dirname, 'rules'));`,
      replace: ruleReplace
    },
    {
      test: `'../../data'`,
      replace: `'./lint-data'`
    },
    commonjsRequire,
    {
      test:`'config', 'sass-lint.yml'`,
      replace: `'sass-lint.yml'`
    }
  ]
}, (bundle, res) => {
  res.code = '#!/usr/bin/env node\n' + commonjsRequire.noopRequire(res.code)
})

fse.ensureDir('dist/lint-data').then(() => {
  return Promise.all([
    fse.copy('sass-lint.yml', 'dist/sass-lint.yml'),
    new Promise((res, reject) => {
      let path = resolve(dirname(require.resolve('sass-lint/index.js')), 'data')
       fse.readdir(path, (err, files) => {
          if (err) {
            return reject(err)
          }
          return Promise.all(files.map((fileName) => {
            return fse.copy(resolve(path, './' + fileName), 'dist/lint-data/' + fileName)
          }))
          .then(res)
          .catch(reject)
       })
    })
  ])
}).catch(errorExit('copy-sass-lint-resources'))
