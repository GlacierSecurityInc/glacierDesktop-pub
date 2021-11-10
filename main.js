// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, shell, webFrame, Menu, MenuItem } = require('electron')
const appConfig = require('electron-settings');
const { updateService } = require('./modules/update-service');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Require other app modules
const trayService     = require(__dirname+'/modules/tray-service')
const menuService     = require(__dirname+'/modules/menu-service')

const isMac = process.platform === 'darwin'
const isWin = process.platform === 'win32'

async function initApp() {
    (await createWindow()).show()
    // Set Windows platform notifications
    if (isWin) {
        app.setAppUserModelId("chat.glacier.desktop")
    }
}

async function createWindow () {
    // Main window options
    let mainWindowOptions = {
        minWidth: 780,
        minHeight: 560,
        backgroundColor: '#f8f8f8',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    }

    // Load app settings
    let runMinimized = await appConfig.get('runMinimized')
    if (runMinimized) {
        mainWindowOptions.show = !runMinimized
    }

    // Restore size
    let width = await appConfig.get('windowWidth')
    let height = await appConfig.get('windowHeight')
    if (width) mainWindowOptions.width = width
    if (height) mainWindowOptions.height = height

    // Restore position
    let windowX = await appConfig.get('windowX')
    let windowY = await appConfig.get('windowY')
    if (typeof windowX === 'number') mainWindowOptions.x = windowX
    if (typeof windowY === 'number') mainWindowOptions.y = windowY

    // Create the browser window.
    mainWindow = new BrowserWindow(mainWindowOptions)

    // and load the index.html of the app.
    mainWindow.loadFile('index.html')

    const webContents = mainWindow.webContents;
    webContents.on("did-finish-load", () => {
        webContents.setZoomFactor(.9);
    });

    // Init tray
    trayService.initTray(mainWindow)

    // Init menu
    menuService.createMenu()


    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Before close
    let minimizeOnClose = await appConfig.get('minimizeOnClose')
    if (minimizeOnClose) {
        mainWindow.on('close', (e) => {
            if (!app.isQuitting) {
                e.preventDefault()
                mainWindow.hide()
            }
        })
    }

    // webFrame.on('zoom', async (e) => {
    //     let zoomLevel = webFrame.getZoomFactor()
    //     await appConfig.set('windowZoom', zoomLevel)
    // })

    // Implement context-menu
    mainWindow.webContents.on('context-menu', (event, params) => {
        const menu = new Menu()

        // Make seperator MenuItem
        const seperator = new MenuItem({
            type: "separator"
        })

        // Add each spelling suggestion
        for (const suggestion of params.dictionarySuggestions) {
                menu.append(new MenuItem({
                    label: suggestion,
                    click: () => mainWindow.webContents.replaceMisspelling(suggestion)
                }))
            }
            // Allow users to add the misspelled word to the dictionary
            if (params.misspelledWord) {
                menu.append(seperator)
                menu.append(
                    new MenuItem({
                    label: 'Add to dictionary',
                    click: () => mainWindow.webContents.session.addWordToSpellCheckerDictionary(params.misspelledWord)
                    })
                )
            }

        // Define menu items
        const cutMenuItem = new MenuItem({
            label: 'Cut',
            accelerator: 'CmdOrCtrl+X',
            role: 'cut',
        });
        const copyMenuItem = new MenuItem({
            label: 'Copy',
            accelerator: 'CmdOrCtrl+C',
            role: 'copy',
        });
        const pasteMenuItem = new MenuItem({
            label: 'Paste',
            accelerator: 'CmdOrCtrl+V',
            role: 'paste',
        })
        const undoMenuItem = new MenuItem({
            label: 'Undo',
            accelerator: 'CmdOrCtrl+Z',
            role: 'undo',
        })
        const redoMenuItem = new MenuItem({
            label: 'Redo',
            accelerator: 'Shift+CmdOrCtrl+Z',
            role: 'redo',
        })
        const selectAllMenuItem = new MenuItem({
            label: 'Select All',
            accelerator: 'CmdOrCtrl+A',
            role: 'selectAll',
        })

        // Add seperator before rest of menu items
        menu.append(seperator)
        // Append menu items to right click menu
        menu.append(cutMenuItem)
        menu.append(copyMenuItem)
        menu.append(pasteMenuItem)
        menu.append(undoMenuItem)
        menu.append(redoMenuItem)
        menu.append(selectAllMenuItem)
      
        menu.popup()
      })

    // Save window size
    mainWindow.on('resize', async (e) => {
        let newSize = mainWindow.getSize()
        let width = newSize[0]
        let height = newSize[1]
        await appConfig.set('windowWidth', width)
        await appConfig.set('windowHeight', height)
    })

    // Save window position
    mainWindow.on('move', async (e) => {
        let newPosition = mainWindow.getPosition()
        let windowX = newPosition[0]
        let windowY = newPosition[1]
        await appConfig.set('windowX', windowX)
        await appConfig.set('windowY', windowY)
    })

    // Handle shutdown event on Mac with minimizeOnClose
    // to prevent shutdown interrupt
    if (isMac && minimizeOnClose) {
        const { powerMonitor } = require('electron')
        powerMonitor.on('shutdown', () => {
            app.isQuitting = true
            app.quit()
        })
    }

    // Handle restart
    ipcMain.on('app-restart', (evt, arg) => {
        app.isQuitting = true
        app.relaunch()
        app.exit()
    })

    ipcMain.on('app-restart-and-install', () => {
        updateService.restartAndInstall();
    })

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })

    // Open links on system default browser
    mainWindow.webContents.on('new-window', function(e, url) {
        e.preventDefault()
        shell.openExternal(url)
    })

    mainWindow.once('ready-to-show', () => {
        updateService.checkForUpdates();
    });

    return mainWindow
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', initApp)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    // if (process.platform !== 'darwin')
    // ^^^^ NOPE ;)
    // Quit ANYWAY
    app.quit()
})

app.on('activate', async function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) await createWindow()
    mainWindow.show()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Allow to play audio automatically
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required')

/**
 * Export functions
 */

exports.trayService = trayService
