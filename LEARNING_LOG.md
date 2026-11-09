# Blockchain Engineering Learning Log

---

# 👨‍💻 Student

Chrisnaud Agossou

Started:

**03 August 2026**

Mission:

Become a Blockchain Engineer capable of designing, developing and auditing blockchain systems.

---

# 📚 Module Progress

## Module 01 — Ethereum Fundamentals

Status:

✅ Completed

### Lessons

- [x] Course Introduction
- [x] Ethereum History
- [x] Bitcoin Whitepaper
- [x] What is Ethereum?
- [x] Ethereum Accounts
- [x] MetaMask
- [x] Transactions
- [x] Block Time
- [x] Hash Functions
- [x] Blocks
- [x] Blockchain
- [x] Consensus
- [x] Smart Contracts (intro)

## Module 02 — Solidity Fundamentals & Deployment

Status:

✅ Completed

### Lessons

- [x] Contract structure (contract, state variables, functions)
- [x] Solidity types (uint, string, bool, etc.)
- [x] Constructor
- [x] Remix IDE
- [x] Compilation → Bytecode + ABI
- [x] Deploying to a local blockchain
- [x] Deploying to the Sepolia testnet
- [x] call() — reads state, no transaction
- [x] send() — creates a transaction, consumes gas, updates state
- [x] Migrating a project from Remix to Hardhat
- [x] Writing a first Hardhat test

## Module 03 — Advanced Smart Contracts

Status:

🟡 In Progress

### Lessons

- [ ] The Lottery Contract *(current)*
- [ ] Lottery Design
- [ ] Reminder on Updated Remix UI
- [ ] Basic Solidity Types (advanced)
- [ ] Starting the Lottery Contract
- [ ] The Message Global Variable
- [ ] *(rest of Section 3 — Advanced Smart Contracts, 29 lessons total)*

## Extra — Beyond the Course (Auditor Track)

Concepts pulled in ahead of the curriculum because they matter for smart contract auditing, per the long-term goal:

- [x] Function selectors (keccak256 of function signature, first 4 bytes)
- [x] How the EVM dispatches a call using the selector, not the function name
- [x] Why a stale ABI causes a silent revert (or a fallback hit)
- [ ] Deployment as a transaction (CREATE, address derivation, constructor execution) — introduced, not yet solid

---

# 📅 Daily Journal

## Day 01 — 03/08/2026

### Topics

- Ethereum
- Bitcoin vs Ethereum
- Ethereum Accounts
- Transactions
- Validators
- Nodes
- Mempool
- Blocks
- Block Time

### What I Learned

- Ethereum is a programmable blockchain.
- ETH is the native currency of Ethereum.
- Transactions are first broadcast to the network.
- Transactions stay inside the mempool before entering a block.
- Validators build blocks from pending transactions.
- Every validator executes the transactions inside the block.
- Block Time is the average time between two consecutive blocks.

### Questions I Had

- Difference between Nodes and Validators.
- Why Block Time exists.
- Why Gas exists.

### Mentor Feedback

Understanding: ⭐⭐⭐⭐⭐

Reasoning: ⭐⭐⭐⭐⭐

Vocabulary: ⭐⭐⭐☆☆

Overall:

8.8 / 10

---

## Day 02 — 04/08/2026

### Topics

- Bytecode vs ABI (recap, applied)
- call() vs send()
- Deploying a smart contract to the Sepolia testnet
- Connecting frontend concepts to deployed contracts

### What I Learned

- Solidity code is compiled into Bytecode and ABI.
- The EVM executes Bytecode, not Solidity directly.
- The ABI is the bridge between frontend applications and deployed smart contracts.
- `call()` reads blockchain state without creating a transaction (no gas cost, no state change).
- `send()` creates a transaction, consumes gas, and updates blockchain state.
- Deployed and verified a first contract live on Sepolia (Etherscan-visible), moving beyond local/Remix-only testing.

### Questions I Had

*(not captured live — this entry was reconstructed from the Build in Public post below, not from a live teaching session)*

### Mentor Feedback

⚠️ Not assessed live. Auto-logged from Chrisnaud's public "Day 2" post. Real mastery check happened on Day 03 (see below).

### Build in Public (source post)

> Day 2 of my Blockchain Engineering journey
>
> Today I deployed my first smart contract on the Sepolia testnet and finally connected several concepts that previously felt disconnected.
>
> Some key lessons:
> - Solidity code is compiled into Bytecode and ABI
> - The EVM executes Bytecode, not Solidity.
> - The ABI is the bridge between frontend applications and smart contracts.
> - call() reads blockchain state without creating a transaction.
> - send() creates a transaction, consumes gas, and updates the blockchain state.
>
> One thing I enjoy about blockchain engineering is that every new concept builds on the previous one. The architecture is becoming much clearer as I keep building.
>
> Now it's time to move beyond simple examples and start building more complex decentralized applications.
>
> #Blockchain #Ethereum #Solidity #Web3 #BuildInPublic

Engagement: 6 likes, 2 comments, 181 impressions.

---

## Day 03 — 12/08/2026

### Topics

- Live mentor Q&A verifying Day 01-02 material (bytecode/ABI deployment flow, call vs send)
- Function selectors
- keccak256 applied to function signatures
- How the EVM matches transaction calldata to a contract function

### What I Learned

- A function selector is the **first 4 bytes** of `keccak256("functionName(paramType1,paramType2,...)")`.
- The deployed contract's bytecode contains a dispatcher, built at compile time, that only recognizes its own real function selectors.
- The frontend (via the ABI, through ethers.js) computes the selector for the function it *thinks* exists and sends it inside the transaction's `data` field.
- If the ABI is stale (e.g. a function was renamed on a redeployed contract), the computed selector won't match anything in the deployed bytecode. Result: the call reverts at **execution time** — not at compile time, and not on the frontend side — unless the contract has a `fallback()`, in which case that runs instead.
- Reinforced but not yet solid: deploying a contract is itself a special transaction (empty `to`, bytecode as `data`, constructor runs once, address derived from sender+nonce) — this needs a dedicated pass.

### Questions I Had

- Initially inverted input vs output of `keccak256` (thought the selector was "what keccak256 receives" instead of "what it produces") — caught and self-corrected once flagged.
- Deployment-as-a-transaction mechanics (CREATE, address derivation) still shaky — flagged for next session.

### Mentor Feedback

Understanding: ⭐⭐⭐⭐☆ — started Partial on all 3 verification questions (conflated calling vs deploying, inverted validator/EVM execution order, no model at all for function selectors), converged to a correct explanation of the selector mechanism after guided hints.

Reasoning: ⭐⭐⭐⭐⭐ — explicitly flagged uncertainty ("je ne sais pas trop", "je n'ai pas appris ça") instead of guessing or pretending. Exactly the right instinct per the no-fake-progress rule.

Vocabulary: ⭐⭐⭐☆☆ — needed an ELI5 pass to land; some terms still shaky.

Overall:

7.5 / 10 — real progress through active back-and-forth rather than passive reading. Deployment-as-a-transaction is the clear next gap to close before going deeper into Module 03 auditing work.

---

## Day 04 — 09/11/2026

### Topics

- Restart after a 3-month break (1-month plan, 2h/day)
- Active recall: Ethereum, transaction lifecycle, gas, ABI/bytecode, call vs send
- Gas price vs gas limit
- Lottery contract: `msg.sender`, `require`, `payable`, `view`, `modifier`

### What I Learned

- Gas price = price per unit of work; gas limit = maximum units I accept. Work done is always paid, even on revert.
- `payable` lets a function receive ETH; it is unrelated to paying gas.
- A modifier is a reusable check, and `_;` is where the function body runs.
- Wrote `getPlayersCount()`, `restricted` modifier and `resetPlayers()` myself.

### Questions I Had

- Did not understand modifiers at first; asked for an explanation instead of guessing, then wrote one correctly.

### Mentor Feedback

Understanding: ⭐⭐⭐☆☆ — recall 2/5 solid at start; recurring confusion between what is sent vs what is paid (gas vs `msg.value`), and `require` logic reversed once.

Reasoning: ⭐⭐⭐⭐⭐ — honest "je ne sais pas", asked for explanation, applied it correctly on the first try.

Vocabulary: ⭐⭐☆☆☆ — several terms mixed (gas limit as minimum, require inverted); dictation errors aside.

Overall:

6.5 / 10 — good restart. Gap to close: a reverted transaction still costs gas for the work done.

---

# 🧩 Projects

- [ ] Counter
- [ ] Lottery *(next up — Section 3)*
- [ ] Bank
- [ ] Voting
- [ ] ERC20
- [ ] NFT

Course project (not part of the official checklist above, but built along the way):

- [x] Inbox (simple message contract — built in Remix, deployed to Sepolia, migrated to Hardhat with a first test)

---

# 📝 Exams

## Module 01

Status:

Not Started

Score:

—

## Module 02

Status:

Not Started

Score:

—

---

# 📖 Books

- [ ] Mastering Ethereum
- [ ] Solidity by Example
- [ ] Ethereum Whitepaper

---

# 🎯 Final Goal

By the end of this journey I want to:

- Read any Solidity smart contract.
- Understand protocol architectures.
- Audit smart contracts.
- Build production-ready DeFi applications.
- Build AI-powered financial systems.
