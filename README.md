# Glacier Desktop

Electron-based Desktop client for Glacier Chat.

## Converse Desktop

This project started as a fork of [converse-desktop](https://github.com/conversejs/converse-desktop) Nick Denry's [Chimeverse](https://github.com/conversejs/converse-desktop).

## Releases

See [the releases page](https://github.com/GlacierSecurityInc/glacierDesktop/releases).

## Development

VS Code is easiest to get started with.

```bash
git clone https://github.com/GlacierSecurityInc/glacierDesktop.git --recurse-submodules
cd glacierDesktop
npm install
npm run build
npm start # start a dev environment

npm run dist # build a macOS distributable
```

A few notes:
- You can make modifications to our [Converse.js fork](https://github.com/GlacierSecurityInc/converse.js) directly in the submodule folder (`libs/vendor/converse.js`). It acts like a normal Git repository, meaning that you can create a branch with your changes as normal, push them to our fork, and then make a PR.
- As of 07/14/2021, Converse.js's build script doesn't seem to always pick up on changes. This means that if you're making changes to Converse, the full process is:

```bash
# Make changes
rm -rf libs/vendor/converse.js/dist
npm run build
npm start # includes your changes
```

- If you're making simple changes that can be tested with a regular XMPP client (theming), then it's much faster to start a dev server:

```bash
cd libs/vendor/converse.js
make devserver # will automatically reload in the browser when code changes
```

### Releasing

To prepare for a new version, update `version` in `package.json` and push (without tagging). This will create a new draft release that will be continuously updated with new builds. (During this time, changes should go under 'Unreleased' in `CHANGELOG.md`.)

When it's ready to be released, first update `CHANGELOG.md` (`Unreleased` -> new version and add new `Unreleased` header & template at top). Then, go to [releases](https://github.com/GlacierSecurityInc/glacierDesktop/releases) and publish the draft.


## License

Like Converse.js, Glacier Desktop's files are released under the Mozilla Public License version 2 (MPLv2). The gist of this license is that the covered files must stay open source, and modifications to them need to be released under the same license, but new files (for example for your own plugin) don't have to be released under the same license.

However, libsignal library, which is required for OMEMO support is released under the GPLv3. The MPLv2 license is compatible with GPLv3 and when GPLv3 code is included, the entire project effectively is licensed under the GPLv3.

Any custom build of Glacier Desktop without libsignal included will again be licensed under the MPLv2.
