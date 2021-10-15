# Glacier Desktop

An Electron-based desktop client for Glacier Chat.

This project started as a fork of [converse-desktop](https://github.com/conversejs/converse-desktop) Nick Denry's [Chimeverse](https://github.com/conversejs/converse-desktop).

Public releases can be found on our [releases page](https://github.com/GlacierSecurityInc/glacierDesktop-pub/releases).

## Getting started

To prepare your environment for development, run the following:
```bash
git clone https://github.com/GlacierSecurityInc/glacierDesktop.git --recurse-submodules
cd glacierDesktop
yarn install
```

To build your code from the current branches of glacierDesktop and the converse.js submodule, use the following:
```bash
yarn build  # builds your code 
yarn start  # starts your build in a dev environment for use and testing
yarn dist   # builds a macOS distributable (dmg file) for installation
```

## License

Like Converse.js, Glacier Desktop's files are released under the Mozilla Public License version 2 (MPLv2). The gist of this license is that the covered files must stay open source, and modifications to them need to be released under the same license, but new files (for example for your own plugin) don't have to be released under the same license.

However, libsignal library, which is required for OMEMO support is released under the GPLv3. The MPLv2 license is compatible with GPLv3 and when GPLv3 code is included, the entire project effectively is licensed under the GPLv3.

Any custom build of Glacier Desktop without libsignal included will again be licensed under the MPLv2.
