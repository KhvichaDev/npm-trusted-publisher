# Changelog

All notable changes to this project will be documented in this file.

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

Check out the complete setup guide and available methods in the [README](#).
