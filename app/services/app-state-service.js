let angApp = require(__dirname + '/../init')

angApp.factory('AppStateService', [ '$rootScope', ($rootScope) => {

    let stateService = {}

    stateService.APP_STATE_LOGIN = 'login'
    stateService.APP_STATE_DEFAULT = 'default'
    stateService.APP_STATE_SETTINGS = 'settings'
    stateService.APP_STATE_ABOUT = 'about'

    stateService.set = (state) => {
        stateService.previousState = typeof stateService.state !== 'undefined' ?
            stateService.state : stateService.APP_STATE_DEFAULT
        stateService.state = state

        // Need to hide the default login page
        const container = document.querySelector('.flyout')
        if (container) {
            if (state === stateService.APP_STATE_LOGIN) {
                container.style.display = 'none';
            } else {
                container.style.display = 'block';
            }
        }

        $rootScope.$broadcast('app:state:changed', stateService.state)
    }

    stateService.set(stateService.APP_STATE_DEFAULT)

    return stateService
}])
