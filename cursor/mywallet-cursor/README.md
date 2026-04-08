# My Wallet for Cursor

This directory is the repo-owned, user-facing Cursor offering for My Wallet.
It turns the shared plugin root into a direct-install artifact with end-user docs, release guidance, and a clean-install validation path.

## What this offering is

`My Wallet for Cursor` is a local Cursor integration that runs the packaged `mywallet-mcp` server on your machine and exposes the canonical `mywallet_*` wallet tools.
It is built from the shared plugin root in `headless/platforms/shared-plugin/` so Cursor stays aligned with the same runtime semantics, launcher contract, and approval-aware wallet behavior as the other supported hosts.

## What you get

After installing the staged offering into Cursor, you get local access to the canonical My Wallet tool surface, including flows such as:

- wallet creation and receive-address lookup
- balances, token balances, portfolio, staking, and recent activity
- approval-aware transfer preparation and transfer approval execution
- approval-aware message signing
- saved-address management and swap/staking read paths already exposed by the shared runtime

Representative tools include:

- `mywallet_create_wallet`
- `mywallet_get_address`
- `mywallet_get_balances`
- `mywallet_prepare_transfer`
- `mywallet_create_transfer_approval_request`
- `mywallet_approve_approval_request`
- `mywallet_sign_message`
- `mywallet_get_portfolio_summary`

## What this offering does not claim

This slice is intentionally honest about support boundaries.
It does **not** claim:

- ChatGPT support
- universal host support
- hosted/remote wallet execution
- a Cursor marketplace/store publication that is already live
- host-native approval bypasses for transfers or signing

This is a **direct-install-first** Cursor offering built from the repo and staged as a local installable artifact.

## Prerequisites

Before you install:

- Node.js `>=22.6.0`
- npm `>=10.8.0`
- a local checkout of this repository with dependencies installed
- the knowledge-base submodule initialized:
  ```bash
  git submodule update --init --recursive
  ```

## Build the installable Cursor artifact

From the repo root:

```bash
npm run build:headless:cursor
```

That command stages the local build outputs:

- `headless/platforms/cursor/.dist/mywallet-cursor/`
- `headless/platforms/cursor/.dist/mywallet-cursor.zip`

## Prepare the public release artifacts

For the maintainer-facing public release pass, use:

```bash
npm run build:headless:cursor:release
```

That command rebuilds the staged offering and prepares a versioned release directory under:

- `headless/platforms/cursor/.dist/releases/mywallet-cursor-v<version>/`

The public release contract in that directory is:

- `mywallet-cursor-v<version>.zip` — the end-user download/install artifact
- `release.json` — release metadata describing version, archive root, and upload/distribution contract
- `checksums.txt` — SHA-256 for the versioned archive
- `release-notes.md` — maintainer publication/template notes for the pass

The staged root is a Cursor-facing direct-install package built from:

- the shared plugin manifest and Cursor wrapper manifest
- the shared `.mcp.json`
- the shared launcher
- the shared skills and shared assets
- the bundled `payload/` generated from the shared payload entries
- this offering README and its release checklist

## Install in Cursor

Use the staged directory or the staged zip as the install source for your local Cursor plugin/import flow.

Recommended direct-install source during local maintainer testing:

```text
headless/platforms/cursor/.dist/mywallet-cursor/
```

Public release archive for end users:

```text
headless/platforms/cursor/.dist/releases/mywallet-cursor-v<version>/mywallet-cursor-v<version>.zip
```

Local non-versioned archive variant:

```text
headless/platforms/cursor/.dist/mywallet-cursor.zip
```

The exact UI wording in Cursor may change over time, but the install target should be the staged offering root or its zip archive — **not** the raw `shared-plugin/` source tree.

## Verify the staged offering before relying on it

Focused smoke path:

```bash
npm run test:headless:cursor:smoke
```

Clean-install harness against the default staged archive:

```bash
npm run test:headless:cursor:isolation -- \
  --output ./headless/platforms/cursor/.dist/isolation-report.json
```

Clean-install harness against the versioned public release archive:

```bash
npm run test:headless:cursor:isolation -- \
  --bundle-archive ./headless/platforms/cursor/.dist/releases/mywallet-cursor-v<version>/mywallet-cursor-v<version>.zip \
  --output ./headless/platforms/cursor/.dist/isolation-report.json
```

The harness unpacks the archive in a temp directory, verifies the expected Cursor-facing files are present, launches the bundled MCP server through the staged launcher, and proves `initialize`, `tools/list`, and `mywallet_status` against the release-prepared artifact.

## Troubleshooting

### The build says the knowledge-base submodule is missing

Run:

```bash
git submodule update --init --recursive
```

Then retry the build.

### Cursor import/install does not like the raw repo files

Use the staged `.dist/mywallet-cursor/` directory or `.dist/mywallet-cursor.zip` archive.
Do not point Cursor at `headless/platforms/shared-plugin/` directly if you want the tested release shape.

### The staged offering installs, but the server does not start

Run the clean-install harness first:

```bash
npm run test:headless:cursor:isolation
```

If that fails, treat it as a packaging/runtime problem in the staged offering.
If that passes but Cursor still misbehaves, treat it as a host-side integration issue and keep release claims conservative.

### I need a lower-level fallback path

The shared plugin root still contains the thin Cursor wrapper manifest at:

- `headless/platforms/shared-plugin/.cursor-plugin/plugin.json`

That is the architecture-level substrate.
The supported user-facing release surface in this repo is this `headless/platforms/cursor/` offering directory and its staged `.dist/` output.

## Release/distribution posture

This offering is prepared for real end-user distribution as a repo-owned direct-install package.
For the maintainer checklist — artifact shape, validation expectations, and what must be inspected before any publication claim — see [PUBLISHING.md](./PUBLISHING.md).
