---
name: mywallet-approvals
description: Use My Wallet on OpenClaw safely for balances, transfer preparation, and approval-aware signing.
---

# OpenClaw wallet approvals

Use this skill after My Wallet for OpenClaw (`mywallet`) is installed and the Gateway has been restarted.

## Balance checks

1. Start with `mywallet_status` to inspect restored state.
2. Use `mywallet_get_balances` for native balances and `mywallet_get_token_balances` for fungible tokens.
3. If balances are not ready yet, call `mywallet_wait_for_balances` before making spending or affordability claims.

## Transfers

1. Prepare the action with `mywallet_prepare_transfer`.
2. Create the explicit runtime approval object with `mywallet_create_transfer_approval_request`.
3. Review the request with `mywallet_get_approval_request` or `mywallet_list_approval_requests`.
4. Ask the user to confirm the exact asset, amount, destination, and timing.
5. Only execute after explicit approval with `mywallet_approve_approval_request`.
6. If the user declines or details changed, use `mywallet_reject_approval_request`.

Do not imply host-native approval bypasses for transfers. Only `mywallet_approve_approval_request` should execute a stored transfer approval request.

## Signing

1. Create signing work through `mywallet_create_sign_message_approval_request`.
2. Inspect the stored request with `mywallet_get_approval_request` or `mywallet_list_approval_requests`.
3. Complete the action with `mywallet_approve_approval_request` only after explicit approval.
4. Use `mywallet_reject_approval_request` when approval is denied.

Keep signing approval-aware even when OpenClaw could show its own confirmation UI.
