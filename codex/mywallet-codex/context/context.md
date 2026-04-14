# Compiled My Wallet agent context

Host: codex
Version: 2

This file is a deterministic build artifact compiled from playbook pages, workflow docs, local knowledge pages, shared guidance, host overlays, and selected knowledge-base pages.

## Source inventory

- [playbook-page] headless/docs/knowledge/playbook/agent-operating-loop.md
- [playbook-page] headless/docs/knowledge/playbook/routing-principles.md
- [playbook-page] headless/docs/knowledge/playbook/host-boundaries.md
- [workflow-page] headless/docs/knowledge/workflows/onboarding.md family=onboarding documentKind=workflow
- [workflow-page] headless/docs/knowledge/workflows/approvals.md family=approvals documentKind=workflow
- [knowledge-page] headless/docs/knowledge/autonomy-and-approvals.md
- [knowledge-page] headless/docs/knowledge/collectibles.md
- [knowledge-page] headless/docs/knowledge/pricing-and-market-data.md
- [knowledge-page] headless/docs/knowledge/saved-addresses.md
- [knowledge-page] headless/docs/knowledge/security-and-scam-prevention.md
- [knowledge-page] headless/docs/knowledge/sending-and-receiving.md
- [knowledge-page] headless/docs/knowledge/tokens-and-assets.md
- [knowledge-page] headless/docs/knowledge/transaction-history.md
- [knowledge-page] headless/docs/knowledge/wallet-setup-and-recovery.md
- [guidance-page] headless/docs/knowledge/guidance/portfolio.md
- [guidance-page] headless/docs/knowledge/guidance/saved-addresses.md
- [guidance-page] headless/docs/knowledge/guidance/security.md family=security documentKind=guidance
- [guidance-page] headless/docs/knowledge/guidance/staking.md
- [guidance-page] headless/docs/knowledge/guidance/swaps.md family=swaps documentKind=guidance
- [direct-kb-page] headless/docs/knowledge/knowledge-base/concepts/blockchain-basics.md
- [direct-kb-page] headless/docs/knowledge/knowledge-base/concepts/gas-fees.md
- [direct-kb-page] headless/docs/knowledge/knowledge-base/concepts/staking-explained.md
- [direct-kb-page] headless/docs/knowledge/knowledge-base/concepts/swaps-explained.md
- [direct-kb-page] headless/docs/knowledge/knowledge-base/concepts/wallets-explained.md
- [direct-kb-page] headless/docs/knowledge/knowledge-base/resources.md
- [direct-kb-page] headless/docs/knowledge/knowledge-base/security/scam-protection.md

## Source: headless/docs/knowledge/playbook/agent-operating-loop.md

Kind: playbook-page
Document kind: n/a
Family: n/a
Routing intents: n/a
Routing hosts: openclaw, claude, claude-code, cursor, codex
Proof scenarios: n/a

# Agent operating loop

This playbook defines the wallet-agent operating loop that sits above raw tool execution.

## Core loop

1. Start by identifying the user's intent before choosing tools.
2. Load the narrowest workflow or guidance page that matches that intent.
3. Check host boundaries before implying any capability, confirmation, or execution path.
4. Keep deterministic runtime actions below the line: inspect state, prepare actions, create approval objects, and execute only through supported runtime methods.
5. Explain the next safe step in plain language.
6. When the conversation changes scope, switch workflows explicitly instead of stretching the current one.

## Routing priority

Use knowledge in this order:

1. **Playbook** for operating rules and host boundaries.
2. **Workflow pages** for narrow task execution flows such as onboarding and approvals.
3. **Guidance pages** for topic-specific guardrails such as swaps and security.
4. **Host overlays** only to adapt phrasing or host UX assumptions without replacing wallet truth.
5. **Direct KB pages** for general product or crypto concepts that need no platform adaptation.

## Execution boundary

- If the question is about what tools, policies, or approval objects exist, rely on deterministic runtime behavior.
- If the question is about when to use those tools, how to frame the choice, or what to avoid, rely on workflow and guidance knowledge.
- Never let host UI affordances replace runtime approval or policy enforcement.

## Scope discipline

- Keep onboarding receive-side and first-funding focused.
- Move to the approvals workflow when the user wants to spend funds or sign data.
- Use guidance pages to narrow risky or adjacent topics without expanding the workflow into unsupported detours.

## Source: headless/docs/knowledge/playbook/routing-principles.md

Kind: playbook-page
Document kind: n/a
Family: n/a
Routing intents: n/a
Routing hosts: openclaw, claude, claude-code, cursor, codex
Proof scenarios: n/a

# Routing principles

This playbook page defines how wallet-agent knowledge should be selected.

## Intent-first routing

Choose knowledge by user intent, not by whichever file happens to mention a topic.

- onboarding intents map to the onboarding workflow
- approval, transfer, and signing intents map to the approvals workflow
- swap questions map to swap guidance unless the user is explicitly inside an approval-aware execution flow
- security, recovery, and scam questions map to security guidance and supporting knowledge pages

## Family ownership

Treat metadata `family` as the canonical grouping signal for runtime-skill provenance.

- Workflows own primary execution guidance.
- Guidance pages own topic boundaries and risk framing.
- Playbook pages own operating rules and host boundary framing.
- Overlays are supplementary deltas, not primary ownership.

## Host applicability

Use `routing.hosts` to determine whether a page applies to the current host.

- If a page does not apply to the current host, do not use it as primary truth.
- If a page applies to all supported hosts, preserve shared wording unless a host overlay narrows presentation.
- Host-specific overlays must not redefine the underlying wallet workflow.

## Proof linkage

Use `proof.scenarios` to connect knowledge pages to behavioral proof.

- onboarding-topup proves narrow receive-side onboarding
- transfer-approval proves runtime approval boundaries for transfers
- swap-boundaries proves TON-only and no-cross-chain swap framing
- security-recovery proves mnemonic/private-key safety and approval hygiene

## What to avoid

- Do not route by legacy filename alone when manifest metadata is available.
- Do not let overlays become the hidden source of truth.
- Do not merge unrelated intents into a single broad workflow when a narrower family exists.

## Source: headless/docs/knowledge/playbook/host-boundaries.md

Kind: playbook-page
Document kind: n/a
Family: n/a
Routing intents: n/a
Routing hosts: openclaw, claude, claude-code, cursor, codex
Proof scenarios: n/a

# Host boundaries

This playbook page defines the boundary between host UX and wallet runtime truth.

## Shared rule

Host surfaces may present information, collect clarifications, or show confirmation UI, but they do not replace runtime policy enforcement or runtime approval execution.

## Approval boundary

- Preparing a transfer is not the same as executing it.
- Creating an approval request is not the same as approving it.
- Host confirmation must never be described as a substitute for `mywallet_approve_approval_request`.
- The same principle applies to approval-aware message signing.

## Onboarding boundary

- Hosts may help collect a password or requested chain.
- The wallet runtime remains the source of truth for restored-state checks, wallet creation, address lookup, and balance readiness.
- Onboarding guidance must not drift into swaps, bridges, exchanges, or fiat detours just because a host could surface related UI.

## Guidance boundary

- Swap guidance must stay within TON-mainnet DEX support.
- Security guidance must keep mnemonic, private-key, and address-verification warnings intact across hosts.
- Host overlays may adapt wording, but they must not remove core wallet safety constraints.

## Packaging boundary

Generated runtime skills are the supported host seam.

- Hosts consume staged `skills/` output.
- Provenance should point back to compiled context artifacts and manifest metadata.
- Runtime skill filenames may stay stable even as manifest metadata grows richer.

## Source: headless/docs/knowledge/workflows/onboarding.md

Kind: workflow-page
Document kind: workflow
Family: onboarding
Routing intents: create-wallet, receive-address, first-funding
Routing hosts: openclaw, claude, claude-code, cursor, codex
Proof scenarios: onboarding-topup

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

## Source: headless/docs/knowledge/workflows/approvals.md

Kind: workflow-page
Document kind: workflow
Family: approvals
Routing intents: transfer-preparation, transfer-approval, sign-message
Routing hosts: openclaw, claude, claude-code, cursor, codex
Proof scenarios: transfer-approval

# Approval-aware wallet workflow

Canonical workflow guidance for approval-aware balance checks, transfer preparation, and signing across supported hosts.

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

Keep signing approval-aware even when the host could show its own confirmation UI.

## Source: headless/docs/knowledge/autonomy-and-approvals.md

Kind: knowledge-page
Document kind: n/a
Family: n/a
Routing intents: n/a
Routing hosts: openclaw, claude, claude-code, cursor, codex
Proof scenarios: n/a

# Autonomy and Approvals

## Product facts

Autonomy mode determines how much an agent can do without human confirmation. The approval system provides explicit control over sensitive actions like transfers and message signing.

For a beginner-friendly introduction to the three modes, see [Autonomy Modes for My Wallet for Agents](../product/autonomy.md).

## In supported My Wallet hosts

### Checking and setting autonomy mode

Ask the agent what autonomy mode is active (`getAutonomyMode`) or ask it to switch modes (`setAutonomyMode`). The three modes are:

- **review-first** -- sensitive actions create approval requests instead of executing
- **policy** -- sensitive actions execute only when the approval policy allows them
- **autonomous-wallet** -- sensitive actions execute only through the configured autonomous wallet

### Managing the autonomous wallet

Ask the agent to show the autonomous wallet setup (`getAutonomousWallet`), set an account as the autonomous wallet (`setAutonomousWallet`), or clear it (`clearAutonomousWallet`).

In autonomous-wallet mode, the agent acts only from the designated wallet. There is no silent fallback to the main wallet.

### Approval policy

Ask the agent to show the current policy (`getApprovalPolicy`) or update it (`setApprovalPolicy`). The policy covers two action families:

- **transfer** -- with optional `maxAmount`, `allowedDestinations`, `allowUnknownAssets`, and per-chain overrides
- **signMessage** -- with optional `allowedOrigins` and per-chain overrides

Each family has a mode: `allowImmediate` or `requireApproval`.

### Working with approval requests

When the autonomy mode or policy requires approval, the agent creates a pending request:
- Transfer approvals via `createTransferApprovalRequest`
- Sign-message approvals via `createSignMessageApprovalRequest`

Inspect pending requests with `getApprovalRequest` or `listApprovalRequests`. Then approve (`approveApprovalRequest`) or reject (`rejectApprovalRequest`) them explicitly.

### Sensitive action outcomes

When the agent attempts a sensitive action, the result is one of:
- **executed** -- went through immediately
- **approvalCreated** -- waiting for human approval
- **blocked** -- the current mode, policy, or autonomous wallet setup did not allow it

### What is not available in supported My Wallet hosts

- Cloud or remote approval flows
- Host-native approval UIs (approval is managed through the runtime)

## Cross-references

- [Autonomy Modes for My Wallet for Agents](../product/autonomy.md) -- beginner-friendly mode overview
- [First Steps with My Wallet for Agents](../product/first-steps.md) -- recommended day-one setup
- [Sending and Receiving](./sending-and-receiving.md) -- transfer submission and outcomes

## Source: headless/docs/knowledge/collectibles.md

Kind: knowledge-page
Document kind: n/a
Family: n/a
Routing intents: n/a
Routing hosts: openclaw, claude, claude-code, cursor, codex
Proof scenarios: n/a

# Collectibles / NFTs

## Product facts

Collectibles (NFTs) are non-fungible digital assets on-chain. Unlike fungible tokens, each collectible is unique and identified by a specific asset ID or address rather than a quantity.

## In supported My Wallet hosts

### Listing collectibles

Ask the agent to list your collectibles. The agent uses `listCollectibles`, which returns owned collectibles for the active account. Results can be filtered by chain and limited by count.

When a chain's data is temporarily unavailable, it appears in the `unavailableChains` field and `isComplete` is `false`.

### Transferring collectibles

Collectible transfers use dedicated commands separate from fungible transfers:
- Ask the agent to prepare a collectible transfer (`prepareCollectibleTransfer`) to validate and estimate fees
- Ask the agent to submit a collectible transfer (`submitCollectibleTransfer`) to execute it

For Solana collectibles, `assetId` and `address` refer to the same collectible and must match when both are provided.

### What is not available in supported My Wallet hosts

- **NFT marketplace interactions** -- buying, selling, listing, or bidding on NFTs is not available
- **NFT metadata editing** -- modifying collectible properties is not available
- **Collection browsing** -- exploring NFT collections or marketplaces is not available

For these, use the interactive My Wallet app.

## Cross-references

- [Sending and Receiving](./sending-and-receiving.md) -- fungible transfer flow

## Source: headless/docs/knowledge/pricing-and-market-data.md

Kind: knowledge-page
Document kind: n/a
Family: n/a
Routing intents: n/a
Routing hosts: openclaw, claude, claude-code, cursor, codex
Proof scenarios: n/a

# Pricing and Market Data

## Product facts

Crypto asset prices fluctuate continuously. Fiat-denominated values are derived from external price feeds and may be delayed or partially available. Pricing data is informational and should not be treated as trading signals.

## In supported My Wallet hosts

### Currency value of holdings

Ask the agent for the value of your balances in a selected currency. The agent uses `getSelectedCurrencyValues` with one of the supported currencies: USD, EUR, RUB, CNY, BTC, or TON.

Pricing availability is explicit in the response:
- **full** -- all asset values resolved
- **partial** -- some assets could not be priced
- **unavailable** -- pricing data was not available

### Historical prices

Ask the agent for historical price data for a specific asset. The agent uses `getHistoricalPrices` with a chain, asset kind (native or token), currency, and time range (1D, 7D, 1M, 3M, 1Y, ALL).

Historical price availability varies per asset:
- **supported** -- data returned normally
- **partial** -- some data points missing
- **unavailable** -- data could not be retrieved
- **unsupported** -- the asset is outside the shipped historical-price contract

### What is not available in supported My Wallet hosts

- **Rich portfolio analytics** -- allocation charts and deeper analytics are not available
- **Price alerts** -- notification-based price alerts are not available
- **Real-time price streaming** -- continuous price updates are not available

## Cross-references

- [Tokens and Assets](./tokens-and-assets.md) -- balance inspection and token identification
- [Portfolio](./guidance/portfolio.md) -- portfolio summary and current limits

## Source: headless/docs/knowledge/saved-addresses.md

Kind: knowledge-page
Document kind: n/a
Family: n/a
Routing intents: n/a
Routing hosts: openclaw, claude, claude-code, cursor, codex
Proof scenarios: n/a

# Saved Addresses

## Product facts

A saved address is a named entry in your wallet's address book. Saving frequently used addresses reduces the risk of sending to the wrong destination and makes repeat transfers faster.

Each saved address is associated with a specific chain (TON, TRON, or Solana).

## In supported My Wallet hosts

### Listing saved addresses

Ask the agent to show your saved addresses. The agent uses `listSavedAddresses` to return all entries in the address book.

### Adding a saved address

Ask the agent to save an address with a name and chain. The agent uses `addSavedAddress` with `name`, `address`, and `chain`.

### Updating a saved address

Ask the agent to rename a saved address. The agent uses `updateSavedAddress` with the new `name`, the existing `address`, and `chain`.

### Removing a saved address

Ask the agent to remove a saved address. The agent uses `removeSavedAddress` with the `address` and `chain`.

### Using saved addresses with transfers

Saved addresses can be referenced by name when asking the agent to prepare or submit a transfer. The agent can look up the address from the saved list before constructing the transfer.

Saved addresses also work well with approval policies: use `allowedDestinations` in the policy to restrict transfers to your saved addresses.

## Cross-references

- [Sending and Receiving](./sending-and-receiving.md) -- transfer preparation and submission
- [Autonomy and Approvals](./autonomy-and-approvals.md) -- using allowed destinations in approval policies

## Source: headless/docs/knowledge/security-and-scam-prevention.md

Kind: knowledge-page
Document kind: n/a
Family: n/a
Routing intents: n/a
Routing hosts: openclaw, claude, claude-code, cursor, codex
Proof scenarios: n/a

# Security and Scam Prevention

## Key facts

### Recovery phrase safety

Your recovery phrase (mnemonic) is the master key to your wallet. Anyone who has it controls your funds on all chains.

- Store it offline in a secure location
- Never share it in chat, email, or any online service
- No legitimate service will ever ask for your recovery phrase
- If you suspect it has been compromised, create a new wallet and move funds immediately

### Private key safety

Chain-specific private keys grant full control over that chain's assets. The same rules apply as for the recovery phrase: store securely, never share.

### Address verification

Always verify the full destination address before confirming a transfer. Crypto transactions are irreversible. Common scam patterns include:
- Addresses that look similar to a known address but differ by a few characters
- Clipboard hijacking that replaces a copied address
- Impersonation of trusted contacts or services

### Approval hygiene

When an agent requests approval for a sensitive action (transfer, message signing), review the details carefully:
- Verify the destination address
- Verify the amount and asset
- Verify the chain
- If anything looks wrong, reject the request

### Message signing risks

Signing a message can authorize actions beyond a simple transfer, depending on the context. Only sign messages when you understand what the signature will be used for and trust the requesting origin.

### General precautions

- Start with small amounts when testing new workflows
- Use review-first autonomy mode until you are confident in the setup
- Keep your wallet software up to date
- Be skeptical of unsolicited messages or offers

## Source: headless/docs/knowledge/sending-and-receiving.md

Kind: knowledge-page
Document kind: n/a
Family: n/a
Routing intents: n/a
Routing hosts: openclaw, claude, claude-code, cursor, codex
Proof scenarios: n/a

# Sending and Receiving

## Product facts

Sending crypto requires a valid destination address on the correct chain. Transactions are irreversible once confirmed on-chain. Always verify the destination address and chain before submitting.

Receiving requires sharing your address for the correct chain. Each chain (TON, TRON, Solana) has its own address format.

## In supported My Wallet hosts

### Getting a receive address

Ask the agent to show your address for a specific chain. The agent uses `getAddress` with the desired chain.

### Preparing a transfer

Ask the agent to prepare a transfer before submitting it. The agent uses `prepareTransfer`, which validates the destination, estimates fees, and returns a draft without executing anything.

For token transfers, the agent specifies the `tokenAddress` (jetton master for TON, SPL mint for Solana, TRC-20 contract for TRON). Omitting `tokenAddress` means a native-currency transfer.

Amounts are in raw base units (e.g., nanoton for TON, lamports for Solana).

### Submitting a transfer

Ask the agent to submit the transfer. The agent uses `submitTransfer`. The outcome depends on the current autonomy mode:
- **executed** -- the transfer went through immediately
- **approval created** -- a pending approval request was created for human review
- **blocked** -- the current mode or policy did not allow it

### Collectible transfers

Collectible (NFT) transfers use separate commands: `prepareCollectibleTransfer` and `submitCollectibleTransfer`. See [collectibles.md](./collectibles.md).

### Normalizing and looking up addresses

Ask the agent to look up address information. The agent uses `getAddressInfo` to normalize and validate an address for a given chain and network.

### What is not available in supported My Wallet hosts

- Fiat on/off ramp
- QR code generation or scanning
- In-app address book sharing (see [saved-addresses.md](./saved-addresses.md) for the My Wallet address book in supported platforms)

## Cross-references

- [Autonomy and Approvals](./autonomy-and-approvals.md) -- how autonomy mode affects transfer outcomes
- [First Steps with My Wallet for Agents](../product/first-steps.md) -- recommended first transfer flow

## Source: headless/docs/knowledge/tokens-and-assets.md

Kind: knowledge-page
Document kind: n/a
Family: n/a
Routing intents: n/a
Routing hosts: openclaw, claude, claude-code, cursor, codex
Proof scenarios: n/a

# Tokens and Assets

## Product facts

A wallet can hold native currency (TON, TRX, SOL) and fungible tokens on each chain. Fungible tokens follow chain-specific standards: jettons on TON, SPL tokens on Solana, TRC-20 tokens on TRON.

Token balances are reported in raw base units. A token's decimals value determines the human-readable conversion.

## In supported My Wallet hosts

### Checking balances

Ask the agent to show balances. The agent uses `getBalances` for native balances across chains, or `getTokenBalances` for fungible token balances.

Balance readiness can be checked with `hasBalancesSnapshot` or `waitForBalances` when balances have not loaded yet after initialization.

### Transferring tokens

Token transfers use the same `prepareTransfer` and `submitTransfer` commands as native transfers, with an additional `tokenAddress` parameter. See [sending-and-receiving.md](./sending-and-receiving.md).

### Currency value enrichment

Ask the agent for the value of your holdings in a selected currency (USD, EUR, RUB, CNY, BTC, TON). The agent uses `getSelectedCurrencyValues`. Pricing can be full, partial, or unavailable depending on data availability.

### What is not available in supported My Wallet hosts

- **Token discovery or addition** -- browsing and adding new tokens is not available
- **Rich portfolio analytics** -- aggregated portfolio analytics beyond the summary view are not available

## Cross-references

- [Pricing and Market Data](./pricing-and-market-data.md) -- historical prices and currency values
- [Sending and Receiving](./sending-and-receiving.md) -- transfer preparation and submission
- [Swaps](./guidance/swaps.md) -- swap discovery, estimation, and execution
- [Portfolio](./guidance/portfolio.md) -- portfolio summary and current limits

## Source: headless/docs/knowledge/transaction-history.md

Kind: knowledge-page
Document kind: n/a
Family: n/a
Routing intents: n/a
Routing hosts: openclaw, claude, claude-code, cursor, codex
Proof scenarios: n/a

# Transaction History

## Product facts

Every on-chain transaction is permanently recorded. Transaction history includes sends, receives, and contract interactions. Each transaction has a unique ID and/or hash that can be used for lookup.

## In supported My Wallet hosts

### Viewing recent activity

Ask the agent to show recent activity. The agent uses `getRecentActivity`, which returns recent transactions for the active account. Results can be limited by count and paginated with a timestamp cursor.

### Looking up a specific transaction

Ask the agent to look up a transaction by its ID or hash. The agent uses `getTransactionActivity` with either `txId` or `txHash` on a specified chain. Provide exactly one of the two.

### What is not available in supported My Wallet hosts

- **Transaction filtering** -- filtering by token, direction, or date range is not available as a dedicated command. Use `getRecentActivity` with pagination to browse
- **Transaction export** -- CSV or other export formats are not available
- **Push notifications** -- transaction alerts and notification preferences are not available

## Cross-references

- [Sending and Receiving](./sending-and-receiving.md) -- how transfers are prepared and submitted

## Source: headless/docs/knowledge/wallet-setup-and-recovery.md

Kind: knowledge-page
Document kind: n/a
Family: n/a
Routing intents: n/a
Routing hosts: openclaw, claude, claude-code, cursor, codex
Proof scenarios: n/a

# Wallet Setup and Recovery

## Product facts

A self-custodial wallet means only you hold the private keys. There is no server-side backup. If you lose the recovery phrase (mnemonic), the wallet cannot be recovered by anyone.

My Wallet supports TON, TRON, and Solana chains from a single wallet identity.

## In supported My Wallet hosts

### Creating a wallet

Ask the agent to create a wallet. The agent uses `createWallet`, which returns a mnemonic (recovery phrase). Store this phrase securely and offline -- it is the only way to restore the wallet.

After creation, the wallet is automatically activated as the current account.

### Listing and switching accounts

Ask the agent to list accounts (`listAccounts`) or activate a specific account (`activateAccount`). The agent can also show the current active account (`getCurrentAccount`).

### Recovery phrase and private key export

Ask the agent to export the mnemonic (`exportMnemonic`) or a chain-specific private key (`exportPrivateKey`). Both require the wallet password. Treat exported material as highly sensitive.

### What is not available in supported My Wallet hosts

- Importing an existing wallet from a mnemonic or private key
- Cloud backup or multi-device sync
- Biometric authentication or PIN setup

For these, use the interactive My Wallet app.

## Cross-references

- [First Steps with My Wallet for Agents](../product/first-steps.md) -- covers the recommended day-one setup flow

## Source: headless/docs/knowledge/guidance/portfolio.md

Kind: guidance-page
Document kind: n/a
Family: n/a
Routing intents: n/a
Routing hosts: openclaw, claude, claude-code, cursor, codex
Proof scenarios: n/a

# Portfolio

## What are portfolio views?

A portfolio view gives you a consolidated summary of everything you hold: total value across chains, allocation breakdown by asset, and performance over time. In a full portfolio experience, you would see aggregated charts, gain/loss tracking, and diversification metrics.

## Portfolio summary through supported platforms

My Wallet provides a single-command portfolio summary through supported platforms via `getPortfolioSummary`. It composes existing balance, token-balance, and pricing data into one structured response.

### What `getPortfolioSummary` returns

- `totalValue` -- the sum of all resolved native and token currency values in the selected currency, or `undefined` when pricing is entirely unavailable
- `pricingStatus` -- `full`, `partial`, or `unavailable` depending on which assets have price data
- `nativeAssets` -- one entry per chain with a native balance, including display amount, selected-currency value, and share of total
- `tokenAssets` -- one entry per held fungible token across chains, with the same fields
- `collectibleCount` -- total owned collectible count (collectibles are not priced)
- `chainBreakdown` -- per-chain subtotals with total value and asset count
- Each asset entry includes `share` as a percentage of the total (e.g., `"45.2"`) when both the asset value and total value are available

### Example prompts

- "Show me my portfolio summary in USD"
- "What is my total portfolio value in EUR?"
- "How is my portfolio distributed across chains?"

## Building-block commands

You can also use these commands individually to inspect specific aspects:

- "Show my balances" -- returns native balances across all chains (`getBalances`)
- "Show my token balances" -- returns fungible token balances (`getTokenBalances`)
- "What are my holdings worth in USD?" -- returns currency-denominated values for your native and token balances (`getSelectedCurrencyValues`). Supported currencies: USD, EUR, RUB, CNY, BTC, TON
- "Show price history for TON over the last month" -- returns historical price data for a specific asset (`getHistoricalPrices`). Ranges: 1D, 7D, 1M, 3M, 1Y, ALL
- "Show my collectibles" -- returns owned collectibles (`listCollectibles`)

## Limitations

- No historical portfolio value over time (no time-series of total portfolio value)
- No gain/loss or PnL tracking
- Collectibles are counted but not priced
- No cross-account portfolio aggregation (each summary covers one account)
- No allocation targets, rebalancing suggestions, or advisory semantics
- Pricing may be partial or unavailable for some tokens; the response degrades gracefully

For full portfolio analytics, use the interactive My Wallet app.

## Source: headless/docs/knowledge/guidance/saved-addresses.md

Kind: guidance-page
Document kind: n/a
Family: n/a
Routing intents: n/a
Routing hosts: openclaw, claude, claude-code, cursor, codex
Proof scenarios: n/a

# Saved Addresses

## Why save addresses?

Crypto addresses are long and easy to mistype. Saving an address with a recognizable name means you can refer to it by name in future transfers, reducing the risk of sending funds to the wrong destination.

Each saved address is tied to a specific chain (TON, TRON, or Solana). The address book is shared across your wallet, not per account.

## Managing your address book

### List saved addresses

Ask: "Show my saved addresses"

### Add a saved address

Ask: "Save the address UQ123 on TON as Alice"

You need to provide a name, the address, and the chain.

### Rename a saved address

Ask: "Rename saved address UQ123 on TON to Alice payroll wallet"

Renaming changes only the display name. The address and chain stay the same, because those are what identify the entry.

### Remove a saved address

Ask: "Remove saved address UQ123 on TON"

You need to provide the address and chain to identify which entry to remove.

## Using saved addresses with transfers

Before preparing a transfer, you can ask the agent to look up a saved address by name. This lets you say things like:

- "Send 1 TON to Alice" -- the agent can look up Alice's address from the saved list before constructing the transfer
- "Show me the saved addresses for TON before I transfer"

The agent resolves the name to an address using the saved address book, then uses that address in the transfer.

## Combining with approval policies

Saved addresses pair well with the `allowedDestinations` field in your approval policy. You can restrict automated transfers to only go to addresses you have explicitly saved and approved.

For example, if you are using policy mode, you could set your approval policy to only allow transfers to your saved addresses. Any transfer to an unsaved address would be blocked.

For details on approval policies, see [Autonomy Modes](../autonomy.md).

## More details

- Saved address semantics and CLI/MCP examples: [My Wallet for Agents Examples](../examples.md)
- Technical reference: [knowledge/saved-addresses.md](../../knowledge/saved-addresses.md)

## Source: headless/docs/knowledge/guidance/security.md

Kind: guidance-page
Document kind: guidance
Family: security
Routing intents: mnemonic-safety, recovery, scam-prevention
Routing hosts: openclaw, claude, claude-code, cursor, codex
Proof scenarios: security-recovery

# Security, Recovery, and Scam Prevention

## Recovery phrase safety in chat

Your recovery phrase (mnemonic) is the master key to your wallet. In a chat environment, this requires extra care:

- **Never paste your recovery phrase into chat.** Not even to "verify" it. No legitimate agent or service will ask for it in a message
- **If the agent exports your mnemonic**, treat that output as extremely sensitive. Copy it to a secure offline location immediately and do not leave it visible in your chat history
- **The same applies to exported private keys.** These grant full control over the corresponding chain's assets

If you believe your recovery phrase or private key has been exposed in a chat log, create a new wallet and move your funds immediately.

## Address verification for chat-based transfers

Crypto transactions are irreversible. When the agent prepares a transfer, verify the details before approving:

- **Check the full destination address.** Do not rely on just the first and last few characters
- **Confirm the chain.** A TON address sent on TRON will not reach the intended recipient
- **Confirm the amount and asset.** Make sure the token and amount match what you intended
- **Double-check addresses from chat messages.** If someone sent you an address in chat, verify it through an independent channel before transferring

## Approval hygiene

When the agent creates an approval request for a sensitive action, take a moment to review it:

- What is the destination address?
- What is the amount, and in which asset?
- Which chain is being used?
- If it is a message signing request, what is the origin and what will the signature authorize?

If anything looks wrong or unfamiliar, reject the request. You can always create a new one with corrected details.

## Common scam patterns for agent-wallet users

### Impersonation

Someone pretends to be a trusted contact and provides their own address for you to send funds to. Always verify addresses through a separate channel.

### Clipboard hijacking

Malware replaces a copied address with the attacker's address. If you paste an address into chat, verify the pasted value matches the original before confirming.

### Phishing for your recovery phrase

An attacker poses as support or a system message and asks you to share your mnemonic "for verification." No legitimate workflow requires this. Never share it.

### Fake agent instructions

In multi-assistant or plugin environments, a compromised component could instruct the wallet runtime to transfer funds. Use review-first or policy mode to ensure you approve sensitive actions before they execute.

## What to do if your recovery phrase is compromised

1. Create a new wallet immediately (through the agent or the interactive app)
2. Save the new recovery phrase securely and offline
3. Transfer all assets from the compromised wallet to the new one as quickly as possible
4. Do not reuse the compromised recovery phrase for anything

## More details

- General security reference: [knowledge/security-and-scam-prevention.md](../../knowledge/security-and-scam-prevention.md)
- Wallet setup and recovery: [knowledge/wallet-setup-and-recovery.md](../../knowledge/wallet-setup-and-recovery.md)
- Autonomy modes and approval policies: [Autonomy Modes](../autonomy.md)

## Source: headless/docs/knowledge/guidance/staking.md

Kind: guidance-page
Document kind: n/a
Family: n/a
Routing intents: n/a
Routing hosts: openclaw, claude, claude-code, cursor, codex
Proof scenarios: n/a

# Staking

## What is staking?

Staking lets you lock up cryptocurrency to help secure a blockchain network and earn rewards in return. On TON, for example, you can stake TON with a validator or staking pool and receive periodic yield. Staking rewards vary by network conditions and pool terms.

## Available through supported platforms (read-only)

My Wallet provides read-only staking visibility for TON mainnet through supported platforms. You can inspect your active staking positions and view your staking profit history through the chat session.

### What you can do

- **View staking positions** -- see active positions with balance, APY, pool identity, and staking type (nominators, liquid, jetton, ethena)
- **View staking history** -- see your staking profit history with timestamps and profit amounts

### Commands

- `getStakingPositions` -- returns your active staking positions with balances, annual yield, pool identity, and type
- `getStakingHistory` -- returns your staking profit history

### Chat-native example prompts

- "Show my staking positions"
- "What are my current staking balances?"
- "How much have I earned from staking?"
- "Show my staking profit history"
- "What pools am I staking with?"

## Staking actions not yet available through supported platforms

Staking actions are **not available** through supported platforms today. You cannot stake, unstake, or claim rewards through a chat session yet.

### What to do instead

Use the interactive My Wallet app to manage staking actions. Open the app, choose a staking pool or validator, and follow the on-screen flow for new stakes, unstake requests, and reward claims.

### Constraints

- TON-only, mainnet-only. Staking visibility is not available for Solana or TRON chains
- Read-only. No stake, unstake, or claim actions
- Position data depends on backend and on-chain availability. When data cannot be fetched, the response degrades gracefully with `stakingStatus: 'unavailable'` rather than failing

## On the roadmap

Staking action parity (stake, unstake, claim) for supported platforms is planned for a future release. No timeline is committed yet.

## Source: headless/docs/knowledge/guidance/swaps.md

Kind: guidance-page
Document kind: guidance
Family: swaps
Routing intents: swap-assets, swap-estimate, swap-boundaries
Routing hosts: openclaw, claude, claude-code, cursor, codex
Proof scenarios: swap-boundaries

# Swaps

## What are token swaps?

A swap lets you exchange one cryptocurrency token for another directly from your wallet. For example, you might swap TON for a jetton, or trade one token for a different one on the same chain. Swaps are handled by decentralized exchange protocols and typically involve network fees plus a small exchange spread.

## Available through supported platforms

Token swaps are available through supported platforms for TON-mainnet DEX routes. You can discover available assets, preview swap costs, and execute swaps through the chat session.

### Discover available assets

Ask the agent to list available swap assets:

- "What tokens can I swap?" -- lists available swap assets with their symbols, names, and current prices

### Preview a swap

Ask the agent to estimate a swap before committing:

- "How much USDT would I get for 10 TON?" -- estimates the swap output, fees, and price impact
- "Estimate swapping 5 TON to USDT with 1% slippage" -- estimates with explicit slippage tolerance

The estimate includes:
- expected output amount and minimum output amount
- price impact percentage
- fee breakdown: network fee, swap fee, and platform fee
- DEX label (e.g., DeDust or STON.fi)

### Execute a swap

Ask the agent to execute a swap:

- "Swap 10 TON for USDT with 1% slippage" -- submits the swap through the runtime autonomy flow

The swap respects your current autonomy mode:
- In **review-first** mode, the agent creates a swap approval request for you to review before execution
- In **policy** mode, the swap executes immediately if the transfer policy allows it; otherwise it is blocked
- In **autonomous-wallet** mode, the swap executes using the configured autonomous wallet

### Amounts and slippage

- Swap amounts are decimal strings (e.g., "1.5", "100"), not raw base units
- Slippage is a percentage (e.g., 1 means 1% slippage tolerance)

## Scope and limitations

- **TON-only**: swaps are only available on the TON blockchain mainnet
- **DEX-only**: swaps use decentralized exchange protocols; centralized exchange (CEX) swaps are not supported
- **No cross-chain swaps**: you cannot swap between different chains (e.g., TON to Solana)
- **No Solana or TRON swaps**: swap support for these chains is not available in the current version

## What you can also do in chat

Beyond swaps, you can ask the agent about your current holdings:

- "Show my balances" -- see native and token balances across chains
- "What are my holdings worth in USD?" -- get currency-denominated values for your balances
- "Show price history for TON over the last 7 days" -- check recent price trends for a specific asset

## Source: headless/docs/knowledge/knowledge-base/concepts/blockchain-basics.md

Kind: direct-kb-page
Document kind: n/a
Family: n/a
Routing intents: n/a
Routing hosts: openclaw, claude, claude-code, cursor, codex
Proof scenarios: n/a

# Blockchain Basics

## What Is a Blockchain?

A blockchain is a public digital ledger — think of it as a shared notebook that records every transaction, and once something is written, it can't be erased. Thousands of computers around the world maintain copies of this notebook, so no single person or company controls it.

## Key Concepts

### Address
Your wallet address is like a bank account number. It's a long string of characters (letters and numbers) that uniquely identifies your wallet on a specific blockchain. You share it with others so they can send you crypto.

Each blockchain has its own address format:
- **TON**: starts with `UQ` or `EQ` (or `0:` in raw format)
- **TRON**: starts with `T`
- **Solana**: a base58-encoded string

### Transaction
A transaction is a transfer of value from one address to another. When you send crypto, you create a transaction that gets recorded on the blockchain. Once confirmed, it's permanent and irreversible.

### Block
Transactions are grouped into "blocks" and added to the chain one at a time. Each block references the previous one — that's what makes it a chain. When your transaction is included in a block, it's "confirmed."

### Network Fee (Gas)
Every transaction requires a small fee paid to the network. This fee compensates the computers (validators) that process and confirm transactions. Fees vary by blockchain and network congestion.

## Why Multiple Blockchains?

Different blockchains have different strengths:
- **TON**: Very fast, low fees, designed by the team behind Telegram
- **TRON**: Popular for USDT transfers, relatively low fees
- **Solana**: Very fast, very low fees, popular for DeFi and NFTs

The same token (like USDT) can exist on multiple blockchains, but they're separate — you can't send USDT from one chain directly to an address on another chain without a cross-chain swap.

## Irreversibility

Unlike bank transfers, blockchain transactions **cannot be reversed**. There's no customer support to call, no chargebacks. Once you confirm a send, the tokens are gone. This is why it's crucial to double-check addresses and amounts before confirming.

## Source: headless/docs/knowledge/knowledge-base/concepts/gas-fees.md

Kind: direct-kb-page
Document kind: n/a
Family: n/a
Routing intents: n/a
Routing hosts: openclaw, claude, claude-code, cursor, codex
Proof scenarios: n/a

# Network Fees (Gas) Explained

## Why Do Fees Exist?

Every blockchain transaction needs to be processed and confirmed by the network. Fees compensate the validators (computers) that do this work, and they prevent spam — without fees, anyone could flood the network with millions of transactions.

## How Fees Work

When you send crypto, a small fee is deducted and paid to the network. You always pay the fee in the blockchain's **native token**:
- TON transactions → fee paid in **TON**
- TRON transactions → fee paid in **TRX** (or energy/bandwidth)
- Solana transactions → fee paid in **SOL**

This means you need some native tokens even if you only want to send other tokens (like USDT).

## Fee Amounts by Chain

### TON
- Very low — typically fractions of a TON
- Consistent and predictable
- Almost negligible for most users

### TRON
- Uses an **energy/bandwidth** model
- Simple TRX transfers: very cheap
- TRC-20 token transfers (like USDT): more expensive because they require "energy"
- If you don't have enough energy, extra TRX is burned to cover the cost

### Solana
- Extremely low — fractions of a cent
- Plus a one-time "rent" when creating a new token account (when you receive a token type for the first time)

## When Are Fees Charged?

Fees are charged for any on-chain action:
- Sending tokens
- Swapping tokens
- Staking / unstaking
- Minting or transferring NFTs
- Interacting with dApps

The app shows the estimated fee **before you confirm** every transaction. The actual fee may vary slightly from the estimate.

## "Insufficient Balance for Fee"

This common error means you don't have enough of the native token to pay the transaction fee. For example, if you want to send all your USDT on TON, you still need a small amount of TON for the fee. Solution: keep a small native token balance at all times.

## Source: headless/docs/knowledge/knowledge-base/concepts/staking-explained.md

Kind: direct-kb-page
Document kind: n/a
Family: n/a
Routing intents: n/a
Routing hosts: openclaw, claude, claude-code, cursor, codex
Proof scenarios: n/a

# Staking Explained

## What Is Staking?

Staking means locking up your crypto to help secure a blockchain network. In return, you earn **rewards** — similar to earning interest in a savings account. The blockchain needs stakers to validate transactions and maintain security.

## How It Works (Simplified)

1. You deposit your tokens into a **staking pool** (a smart contract).
2. The pool uses those tokens to participate in network validation.
3. The network rewards the pool for its work.
4. You receive a share of the rewards proportional to your stake.

## Types of Staking in MyTonWallet

### Liquid Staking
When you stake, you receive a **liquid token** (like tsTON or stTON) that represents your staked position. This token:
- Increases in value over time as rewards accumulate
- Can be transferred, traded, or used in DeFi
- Can be redeemed for your original TON + rewards when you unstake

**Advantage**: Your funds aren't truly "locked" — you can sell the liquid token at any time.

## APY (Annual Percentage Yield)

APY is the estimated yearly return on your staked tokens. For example, 5% APY means if you stake 100 TON, you'd earn approximately 5 TON over a year. APY fluctuates based on network conditions and is not guaranteed.

## Risks

- **Not a guaranteed return** — APY can change and is an estimate, not a promise.
- **Unstaking delay** — there may be a cooldown period before your tokens are returned.
- **Smart contract risk** — staking pools are smart contracts. While audited, there's always a small risk of bugs.
- **Liquid token discount** — liquid staking tokens may occasionally trade at a slight discount to their underlying value.

## Is Staking Safe?

Staking on TON is generally considered low-risk. The major staking pools are well-established and audited. However, as with everything in crypto, there are no absolute guarantees. Only stake what you can afford to have locked up.

## Source: headless/docs/knowledge/knowledge-base/concepts/swaps-explained.md

Kind: direct-kb-page
Document kind: n/a
Family: n/a
Routing intents: n/a
Routing hosts: openclaw, claude, claude-code, cursor, codex
Proof scenarios: n/a

# Token Swaps Explained

## What Is a Swap?

A swap is exchanging one cryptocurrency for another. Instead of selling your token on an exchange and buying another, you can swap directly within the wallet.

## DEX vs CEX

### DEX (Decentralized Exchange)
A DEX is a smart contract on the blockchain that lets people trade tokens directly with each other — no middleman. When you swap tokens on the same chain (e.g., TON → USDT on TON), the trade happens through a DEX.

**Pros**: No registration, no KYC, your funds never leave your wallet
**Cons**: Only works within the same blockchain, prices depend on available liquidity

### CEX (Centralized Exchange)
A CEX is a company that holds funds and matches buyers with sellers (like Binance or Coinbase). MyTonWallet uses Changelly for cross-chain swaps — when you swap between different blockchains (e.g., TON → TRX).

**Pros**: Can swap between any supported chains
**Cons**: May require minimum amounts, takes longer, involves a third party

## Slippage

When you submit a swap, the price can change between the moment you click "Swap" and the moment the transaction executes. This difference is called **slippage**.

You set a **slippage tolerance** (default 5%) which means:
- If the price moves less than 5%, the swap executes.
- If it moves more than 5%, the swap fails and your tokens are returned.

Lower tolerance = you get a price closer to what you expected, but the swap may fail more often.

## Price Impact

If you're swapping a large amount relative to the available liquidity, your trade itself moves the price. This is **price impact**. The app shows it before you confirm.

- Small trades: negligible impact
- Large trades: can significantly worsen your rate

## Fees in Swaps

A swap typically involves:
- **Network fee** — paid to the blockchain (in native tokens)
- **DEX fee** — a percentage taken by the decentralized exchange (usually 0.1-0.3%)
- **Our fee** — a small service fee (shown on the confirmation screen)

All fees are displayed before you confirm.

## Source: headless/docs/knowledge/knowledge-base/concepts/wallets-explained.md

Kind: direct-kb-page
Document kind: n/a
Family: n/a
Routing intents: n/a
Routing hosts: openclaw, claude, claude-code, cursor, codex
Proof scenarios: n/a

# Wallets Explained

## What Is a Crypto Wallet?

A crypto wallet doesn't actually "store" your crypto — your tokens live on the blockchain. A wallet stores your **private keys**, which are like the passwords that let you access and send your tokens. Whoever has the private key controls the funds.

## Recovery Phrase (Seed Phrase)

When you create a wallet, you get a **recovery phrase** — a list of 12 or 24 ordinary words (like "apple" "river" "sunset"...) in a specific order. This phrase is a human-readable representation of your master private key.

From this single phrase, the wallet derives private keys for all supported blockchains. That's why one recovery phrase gives you addresses on TON, TRON, and Solana.

**Critical rules:**
- Write it on paper, never digitally
- Never share it with anyone
- Never enter it on any website
- If someone has your phrase, they have your funds
- If you lose your phrase and your device, your funds are gone forever

## Custodial vs Non-Custodial

### Custodial Wallet
A company holds your private keys for you (like a bank holding your money). Convenient, but you depend on them — they could get hacked, freeze your account, or go out of business.

### Non-Custodial Wallet (MyTonWallet)
**You** hold your private keys. Nobody else — not even MyTonWallet — can access your funds. You have full control, but you're also fully responsible for keeping your recovery phrase safe.

## What Happens When You "Create a Wallet"?

1. The app generates a random recovery phrase (24 words).
2. From the phrase, it derives private keys for each blockchain.
3. From each private key, it derives your public address.
4. The phrase and keys are encrypted with your password and stored on your device.

Your addresses are now "live" on the blockchain — anyone can send tokens to them. The private key lets you send tokens from them.

## Multiple Wallets / Accounts

You can have multiple wallets in one app. Each has its own recovery phrase (or private key) and its own set of addresses. Useful for separating funds or purposes.

## Source: headless/docs/knowledge/knowledge-base/resources.md

Kind: direct-kb-page
Document kind: n/a
Family: n/a
Routing intents: n/a
Routing hosts: openclaw, claude, claude-code, cursor, codex
Proof scenarios: n/a

# MyTonWallet Resources & Links

Official channels, community, and support resources for MyTonWallet.

---

## Community & News

- **Telegram (English)**: https://t.me/MyTonWalletEn — official news and announcements
- **Telegram (Russian)**: https://t.me/MyTonWalletRu — official news in Russian
- **MyTonWallet Tips**: https://t.me/MyTonWalletTips — tips, guides, and how-tos
- **X (Twitter)**: https://x.com/mytonwallet_io — updates and announcements

## Support

- **Help Center**: https://help.mytonwallet.io/ — searchable knowledge base with guides and FAQs
- **Support Chat**: https://t.me/mysupport — direct support via Telegram. Note: the MyTonWallet team will never message you first. If someone contacts you claiming to be support, it is a scam.

## Blog

- **Blog**: https://mytonwallet.io/blog — product updates, feature announcements, and tutorials

## Download Links

- **All platforms**: https://get.mytonwallet.io
- **Web App**: https://mytonwallet.app
- **Telegram Mini App**: https://t.me/myapp
- **Chrome Extension**: https://chrome.google.com/webstore/detail/mytonwallet/fldfpgipfncgndfolcbkdeeknbbbnhcc
- **Firefox Extension**: https://addons.mozilla.org/en-US/firefox/addon/mytonwallet
- **Edge Extension**: https://microsoftedge.microsoft.com/addons/detail/mytonwallet

## Other

- **GitHub (open source)**: https://github.com/mytonwalletorg/mytonwallet
- **Security Audit (CertiK)**: https://skynet.certik.com/projects/mytonwallet
- **Bug Bounty Program**: https://skyshield.certik.com/bounties/mytonwallet
- **@push — Instant Transfers**: https://t.me/push — send crypto to Telegram contacts instantly
- **PR & Partnerships**: growth@mywallet.io

## Historical References

The knowledge base also includes historical product notes, AMA summaries, ambassador programs, and Air QA or security contest summaries in:

- `history/product-timeline.md`
- `community/interviews.md`
- `community/programs.md`

## Source: headless/docs/knowledge/knowledge-base/security/scam-protection.md

Kind: direct-kb-page
Document kind: n/a
Family: n/a
Routing intents: n/a
Routing hosts: openclaw, claude, claude-code, cursor, codex
Proof scenarios: n/a

# Scam Protection

## Built-In Protections

### Scam Address Detection
MyTonWallet maintains a database of known scam addresses. When you enter a recipient address that matches a flagged address, the app shows a **warning**. You can still proceed, but you should carefully verify the address.

### Domain Similarity Warnings
When interacting with TON DNS domains, the app warns you about **lookalike domains** — names that are visually similar to well-known domains but are controlled by scammers (e.g., using letter substitution).

### Suspicious Action Alerts
The app can warn you about potentially dangerous actions. You can toggle this in Settings → Security → Allow Suspicious Actions.

### Anti-Poisoning Labels

MyTonWallet includes built-in **anti-poisoning** protection that marks lookalike or scam-history addresses with a visible **Scam** label in transaction history.

### Import And Send Warnings

MyTonWallet shows warnings for:

- Suspicious multisig wallet imports
- Suspicious `.ton` destinations before sending

## Common Scams to Watch For

### Fake Airdrops
You receive unexpected tokens or NFTs with instructions to visit a website. **Never** visit links from unexpected airdrops — they typically try to steal your recovery phrase.

### Phishing Sites
Websites that look like MyTonWallet or popular dApps, asking for your recovery phrase. **MyTonWallet will never ask for your recovery phrase** except during wallet import, and only in the app itself.

### Address Poisoning
Scammers send tiny transactions from addresses that look similar to your real contacts, hoping you'll copy the wrong address from your history. Always verify the full address, not just the first and last characters.

### Fake dApp Previews
Some dApps can show misleading descriptions or forged preview text. Even if a wallet preview looks familiar, verify the real recipient, asset, and amount before approving.

### Too-Good-To-Be-True Offers
Any dApp or service promising guaranteed returns, free tokens for connecting your wallet, or other unrealistic offers is almost certainly a scam.

## What to Do If You Suspect a Scam

- **Do not** approve any transactions.
- **Disconnect** the dApp (Settings → dApps).
- If you shared your recovery phrase: **immediately create a new wallet** and transfer all funds to it.
- If you approved a suspicious transaction: check your activity for unexpected outgoing transfers.
