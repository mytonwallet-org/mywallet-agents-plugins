---
name: mywallet-generated-onboarding-topup
description: Create a fresh test wallet with a provided password, explain receive-side top up only, and avoid swaps, bridges, exchanges, or fiat detours.
---

# Generated Cursor onboarding/top-up skill

This runtime skill is generated from the compiled bundle context artifacts below so hosts consume knowledge through their normal staged `skills/` seam.

- Compiled manifest: `context/context-manifest.json`
- Compiled markdown: `context/context.md`
- Source count: 26
- Primary workflow source: `headless/docs/knowledge/workflows/onboarding.md`
- Workflow family: onboarding
- Routing intents: create-wallet, receive-address, first-funding
- Routing hosts: openclaw, claude, claude-code, cursor, codex
- Proof scenarios: onboarding-topup

Use this skill when the user wants a fresh test wallet created now, supplies a password, and wants receive-side top-up guidance without broader swap/bridge/exchange advice.

## Required tool flow

1. Call `mywallet_status` first.
2. If no wallet exists and the user asked for a fresh wallet, call `mywallet_create_wallet` with the user-provided password.
3. Call `mywallet_get_address` for the requested receive chain after the wallet exists.

## Response requirements

- Explicitly warn that the mnemonic / recovery phrase is sensitive custody material and must be stored safely offline.
- Define top up narrowly as sending funds to the returned receive address.
- Do not broaden into swaps, bridges, exchanges, or fiat purchase flows.
