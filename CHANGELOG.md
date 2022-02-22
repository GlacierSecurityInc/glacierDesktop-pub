# Changelog
All notable changes to this project will be documented in this file.
 
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
 
## [Unreleased]
 
### Added

### Changed
- Reduced loglevel from 'debug' to 'info' until needed
- Changed MAM archive and paging sizes to reduce lag and memory usage
 
### Fixed
- Fixed issues with group headers in side pane
- Fixed some message sync and delivery issues

## [0.4.2] - 2022-01-07

### Added
- Showing status dot in header of 1:1 chats
- Added notifications specific for location and videos
- Added message indicating expired media attachments

### Changed
- Now hiding Groups title if not a member of any groups 
- Auto-focuses in text box when you enter a chat 
- Updated some minor UI things 
- Improved handling of attached media
- Updated UI and filenames when saving attached images
- Updated new message notification chime
- Compresses new avatar image before uploading

### Fixed
- View not resetting on reload, now remembers view settings
- Addressed certain errors and issues with notifications
- Fixed file download links
- Stopped chat toolbar from disappearing 

## [0.4.1] - 2021-11-29

### Added

### Changed

### Fixed
- Fixed some decryption issues in group chats.

## [0.4.0] - 2021-11-19

### Added
- Added location and video messages to messaging notficcations

### Changed
- Updated version for Release

### Fixed

## [0.3.5] - 2021-11-19

### Added

### Changed
- Updated version and Changelog to attempt to create a Release

### Fixed

## [0.3.4] - 2021-11-18

### Added

### Changed
- Updated Changelog to create Release

### Fixed

## [0.3.3] - 2021-11-18

### Added
- Added Cmd-H in Mac to hide app 
- Added right-click menu functionality 
- Added spell-checking suggestions and dictionary 

### Changed
- Automatically set nickname when joining a room
- Muted timeout message when fetching archived messages 
- Updated Group Participants header 
- Updated Group Details body fonts 
- Adjusted leave vs close group functionality
- Removed links in notifications and replaced with icons and descriptors
- Updated menu order
- Updated UI for About Glacier, My Profile, My Status, Group Detail, and Contact Detail screens

### Fixed
- Fixed issue with sometimes being unable to open conversations or view groups at startup
- Stopped querying p2 for disco info
- Fixed various issues with naming and decryption
- Fixed blank screen issue on reopening or timeout of app 
- Fixed popup window header sizes 
- Fixed roster syncing issues
- Fixed the 'Hide' menu so that it only appears on macOS
- Fixed the updating of display/nickname on entering new/closed room
- Fixed missing media attachment button
- Now tries to set other room occupant nicknames at open if needed

## [0.3.2] - 2021-11-01

### Added
- Added connectivity bar to notify user when they're not connected

### Changed
- Merged with upstream 8.0.1 of converse
- Updated to v0.3.1, then v0.3.2, then v0.3.3
- Removed .exe from window headers in Windows 
- Updated Electron from 13.1.9 to 13.3.0
- Made several UI modifications
- Small misc other tweaks

### Fixed
- Fixed an encryption syncing issue
- Added lots of naming and decryption updates to address and fix decryption issues

## [0.3.0] - 2021-09-21

### Added

### Changed
- Updated to v0.3.0

### Fixed

## [0.2.35] - 2021-09-21

### Added
- Added upstream Converse code

### Changed
- Changed App name displayed to include Beta

### Fixed
- Added fix for Unhandled promise error

## [0.2.34] - 2021-09-13

### Added
- Improvements for auto-update

### Changed
- Updated version number

### Fixed

## [0.2.33] - 2021-09-13

### Added
- Dark scroll bars & border line
- Improvements for auto-update

### Changed
- Updated version number

### Fixed

## [0.2.32] - 2021-09-10

### Added

### Changed
- Updated version number

### Fixed

## [0.2.31] - 2021-09-10

### Added

### Changed
- Updated version number

### Fixed

## [0.2.30] - 2021-09-10

### Added

### Changed
- Updated version number
- Updated scripts for auto update

### Fixed

## [0.2.29] - 2021-09-08

### Added

### Changed
- Updated version number

### Fixed

## [0.2.28] - 2021-09-08

### Added
- Auto update functionality for app

### Changed
- Fixed Changelog entries 

### Fixed

## [0.2.27] - 2021-09-08

### Added

### Changed
- Re-re-releasing for automation

### Fixed

## [0.2.26] - 2021-09-08

### Added

### Changed
- Re-releasing for automation

### Fixed

## [0.2.25] - 2021-09-08

### Added
- Artifact name to build config for auto update

### Changed

### Fixed

## [0.2.24] - 2021-09-07

### Added

### Changed
- Updated Changelog to generate yet another release to test auto-update functionality

### Fixed

## [0.2.23] - 2021-09-07

### Added

### Changed
- Updated Changelog to generate another release to test auto-update functionality

### Fixed

## [0.2.22] - 2021-09-07

### Added

### Changed
- Updated Changelog to generate release to test auto-update functionality

### Fixed

## [0.2.21] - 2021-09-05

### Added

### Changed
- Updated package.json and Changelog to test auto-update functionality with release

### Fixed

## [0.2.20] - 2021-09-04

### Added

### Changed
- Another update for auto-update

### Fixed

## [0.2.19] - 2021-09-04

### Added

### Changed
- Update for auto-update 

### Fixed

# [0.2.18] - 2021-09-03

### Added

### Changed
- Updated package.json and Changelog to test auto-update functionality with release

### Fixed

## [0.2.20] - 2021-09-04

### Added

### Changed
- Another update for auto-update

### Fixed

## [0.2.19] - 2021-09-04

### Added

### Changed
- Update for auto-update 

### Fixed

# [0.2.18] - 2021-09-03
### Added

### Changed
- Updated small app icons 
- Updated tooltip associated with small app icons

### Fixed

## [0.2.17] - 2021-09-02

### Added

### Changed
- Updated package.json
- Updated Changelog.md again

### Fixed

## [0.2.16] - 2021-09-01

### Added

### Changed
- just build testing, remove later

### Fixed

## [0.2.15] - 2021-09-01

### Added

### Changed

### Fixed
- Calls can be made by MAM users

## [0.2.14] - 2021-08-31

### Added

### Changed
- revised artifact naming for releases

### Fixed

## [0.2.12] - 2021-08-31

### Added

### Changed

### Fixed
- Correctly deletes build number tag if tagged commit
- Prevent multiple builds on tag

## [0.2.9] - 2021-08-30

### Added

### Changed
- No longer reset build number after tagging and removing

### Fixed
- Only check for /build on PR comments

## [0.2.8] - 2021-08-30

### Added

### Changed
- Changed build artifact naming
- Only mirror on tagged versions

### Fixed
- Only auto-build on tagged versions and changes to CHANGELOG
- Only notarize tagged release versions

## [0.2.7] - 2021-08-27

### Added
- Added "Are you sure" prompts for logout and quit
- Added obfuscation of jids on hover 

### Changed
- Updated About Glacier Desktop page
- Updated theming of emoji box and search bar
- Commented out some system level messaging
- Changed build artifact naming
- Only auto-build on tagged versions and changes to CHANGELOG
- Only notarize tagged release versions

### Fixed
- Fixed group dropdowns disappearing and not condensing
- Fixed missing name on system messages

## [0.2.6] - 2021-08-23

### Added
- Now shows build info on about page
- Shows build number on login & default views

### Changed

### Fixed

## [0.2.5] - 2021-08-12

### Added

### Changed
- Ability to set a permanent password when first logging in
- Auto-login after password change
- Added toggle for viewing password in password field
- Improved visibility of unread message indicators
- Auto-bookmarking for group chats
- Updated About Glacier Desktop page
- Remembers app window size and position when reopening
- Update theming for @mention activity
- Improved avatar image selection and compression
- Additional obfuscation and cleaning up of log
- Updated styling, icons, and UI layouts
- Miscellaneous other fixes, improvements, and tweaks

### Fixed


## [0.2.4] - 2021-08-02

### Added
- Fleshed out documentation on developing
- Added a PR template
- Draft releases will now be updated with this file
- Login button now shows a loading state
- View submenu
- Code signing & notarization for macOS
- Updated configuration and bind parameters
- Moved to using websockets
- Add the ability for an email-less user to set their password

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

[Unreleased]: https://github.com/GlacierSecurityInc/glacierDesktop/compare/v0.4.2...HEAD
[0.4.2]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.4.2
[0.4.1]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.4.1
[0.4.0]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.4.0
[0.3.5]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.3.5
[0.3.4]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.3.4
[0.3.3]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.3.3
[0.3.2]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.3.2
[0.3.0]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.3.0
[0.2.35]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.2.35
[0.2.34]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.2.34
[0.2.33]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.2.33
[0.2.32]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.2.32
[0.2.31]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.2.31
[0.2.30]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.2.30
[0.2.29]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.2.29
[0.2.28]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.2.28
[0.2.27]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.2.27
[0.2.26]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.2.26
[0.2.25]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.2.25
[0.2.24]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.2.24
[0.2.23]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.2.23
[0.2.22]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.2.22
[0.2.21]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.2.21
[0.2.20]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.2.20
[0.2.19]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.2.19
[0.2.18]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.2.18
[0.2.17]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.2.17
[0.2.16]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.2.16
[0.2.15]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.2.15
[0.2.14]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.2.14
[0.2.13]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.2.13
[0.2.12]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.2.12
[0.2.11]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.2.11
[0.2.10]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.2.10
[0.2.9]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.2.9
[0.2.8]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.2.8
[0.2.7]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.2.7
[0.2.6]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.2.6
[0.2.5]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.2.5
[0.2.4]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.2.4
[0.1.0]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v0.1.0
