const path = require('path')
const fs = require('fs')
const appDir = path.join(__dirname, '..', 'app')

const out = {
    CLOSES: process.env.CLOSES,
    GLACIER_BRANCH: process.env.GLACIER_BRANCH,
    CONVERSE_BRANCH: process.env.CONVERSE_BRANCH,
    GLACIER_SHA: process.env.GLACIER_SHA,
    CONVERSE_SHA: process.env.CONVERSE_SHA,
    VERSION: process.env.VERSION,
    BUILD_NUMBER: process.env.BUILD_NUMBER
};

fs.writeFileSync(path.join(appDir, 'metadata.json'), JSON.stringify(out), {flag: 'w'});
