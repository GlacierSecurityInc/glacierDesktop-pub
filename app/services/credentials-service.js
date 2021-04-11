let angApp = require(__dirname+'/../init')

angApp.factory('CredentialsService', () => {

    const keytar = require('keytar')
    const settings = require('electron-settings')

    let credentialsService = {}

    credentialsService.getCredentials = () => {
        let credentials = {}
        credentials.login = settings.getSync('login')
        return new Promise((resolve, reject) => {
            if (!credentials.login) reject(Error('No login stored'))

            credentials.connectionManager = settings.getSync('connectionManager')
            credentials.xmppService = credentials.login.split('@').pop()
            keytar.getPassword(credentials.xmppService, credentials.login).then((result) => {
                if (result == null) reject(Error('No password stored'))
                credentials.password = result
                resolve(credentials)
            })
        })
    }

    credentialsService.addCredentials = (connectionManager, login, password) => {
        let xmppService = login.split('@').pop()
        settings.setSync('connectionManager', connectionManager)
        settings.setSync('login', login)
        return keytar.setPassword(xmppService, login, password)
    }

    credentialsService.removeCredentials = (login) => {
        let xmppService = login.split('@').pop()
        passwordDelete = keytar.deletePassword(xmppService, login)
        let promise = new Promise((resolve, reject) => {
            passwordDelete.then((result) => {
                settings.unsetSync('login')
                settings.unsetSync('connectionManager')
                resolve()
            }, (error) => {
                reject(error)
            })
        })
        return promise
    }

    return credentialsService
})

