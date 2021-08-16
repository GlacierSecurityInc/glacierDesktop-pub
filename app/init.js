const angular = require('angular')
const path = require('path')

const metadata = require(path.join(__dirname, 'metadata.json'))

const angApp = angular.module('app', [])
angApp.constant('AppInfo', {
    APP_NAME: 'Glacier Desktop',
    APP_HOME: 'https://github.com/GlacierSecurityInc/glacierDesktop',
    // APP_RELEASES_CHECK_URL: 'https://api.github.com/repos/conversejs/converse-desktop/releases',
    // APP_RELEASES_URL: 'https://github.com/conversejs/converse-desktop/releases',
    metadata,
    CONNECTION_MANAGER: 'wss://discover' //placeholder, using discovery method
});

module.exports = angApp
