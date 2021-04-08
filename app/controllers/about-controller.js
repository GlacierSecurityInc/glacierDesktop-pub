const path = require('path')
const angApp = require(path.join(__dirname, '../init'))

angApp.controller('AboutController', function($scope, AppStateService, AppInfo) {

    $scope.appInfo = AppInfo

    $scope.closeAbout = () => {
        AppStateService.set(AppStateService.APP_STATE_DEFAULT)
    }
})