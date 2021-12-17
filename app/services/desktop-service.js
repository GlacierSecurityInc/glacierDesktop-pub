let angApp = require(__dirname + '/../init')

const desktopPlugin = require(__dirname + '/../../libs/converse.js/converse-desktop/desktop-plugin')

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
            let remove = result !== null ?
                CredentialsService.removeCredentials(result.login) :
                Promise.resolve()
            console.log('Remove credentials on logout')
            desktopService.loggedIn = false
            remove.then(() => AppStateService.set(AppStateService.APP_STATE_LOGIN))
        })
    }

    desktopService.initConverse = (connectionManager, login, password) => {
        AppStateService.set(AppStateService.APP_STATE_DEFAULT) // Always set to default state before init

        if (desktopService.initialized) {
            document.dispatchEvent(new CustomEvent('converse-login', {
                detail: {
                    jid: login,
                    password
                }
            }))
            return
        }

        desktopPlugin.register(login)
        let lang = navigator.language
        let xmppResource = XmppHelperService.getResourceFromJid(login)
        if (!xmppResource) {
            xmppResource = '.' + (Math.random().toString(36) + '00000000000000000').slice(2, 7) // Generate 5 char unique str
            login = login + '/converseDesktop' + xmppResource
        }
        let conversejsParams = {
            assets_path: './libs/vendor/converse.js/dist/',
            allow_bookmarks: true,
            allow_chat_pending_contacts: true,
            allow_non_roster_messaging: true,
            allow_registration: false,
            auto_away: 300,
            auto_join_on_invite: true,
            auto_login: true,
            auto_reconnect: true,
            i18n: lang,
            jid: login,
            enable_smacks: true,
            discover_connection_methods: true,
            muc_show_join_leave: false,
            notification_icon: './resources/images/logo.png',
            notify_all_room_messages: false,
            show_desktop_notifications: true,
            omemo_default: true,
            password: password,
            play_sounds: false,
            priority: 0,
            view_mode: 'fullscreen',
            whitelisted_plugins: ['converseDesktop'],
            allow_contact_removal: false,
            allow_adhoc_commands: false,
            time_format: 'hh:mm A',
            show_retraction_warning: false,
            synchronize_availability: false
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

    $window.document.addEventListener('conversejs-logout', function(e) {
        desktopService.logout()
    })

    $window.document.addEventListener('conversejs-disconnect', function(e) {
        desktopService.logout()
    })

    $window.document.addEventListener('conversejs-unread', function(e) {
        let sender = e.detail
        desktopService.chatToOpen = sender
        desktopService._notifyMessage()
    })

    $window.document.addEventListener('conversejs-no-unread', function(e) {
        desktopService._hideNotifyMessage()
    })

    return desktopService
})