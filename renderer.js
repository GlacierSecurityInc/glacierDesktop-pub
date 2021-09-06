// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { Amplify } = require('aws-amplify')
Amplify.configure({
    Auth: {
        // REQUIRED - Amazon Cognito Region
        region: 'us-east-1',
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-east-1_g1AdCGbFH',
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '3k4qjqjebjl4so20om93so38me',
    },
    API: {
        endpoints: [{
            name: 'userinfo',
            endpoint: 'https://7kmqt19tg3.execute-api.us-east-1.amazonaws.com/production'
        }]
    }
})

const angApp = require('./app/init')

require('./app/services/cognito-service')
require('./app/services/credentials-service')
require('./app/services/settings-service')
require('./app/services/system-service')
require('./app/services/app-state-service')
require('./app/services/xmpp-helper-service')
require('./app/services/desktop-service')
require('./app/controllers/settings-controller')
require('./app/controllers/login-controller')
require('./app/controllers/set-password-controller')
require('./app/controllers/default-controller')
require('./app/controllers/about-controller')
require('./app/controllers/footer-controller')

angApp.controller('AppController', function ($scope, $timeout, DesktopService, SettingsService, AppStateService) {

    const { ipcRenderer } = require('electron')

    // Menu force logout event
    ipcRenderer.on('force-logout-event', () => {
        DesktopService.logout()
        let event = new CustomEvent("converse-force-logout") // Dispatch to the plugin
        document.dispatchEvent(event)
    })

    // Menu settings event
    ipcRenderer.on('preferences-event', () => {
        AppStateService.set(AppStateService.APP_STATE_SETTINGS)
    })

    // Menu about event
    ipcRenderer.on('about-page-event', () => {
        AppStateService.set(AppStateService.APP_STATE_ABOUT)
    })

    // Menu about event
    ipcRenderer.on('open-unread-chat', () => {
        let event = new CustomEvent('conversejs-open-chat', {detail: DesktopService.chatToOpen})
        document.dispatchEvent(event)
    })

    // Auto update events
    const notification = document.getElementById('notification');
    const message = document.getElementById('message');
    const restartButton = document.getElementById('restart-button');

    ipcRenderer.on('update_available', () => {
      ipcRenderer.removeAllListeners('update_available');
      message.innerText = 'A new update is available. Downloading now...';
      notification.classList.remove('hidden');
    });
    ipcRenderer.on('update_downloaded', () => {
      ipcRenderer.removeAllListeners('update_downloaded');
      message.innerText = 'Update Downloaded. It will be installed on restart. Restart now?';
      restartButton.classList.remove('hidden');
      notification.classList.remove('hidden');
    });
    ipcRenderer.on('update_not_available', () => {
        message.innerText = 'There are no updates available.';
        notification.classList.remove('hidden');
    });
    $scope.closeNotification = () => {
        notification.classList.add('hidden');
    }
    $scope.restartAppAndInstall = () => {
        notification.classList.add('hidden');
        ipcRenderer.send('app-restart-and-install');
    }

    AppStateService.set(AppStateService.APP_STATE_DEFAULT)

    $scope.$on('app:state:changed', (event, data) => {
        // @see https://docs.angularjs.org/error/$rootScope/inprog
        $timeout(() => {
            $scope.state = data
            console.log('Switch to the "' + $scope.state +'" state')
        }, 0)
    })

    $scope.$on('app:restart', (event, data) => {
        ipcRenderer.send('app-restart')
    })

    SettingsService.initDefaults()

    DesktopService.getCredentialsAndLogin()

})
