# Glacier Desktop

Electron-based Desktop client for Glacier Chat.

This project started as a fork of [converse-desktop](https://github.com/conversejs/converse-desktop) Nick Denry's [Chimeverse](https://github.com/conversejs/converse-desktop).

## Releases

See [the releases page](https://github.com/GlacierSecurityInc/glacierDesktop-pub/releases).

Draft releases are [here](https://github.com/GlacierSecurityInc/glacierDesktop/releases) (private repo).

## Development

### Getting started

VS Code is easiest to get started with. We use [Yarn](https://classic.yarnpkg.com/lang/en/) instead of NPM.

```bash
git clone https://github.com/GlacierSecurityInc/glacierDesktop.git --recurse-submodules
cd glacierDesktop
yarn install
yarn build
yarn start # start a dev environment

yarn dist # build a macOS distributable
```

A few notes:
- You can make modifications to our [Converse.js fork](https://github.com/GlacierSecurityInc/converse.js) directly in the submodule folder (`libs/vendor/converse.js`). It acts like a normal Git repository, meaning that you can create a branch with your changes as normal, push them to our fork, and then make a PR.

To update the submodule (equivalent to doing `git pull` inside the submodule folder):

```bash
git submodule update --recursive --remote
```

- As of 07/14/2021, Converse.js's build script doesn't seem to always pick up on changes. This means that if you're making changes to Converse, the full process is:

```bash
# Make changes
rm -rf libs/vendor/converse.js/dist
yarn build
yarn start # includes your changes
```

- If you're making non-Glacier specific changes that can be tested with a regular XMPP client (theming), then it's much faster to start a dev server:

```bash
cd libs/vendor/converse.js
make devserver # will start a local server, print a URL, & automatically reload in the browser when code changes
```

### Contributing

When you're ready for others to test your changes, [open a PR](https://github.com/GlacierSecurityInc/glacierDesktop/compare). Make sure you follow the template: **every PR should be associated with exactly one issue / ticket**. Automations assume this. If it's absolutely necessary to open a PR that closes multiple tickets, automations will still run correctly but artifact names will only mention one ticket and the automation will only comment in one ticket.

If your changes are to both glacierDesktop and our Converse.js fork, make sure you link to your Converse.js PR in your glacierDesktop PR by pasting a link to it somewhere in the PR body.

Inside your PR, you can comment `/build` when you're ready for QA to test your changes. This will trigger a workflow that'll automatically build an artifact and drop a link to it in the associated ticket.

When building, the automation needs to resolve two different branches to figure out what code to build: the branch on glacierDesktop and the branch on our Converse.js fork. It will always use the PR branch as one of the branches. The other branch defaults to `main` / `master`, but you can specify it manually if necessary (i.e. your changes are to both glacierDesktop and the Converse.js fork):
- When commenting inside a glacierDesktop PR, you can specify the branch in Converse.js like so: `/build my-converse-branch`.
- When commenting inside a Converse.js PR, you can specify the branch in glacierDesktop like so: `/build my-glacierDesktop-branch`.

### Releasing

(These steps should be performed on this repo, glacierDesktop. Our Converse.js fork is not currently versioned beyond what's provided by upstream.)

1. Figure out what version this release should use. It can be any number that's not currently listed on [the releases page](https://github.com/GlacierSecurityInc/glacierDesktop/releases), but you should follow [SemVer](https://semver.org/spec/v2.0.0.html). This version number (**without** the `v` prefix) will be referred to as `$VERSION` in the following steps.

2. Update `version` in `package.json` to `$VERSION` (don't commit yet).

3. Update `CHANGELOG.md` with `$VERSION`:
    1. Change `## [Unreleased]` -> `## [$VERSION] - year-month-day`
    2. Add new `Unreleased` section at top:
    ```markdown
    ## [Unreleased]

    ### Added

    ### Changed

    ### Fixed

    ```
    3. Add/update links in footer:
      - Under the `[Unreleased]: ...` link, add a new entry: `[$VERSION]: https://github.com/GlacierSecurityInc/glacierDesktop/releases/tag/v$VERSION`
      - Change the `[Unreleased]: ...` link to be based off of the new version: `[Unreleased]: https://github.com/GlacierSecurityInc/glacierDesktop/compare/v$OLD_VERSION...HEAD` -> `[Unreleased]: https://github.com/GlacierSecurityInc/glacierDesktop/compare/v$VERSION...HEAD`
    4. See [this commit](https://github.com/GlacierSecurityInc/glacierDesktop/commit/56988a4a91cb3284c5ee74778692dc591601974d#diff-06572a96a58dc510037d5efa622f9bec8519bc1beab13c9f251e97e657a9d4ed) for an example of what should be changed.

4. Commit your changes from steps 2 & 3, the commit message should be something like `v$VERSION Release`.

5. After committing, tag your commit: `git tag v$VERSION` (**add** the `v` prefix).

6. Push your commit and tag: `git push -u origin main && git push origin v$VERSION`.

7. A new release will appear on [the releases page](https://github.com/GlacierSecurityInc/glacierDesktop/releases) after the build workflow finishes.

8. To prepare for the next release and enable draft builds, update `version` in `package.json` once again. You can always change this later before the next version is published to better follow [SemVer](https://semver.org/spec/v2.0.0.html) depending on what changes, so just think of it as a placeholder for now. For example, if you just published `v0.2.4` you could change the version field to `0.2.5`.

### Actions

All automations are handled by [GitHub Actions](https://docs.github.com/en/actions/learn-github-actions). They are stored in `.github/workflows`. A few tips / notes:

- Actions will use the latest version of its specification **within the current context**. For example, say you create a new branch called `patch/new-fix`, commit, and push a change to `.github/workflows/build.yml`. In this scenario, `build.yml` specifies that the action should run on every push. When it runs for your push, it'll use your updated specification since the context is from within your branch.
- Alternatively, say `.github/workflows/build.yml` runs on every push, but only when the push is to `main`. In this scenario, the action will not execute for `patch/new-fix` (since it only runs on pushes to `main`) and when triggered by future pushes to `main` **will not** use your updated version until you merge your changes into `main`.
- Use Linux (`ubuntu-latest`) [runners](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners) whenever possible, as they're far cheaper than macOS & Windows.

## License

Like Converse.js, Glacier Desktop's files are released under the Mozilla Public License version 2 (MPLv2). The gist of this license is that the covered files must stay open source, and modifications to them need to be released under the same license, but new files (for example for your own plugin) don't have to be released under the same license.

However, libsignal library, which is required for OMEMO support is released under the GPLv3. The MPLv2 license is compatible with GPLv3 and when GPLv3 code is included, the entire project effectively is licensed under the GPLv3.

Any custom build of Glacier Desktop without libsignal included will again be licensed under the MPLv2.
