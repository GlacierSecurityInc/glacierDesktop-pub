const path = require('path')
const fs = require('fs')
const appDir = path.join(__dirname, '..', 'app')
const package = require(path.join(__dirname, '../package.json'))
const electronVersion = package.devDependencies.electron
const conversePackage = require(path.join(__dirname, '../libs/vendor/converse.js/package.json'))
const converseVersion = conversePackage.version

const out = {
    CLOSES: process.env.CLOSES,
    GLACIER_BRANCH: process.env.GLACIER_BRANCH,
    CONVERSE_BRANCH: process.env.CONVERSE_BRANCH,
    GLACIER_SHA: process.env.GLACIER_SHA,
    CONVERSE_SHA: process.env.CONVERSE_SHA,
    VERSION: package.version,
    ELECTRON_VERSION: electronVersion,
    CONVERSE_VERSION: converseVersion,
    BUILD_NUMBER: process.env.BUILD_NUMBER
};

fs.writeFileSync(path.join(appDir, 'metadata.json'), JSON.stringify(out), {flag: 'w'});
