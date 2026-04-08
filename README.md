# My Wallet agent plugins

This repository is a platform-consumable plugin source repo generated from the My Wallet headless build repo.

Source of truth:
- build/source repo: `my-headless/scope-integrations`
- this repo is a synchronized publication target for Cursor, Claude Code, and Codex
- changes here are produced by `npm run headless:publish-plugins` in the main repo
- the publish flow syncs content, then runs `git add -A`, `git commit -m "v<version>"`, and `git push` when content changes

Current published version: 4.7.6

## Consumable plugin roots
- `cursor/mywallet-cursor/`
- `claude-code/mywallet-claude-code/`
- `codex/mywallet-codex/`

## Root host-native marketplace files
- `.cursor-plugin/marketplace.json` → `cursor/mywallet-cursor/`
- `.claude-plugin/marketplace.json` → `claude-code/mywallet-claude-code/`
- `.agents/plugins/marketplace.json` → `codex/mywallet-codex/`

## Notes
- The downstream repo does not keep versioned release directories, zip archives, checksums, or release metadata.
- The installable plugin roots are copied from the staged host bundles in the main repo.
- Edit build logic in `my-headless/scope-integrations`, not here.
