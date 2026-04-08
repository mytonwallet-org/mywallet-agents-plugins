# Publishing notes for `My Wallet for Codex`

This directory is the maintainer-owned release surface for the direct-install Codex offering.
It exists so Codex distribution can be reviewed, built, tested, and described
as a product without creating a second runtime source of truth outside
`headless/platforms/shared-plugin/`.

## What artifact is released

The build-stage outputs remain:

- `headless/platforms/codex/.dist/mywallet-codex/`
- `headless/platforms/codex/.dist/mywallet-codex.zip`

The public release-preparation output is a versioned directory:

- `headless/platforms/codex/.dist/releases/mywallet-codex-v<version>/`

That versioned release directory must contain exactly these maintainer/public artifacts:

- `mywallet-codex-v<version>.zip` — the end-user download and install archive
- `release.json` — release contract metadata
- `checksums.txt` — SHA-256 manifest for the versioned archive
- `release-notes.md` — maintainer release notes / publication template

The archive itself should contain:

- `.plugin/plugin.json`
- `.codex-plugin/plugin.json`
- `.mcp.json`
- `README.md`
- `PUBLISHING.md`
- `assets/`
- `launcher/`
- `payload/`
- `skills/`

## Release contract

The Codex offering stays grounded in the shared plugin architecture:

- `headless/platforms/shared-plugin/` remains the canonical owner of shared plugin metadata, launcher, skills, payload entries, and assets
- `headless/platforms/codex/` owns only the user-facing release surface, build glue, release docs, and validation harness
- canonical `mywallet_*` tool names must remain unchanged

The shipped `headless/platforms/codex/config.toml` file remains the documented fallback/manual configuration path.
It should stay lower-level than the repo-owned direct-install release surface and should not be presented as the primary artifact.

## Real distribution channels

Codex is the current exception in this host set.

- **Official public directory publishing**: not yet a real self-serve path.
  OpenAI's Codex author docs still describe official public plugin publishing
  as "coming soon".
- **Current practical distribution**: repo-scoped or personal marketplace
  catalogs via `$REPO_ROOT/.agents/plugins/marketplace.json` or
  `~/.agents/plugins/marketplace.json`.

For this repo, the recommended default is:

- keep the repo-owned direct-install offering as the canonical release surface for docs, QA, and artifact review
- use a **tiny curated marketplace file** as the real install/distribution bridge for Codex when needed
- do **not** build standalone marketplace infrastructure for a single plugin
- switch to official public directory publishing only after OpenAI opens a real self-serve path

Important nuance: Codex's current docs do **not** present raw plugin-repo
installation as the primary path. The minimal honest install unit today is
still a marketplace catalog entry, even for local or team distribution.

The versioned zip and release directory produced here are maintainer-controlled
QA / release artifacts. They support manual review, checksuming, release
notes, and artifact discipline, but current Codex installation still flows
through a marketplace catalog rather than raw archive distribution.

## Release checklist

1. Run the focused repo test for the shared plugin scaffold:
   ```bash
   npm run test:headless:platforms
   ```
2. Prepare the versioned release artifacts:
   ```bash
   npm run build:headless:codex:release
   ```
3. Inspect the release contract metadata:
   ```bash
   cat headless/platforms/codex/.dist/releases/mywallet-codex-v$(node -p "require('./package.json').version")/release.json
   cat headless/platforms/codex/.dist/releases/mywallet-codex-v$(node -p "require('./package.json').version")/checksums.txt
   ```
4. Run the clean-install smoke path:
   ```bash
   npm run test:headless:codex:smoke
   ```
5. Run the isolation harness against the versioned public release archive and keep the report with the release notes:
   ```bash
   npm run test:headless:codex:isolation -- \
     --bundle-archive ./headless/platforms/codex/.dist/releases/mywallet-codex-v$(node -p "require('./package.json').version")/mywallet-codex-v$(node -p "require('./package.json').version").zip \
     --output ./headless/platforms/codex/.dist/isolation-report.json
   ```
6. Inspect the release archive contents before making any publication claim:
   ```bash
   python3 - <<'PY'
   import json, pathlib
   version = json.loads(pathlib.Path('package.json').read_text())['version']
   root = pathlib.Path(f'headless/platforms/codex/.dist/releases/mywallet-codex-v{version}')
   print('release dir:', root)
   for path in sorted(root.iterdir()):
       print(path.name)
   PY
   python3 - <<'PY'
   import json, pathlib, zipfile
   version = json.loads(pathlib.Path('package.json').read_text())['version']
   archive_path = pathlib.Path(f'headless/platforms/codex/.dist/releases/mywallet-codex-v{version}/mywallet-codex-v{version}.zip')
   with zipfile.ZipFile(archive_path) as archive:
       for name in sorted(archive.namelist()):
           print(name)
   PY
   ```
7. Re-read the end-user docs and confirm they are still honest:
   - direct-install first
   - no false official public publishing claim
   - curated marketplace path may be described as the real current install bridge
   - no false raw plugin-repo install claim
   - no ChatGPT/universal-host claim
   - no approval-bypass claim
   - `config.toml` still described as fallback/manual rather than the primary surface

## Support boundary

Safe claims for this slice:

- there is a real repo-owned Codex offering surface
- maintainers can build a tested direct-install artifact
- the staged artifact launches the bundled MCP server locally through the shared launcher contract
- the offering exposes the canonical shared My Wallet tool surface
- current practical Codex distribution can be done through repo-scoped or personal marketplace catalogs

Claims to avoid unless separately proven elsewhere:

- live marketplace/store publication
- self-serve official public directory publishing
- raw direct plugin-repo installation as the primary documented path
- fully automated end-to-end Codex GUI installation proof
- hosted/remote execution
- support for unrelated hosts

## Versioning expectations

The staged offering inherits the repo/package version through the bundled payload metadata.
The public release pass materializes that version explicitly as:

- release directory: `mywallet-codex-v<version>/`
- user archive: `mywallet-codex-v<version>.zip`
- metadata contract: `release.json`
- checksum manifest: `checksums.txt`

If the offering docs or artifact contract change materially, rebuild the release directory and rerun the smoke/isolation checks in the same release pass.

## Reviewer watch-outs

- `README.md`, `PUBLISHING.md`, release metadata, and smoke expectations must stay aligned
- `.codex-plugin/plugin.json` and `.plugin/plugin.json` must remain derived from the shared plugin metadata instead of drifting
- the release archive must remain a repackaging of the staged offering, not a second implementation path
- the staged offering must continue to use the bundled launcher + `payload/` output rather than raw TypeScript runners
- `headless/platforms/codex/config.toml` must remain documented as fallback/manual unless the repo intentionally retires it in a future change
- if Codex host behavior changes, update the docs conservatively instead of overclaiming support
