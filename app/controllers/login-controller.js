let angApp = require(__dirname+'/../init')

angApp.controller('LoginController', function($scope, AppInfo, DesktopService, CognitoService, CredentialsService) {

    $scope.help = {}
    $scope.loggingIn = false
    $scope.error = null

    $scope.showHelp = (item) => {
        $scope.help[item] = typeof $scope.help[item] === 'undefined' ? true : !$scope.help[item];
    }

    $scope.addAccountAndLoginAction = () => {
        $scope.loggingIn = true
        $scope.error = null
        CognitoService.fetchCredentials($scope.credentials.login, $scope.credentials.password).then(credentials => {
            CredentialsService.addCredentials(
                AppInfo.GLACIER_BOSH,
                credentials.login,
                credentials.password
            ).then(() => DesktopService.getCredentialsAndLogin())
        }).catch(error => {
            $scope.error = error
        }).finally(() => {
            $scope.loggingIn = false
            $scope.accountForm.$setPristine()
            $scope.accountForm.$setUntouched()
            $scope.credentials = {}
        })
    }
})
