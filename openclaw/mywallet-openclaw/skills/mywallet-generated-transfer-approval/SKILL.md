---
name: mywallet-generated-transfer-approval
description: Prepare a transfer without executing it, create a runtime approval request, and explain that host confirmation does not replace runtime approval.
---

# Generated OpenClaw transfer approval skill

This runtime skill is generated from the compiled bundle context artifacts below so hosts consume knowledge through their normal staged `skills/` seam.

- Compiled manifest: `context/context-manifest.json`
- Compiled markdown: `context/context.md`
- Source count: 30
- Primary workflow source: `headless/docs/knowledge/workflows/approvals.md`
- Workflow family: approvals
- Routing intents: transfer-preparation, transfer-approval, sign-message
- Routing hosts: openclaw, claude, claude-code, cursor, codex
- Proof scenarios: transfer-approval

Use this skill when the user wants a transfer prepared but not executed and wants the approval boundary explained.

## Required tool flow

1. Call `mywallet_prepare_transfer` with the exact asset, amount, and destination.
2. Create a stored approval object with `mywallet_create_transfer_approval_request`.
3. Do not execute with `mywallet_submit_transfer`.

## Response requirements

- Explicitly say runtime approval is still required.
- Explicitly say OpenClaw UI confirmation does not replace `mywallet_approve_approval_request`.
