/**
 * Module for Menu functions.
 */

const { app, Menu, BrowserWindow, dialog} = require('electron')

let menuService = {}



menuService.createMenu = () => {

    const isMac = process.platform === 'darwin'

    const about = {
        label: 'About Glacier Desktop',
        click: () => {
            // @see https://github.com/electron/electron/issues/16558#issuecomment-484460276
            // let activeWindow = BrowserWindow.getFocusedWindow()
            let activeWindow = BrowserWindow.getAllWindows()[0]
            activeWindow.show()
            activeWindow.webContents.send('about-page-event')
        }
    }

    const application = {
        label: 'Glacier Desktop',
        submenu: [
            ...isMac ? [about] : [],
            // add a check for if client is logged in
            {
                label: 'Logout',
                accelerator: 'CmdOrCtrl+D',
                click: () => {
                    let options  = {
                        buttons: ["Cancel","OK"],
                        message: "Are you sure you want to log out?"
                       }
                    const result = dialog.showMessageBox(options).then((data) => {
                        let activeWindow = BrowserWindow.getAllWindows()[0]
                        console.log(data)
                        activeWindow.show()
                        if (data['response'] === 1) {
                            activeWindow.webContents.send('force-logout-event')
                        }
                    })
                }
            },
            {
                type: 'separator',
            },
            {
                label: 'Preferences',
                accelerator: 'CmdOrCtrl+,',
                click: () => {
                    let activeWindow = BrowserWindow.getAllWindows()[0]
                    activeWindow.show()
                    activeWindow.webContents.send('preferences-event')
                }
            },
            {
                type: 'separator',
            },
            {
                label: 'Quit',
                accelerator: 'CmdOrCtrl+Q',
                click: () => {
                    app.isQuitting = true
                    app.quit()
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