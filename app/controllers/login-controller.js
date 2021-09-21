let angApp = require(__dirname+'/../init')

angApp.controller('LoginController', function($scope, AppInfo, DesktopService, CognitoService, CredentialsService, AppStateService) {

    $scope.appInfo = AppInfo
    $scope.help = {}
    $scope.loggingIn = false
    $scope.error = null

    $scope.showHelp = (item) => {
        $scope.help[item] = typeof $scope.help[item] === 'undefined' ? true : !$scope.help[item];
    }

    $scope.addAccountAndLoginAction = async () => {
        $scope.loggingIn = true
        $scope.error = null

        try {
            const credentials = await CognitoService.fetchCredentials($scope.credentials.login, $scope.credentials.password);

            if (credentials.needsToSetPassword) {
                AppStateService.setCurrentPassword($scope.credentials.password)
                AppStateService.setUsername($scope.credentials.login)
                AppStateService.set(AppStateService.APP_STATE_SET_PASSWORD)
            } else {
                await CredentialsService.addCredentials(
                    AppInfo.CONNECTION_MANAGER,
                    credentials.login,
                    credentials.password
                )

                DesktopService.getCredentialsAndLogin()
            }
        } catch (error) {
            $scope.error = error
        }

        $scope.loggingIn = false
        $scope.accountForm.$setPristine()
        $scope.accountForm.$setUntouched()
        $scope.credentials = {}
        $scope.$applyAsync()
    }
})
