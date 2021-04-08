const { assert } = require('console')
const fs = require('fs')
const path = require('path')

const package = require(path.join(__dirname, '../package.json'))
const appVersion = package.version
const electronVersion = package.devDependencies.electron
const converseVersion = package.dependencies['converse.js']

assert(appVersion && appVersion.length, `\`appVersion\` is undefined or empty!`)
assert(electronVersion && electronVersion.length, `\`electronVersion\` is undefined or empty!`)
assert(converseVersion && converseVersion.length, `\`converseVersion\` is undefined or empty!`)

const appDir = path.join(__dirname, '..', 'app')
if (!fs.existsSync(appDir)) fs.mkdirSync(appDir)
fs.writeFileSync(path.join(appDir, 'metadata.json'), JSON.stringify({
    appVersion,
    electronVersion,
    converseVersion
}), { flag: 'w' })
