#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

if (args[0] !== 'init') {
  console.log('\n❌ Usage: npx npm-trusted-publisher init\n');
  process.exit(1);
}

const cwd = process.cwd();

console.log('🔍 Validating project setup...');

// Validation 1: Check for package.json
if (!fs.existsSync(path.join(cwd, 'package.json'))) {
  console.error('\n❌ Error: package.json not found.');
  console.error('Please run this command in the root of your npm project.\n');
  process.exit(1);
}

// Validation 2: Check for .git directory
if (!fs.existsSync(path.join(cwd, '.git'))) {
  console.error('\n❌ Error: .git directory not found.');
  console.error('This workflow requires a Git repository. Please run "git init" first.\n');
  process.exit(1);
}

console.log('✅ Project setup validates correctly.');

const targetDir = path.join(cwd, '.github', 'workflows');
const targetFile = path.join(targetDir, 'kd-npm-publish.yml');
const sourceFile = path.join(__dirname, '..', 'templates', 'kd-npm-publish.yml');

if (!fs.existsSync(sourceFile)) {
  console.error('\n❌ Error: Template workflow file not found in the package.\n');
  process.exit(1);
}

fs.mkdirSync(targetDir, { recursive: true });

try {
  /** Read the package version to inject into the workflow template for the update notifier */
  const pkgVersion = require(path.join(__dirname, '..', 'package.json')).version;
  const template = fs.readFileSync(sourceFile, 'utf8');
  const output = template.replace(/__NPM_TP_VERSION__/g, pkgVersion);
  fs.writeFileSync(targetFile, output);
  console.log('\n✅ Successfully created: .github/workflows/kd-npm-publish.yml\n');
  console.log('Next steps:');
  console.log('  1. Configure Trusted Publishing on npmjs.com');
  console.log('  2. Create a GitHub Release with a v1.x.x tag');
  console.log('\n🚀 Done! Your package will be published automatically.\n');
} catch (error) {
  console.error('\n❌ Error copying file:', error.message, '\n');
  process.exit(1);
}
