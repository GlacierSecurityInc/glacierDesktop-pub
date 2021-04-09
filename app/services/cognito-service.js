const angApp = require(__dirname + '/../init')

const { Auth } = require('aws-amplify')
const { RestAPI } = require('@aws-amplify/api-rest')

angApp.factory('CognitoService', ($window, $timeout) => {
    return {
        fetchCredentials: (username, password) => {
            return Auth.signIn(username, password).then(response => {
                console.log('response ', response)
                console.log('Username is ', response.username)
                console.log('Organization is ', response.attributes['custom:organization'])

                return RestAPI.get('userinfo', '/user', {
                    queryStringParameters: {
                        username: response.username,
                        organization: response.attributes['custom:organization']
                    },
                    headers: { Authorization: response.signInUserSession.idToken.jwtToken }
                })
            }).then(loginCredentials => {
                const credentials = loginCredentials.data.Item
                console.log(credentials)
                return {
                    connectionManager: null,
                    login: credentials.messenger_id,
                    password: credentials.glacierpwd
                }
            }).catch(error => {
                if (error.code === 'UserNotFoundException') throw Error(error.message)
                console.log(error)
                throw Error('Unknown error')
            })
        }
    }
})
