/**
 * Module for Menu functions.
 */

const { app, Menu, BrowserWindow, dialog} = require('electron')
const { updateService } = require('./update-service')

let menuService = {}



menuService.createMenu = () => {

    const isMac = process.platform === 'darwin'

    const about = {
        label: 'About Glacier Desktop Beta',
        click: () => {
            // @see https://github.com/electron/electron/issues/16558#issuecomment-484460276
            // let activeWindow = BrowserWindow.getFocusedWindow()
            let activeWindow = BrowserWindow.getAllWindows()[0]
            activeWindow.show()
            activeWindow.webContents.send('about-page-event')
        }
    }

    const application = {
        label: 'Glacier Desktop Beta',
        submenu: [
            ... isMac ? [about] : [],
            // {
            //     label: 'Preferences',
            //     accelerator: 'CmdOrCtrl+,',
            //     click: () => {
            //         let activeWindow = BrowserWindow.getAllWindows()[0]
            //         activeWindow.show()
            //         activeWindow.webContents.send('preferences-event')
            //     }
            // },
            {
                type: 'separator',
            },
            {
                label: 'Check for Updates',
                click: () => { 
                    let activeWindow = BrowserWindow.getAllWindows()[0]
                    activeWindow.show()
                    updateService.checkForUpdates(true);
                }
            },
            {
                type: 'separator',
            },
            {
                label: 'Logout',
                accelerator: 'CmdOrCtrl+D',
                click: () => {
                    let options  = {
                        buttons: ["OK","Cancel"],
                        message: "Are you sure you want to log out?",
                        title: "Glacier Desktop"
                       }
                    const result = dialog.showMessageBox(options).then((data) => {
                        let activeWindow = BrowserWindow.getAllWindows()[0]
                        //console.log(data)
                        activeWindow.show()
                        if (data['response'] === 0) {
                            activeWindow.webContents.send('force-logout-event')
                        }
                    })
                }
            },
            {
                type: 'separator',
            },
            {
                label: 'Hide',
                accelerator: 'CmdOrCtrl+H',
                click: () => {
                    let activeWindow = BrowserWindow.getAllWindows()[0]
                    activeWindow.hide()
                },
            },
            {
                label: 'Quit',
                accelerator: 'CmdOrCtrl+Q',
                click: () => {
                    let options  = {
                        buttons: ["OK","Cancel"],
                        message: "Are you sure you want to quit?",
                        title: "Glacier Desktop"
                       }

                    const result = dialog.showMessageBox(options).then((data) => {
                        let activeWindow = BrowserWindow.getAllWindows()[0]
                        //console.log(data)
                        if (data['response'] === 0) {
                            app.isQuitting = true
                            app.quit()
                        }
                    })
                },
            },
      ],
    }

    const edit = {
        label: 'Edit',
        submenu: [{
                label: 'Undo',
                accelerator: 'CmdOrCtrl+Z',
                role: 'undo',
            },
            {
                label: 'Redo',
                accelerator: 'Shift+CmdOrCtrl+Z',
                role: 'redo',
            },

            {
                label: 'Cut',
                accelerator: 'CmdOrCtrl+X',
                role: 'cut',
            },
            {
                label: 'Copy',
                accelerator: 'CmdOrCtrl+C',
                role: 'copy',
            },
            {
                label: 'Paste',
                accelerator: 'CmdOrCtrl+V',
                role: 'paste',
            },
            {
                label: 'Select All',
                accelerator: 'CmdOrCtrl+A',
                role: 'selectAll',
            },
        ],
    }

    const view = {
        label: 'View',
        submenu: [
            { role: 'reload' },
            { type: 'separator' },
            { role: 'togglefullscreen' },
            { type: 'separator' },
            { role: 'resetZoom' },
            { role: 'zoomIn' },
            { role: 'zoomOut' }
        ]
    }

    const help = {
        label: 'Help',
        submenu: [
            ...!isMac ? [about] : [],
            {
                label: 'Debug info',
                accelerator: 'F12',
                click: () => {
                    let activeWindow = BrowserWindow.getAllWindows()[0]
                    activeWindow.webContents.openDevTools()
                }
            }
        ]
    }

    const template = [application, edit, view, help]

    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}

module.exports = menuService
