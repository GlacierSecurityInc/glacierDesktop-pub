let desktopPlugin = {}

desktopPlugin.register = (login) => {
    converse.plugins.add('converseDesktop', {
        initialize: (event) => {
            let _converse = event.properties._converse
            let Strophe = converse.env.Strophe

            /**
             * Check if message stanza has some body payload
             * @param {*} stanzaNodes
             */
            let isBodyMessage = (stanzaNodes) => {
                let result = false
                Object.keys(stanzaNodes).some((key) => {
                    if (stanzaNodes[key].nodeName == 'body') {
                        result = true
                    }
                })
                return result
            }

            _converse.api.listen.on('getToolbarButtons', (_toolbar_el, buttons) => {
                const omemoButtonIndex = buttons.findIndex(
                    (b) => b && !!b.strings && b.strings.reduce(
                        (isOmemoButton, str) => isOmemoButton || str.includes('toggle-omemo'),
                        false
                    ),
                )
                // Remove OMEMO toolbar button
                if (omemoButtonIndex > -1) {
                    buttons = buttons.filter((_, index) => index != omemoButtonIndex)
                }

                return buttons
            });

            _converse.api.listen.on('initialized', () => {
                document.dispatchEvent(new CustomEvent('conversejs-initialized'))
            })
            _converse.api.listen.on('statusInitialized', () => {
                document.dispatchEvent(new CustomEvent('conversejs-user-status-initialized'))
            })
            _converse.api.listen.on('enteredNewRoom', room => {
                if (_converse.bookmarks) {
                    _converse.bookmarks.createBookmark({
                        'jid': room.get('jid'),
                        'autojoin': true,
                        'name': room.get('name'),
                        'nick': room.get('nick')
                    })
                }
            })
            window.document.addEventListener('converse-login', function (e) {
                _converse.api.user.login(e.detail.jid, e.detail.password)
            })

            Promise.all([
                _converse.api.waitUntil('rosterContactsFetched'),
                _converse.api.waitUntil('chatBoxesFetched')
            ]).then(() => {
                _converse.api.listen.on('logout', () => {
                    document.dispatchEvent(new CustomEvent('conversejs-logout'))
                })
                _converse.api.listen.on('message', (data) => {
                    // Display notifications only for "payloaded" messages
                    if (isBodyMessage(data.stanza.childNodes)) {
                        let sender = data.stanza.attributes.from.nodeValue
                        let senderJid = Strophe.getBareJidFromJid(sender)
                        let loginJid = Strophe.getBareJidFromJid(login)
                        if (senderJid != loginJid) {
                            console.log(senderJid)
                            let event = new CustomEvent('conversejs-unread', {detail: senderJid})
                            document.dispatchEvent(event)
                        }
                    }
                })
                _converse.api.listen.on('chatBoxFocused', () => {
                    let event = new CustomEvent('conversejs-no-unread')
                    document.dispatchEvent(event)
                    //chimeverseService._hideNotifyMessage()
                })
                window.document.addEventListener('converse-force-logout', function (e) {
                    console.log('Get converse-force-logout event')
                    console.log('Logout from plugin')
                    _converse.api.user.logout()
                    //chimeverseService.logout()
                })
                window.document.addEventListener('conversejs-open-chat', function (e) {
                    let chatToOpen = e.detail
                    console.log('Get open-unread-chat event: '+chatToOpen)
                    if (chatToOpen !== null) {
                        _converse.api.chats.open(chatToOpen)
                    }
                })
            })
        },

        overrides: {
            RosterContact: {
                getDisplayName () {
                    const displayName = this.__super__.getDisplayName.apply(this);
                    const jid = this.get('jid');
                    const jidUsername = jid.split('@')[0];
                    return displayName === jid ? jidUsername : displayName;
                },
            }
        }
    })
}

module.exports = desktopPlugin
