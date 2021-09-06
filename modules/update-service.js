const { BrowserWindow } = require('electron')
const { autoUpdater } = require('electron-updater');

let updateService = {};

autoUpdater.on('update-available', () => {
    let activeWindow = BrowserWindow.getAllWindows()[0]
    autoUpdater.removeAllListeners('update-not-available');
    activeWindow.webContents.send('update_available');
});
autoUpdater.on('update-downloaded', () => {
    let activeWindow = BrowserWindow.getAllWindows()[0]
    activeWindow.webContents.send('update_downloaded');
});

updateService.checkForUpdates = (notifyNotAvailable = false) => {
    let activeWindow = BrowserWindow.getAllWindows()[0]
    if(notifyNotAvailable) {
        autoUpdater.once('update-not-available', () => {
            activeWindow.webContents.send('update_not_available');
        });
    }

    autoUpdater.checkForUpdatesAndNotify();
}

updateService.restartAndInstall = () => {
    autoUpdater.quitAndInstall();
}

exports.updateService = updateService;