# Glacier Desktop

Electron-based Desktop client for Glacier Chat.

This project started as a fork of [converse-desktop](https://github.com/conversejs/converse-desktop) Nick Denry's [Chimeverse](https://github.com/conversejs/converse-desktop).

## Releases

See [the releases page](https://github.com/GlacierSecurityInc/glacierDesktop-pub/releases).

Draft releases are [here](https://github.com/GlacierSecurityInc/glacierDesktop/releases) (private repo).

## Development

### Getting started

VS Code is easiest to get started with. We use [Yarn](https://classic.yarnpkg.com/lang/en/) instead of NPM.

To prepare your environment for development:
```bash
git clone https://github.com/GlacierSecurityInc/glacierDesktop.git --recurse-submodules
cd glacierDesktop
yarn install
```

To build your code from the current branches of glacierDesktop and the converse.js submodule:
```bash
yarn build  # builds your code 
yarn start  # starts your build in a dev environment for use and testing
yarn dist   # builds a macOS distributable (dmg file) for installation
```

### Working with our Converse.js Fork

You can make modifications to our [Converse.js fork](https://github.com/GlacierSecurityInc/converse.js) fork directly in the submodule folder (`libs/vendor/converse.js`). It acts like a normal Git repository, meaning that you can create a branch with your changes as normal, push them to our fork, and then make a PR.

To update the submodule from the main project directory (equivalent to doing `git pull` inside the submodule folder), run the following command:
```bash
git submodule update --recursive --remote
```

As of 07/14/2021, The Converse.js build script does not always pick up on changes within the submodule. So, in order to ensure that all changes are present in each build, if you are making changes to the Converse.js submodule, then do the following to build your code:

```bash
# Make changes
rm -rf libs/vendor/converse.js/dist  # clears previous build info
yarn build  # builds your code and includes your changes to Converse.js
yarn start  # starts your build in a dev environment for use and testing
```

If you are making changes to the app that are not specific to Glacier, and that can be tested with a regular XMPP client (theming), then it's much faster to start a dev server instead of doing a full build and start.  To do this:

```bash
cd libs/vendor/converse.js
make devserver  # This will start a local server, print a URL, & automatically reload in the browser when code changes
```

### Contributing Changes via PR

When you're ready for others to test your changes, [open a PR](https://github.com/GlacierSecurityInc/glacierDesktop/compare). 

Glacier uses automation to generate our builds, so you need to fill in the PR in a very specific manner in order for our automated build process to work properly.  Be sure to follow these rules in your PR:

1. **Every PR should only be associated with exactly one issue ticket**. Automations assume this. If it's absolutely necessary to open a PR that closes multiple tickets, automations will still run correctly but artifact names will only mention one ticket and the automation will only comment within one ticket.

2. Be sure to name your PR with a name that describes what is being addressed or fixed.

3. Now, in the body of the PR, follow the following format:
    1. On Line 1: Associate the PR to the issue ticket it is addressing. Either type `Closes #[put issue ticket number here]` or `Partly closes #[put issue ticket number here]`, depending if the PR fully closes an issue ticket, or only partly addresses the issue.
    2. On Line 2: If you made changes to both glacierDesktop and the Converse.js fork, link to your Converse.js PR here. type `Requires [paste link to the converse.js PR ticket here]`. If you only made changes to the branch your PR is using, then do not include this line, and line 3 becomes line 2, and so on.
    3. On Line 3: Put a checkbox with `I updated CHANGELOG.md` after it.
    4. On Line 4: Type `## Changed:`
    5. On Line 5+: Starting with line 5 (or 4 if line 2 is not needed), enter all relevant information about what was fixed or changed by the PR code, and any screenshots as necessary.

4. If a developer is concerned about the code involved in their PR, they can ask another developer to review the PR. To do this, click on the “Reviewers” link on the right side of the PR ticket and select another developer who will review your code before it is approved for merging. Please note, if using this option, be sure to select a developer and not a tester for the review.

### Building your Code

When building, the automation needs to resolve two different branches to figure out what code to build: the branch on `glacierDesktop` and the branch on our `Converse.js fork`. It will always use the PR branch as one of the branches. The other branch defaults to `main` / `master`, but you can specify a different branch manually if necessary (i.e. your changes are to both branches). 

When you are ready for QA to test your changes, you have three specific options for building your code:

1. If you only made changes to the glacierDesktop repository, then inside your glacierDesktop PR you should enter `/build` in the comment box.

2. If you only made changes to the Converse.js repository, then inside your Converse.js PR you should enter `/build` in the comment box.

3. If you made changes to both repositories, then inside your glacierDesktop PR you should enter `/build my-converse-branch` in the comment box (where my-converse-branch is the name of the Converse.js branch you modified).

Assuming the build was successful, it will trigger a workflow that will automatically build the appropriate artifacts, place a link to the artifacts in the associated issue ticket, place a copy of the artifacts in Glacier’s Google Drive folder, and notify our team that a build is ready for testing.

### Releasing

(These steps should be performed on this repo, glacierDesktop. Our Converse.js fork is not currently versioned beyond what's provided by upstream.)

To generate a release version of the app, do the following:

1. Figure out what version this release should use. It can be any number that's not currently listed on [the releases page](https://github.com/GlacierSecurityInc/glacierDesktop/releases), but you should follow [SemVer](https://semver.org/spec/v2.0.0.html). This version number (**without** the `v` prefix) will be referred to as `$VERSION` in the following steps. This **may** have already been done in step 8 of the previous build. If so, no need to change it again.

2. Update `version` in `package.json` to `$VERSION` if needed (see comment on step 1). Example: `"version": "0.2.14"`.

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

4. Add, commit, and push your changes from steps 2 & 3 to the main branch of glacierDesktop. The commit message should be something like `v$VERSION Release`. Example: `git commit -m "v0.2.14 Release"`

5. After committing, tag your commit: `git tag v$VERSION` (**add** the `v` prefix). Example: `git tag v0.2.14`

6. Push your commit and current tag to the main branch of glacierDesktop: `git push origin v$VERSION && git push -u origin main`.  Note: We intentionally push the tag first so that it runs the release build workflow (and then avoids the duplicate build on main).

7. A new release will appear on [the releases page](https://github.com/GlacierSecurityInc/glacierDesktop/releases) after the build workflow finishes.

8. To prepare for the next release and enable draft builds, update `version` in `package.json` once again. You can always change this later before the next version is published to better follow [SemVer](https://semver.org/spec/v2.0.0.html) depending on what changes, so just think of it as a placeholder for now. For example, if you just published `v0.2.14` you could change the version field to `0.2.15`.

9. IMPORTANT! After you have updated `version` in `package.json`, then you MUST immediately add, commit, and push the `package.json` file to the **main branch** of glacierDesktop in order to make sure that the automation will work properly for subsequent builds. If this step is not completed, the automated build process will not work properly.

### Automation via Actions

All automations are handled by [GitHub Actions](https://docs.github.com/en/actions/learn-github-actions). They are stored in `.github/workflows`. A few tips / notes:

- Actions will use the latest version of its specification **within the current context**. For example, say you create a new branch called `patch/new-fix`, commit, and push a change to `.github/workflows/build.yml`. If `build.yml` specifies that the action should run on every push, then when you push changes to your branch, it will use your updated specification since the context is from within your branch.
- Alternatively, if `.github/workflows/build.yml` only runs on every push to the `main` branch, then the action will not execute for a push to `patch/new-fix` (since it only runs on pushes to `main`). In this case, when triggered by future pushes to `main`, it **will not** use your updated version until you merge the changes in `patch/new-fix` into `main`.
- Use Linux (`ubuntu-latest`) [runners](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners) whenever possible, as they're far cheaper than macOS & Windows.

## License

Like Converse.js, Glacier Desktop's files are released under the Mozilla Public License version 2 (MPLv2). The gist of this license is that the covered files must stay open source, and modifications to them need to be released under the same license, but new files (for example for your own plugin) don't have to be released under the same license.

However, libsignal library, which is required for OMEMO support is released under the GPLv3. The MPLv2 license is compatible with GPLv3 and when GPLv3 code is included, the entire project effectively is licensed under the GPLv3.

Any custom build of Glacier Desktop without libsignal included will again be licensed under the MPLv2.
