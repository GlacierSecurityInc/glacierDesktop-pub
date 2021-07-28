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
        $scope.setPasswordForm.$setPristine()
        $scope.setPasswordForm.$setUntouched()
        AppStateService.set(AppStateService.APP_STATE_LOGIN)
      } catch (error) {
        console.error('Error changing password:', error)
        $scope.error = 'Unknown error. Please try again later.'
      }

      $scope.settingPassword = false
      $scope.$applyAsync()
    }
})
