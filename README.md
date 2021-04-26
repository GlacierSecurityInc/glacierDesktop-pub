# Glacier Desktop

Electron-based Desktop client for Glacier Chat.

## Converse Desktop

This project started as a fork of [converse-desktop](https://github.com/conversejs/converse-desktop) Nick Denry's [Chimeverse](https://github.com/conversejs/converse-desktop).

### Jabber/XMPP client based on Converse.js and Electron

A very basic integration of [Converse.js](https://conversejs.org/) and Electron. With OMEMO.

### Screenshots and Features

<p float="left">
<img width="403" alt="Account form" src="https://user-images.githubusercontent.com/1450983/89672948-33bc0e80-d8ee-11ea-983f-21bbb707b45d.png">
<img width="403" alt="Main window" src="https://user-images.githubusercontent.com/1450983/89673019-4f271980-d8ee-11ea-8058-0ac6269983aa.png">
<img width="403" alt="Chat" src="https://user-images.githubusercontent.com/1450983/89673064-68c86100-d8ee-11ea-86c4-137e1b95dae7.png">
<img width="403" alt="Settings screen" src="https://user-images.githubusercontent.com/1450983/89673104-7847aa00-d8ee-11ea-8d30-8f84e7709e7c.png">

</p>

- Permanent account storage
- Tray icon
- Tray notifications
- All the best from Converse.js like system notifications, MAM, OMEMO etc. See details at [Converse.js](https://conversejs.org/)

### License

Like Converse.js, Glacier Desktop's files are released under the Mozilla Public License version 2 (MPLv2). The gist of this license is that the covered files must stay open source, and modifications to them need to be released under the same license, but new files (for example for your own plugin) don't have to be released under the same license.

However, libsignal library, which is required for OMEMO support is released under the GPLv3. The MPLv2 license is compatible with GPLv3 and when GPLv3 code is included, the entire project effectively is licensed under the GPLv3.

Any custom build of Glacier Desktop without libsignal included will again be licensed under the MPLv2.

### Changelog

See [CHANGES.md](https://github.com/GlacierSecurityInc/glacierDesktop/blob/main/CHANGES.md)

<!-- 
### Latest release installers

| Operation System | Download link |
-------------------|----------------
| macOS            | [Converse_Desktop-0.1.0_x64.dmg](https://github.com/GlacierSecurityInc/glacierDesktop/releases/download/v0.1.0/Converse_Desktop-0.1.0_x64.dmg) |
| Windows          | [Converse_Desktop_Setup-0.1.0_x64.exe](https://github.com/GlacierSecurityInc/glacierDesktop/releases/download/v0.1.0/Converse_Desktop_Setup-0.1.0_x64.exe) |
| Linux DEB        | [converse_desktop-0.1.0_amd64.deb](https://github.com/GlacierSecurityInc/glacierDesktop/releases/download/v0.1.0/converse_desktop-0.1.0_amd64.deb) |
| Linux other        | [converse_desktop-0.1.0_x64.tar.gz](https://github.com/GlacierSecurityInc/glacierDesktop/releases/download/v0.1.0/converse_desktop-0.1.0_x64.tar.gz) |

- [All releases](https://github.com/GlacierSecurityInc/glacierDesktop/releases)
-->

### Run with npm

```bash
git clone https://github.com/GlacierSecurityInc/glacierDesktop.git
cd glacierDesktop
npm install
npm start
```

## Development

Prepare

```bash
git clone https://github.com/GlacierSecurityInc/glacierDesktop.git
cd glacierDesktop
npm install
npm run build
```

### Build Targets

| Operation System | Target |
-------------------|----------------
| macOS            | `npm run dist` |
| Windows          | `npm run dist:win64` |
| Linux DEB        | `npm run dist:linux64deb` |

More targets could be added via `package.json`. See [electron builder docs](https://www.electron.build/configuration/configuration).
