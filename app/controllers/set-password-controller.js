let angApp = require(__dirname+'/../init')

angApp.controller('SetPasswordController', function($scope, AppInfo, DesktopService, CognitoService, CredentialsService, AppStateService) {

    $scope.settingPassword = false
    $scope.error = null

    $scope.setPassword = async () => {
      $scope.settingPassword = true
      $scope.error = null

      const {password1, password2} = $scope.credentials

      if (password1 !== password2) {
        $scope.error = 'Passwords do not match.'
        $scope.settingPassword = false
        $scope.$applyAsync()
        return
      }

      try {
        await CognitoService.setPassword(AppStateService.username, AppStateService.currentPassword, password1)

        const credentials = await CognitoService.fetchCredentials(AppStateService.username, password1)

        await CredentialsService.addCredentials(
          AppInfo.CONNECTION_MANAGER,
          credentials.login,
          credentials.password
        )

        DesktopService.getCredentialsAndLogin()

        $scope.setPasswordForm.$setPristine()
        $scope.setPasswordForm.$setUntouched()
      } catch (error) {
        console.error('Error changing password:', error)
        $scope.error = 'Unknown error. Please try again later.'
      }

      $scope.settingPassword = false
      $scope.$applyAsync()
    }
})
