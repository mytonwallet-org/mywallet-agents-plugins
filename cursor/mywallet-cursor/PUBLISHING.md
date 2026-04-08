# Publishing notes for `My Wallet for Cursor`

This directory is the maintainer-owned release surface for the direct-install Cursor offering.
It exists so Cursor distribution can be reviewed, built, tested, and described
as a product without creating a second runtime source of truth outside
`headless/platforms/shared-plugin/`.

## What artifact is released

The build-stage outputs remain:

- `headless/platforms/cursor/.dist/mywallet-cursor/`
- `headless/platforms/cursor/.dist/mywallet-cursor.zip`

The public release-preparation output is a versioned directory:

- `headless/platforms/cursor/.dist/releases/mywallet-cursor-v<version>/`

That versioned release directory must contain exactly these maintainer/public artifacts:

- `mywallet-cursor-v<version>.zip` — the end-user download and install archive
- `release.json` — release contract metadata
- `checksums.txt` — SHA-256 manifest for the versioned archive
- `release-notes.md` — maintainer release notes / publication template

The archive itself should contain:

- `.plugin/plugin.json`
- `.cursor-plugin/plugin.json`
- `.mcp.json`
- `README.md`
- `PUBLISHING.md`
- `assets/`
- `launcher/`
- `payload/`
- `skills/`

## Real distribution channels

Cursor currently has three practical distribution paths for this offering:

- **Official public distribution**: submit a public Git repository to the
  Cursor Marketplace at `cursor.com/marketplace/publish`. Cursor documents
  this as the reviewed public listing path.
- **Private org distribution**: use a Team / Enterprise marketplace by importing a GitHub repository in Cursor dashboard settings.
- **Early testing / beta distribution**: install the plugin locally from
  `~/.cursor/plugins/local/` or by symlinking a plugin checkout there.

For this repo, the recommended default is:

- use the **official Cursor Marketplace** for public distribution
- use **local install / symlink** for early testing and beta validation
- do **not** build separate team-marketplace infrastructure unless private org rollout is actually needed

The versioned zip and release directory produced here are maintainer-controlled
QA / release artifacts. They are useful for manual review, checksuming,
release notes, and fallback/manual sharing, but they are **not** by
themselves proof of a live Cursor Marketplace listing.

## Release contract

The Cursor offering stays grounded in the shared plugin architecture:

- `headless/platforms/shared-plugin/` remains the canonical owner of shared plugin metadata, launcher, skills, payload entries, and assets
- `headless/platforms/cursor/` owns only the user-facing release surface, build glue, release docs, and validation harness
- canonical `mywallet_*` tool names must remain unchanged

## Release checklist

1. Run the focused repo test for the shared plugin scaffold:
   ```bash
   npm run test:headless:platforms
   ```
2. Prepare the versioned release artifacts:
   ```bash
   npm run build:headless:cursor:release
   ```
3. Inspect the release contract metadata:
   ```bash
   cat headless/platforms/cursor/.dist/releases/mywallet-cursor-v$(node -p "require('./package.json').version")/release.json
   cat headless/platforms/cursor/.dist/releases/mywallet-cursor-v$(node -p "require('./package.json').version")/checksums.txt
   ```
4. Run the clean-install smoke path:
   ```bash
   npm run test:headless:cursor:smoke
   ```
5. Run the isolation harness against the versioned public release archive and keep the report with the release notes:
   ```bash
   npm run test:headless:cursor:isolation -- \
     --bundle-archive ./headless/platforms/cursor/.dist/releases/mywallet-cursor-v$(node -p "require('./package.json').version")/mywallet-cursor-v$(node -p "require('./package.json').version").zip \
     --output ./headless/platforms/cursor/.dist/isolation-report.json
   ```
6. Inspect the release archive contents before making any publication claim:
   ```bash
   python3 - <<'PY'
   import json, pathlib
   version = json.loads(pathlib.Path('package.json').read_text())['version']
   root = pathlib.Path(f'headless/platforms/cursor/.dist/releases/mywallet-cursor-v{version}')
   print('release dir:', root)
   for path in sorted(root.iterdir()):
       print(path.name)
   PY
   python3 - <<'PY'
   import json, pathlib, zipfile
   version = json.loads(pathlib.Path('package.json').read_text())['version']
   archive_path = pathlib.Path(f'headless/platforms/cursor/.dist/releases/mywallet-cursor-v{version}/mywallet-cursor-v{version}.zip')
   with zipfile.ZipFile(archive_path) as archive:
       for name in sorted(archive.namelist()):
           print(name)
   PY
   ```
7. Re-read the end-user docs and confirm they are still honest:
   - direct-install first
   - official marketplace submission path may be described, but no live listing claim unless actually listed
   - local install / symlink path may be described for early testing
   - no unnecessary team-marketplace story for this single-plugin case
   - no ChatGPT/universal-host claim
   - no approval-bypass claim

## Support boundary

Safe claims for this slice:

- there is a real repo-owned Cursor offering surface
- maintainers can build a tested direct-install artifact
- the staged artifact launches the bundled MCP server locally through the shared launcher contract
- the offering exposes the canonical shared My Wallet tool surface
- Cursor documents both an official marketplace submission path and a local plugin install path

Claims to avoid unless separately proven elsewhere:

- live marketplace/store publication
- fully automated end-to-end Cursor GUI installation proof
- hosted/remote execution
- support for unrelated hosts

## Versioning expectations

The staged offering inherits the repo/package version through the bundled payload metadata.
The public release pass materializes that version explicitly as:

- release directory: `mywallet-cursor-v<version>/`
- user archive: `mywallet-cursor-v<version>.zip`
- metadata contract: `release.json`
- checksum manifest: `checksums.txt`

If the offering docs or artifact contract change materially, rebuild the release directory and rerun the smoke/isolation checks in the same release pass.

## Reviewer watch-outs

- `README.md`, `PUBLISHING.md`, release metadata, and smoke expectations must stay aligned
- `.cursor-plugin/plugin.json` and `.plugin/plugin.json` must remain derived from the shared plugin metadata instead of drifting
- the release archive must remain a repackaging of the staged offering, not a second implementation path
- the staged offering must continue to use the bundled launcher + `payload/` output rather than raw TypeScript runners
- if Cursor host behavior changes, update the docs conservatively instead of overclaiming support
