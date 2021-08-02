const angApp = require(__dirname + '/../init')

const { Auth, AuthenticationDetails } = require('aws-amplify')
const { RestAPI } = require('@aws-amplify/api-rest')

angApp.factory('CognitoService', ($window, $timeout, AppInfo) => {
    return {
        fetchCredentials: async (username, password) => {
            try {
                const response = await Auth.signIn(username.split('@')[0], password);

                const organization = response.challengeName === 'NEW_PASSWORD_REQUIRED'
                ? response.challengeParam.userAttributes["custom:organization"]
                : response.attributes['custom:organization']

                if (response.challengeName === 'NEW_PASSWORD_REQUIRED') {
                    return {needsToSetPassword: true};
                }

                const user = await RestAPI.get('userinfo', '/userinfo', {
                    queryStringParameters: {
                        username: response.username,
                        organization: organization
                    },
                    headers: { Authorization: response.signInUserSession.idToken.jwtToken }
                });

                const credentials = user.data.Item
                return {
                    login: credentials.messenger_id,
                    password: credentials.glacierpwd
                }
            } catch (error) {
                if (error.code === 'UserNotFoundException') throw Error('Incorrect username or password.')
                if (error.code === 'NotAuthorizedException') throw Error(error.message)
                console.log(error)
                throw Error(`Unknown error: ${error.code || error}`)
            }
        },

        setPassword: async (username, oldPassword, newPassword) => {
            const user = await Auth.signIn(username, oldPassword)

            await Auth.completeNewPassword(user, newPassword)
        }
    }
})
