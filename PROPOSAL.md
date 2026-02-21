<div align="center">
  <h1>AEGIS-NET: Technical Subnet Proposal</h1>
  <p><strong>Decentralized AI Smart Contract Auditor on Bittensor</strong></p>
  <p><i>A continuous, incentivized, peer-to-peer security infrastructure for Web3 protocols.</i></p>
  <br>
  <a href="https://aegis-net-pi.vercel.app"><b>🌐 Live Demo</b></a> •
  <a href="README.md"><b>📖 README</b></a> •
  <a href="PITCH_DECK.md"><b>📊 Pitch Deck</b></a>
  <br><br>
  <i>© 2026 Pandu Dargah. All Rights Reserved.</i>
</div>

<br>

---

## 1. Abstract

**Aegis-Net** proposes a novel Bittensor subnet dedicated to decentralized smart contract security auditing. The network leverages competing AI miners — each running fine-tuned Large Language Models (LLMs) — to continuously scan, analyze, and expose vulnerabilities in deployed and pre-deployment smart contracts across EVM-compatible chains.

Unlike traditional centralized audit firms that are slow, expensive, and bottlenecked by human capacity, Aegis-Net distributes the auditing workload across a trustless, incentivized network of AI agents. Validators confirm findings through automated fork-based exploit simulation, eliminating false positives and ensuring only verified threats reach the end user.

The result is a **real-time, always-on, self-improving security layer** for all of Web3.

---

## 2. Problem Statement

### 2.1 The Current Landscape

The Web3 ecosystem lost over **$3.8 billion** to smart contract exploits in 2023 alone. The root causes are systemic:

| Problem | Impact |
|:--|:--|
| **Centralized Auditing** | 2-6 week turnaround, costs $50K-$500K per audit |
| **Static Analysis Limitations** | Tools like Slither/Mythril catch only ~60% of vulnerabilities |
| **Speed vs Security Tradeoff** | Devs ship unaudited code to capture market momentum |
| **Single Point of Failure** | One auditor's oversight = catastrophic exploit |
| **No Continuous Monitoring** | Audits are one-time snapshots; protocols evolve, vulnerabilities emerge |

### 2.2 The Gap

There is no decentralized, incentivized, and continuously operating AI-powered security infrastructure for smart contracts. Aegis-Net fills this gap.

---

## 3. Solution Architecture

### 3.1 High-Level Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        AEGIS-NET SUBNET                         │
│                                                                 │
│  ┌──────────┐    ┌──────────────┐    ┌──────────────────────┐   │
│  │  CLIENT   │───▶│  MINER SWARM │───▶│  VALIDATOR NETWORK   │   │
│  │  PORTAL   │    │  (AI Agents) │    │  (Fork Simulation)   │   │
│  └──────────┘    └──────────────┘    └──────────────────────┘   │
│       │                │                        │               │
│       │                │                        │               │
│       ▼                ▼                        ▼               │
│  ┌──────────┐    ┌──────────────┐    ┌──────────────────────┐   │
│  │  AUDIT    │    │  THREAT      │    │  CONSENSUS           │   │
│  │  REPORTS  │◀───│  DATABASE    │◀───│  ENGINE              │   │
│  └──────────┘    └──────────────┘    └──────────────────────┘   │
│                                                                 │
│                    ┌──────────────┐                              │
│                    │  $TAO REWARD │                              │
│                    │  DISTRIBUTION│                              │
│                    └──────────────┘                              │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Component Breakdown

#### 3.2.1 Miner Network (The Hunters)

Miners are the distributed AI workforce of Aegis-Net. Each miner runs one or more specialized LLMs fine-tuned for smart contract vulnerability detection.

**Active/Planned Models:**

| Model | Specialization | Parameters |
|:--|:--|:--|
| `LLaMA-3.3-70B` (via Groq LPU) | General Solidity audit, multi-vulnerability detection | 70B |
| `DeepSeek V3` | Deep reasoning analysis, complex logic flaw detection | 671B MoE |
| `DeepSeek-Audit-7B` *(planned)* | Fine-tuned on SWC Registry + Damn Vulnerable DeFi | 7B |
| `Llama-Solidity-13B` *(planned)* | Solidity-specific vulnerability patterns | 13B |
| `CodeLlama-Security-34B` *(planned)* | Rust/Anchor (Solana) contract analysis | 34B |

**Miner Responsibilities:**
- Ingest smart contract bytecode/source code
- Run multi-pass vulnerability analysis (AST parsing → heuristic detection → LLM inference)
- Output structured threat reports with:
  - Vulnerability type classification (Reentrancy, Flash Loan, etc.)
  - Exact line/function attribution
  - Severity rating (Critical / High / Medium / Low / Informational)
  - Exploit scenario description
  - Recommended fix with code snippet
- Compete for highest accuracy and speed

#### 3.2.2 Validator Network (The Judges)

Validators form the consensus layer that verifies miner findings and eliminates false positives.

**Validation Pipeline:**

```
Miner Finding → Fork Environment (Anvil/Hardhat) → Exploit Reproduction 
→ Severity Confirmation → Consensus Vote → Report Finalization
```

**Validator Responsibilities:**
- Receive threat reports from miners
- Instantiate a forked EVM environment replicating the target chain state
- Attempt to reproduce the reported exploit programmatically
- Calculate confirmation confidence score (0-100%)
- Issue consensus vote: `CONFIRMED`, `DISPUTED`, or `FALSE_POSITIVE`
- Distribute $TAO rewards based on miner accuracy

#### 3.2.3 Client Portal — "The Intercept"

A production-grade web interface for protocol developers and security teams.

**Features:**
- On-demand contract scan initiation (paste code or provide contract address)
- **Live AI Scanner** — real-time audit powered by Groq LPU and DeepSeek *(working prototype)*
- Dual AI engine selector (choose audit model)
- Detailed audit reports with Markdown formatting, code snippets, and severity badges
- Historical audit timeline and vulnerability tracking
- Integration hooks for GitHub Actions CI/CD pipeline

#### 3.2.4 Subnet Explorer — "The Hive"

A public transparency dashboard displaying the real-time state of the Aegis-Net subnet.

**Features:**
- Global vulnerability tracker with estimated funds protected
- Miner leaderboard ranked by accuracy, speed, and $TAO earnings
- Live validator node count and consensus statistics
- Real-time $TAO emission rates and distribution curves
- Network health monitoring (latency, throughput, uptime)

---

## 4. Consensus Mechanism: Proof-of-Audit (PoA)

Aegis-Net introduces a novel consensus mechanism specifically designed for security auditing:

### 4.1 Scoring Formula

```
Miner Score = (Detection_Accuracy × 0.40) + (Speed × 0.25) + 
              (Severity_Precision × 0.20) + (False_Positive_Rate⁻¹ × 0.15)
```

### 4.2 Reward Distribution

| Component | Weight | Description |
|:--|:-:|:--|
| Detection Accuracy | 40% | Percentage of confirmed vulnerabilities correctly identified |
| Speed | 25% | Time-to-detection relative to other miners |
| Severity Precision | 20% | Accuracy of severity classification vs validator consensus |
| Low False Positive Rate | 15% | Inverse of false positive submissions |

### 4.3 Slashing Conditions

Miners are penalized (slashed) for:
- Submitting fabricated/hallucinated vulnerabilities
- Repeatedly reporting confirmed false positives
- Failing to meet minimum detection benchmarks
- Plagiarizing reports from other miners

---

## 5. Working Prototype: Live AI Scanner

### 5.1 Current Implementation

Aegis-Net has a **fully functional working prototype** demonstrating the baseline intelligence of a Miner node:

| Component | Implementation | Status |
|:--|:--|:-:|
| **Frontend** | React 18 + Vite + TailwindCSS | ✅ Live |
| **AI Engine 1** | Groq LPU (LLaMA-3.3-70B-Versatile) | ✅ Live |
| **AI Engine 2** | DeepSeek API (DeepSeek V3) | ✅ Live |
| **Backend API** | Vercel Serverless Functions | ✅ Live |
| **Deployment** | Vercel Edge Network | ✅ Live |

### 5.2 Demonstrated Capabilities

The Live AI Scanner has been validated against known vulnerability patterns:

```
✅ Reentrancy Detection        — Identifies state changes after external calls
✅ Flash Loan Attack Vectors   — Detects uncollateralized borrowing exploits
✅ Integer Overflow/Underflow   — Flags unsafe arithmetic operations
✅ Unchecked External Calls     — Spots missing return value checks
✅ Access Control Flaws         — Identifies missing authorization guards
✅ Oracle Manipulation          — Detects price feed dependency risks
✅ Front-Running Vulnerabilities — Identifies transaction ordering issues
```

### 5.3 Real-World Demonstration

**Scenario:** A vulnerable `VulnerableVault` contract with a classic reentrancy bug:

1. User pastes Solidity code into the Live AI Scanner
2. Selects AI engine (Groq or DeepSeek)
3. AI Miner analyzes the contract in **< 8 seconds**
4. Returns a detailed Markdown audit report with:
   - 🔴 `CRITICAL` severity badge
   - Exact function identified (`withdraw()`) 
   - Exploit scenario with step-by-step attack flow
   - Recommended fix with corrected code snippet
   - Overall Risk Score

**Live Demo:** [https://aegis-net-pi.vercel.app](https://aegis-net-pi.vercel.app) → Click **"Live AI Scanner"**

---

## 6. Tokenomics & Economic Model

### 6.1 $TAO Integration

| Role | Earning Mechanism | Economic Incentive |
|:--|:--|:--|
| **Miners** | Earn $TAO per confirmed vulnerability detection | Compete for highest accuracy & speed |
| **Validators** | Earn $TAO for successful exploit confirmation | Maintain network integrity |
| **Stakers** | Delegate $TAO to high-performing miners | Passive yield from security network |

### 6.2 Emission Schedule

- Emissions follow Bittensor's native subnet allocation model
- Top-performing miners receive exponentially higher rewards
- Validator rewards are proportional to consensus participation rate

---

## 7. Multi-Chain Roadmap

| Phase | Chains Supported | Timeline |
|:--|:--|:--|
| Phase 1 ✅ | Ethereum (Solidity) | Q1 2025 |
| Phase 2 🔄 | Arbitrum, Optimism, Base | Q2 2025 |
| Phase 3 | Solana (Rust/Anchor) | Q3 2025 |
| Phase 4 | Cosmos (CosmWasm), Sui (Move) | Q1 2026 |

---

## 8. Competitive Analysis

| Feature | Aegis-Net | OpenZeppelin | CertiK | Trail of Bits |
|:--|:-:|:-:|:-:|:-:|
| Decentralized | ✅ | ❌ | ❌ | ❌ |
| AI-Powered | ✅ | ❌ | Partial | ❌ |
| Real-Time | ✅ | ❌ | ❌ | ❌ |
| Continuous Monitoring | ✅ | ❌ | Partial | ❌ |
| Incentivized Network | ✅ ($TAO) | ❌ | ❌ | ❌ |
| Multi-Model Consensus | ✅ | ❌ | ❌ | ❌ |
| Cost | Low (network-subsidized) | High | High | Very High |
| Turnaround Time | Seconds | Weeks | Weeks | Weeks |

---

## 9. Technical Feasibility

### 9.1 Why This Works

1. **LLMs excel at code analysis** — Recent models (LLaMA-3.3, DeepSeek V3) demonstrate strong capability in reasoning about code logic, pattern matching, and vulnerability identification.

2. **Bittensor provides the infrastructure** — The subnet architecture, consensus mechanisms, and $TAO incentive layer are battle-tested and production-ready.

3. **Decentralization improves quality** — Multiple competing AI models eliminate single-model blind spots. What LLaMA misses, DeepSeek catches, and vice versa.

4. **Working prototype validates the approach** — Our Live AI Scanner demonstrates that LLM-based auditing achieves meaningful results in seconds, not weeks.

### 9.2 Known Limitations & Mitigations

| Limitation | Mitigation |
|:--|:--|
| LLM hallucination in reports | Validator fork-simulation confirms all findings |
| Novel zero-day patterns | Continuous model fine-tuning on latest exploit datasets |
| Complex cross-contract interactions | Planned ensemble approach combining multiple model outputs |
| Gas estimation accuracy | Integration with actual EVM simulation layer |

---

## 10. Conclusion

Aegis-Net represents a paradigm shift in smart contract security — from centralized, slow, and expensive to decentralized, real-time, and incentivized. By combining the power of competing AI models with Bittensor's economic framework, we create an **always-on security layer** that continuously evolves alongside the threats it defends against.

The working prototype demonstrates the viability of this approach. The Live AI Scanner is not a mockup — it is a functional implementation of the Miner logic, processing real Solidity code and returning actionable security insights in seconds.

**Aegis-Net is not just a tool. It is a living, breathing shield that learns as fast as hackers do.**

---

<div align="center">
  <sub><b>Aegis-Net</b> — Building the unhackable layer over Web3 protocols.</sub>
  <br>
  <sub>© 2026 Pandu Dargah. All Rights Reserved.</sub>
</div>
