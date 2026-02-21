<div align="center">
  <img src="https://img.shields.io/badge/Bittensor%20Subnet%20-%20Aegis--Net-black?style=for-the-badge&logoColor=white&logo=bittensor" alt="Aegis-Net"/>
  <h1 align="center">Aegis-Net : Decentralized AI Smart Contract Auditor</h1>
  <p align="center">
    <strong>A continuous, decentralized security infrastructure for Web3 protocols powered by Bittensor LLM Miners.</strong>
  </p>
  <p align="center">
    <a href="https://aegis-net-pi.vercel.app"><b>🌐 Live Demo</b></a> •
    <a href="PROPOSAL.md"><b>📄 Official Proposal</b></a> •
    <a href="PITCH_DECK.md"><b>📊 Pitch Deck</b></a>
  </p>
  <p align="center">
    <a href="LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg"></a>
    <br>
    <i>© 2026 Pandu Dargah. All Rights Reserved.</i>
  </p>
</div>

<br />

## 🌟 Overview

**Aegis-Net** is envisioned as a decentralized network built on the [Bittensor](https://bittensor.com/) ecosystem. It crowdsources intelligent threat detection models using the compute power of decentralized LLM miners to inspect, simulate, and expose vulnerabilities in deployed Smart Contracts. 

It aims to replace the slow, expensive, and centralized auditing processes currently prevailing in the Web3 space by creating an incentivized network of AI models competing to discover vulnerabilities with near real-time efficiency. 

---

## 🎯 Key Features and Offerings

### 1. Peer-to-Peer AI Auditing (Miners)
Unlike a single centralized entity running static tools, Aegis-Net distributes contract bytes to hundreds of active AI miners fine-tuned for smart contract vulnerabilities (`DeepSeek-Audit-7B`, `Llama-Solidity-13B`, `CodeLlama-Security-34B`, etc.). These algorithms hunt for Reentrancy, Flash Loan exploits, Integer Overflows, Unchecked External Calls, and other sophisticated logical flaws.

### 2. Validator Consensus Mechanism
Every potential threat caught by a miner is forwarded to the Validator layer. Validators verify the validity of the threat by executing simulations in an automated forked environment, eliminating false positives and ensuring zero false alarms for the end user.

### 3. Incentivization via TAO
Miners and Validators are rewarded in `$TAO` depending on their speed, accuracy, and consensus rate. This economic framework keeps Aegis-Net on the cutting-edge by continuously self-optimizing its threat-detection engines.

### 4. Interactive and Seamless Dashboards
* **Client Portal (The Intercept):** An intuitive platform for developers to deploy contracts and run initial on-demand scans, returning insights down to the exact buggy code lines.
* **Subnet Explorer (The Hive):** A real-time transparent visualization of global exploits found, top-ranking miners, live emission rates, and active validators.

---

## 🗺️ Roadmap to Mainnet

<div align="center">
  <img src="https://img.shields.io/badge/STATUS-PHASE%201%20COMPLETE-brightgreen?style=for-the-badge" alt="Phase 1 Complete"/>
  <img src="https://img.shields.io/badge/NEXT-PHASE%202%20IN%20PROGRESS-blue?style=for-the-badge" alt="Phase 2 In Progress"/>
  <br><br>
  <i>A strategic 6-phase plan from Ideation to Full Decentralized Mainnet Deployment</i>
</div>

<br>

```
╔══════════════════════════════════════════════════════════════════════════╗
║  PHASE 1       PHASE 2       PHASE 3       PHASE 4       PHASE 5       PHASE 6  ║
║  ████████      ▓▓▓▓░░░░      ░░░░░░░░      ░░░░░░░░      ░░░░░░░░      ░░░░░░░░ ║
║  COMPLETE      ACTIVE        UPCOMING      UPCOMING      UPCOMING      UPCOMING ║
║  Q1 2025       Q2 2025       Q3 2025       Q4 2025       Q1 2026       Q2 2026  ║
╚══════════════════════════════════════════════════════════════════════════╝
```

---

### 🟢 Phase 1 — Foundation & Proof of Concept `Q1 2025` `✅ COMPLETE`

> **Objective:** Architect the theoretical substrate and deliver a high-fidelity interactive prototype that demonstrates the Aegis-Net vision.

| # | Deliverable | Status |
|:-:|:--|:-:|
| 1 | Subnet economic model & $TAO reward landscape formulation | ✅ |
| 2 | Local LLM benchmarking for Solidity & Rust vulnerability detection tasks | ✅ |
| 3 | MVP Dashboard — **Client Portal (The Intercept)** with simulated scan results | ✅ |
| 4 | MVP Dashboard — **Subnet Explorer (The Hive)** with live network visualization | ✅ |
| 5 | Formal Project Proposal (`PROPOSAL.md`) & structured Pitch Deck (`PITCH_DECK.md`) | ✅ |
| 6 | Full deployment on Vercel with CI/CD pipeline from GitHub | ✅ |
| 7 | Open-source repository with MIT License | ✅ |

**🏆 Key Result:** Fully functional simulation dashboard live at [aegis-net-pi.vercel.app](https://aegis-net-pi.vercel.app)

---

### 🔵 Phase 2 — Core Engine Development `Q2 2025` `🔄 IN PROGRESS`

> **Objective:** Build the core auditing engine powered by fine-tuned LLMs and establish the foundational Miner/Validator architecture.

| # | Deliverable | Status |
|:-:|:--|:-:|
| 1 | Fine-tune `DeepSeek-Audit-7B` on curated Solidity vulnerability datasets (SWC Registry, Damn Vulnerable DeFi) | 🔄 |
| 2 | Fine-tune `CodeLlama-Security-34B` for Rust/Anchor (Solana) contract analysis | 🔄 |
| 3 | Develop the **Proof-of-Audit** consensus algorithm specification | ⬚ |
| 4 | Build Miner node runtime: contract ingestion → LLM inference → structured threat output (JSON) | ⬚ |
| 5 | Build Validator node runtime: threat verification via forked EVM simulation (Anvil/Hardhat) | ⬚ |
| 6 | Implement synthetic challenge generation pipeline for Miner evaluation | ⬚ |
| 7 | Design the scoring & slashing mechanism for Miner accuracy tracking | ⬚ |

**📊 KPIs:**
- Achieve **>85% detection rate** on known vulnerability benchmarks (Reentrancy, Flash Loan, Integer Overflow)
- Reduce false positive rate to **<5%** via Validator simulation layer
- Process a single contract audit in under **30 seconds**

---

### 🟣 Phase 3 — Bittensor Testnet Deployment `Q3 2025`

> **Objective:** Deploy the Aegis-Net subnet on Bittensor Testnet and validate the decentralized audit pipeline end-to-end.

| # | Deliverable | Status |
|:-:|:--|:-:|
| 1 | Register Aegis-Net subnet on Bittensor Testnet | ⬚ |
| 2 | Deploy custom `Miner` and `Validator` node packages connecting to the Bittensor P2P network | ⬚ |
| 3 | Implement real-time axon/dendrite communication for threat propagation | ⬚ |
| 4 | Activate the $TAO emission reward cycle on Testnet | ⬚ |
| 5 | Connect the production Web UI to live Testnet endpoints for real-time data streaming | ⬚ |
| 6 | Open limited Testnet access for early community Miners (invite-only alpha) | ⬚ |
| 7 | Publish comprehensive Miner & Validator setup documentation | ⬚ |

**📊 KPIs:**
- Onboard **≥20 active Miners** and **≥5 Validators** on Testnet
- Achieve network consensus on **≥95% of confirmed threats**
- Maintain average block processing latency of **<2 seconds**

---

### 🟠 Phase 4 — Open Alpha & Multi-Chain Integration `Q4 2025`

> **Objective:** Open the platform to real-world Web3 protocols and extend auditing capabilities across multiple blockchain ecosystems.

| # | Deliverable | Status |
|:-:|:--|:-:|
| 1 | Integrate Web3 authentication (MetaMask, WalletConnect, Coinbase Wallet) on Client Portal | ⬚ |
| 2 | Enable multi-chain contract scanning: **Ethereum**, **Arbitrum**, **Optimism**, **Base** | ⬚ |
| 3 | Deploy automated fork simulation engine (Tenderly/Hardhat Fork) within the Validator layer | ⬚ |
| 4 | Launch public bug bounty program in partnership with Immunefi / HackerOne Web3 | ⬚ |
| 5 | Implement real-time alerting webhooks (Slack, Discord, Telegram) for protocol teams | ⬚ |
| 6 | Build CI/CD plugin for GitHub Actions — automated audit on every `git push` | ⬚ |
| 7 | Begin processing live deployed contracts with actual $TAO emission distribution | ⬚ |

**📊 KPIs:**
- Process **≥500 unique smart contracts** in the Open Alpha period
- Achieve **<15 second** average end-to-end audit turnaround
- Onboard **≥5 partner protocols** actively using Aegis-Net for continuous monitoring

---

### 🔴 Phase 5 — Mainnet Launch & Protocol Hardening `Q1 2026`

> **Objective:** Officially launch the Aegis-Net subnet on the Bittensor Mainnet with production-grade reliability and security.

| # | Deliverable | Status |
|:-:|:--|:-:|
| 1 | Transition from Testnet to Bittensor **Mainnet** with finalized consensus parameters | ⬚ |
| 2 | Complete third-party security audit of Aegis-Net's own infrastructure | ⬚ |
| 3 | Deploy production Miner/Validator binaries with auto-update mechanism | ⬚ |
| 4 | Launch the public **Aegis-Net DAO** for decentralized governance of protocol upgrades | ⬚ |
| 5 | Introduce advanced zero-day heuristic detection modules leveraging ensemble LLM techniques | ⬚ |
| 6 | Implement cross-chain threat intelligence sharing between Miners (inter-chain correlation engine) | ⬚ |
| 7 | Full open-source release of all subnet modules under permissive licensing | ⬚ |

**📊 KPIs:**
- Onboard **≥100 active Miners** globally across different regions
- Achieve **99.9% uptime** on the auditing pipeline
- Prevent or flag threats with an estimated **cumulative value of ≥$10M** in protected funds

---

### ⚪ Phase 6 — Ecosystem Expansion & Enterprise Adoption `Q2 2026+`

> **Objective:** Scale Aegis-Net into the definitive decentralized security infrastructure for the entire Web3 ecosystem.

| # | Deliverable | Status |
|:-:|:--|:-:|
| 1 | Expand to non-EVM chains: **Solana** (Anchor/Rust), **Cosmos** (CosmWasm), **Sui** (Move) | ⬚ |
| 2 | Launch enterprise API tier with SLA-backed audit guarantees for institutional clients | ⬚ |
| 3 | Partner with major L2 rollup bridges for pre-deployment mandatory security scans | ⬚ |
| 4 | Develop Aegis-Net SDK for direct smart contract IDE integration (VS Code, Remix) | ⬚ |
| 5 | Introduce on-chain audit certification NFTs — verifiable proof of security for audited contracts | ⬚ |
| 6 | Establish the Aegis-Net Research Lab for publishing Web3 security research papers | ⬚ |
| 7 | Build strategic partnerships with insurance protocols (Nexus Mutual, InsurAce) for audited contract coverage | ⬚ |

**📊 KPIs:**
- Support **≥6 blockchain ecosystems** with native audit capabilities
- Process **≥10,000 contracts/month** across all supported chains
- Become a **Top 10 Bittensor Subnet** by emission weight and miner participation

---

## 🖥️ Live Application & Architecture

### Web Interface & Deployment
The UI is fully live and provides a realistic, interactive representation of how users will interact with the Aegis-Net system. It simulates the operations, findings, and explorer views of our proposed Subnet with high fidelity.

* ⚡ **Live Demo:** [https://aegis-net-pi.vercel.app](https://aegis-net-pi.vercel.app)
* 🚀 **Deployment:** Fully deployed on Vercel with automatic CI/CD triggers from GitHub.

### Tech Stack

| Layer | Technology | Purpose |
|:--|:--|:--|
| **Frontend Framework** | React 18 (via Vite) | High-performance SPA with fast HMR |
| **Styling** | TailwindCSS | Utility-first responsive design system |
| **Iconography** | Lucide React | Consistent, accessible SVG icon library |
| **Data Visualization** | Recharts | Interactive charts for subnet analytics |
| **Deployment** | Vercel | Edge-optimized hosting with auto-deploy |
| **Version Control** | GitHub | Source of truth with branch protection |

---

## 📄 Documentation

We have formalized our logic and conceptual design into comprehensive documentation mapped to the capabilities of the dashboard:

| Document | Description | Link |
|:--|:--|:-:|
| **Official Proposal** | Complete technical specification defining the Miner/Validator workflow, consensus mechanism, and economic model | [📄 PROPOSAL.md](PROPOSAL.md) |
| **Pitch Deck** | Structured 10-slide presentation for judges covering problem, solution, architecture, tokenomics, and roadmap | [📊 PITCH_DECK.md](PITCH_DECK.md) |

---

## 🚀 Getting Started

To run the Aegis-Net simulation dashboard locally:

```bash
# 1. Clone the repository
git clone https://github.com/panzauto46-bot/AEGIS-NET.git
cd AEGIS-NET

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in your browser
# → http://localhost:5173
```

---

<div align="center">
  <img src="https://img.shields.io/badge/Bittensor-Subnet%20Ideathon-black?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48L3N2Zz4=" alt="Ideathon"/>
  <br>
  <sub><b>Aegis-Net</b> — Building the unhackable layer over Web3 protocols.</sub>
  <br>
  <sub>© 2026 Pandu Dargah. All Rights Reserved.</sub>
</div>
