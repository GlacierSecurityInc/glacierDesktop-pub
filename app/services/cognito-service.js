const angApp = require(__dirname + '/../init')

const { Auth } = require('aws-amplify')
const { RestAPI } = require('@aws-amplify/api-rest')

angApp.factory('CognitoService', ($window, $timeout) => {
    return {
        fetchCredentials: (username, password) => {
            return Auth.signIn(username.split('@')[0], password).then(response => {
                const organization = response.challengeName === 'NEW_PASSWORD_REQUIRED'
                // TODO: Ask the user to reset their password?
                ? response.challengeParam.userAttributes["custom:organization"]
                : response.attributes['custom:organization']
                
                console.log('Username is:', response.username)
                console.log('Organization is:', organization)

                return RestAPI.get('userinfo', '/user', {
                    queryStringParameters: {
                        username: response.username,
                        organization: organization
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
                if (error.code === 'UserNotFoundException') throw Error('Incorrect username or password.')
                if (error.code === 'NotAuthorizedException') throw Error(error.message)
                console.log(error)
                throw Error(`Unknown error: ${error.code || error}`)
            })
        }
    }
})
