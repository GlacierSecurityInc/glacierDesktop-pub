const angular = require('angular')
const path = require('path')

const {
    appVersion,
    electronVersion,
    converseVersion,
} = require(path.join(__dirname, 'metadata.json'))

const angApp = angular.module('app', [])
angApp.constant('AppInfo', {
    APP_NAME: 'Glacier Desktop',
    APP_VERSION: `v${appVersion}`,
    APP_HOME: 'https://github.com/conversejs/converse-desktop',
    APP_RELEASES_CHECK_URL: 'https://api.github.com/repos/conversejs/converse-desktop/releases',
    APP_RELEASES_URL: 'https://github.com/conversejs/converse-desktop/releases',
    CONVERSE_VERSION: converseVersion.replace('^', 'v'),
    ELECTRON_VERSION: electronVersion.replace('^', 'v'),
    GLACIER_BOSH: 'http://geweb.glaciersec.cc/bosh'
});

module.exports = angApp
