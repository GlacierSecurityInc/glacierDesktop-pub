let angApp = require(__dirname+'/../init')

angApp.controller('LoginController', function($scope, DesktopService, CognitoService, CredentialsService) {

    $scope.help = {}
    $scope.error = null

    $scope.showHelp = (item) => {
        $scope.help[item] = typeof $scope.help[item] === 'undefined' ? true : !$scope.help[item];
    }

    $scope.addAccountAndLoginAction = () => {
        $scope.error = null
        CognitoService.fetchCredentials($scope.credentials.login, $scope.credentials.password).then(credentials => {
            CredentialsService.addCredentials(
                credentials.connectionManager,
                credentials.login,
                credentials.password
            )
            DesktopService.getCredentialsAndLogin()
        }).catch(error => {
            $scope.error = error
        }).finally(() => {
            $scope.accountForm.$setPristine()
            $scope.accountForm.$setUntouched()
            $scope.credentials = {}
        })
    }
})
