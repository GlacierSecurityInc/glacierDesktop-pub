# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Fleshed out documentation on developing
- Added a PR template
- Draft releases will now be updated with this file
- Login button now shows a loading state
- View submenu
- Code signing & notarization for macOS
- Updated configuration and bind parameters
- Moved to using websockets

### Changed
- `CHANGES.md` -> `CHANGELOG.md`
- Reduced bundle size

### Fixed
- No longer checks for updates against upstream Converse Desktop repo
- Removed analytics script
- Logs out on disconnection

## [0.1.0] - 2021-07-14

### Added
- First release since forked from [Chimeverse project](https://github.com/nick-denry/Chimeverse

### Changed
- Relicensed under MPL-2.0 (@see libsignal-protocol.js exclusion at README section)

### Fixed
- Fix error handling for version check

[Unreleased]: https://github.com/GlacierSecurityInc/glacierDesktop/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.1.0