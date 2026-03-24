# Changelog

All notable changes to this project will be documented in this file.

## [v2.2.1] - 2026-03-24 - Universal Compatibility & Context-Aware Execution

## [v2.2.1] - 2026-03-24 - Universal Compatibility & Context-Aware Execution

### 🐛 Bug Fixes & Stability
* **Conditional Checkout Logic**: Resolved the "Input required and not supplied: token" error for external users. The workflow now intelligently detects its environment and uses `GH_PAT` only within the source repository, falling back to standard authentication elsewhere.
* **Asset Upload Isolation**: Fixed a failure in the "Upload Release Asset" step. This administrative task is now strictly restricted to the core `npm-trusted-publisher` repository, ensuring smooth execution for all downstream consumers.
* **Environment Awareness**: Implemented repository-level filtering (`if: github.repository == ...`) across all administrative steps (stamping, committing, and asset management) to prevent unauthorized or failing actions in external projects.

### ⚙️ Improvements
* **Enhanced Robustness**: The workflow is now fully "Reusable-safe," meaning it can be called from any public repository without requiring the host to configure additional secrets or tokens.
* **Streamlined Logging**: Improved step descriptions to better reflect the conditional nature of the automation.

## [v2.2.0] - 2026-03-24 - Automated Assets & Architecture Simplification

### ✨ Enhancements & Automation
- **Automated Release Assets**: The publishing workflow now automatically version-stamps and attaches the `kd-npm-publish.yml` template directly to the GitHub Release as a downloadable asset. Manual file uploading are no longer required.
- **Out-of-the-Box Functionality for Manual Downloads**: The `templates/kd-npm-publish.yml` file in the repository is now dynamically updated with the exact release version during the CI/CD pipeline. Developers who choose the "Direct Download" method will always receive a fully functional file with accurate update notification logic, completely eliminating unresolved placeholders.

### ⚙️ Architecture & Refactoring
- **Simplified CLI Engine**: Deprecated the `__NPM_TP_VERSION__` placeholder and read-replace logic in the CLI. The `npx npm-trusted-publisher init` command now utilizes a streamlined, zero-overhead direct file copy (`fs.copyFileSync`). The pipeline itself now acts as the single source of truth for injecting versions.
- **Workflow Stamping Expansion**: The CI pipeline's stamping step has been expanded to simultaneously update versions across both the primary reusable workflow and the distributable template prior to deployment.

## [v2.1.1] - 2026-03-23 - ✨ Enhancements

General performance improvements and codebase cleanup.

## [v2.1.0] - 2026-03-23 - 🔔 New Feature: Update Notifier

### 🔔 Update Notifier (Version Checker)

- **Automatic Version Check**: Added a `Check for updates` step to the publishing workflow. On every release, it queries the npm registry and compares the installed version against the latest available. If a newer version exists, a visible ⚠️ GitHub Warning annotation is displayed directly in the workflow summary.

### ⚙️ Improvements

- **CLI Template Engine**: Replaced `copyFileSync` in the CLI with a read-replace-write pipeline. The `__NPM_TP_VERSION__` placeholder in the workflow template is now automatically replaced with the actual package version at `init` time — ensuring the update notifier always has an accurate baseline.
- **Self-Updating Version Stamp**: For reusable workflow (`workflow_call`) users, the version embedded in the workflow file is automatically updated via `sed` during each release. No manual version management is ever required.
- **Method-Aware Messaging**: The update notification displays contextually appropriate instructions depending on the integration method:
  - **Method 1** (`npx init`): Suggests re-running `npx npm-trusted-publisher@latest init`
  - **Method 2** (`workflow_call`): Suggests updating the `uses:` reference to the latest tag


## [v2.0.2] - 2026-03-22 - v2.0.2 - Smart Changelog Formatting

### 🐛 Bug Fixes
- **Changelog Formatting & Insertion Logic**: Resolved a structural issue where new release logs were being incorrectly prepended at the absolute top of the [CHANGELOG.md](cci:7://file:///c:/Users/mylaptop.ge/Downloads/npm-trusted-publisher/npm-trusted-publisher-1.0.1/CHANGELOG.md:0:0-0:0) file (above the primary `# Changelog` header). 
- **Intelligent Parsing**: Implemented a dynamic Node.js-based scanner inside the workflow. It now intelligently locates the first historical release tag (`## [`) and safely injects new release entries exactly above it. This seamlessly preserves any custom headers, introductions, or the standard "Keep a Changelog" formatting without breaking the document's structure.


## [v2.0.1] - 2026-03-22 - v2.0.1 Bug Fixes

### 🐛 Bug Fixes
- **Missing Changelog Resolution**: Fixed an issue where the generated [CHANGELOG.md](cci:7://file:///c:/Users/mylaptop.ge/Downloads/npm-trusted-publisher/npm-trusted-publisher-1.0.1/CHANGELOG.md:0:0-0:0) file was silently being ignored by npm during publication. Explicitly appended `"CHANGELOG.md"` to the `files` array deep inside [package.json](cci:7://file:///c:/Users/mylaptop.ge/Downloads/npm-trusted-publisher/npm-trusted-publisher-1.0.1/package.json:0:0-0:0) to guarantee its persistent inclusion in the final downloaded package.


## [v2.0.0] - 2026-03-22 - Significant improvement

### ✨ Enhancements & Smart Features

- **Smart Changelog Generation (Zero-Config)**: The publishing workflow now intelligently handles your `CHANGELOG.md` file:
  - **Auto-Creation**: If a project doesn't have a `CHANGELOG.md` file, the workflow will now automatically generate a standard-compliant one from scratch during the first release setup.
  - **Duplicate Prevention**: Implemented a bulletproof Regex implementation (`grep -qE "^## \[$TAG_NAME\]"`) that detects existing release tags in the changelog. If you manually authored the release entry or triggered a workflow re-run, it intelligently skips insertion to prevent duplicate records.
- **Branded Workflow Identity**: Renamed the core workflow template from the generic `npm-publish.yml` to `kd-npm-publish.yml` to establish a unique identity and completely prevent naming conflicts in developer repositories. The CLI generator (`npx npm-trusted-publisher init`) has been fully re-routed to use this branded template.
- **Polished Documentation**: Overhauled the `README.md` intro section for better readability. Emphasized the total elimination of `NPM_TOKEN` secrets and highlighted the "zero-config CLI" to immediately demonstrate the tool's core value proposition.
- **Improved npm Metadata**: Updated the `package.json` description with stronger keywords (e.g., "provenance-backed releases") for better SEO and discoverability directly on the npm registry.

### 📝 Documentation & Legal

- **Independence Disclaimer**: Included a clear disclaimer in the README footer to explicitly state the project's independence and lack of affiliation with npm, Inc.

## [v1.0.1] - 2026-03-22 - First Functional Release 🚀

🎉 Welcome to the first fully functional release of `npm-trusted-publisher`!

This CLI tool automates the setup of a secure, secretless npm publishing workflow using GitHub Actions and OIDC.

### ✨ Features Included in v1.0.1

- **CLI Installer**: Run `npx npm-trusted-publisher init` to instantly set up the workflow in any project.
- **OIDC Integration**: Publish to npm securely without ever storing an `NPM_TOKEN`.
- **Smart CI/CD**: Automatically syncs `package.json` versions, generates changelogs, and commits build artifacts.
- **Validation**: Built-in project validation checks to ensure proper execution.

### 📖 Getting Started

Check out the complete setup guide and available methods in the [README](./README.md).
