---
name: mywallet-onboarding
description: Use My Wallet on Codex for wallet creation, address lookup, top-up guidance, and first-use balance checks.
---

# Codex wallet onboarding

This runtime skill is generated from the compiled bundle context artifacts below so hosts consume knowledge through their normal staged `skills/` seam.

- Compiled manifest: `context/context-manifest.json`
- Compiled markdown: `context/context.md`
- Source count: 26
- Primary workflow source: `headless/docs/knowledge/workflows/onboarding.md`
- Workflow family: onboarding
- Routing intents: create-wallet, receive-address, first-funding
- Routing hosts: openclaw, claude, claude-code, cursor, codex
- Proof scenarios: onboarding-topup

# Wallet onboarding workflow

Canonical workflow guidance for chat-first wallet onboarding across supported hosts.

## Start with restored state

1. Call `mywallet_status` first to inspect restored runtime state.
2. If a wallet already exists, continue with the active account instead of creating a replacement wallet.
3. If no wallet exists and the user wants a new one, call `mywallet_create_wallet` with the user-provided password.
4. Tell the user that `mywallet_create_wallet` returns mnemonic-bearing custody material and that they must store it safely.

## Show a receive address

1. Use `mywallet_get_address` for the requested or restored active account and chain.
2. Explain “top up” narrowly as sending funds to that returned address.
3. Do not broaden onboarding into swaps, bridges, exchange flows, or fiat purchase guidance.

## Confirm first funding

1. Use `mywallet_get_balances` for native balances.
2. Use `mywallet_get_token_balances` when fungible-token balances matter.
3. If balances are still catching up, call `mywallet_wait_for_balances` before claiming funds are ready.

## When the conversation moves beyond onboarding

- Keep this workflow receive-side and first-use focused.
- When the user wants to spend funds or sign data, switch to the approval-aware flow from `workflows/approvals.md`.
