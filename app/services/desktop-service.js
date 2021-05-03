let angApp = require(__dirname + '/../init')

const desktopPlugin = require(__dirname +'/../../libs/converse.js/converse-desktop/desktop-plugin')

angApp.factory('DesktopService', (
        $window, $timeout, CredentialsService, SystemService, AppStateService,
        SettingsService, XmppHelperService
    ) => {

    let desktopService = {
        initialized: false,
        loggedIn: false,
        chatToOpen: null
    }

    desktopService._notifyMessage = () => {
        SystemService.playAudio()
        SystemService.showEnvelope()
    }

    desktopService._hideNotifyMessage = () => {
        SystemService.hideEnvelope()
    }

    desktopService.logout = () => {
        CredentialsService.getCredentials().then((result) => {
            let remove = result !== null
                ? CredentialsService.removeCredentials(result.login)
                : Promise.resolve()
            console.log('Remove credentials on logout')
            desktopService.loggedIn = false
            remove.then(() => AppStateService.set(AppStateService.APP_STATE_LOGIN))
        })
    }

    desktopService.initConverse = (connectionManager, login, password) => {
        AppStateService.set(AppStateService.APP_STATE_DEFAULT) // Always set to default state before init

        if (desktopService.initialized) {
            document.dispatchEvent(new CustomEvent('converse-login', {detail: {
                jid: login, password
            }}))
            return
        }

        desktopPlugin.register(login)
        let lang = navigator.language
        let allowBookmarks = SettingsService.get('allowBookmarks')
        let xmppResource = XmppHelperService.getResourceFromJid(login)
        if (!xmppResource) {
            xmppResource = '.' + (Math.random().toString(36)+'00000000000000000').slice(2, 7) // Generate 5 char unique str
            login = login + '/converseDesktop'+xmppResource
        }
        let conversejsParams = {
            assets_path: './libs/vendor/converse.js/dist/',
            allow_bookmarks: allowBookmarks,
            auto_login: true,
            auto_reconnect: true,
            // clear_cache_on_logout: true,
            // debug: true,
            i18n: lang,
            jid: login,
            omemo_default: true,
            password: password,
            play_sounds: false,
            priority: 50,
            view_mode: 'embedded',
            whitelisted_plugins: ['converseDesktop'],
        }
        if (connectionManager.startsWith('ws')) {
            conversejsParams.websocket_url = connectionManager
        } else {
            conversejsParams.bosh_service_url = connectionManager
        }
        $timeout(() => {
            // TODO: https://conversejs.org/docs/html/api/-_converse.html#setUserJID for connection manager discovery
            converse.initialize(conversejsParams)
        }, 50)
    }

    desktopService.getCredentialsAndLogin = () => {
        CredentialsService.getCredentials().then((result) => {
            if (result === null) {
                AppStateService.set(AppStateService.APP_STATE_LOGIN)
                return
            }
            desktopService.initConverse(result.connectionManager, result.login, result.password)
        }, (error) => {
            AppStateService.set(AppStateService.APP_STATE_LOGIN)
        })
    }

    $window.document.addEventListener('conversejs-initialized', () => {
        desktopService.initialized = true
    })

    $window.document.addEventListener('conversejs-user-status-initialized', () => {
        desktopService.loggedIn = true
    })

    $window.document.addEventListener('conversejs-logout', function (e) {
        desktopService.logout()
    })

    $window.document.addEventListener('conversejs-unread', function (e) {
        let sender = e.detail
        desktopService.chatToOpen = sender
        desktopService._notifyMessage()
    })

    $window.document.addEventListener('conversejs-no-unread', function (e) {
        desktopService._hideNotifyMessage()
    })

    return desktopService
})
