let angApp = require(__dirname+'/../init')

angApp.controller('DefaultController', function($scope, $timeout, $http, AppInfo) {
    $scope.appInfo = AppInfo
})
