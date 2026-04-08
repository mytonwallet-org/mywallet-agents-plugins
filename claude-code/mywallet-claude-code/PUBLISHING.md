# Publishing notes for `My Wallet for Claude Code`

This directory is the maintainer-owned release surface for the direct-install Claude Code offering.
It exists so Claude Code distribution can be reviewed, built, tested, and
described as a product without creating a second runtime source of truth
outside `headless/platforms/shared-plugin/`.

## What artifact is released

The build-stage outputs remain:

- `headless/platforms/claude-code/.dist/mywallet-claude-code/`
- `headless/platforms/claude-code/.dist/mywallet-claude-code.zip`

The public release-preparation output is a versioned directory:

- `headless/platforms/claude-code/.dist/releases/mywallet-claude-code-v<version>/`

That versioned release directory must contain exactly these maintainer/public artifacts:

- `mywallet-claude-code-v<version>.zip` — the end-user download and install archive
- `release.json` — release contract metadata
- `checksums.txt` — SHA-256 manifest for the versioned archive
- `release-notes.md` — maintainer release notes / publication template

The archive itself should contain:

- `.plugin/plugin.json`
- `.claude-plugin/plugin.json`
- `.mcp.json`
- `README.md`
- `PUBLISHING.md`
- `assets/`
- `launcher/`
- `payload/`
- `skills/`

## Real distribution channels

Claude Code currently has two real distribution shapes for this offering:

- **Official public distribution**: Anthropic's official marketplace
  (`claude.com/plugins`), with documented submission flows from Claude /
  Platform.
- **Independent or team distribution**: a self-hosted marketplace source
  added with `/plugin marketplace add`, backed by GitHub, another git URL,
  a local path, or a hosted `marketplace.json`.

For this repo, the recommended default is:

- use the **official Anthropic marketplace** for public distribution
- use a **tiny self-hosted marketplace** only as the fallback / beta / private-team path
- do **not** build a separate marketplace product, site, or admin layer for a single plugin

Important nuance: Claude Code's docs clearly support git/local/URL
distribution through **marketplace sources**. They do **not** present raw
plugin-repo installation as the primary documented install flow. So if we
need an off-marketplace path, the minimal honest unit is a one-file
marketplace catalog, not a larger marketplace system.

The versioned zip and release directory produced here are maintainer-controlled
QA / release artifacts. They support manual review, checksuming, release
notes, and self-hosted distribution packaging, but they are **not** by
themselves proof of a live official marketplace listing.

## Release contract

The Claude Code offering stays grounded in the shared plugin architecture:

- `headless/platforms/shared-plugin/` remains the canonical owner of shared plugin metadata, launcher, skills, payload entries, and assets
- `headless/platforms/claude-code/` owns only the user-facing release surface, build glue, release docs, and validation harness
- canonical `mywallet_*` tool names must remain unchanged

## Release checklist

1. Run the focused repo test for the shared plugin scaffold:
   ```bash
   npm run test:headless:platforms
   ```
2. Prepare the versioned release artifacts:
   ```bash
   npm run build:headless:claude-code:release
   ```
3. Inspect the release contract metadata:
   ```bash
   cat headless/platforms/claude-code/.dist/releases/mywallet-claude-code-v$(node -p "require('./package.json').version")/release.json
   cat headless/platforms/claude-code/.dist/releases/mywallet-claude-code-v$(node -p "require('./package.json').version")/checksums.txt
   ```
4. Run the clean-install smoke path:
   ```bash
   npm run test:headless:claude-code:smoke
   ```
5. Run the isolation harness against the versioned public release archive and keep the report with the release notes:
   ```bash
   npm run test:headless:claude-code:isolation -- \
     --bundle-archive ./headless/platforms/claude-code/.dist/releases/mywallet-claude-code-v$(node -p "require('./package.json').version")/mywallet-claude-code-v$(node -p "require('./package.json').version").zip \
     --output ./headless/platforms/claude-code/.dist/isolation-report.json
   ```
6. Inspect the release archive contents before making any publication claim:
   ```bash
   python3 - <<'PY'
   import json, pathlib
   version = json.loads(pathlib.Path('package.json').read_text())['version']
   root = pathlib.Path(f'headless/platforms/claude-code/.dist/releases/mywallet-claude-code-v{version}')
   print('release dir:', root)
   for path in sorted(root.iterdir()):
       print(path.name)
   PY
   python3 - <<'PY'
   import json, pathlib, zipfile
   version = json.loads(pathlib.Path('package.json').read_text())['version']
   archive_path = pathlib.Path(f'headless/platforms/claude-code/.dist/releases/mywallet-claude-code-v{version}/mywallet-claude-code-v{version}.zip')
   with zipfile.ZipFile(archive_path) as archive:
       for name in sorted(archive.namelist()):
           print(name)
   PY
   ```
7. Re-read the end-user docs and confirm they are still honest:
   - direct-install first
   - official marketplace submission path may be described, but no live listing claim unless actually listed
   - self-hosted marketplace path may be described as fallback / beta distribution
   - no false raw plugin-repo install claim
   - no ChatGPT/universal-host claim
   - no approval-bypass claim

## Support boundary

Safe claims for this slice:

- there is a real repo-owned Claude Code offering surface
- maintainers can build a tested direct-install artifact
- the staged artifact launches the bundled MCP server locally through the shared launcher contract
- the offering exposes the canonical shared My Wallet tool surface
- Claude Code documents both an official marketplace path and self-hosted marketplace sources for independent distribution

Claims to avoid unless separately proven elsewhere:

- live marketplace/store publication
- raw direct plugin-repo installation as the primary documented path
- fully automated end-to-end Claude Code GUI installation proof
- hosted/remote execution
- support for unrelated hosts

## Versioning expectations

The staged offering inherits the repo/package version through the bundled payload metadata.
The public release pass materializes that version explicitly as:

- release directory: `mywallet-claude-code-v<version>/`
- user archive: `mywallet-claude-code-v<version>.zip`
- metadata contract: `release.json`
- checksum manifest: `checksums.txt`

If the offering docs or artifact contract change materially, rebuild the release directory and rerun the smoke/isolation checks in the same release pass.

## Reviewer watch-outs

- `README.md`, `PUBLISHING.md`, release metadata, and smoke expectations must stay aligned
- `.claude-plugin/plugin.json` and `.plugin/plugin.json` must remain derived from the shared plugin metadata instead of drifting
- the release archive must remain a repackaging of the staged offering, not a second implementation path
- the staged offering must continue to use the bundled launcher + `payload/` output rather than raw TypeScript runners
- if Claude Code host behavior changes, update the docs conservatively instead of overclaiming support
