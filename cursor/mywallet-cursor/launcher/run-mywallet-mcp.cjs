#!/usr/bin/env node

const { existsSync } = require('node:fs');
const { resolve } = require('node:path');

const bundleRoot = resolve(__dirname, '..');
const packagedMcpPath = resolve(bundleRoot, 'payload/mywallet-mcp.cjs');
const packagedCliPath = resolve(bundleRoot, 'payload/mywallet.cjs');

if (!existsSync(packagedMcpPath)) {
  process.stderr.write(`Missing bundled MCP payload at ${packagedMcpPath}\n`);
  process.exit(1);
}

if (!existsSync(packagedCliPath)) {
  process.stderr.write(`Missing bundled CLI payload at ${packagedCliPath}\n`);
  process.exit(1);
}

if (!process.argv.includes('--mywallet-bin')) {
  process.argv.splice(2, 0, '--mywallet-bin', packagedCliPath);
}

require(packagedMcpPath);
