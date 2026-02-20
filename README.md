<div align="center">
  <img src="https://img.shields.io/badge/Bittensor%20Subnet%20-%20Aegis--Net-black?style=for-the-badge&logoColor=white&logo=bittensor" alt="Aegis-Net"/>
  <h1 align="center">Aegis-Net : Decentralized AI Smart Contract Auditor</h1>
  <p align="center">
    <strong>A continuous, decentralized security infrastructure for Web3 protocols powered by Bittensor LLM Miners.</strong>
  </p>
  <p align="center">
    <a href="https://aegis-net-pi.vercel.app"><b>🌐 Live Demo</b></a> •
    <a href="PROPOSAL.md"><b>📄 Official Proposal</b></a> 
  </p>
  <p align="center">
    <a href="LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg"></a>
    <br>
    <i>© 2024 Pandu Dargah. All Rights Reserved.</i>
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

## �️ Roadmap to Mainnet

Our comprehensive roadmap details the progression from early prototype to full Bittensor integration:

### Q1 2024: Architecture & Proof of Concept  (✅ CURRENT)
* **Goal:** Design the theoretical foundation and construct a high-fidelity visual prototype.
* **Milestones:**
  * Subnet economics and reward landscape formulation.
  * Local LLM benchmarking for Solidity & Rust vulnerability tasks.
  * MVP Dashboard Delivery (Client Portal + Subnet Explorer).
  * Formal Project Proposal Submission for the Ideathon.

### Q2 2024: Bittensor Testnet Deployment 
* **Goal:** Launch the Aegis-Net subnet protocol directly on the Bittensor Testnet.
* **Milestones:**
  * Deploy custom `Miner` and `Validator` node scripts connecting directly to the network.
  * Implement the *Proof-of-Audit* consensus mechanism.
  * Create the initial synthetic data generation pipeline to evaluate Miners.
  * Connect the Web UI to the live Testnet endpoint for real-time data feeding.

### Q3 2024: Open Alpha & Smart Contract Integration
* **Goal:** Allow real-world Web3 protocols to submit their contracts for active auditing.
* **Milestones:**
  * Establish Web3-authentication (MetaMask/WalletConnect) integration on the Client Dashboard.
  * Enable multi-chain scanning functionality (Ethereum, Arbitrum, Optimism).
  * Introduce an automated simulation fork engine within the Validator layer.
  * Start processing live contracts and distributing actual `$TAO` emission rewards to Miners.

### Q4 2024: Mainnet Launch & Protocol Expansion 
* **Goal:** Officially launch the Aegis-Net subnet on the Bittensor Mainnet.
* **Milestones:**
  * Initiate the transition to the Mainnet utilizing final consensus parameters.
  * Partner with major EVM ecosystem bug bounty platforms to route exploits found.
  * Introduce advanced zero-day heuristic detection capabilities on native Minters. 
  * Full decentralization and open-sourcing of the sub-protocol modules.

---

## �🖥️ Live Application & Architecture

### Web Interface & Deployment
The UI is fully live and provides a realistic representation of how users interact with the Aegis-Net system. It simulates the operations, findings, and explorer views of our proposed Subnet. 

* ⚡ **Live Demo:** [https://aegis-net-pi.vercel.app](https://aegis-net-pi.vercel.app)
* 🚀 **Deploment Info:** Fully deployed seamlessly on Vercel with automatic CD triggers from GitHub.

### Tech Stack utilized for Dashboard:
* **Frontend Library:** React (via Vite)
* **Styling:** TailwindCSS
* **Icons:** Lucide React
* **Charting:** Recharts

---

## 📄 Documentation (Fase 2)

We have formalized our logic and conceptual design into a complete proposal mapped to the capabilities of the dashboard. This document defines the exact workflow between Miners and Validators. 
* Please refer to the **[PROPOSAL.md](PROPOSAL.md)** file within this repository. 

*(This serves as our core theoretical framework specifically prepared for the Hackathon/Ideathon structured submission).*

---

## 🚀 Getting Started (Run Local Instance)

To view the simulation dashboard locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/panzauto46-bot/AEGIS-NET.git
   cd AEGIS-NET
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Navigate to:**
   `http://localhost:5173`

---

## 🤝 Project Operation Status (Ideathon Submission)

| Fase | Deskripsi | Status | Keterangan |
|---|---|---|---|
| **FASE 1** | UI/UX & Deployment | 🟢 SELESAI | Desain Web selesai, Repo GitHub siap, dan Live di Vercel. Senjata utama sudah di tangan! |
| **FASE 2** | **Dokumen Proposal (Notion/PDF)** | 🟢 **SELESAI** | *Logika website telah dituangkan dalam format formal ke dalam `PROPOSAL.md` & `README.md`.* |
| **FASE 3** | Pitch Deck Bisnis | ⚪ PENDING | Pembuatan 10 Halaman slide presentasi sesuai konten. |
| **FASE 4** | Video Penjelasan | ⚪ PENDING | Rekaman layar penjelasan UI/UX dan arsitektur simulasi Vercel (5-10 menit). |
| **FASE 5** | Publikasi Twitter (X) | ⚪ PENDING | Membuat utas/thread pengumuman publik untuk memenuhi syarat kompetisi. |

---

<div align="center">
  <i>Submitted for the Bittensor Subnet Ideathon</i>
</div>
