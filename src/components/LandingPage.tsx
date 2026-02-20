import { useState, useEffect } from 'react';
import { Shield, Zap, Eye, Lock, ChevronRight, Activity, Globe, Cpu, AlertTriangle, CheckCircle, Clock, TrendingUp, Users, Database, BarChart3 } from 'lucide-react';
import { threatTickerData, networkStats } from '../data';

function NetworkVisualization() {
  const [nodes, setNodes] = useState<Array<{x: number; y: number; size: number; pulse: boolean; type: string}>>([]);
  const [connections, setConnections] = useState<Array<{x1: number; y1: number; x2: number; y2: number; active: boolean}>>([]);

  useEffect(() => {
    const nodeList = [];
    for (let i = 0; i < 30; i++) {
      nodeList.push({
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 80,
        size: 2 + Math.random() * 4,
        pulse: Math.random() > 0.5,
        type: Math.random() > 0.7 ? 'validator' : Math.random() > 0.4 ? 'miner' : 'node'
      });
    }
    setNodes(nodeList);

    const conns = [];
    for (let i = 0; i < nodeList.length; i++) {
      for (let j = i + 1; j < nodeList.length; j++) {
        const dist = Math.sqrt(Math.pow(nodeList[i].x - nodeList[j].x, 2) + Math.pow(nodeList[i].y - nodeList[j].y, 2));
        if (dist < 25) {
          conns.push({
            x1: nodeList[i].x,
            y1: nodeList[i].y,
            x2: nodeList[j].x,
            y2: nodeList[j].y,
            active: Math.random() > 0.6
          });
        }
      }
    }
    setConnections(conns);
  }, []);

  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % 30);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 100 100" className="w-full h-full opacity-70">
        {connections.map((c, i) => (
          <line key={`c-${i}`} x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
            stroke={c.active ? "rgba(0,255,245,0.3)" : "rgba(179,102,255,0.15)"}
            strokeWidth="0.15"
          >
            {c.active && (
              <animate attributeName="stroke-opacity" values="0.1;0.5;0.1" dur={`${2 + Math.random() * 3}s`} repeatCount="indefinite" />
            )}
          </line>
        ))}
        {nodes.map((n, i) => (
          <g key={`n-${i}`}>
            <circle cx={n.x} cy={n.y} r={n.size * 0.4}
              fill={n.type === 'validator' ? '#b366ff' : n.type === 'miner' ? '#00fff5' : '#39ff14'}
              opacity={i === activeIdx ? 1 : 0.6}
            >
              {n.pulse && (
                <animate attributeName="r" values={`${n.size*0.3};${n.size*0.6};${n.size*0.3}`} dur="3s" repeatCount="indefinite" />
              )}
            </circle>
            {i === activeIdx && (
              <circle cx={n.x} cy={n.y} r={n.size}
                fill="none" stroke="#00fff5" strokeWidth="0.2" opacity="0.8">
                <animate attributeName="r" values={`${n.size*0.5};${n.size*1.5}`} dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur="1.5s" repeatCount="indefinite" />
              </circle>
            )}
          </g>
        ))}
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-cyber-black via-transparent to-cyber-black" />
    </div>
  );
}

function ThreatTicker() {
  return (
    <div className="threat-ticker py-3 overflow-hidden">
      <div className="animate-ticker flex whitespace-nowrap">
        {[...threatTickerData, ...threatTickerData].map((item, i) => (
          <div key={i} className="inline-flex items-center gap-3 mx-8">
            <span className={`inline-block w-2 h-2 rounded-full ${
              item.status === 'CONFIRMED' ? 'bg-neon-green' :
              item.status === 'SIMULATING' ? 'bg-neon-orange animate-pulse' : 'bg-neon-blue'
            }`} />
            <span className="text-gray-500 font-mono text-xs">{item.contract}</span>
            <span className="text-gray-400 text-xs">|</span>
            <span className="text-gray-300 text-xs font-medium">{item.protocol}</span>
            <span className="text-gray-400 text-xs">→</span>
            <span className={`text-xs font-semibold ${
              item.risk === 'CRITICAL' ? 'text-neon-red' :
              item.risk === 'MEDIUM' ? 'text-neon-orange' : 'text-neon-green'
            }`}>{item.risk}</span>
            <span className="text-gray-400 text-xs">•</span>
            <span className="text-gray-400 text-xs">{item.threat}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${
              item.status === 'CONFIRMED' ? 'bg-green-900/30 text-neon-green border border-green-800/30' :
              item.status === 'SIMULATING' ? 'bg-orange-900/30 text-neon-orange border border-orange-800/30' :
              'bg-blue-900/30 text-neon-blue border border-blue-800/30'
            }`}>{item.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const [visibleStats, setVisibleStats] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setVisibleStats(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen gradient-bg">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-cyber-black/70 border-b border-glass-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Shield className="w-8 h-8 text-neon-cyan" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-neon-green rounded-full animate-pulse" />
            </div>
            <span className="font-orbitron text-xl font-bold text-white tracking-wider">AEGIS<span className="neon-text">-NET</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button className="text-gray-400 hover:text-neon-cyan transition-colors text-sm font-medium">Protocol</button>
            <button onClick={() => onNavigate('portal')} className="text-gray-400 hover:text-neon-cyan transition-colors text-sm font-medium">Client Portal</button>
            <button onClick={() => onNavigate('explorer')} className="text-gray-400 hover:text-neon-cyan transition-colors text-sm font-medium">Subnet Explorer</button>
            <button className="text-gray-400 hover:text-neon-cyan transition-colors text-sm font-medium">Docs</button>
          </div>
          <button onClick={() => onNavigate('portal')} className="neon-btn px-5 py-2 rounded-lg font-orbitron text-xs tracking-wider font-semibold">
            LAUNCH APP
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 cyber-grid hex-pattern animate-grid-move opacity-50" />
        
        {/* Network Visualization Background */}
        <div className="absolute inset-0 top-20">
          <NetworkVisualization />
        </div>

        {/* Scan Line Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent"
            style={{ animation: 'scan-line 8s linear infinite' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-8 animate-fade-in-up">
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <span className="text-neon-green text-xs font-mono tracking-wider">BITTENSOR SUBNET 47 • LIVE</span>
            </div>
            
            <h1 className="font-orbitron text-5xl md:text-7xl font-black text-white leading-tight mb-6 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <span className="block">AI-Powered</span>
              <span className="block neon-text">Zero-Day Exploit</span>
              <span className="block">Detection</span>
            </h1>
            
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              Real-time, Decentralized Smart Contract Security powered by <span className="text-neon-purple font-semibold">Bittensor</span>. 
              Thousands of AI miners continuously scan every block, finding vulnerabilities before hackers do.
            </p>

            <div className="flex flex-wrap gap-4 mb-16 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <button onClick={() => onNavigate('portal')} className="neon-btn px-8 py-4 rounded-xl font-orbitron text-sm tracking-wider font-bold flex items-center gap-2">
                REQUEST AUDIT <ChevronRight className="w-4 h-4" />
              </button>
              <button onClick={() => onNavigate('explorer')} className="neon-btn-purple px-8 py-4 rounded-xl font-orbitron text-sm tracking-wider font-bold flex items-center gap-2">
                EXPLORE SUBNET <Eye className="w-4 h-4" />
              </button>
            </div>

            {/* Live Stats */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-1000 ${visibleStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {[
                { label: 'Active Miners', value: networkStats.totalMiners.toLocaleString(), icon: Cpu, color: 'text-neon-cyan' },
                { label: 'Contracts Scanned', value: networkStats.contractsScanned.toLocaleString(), icon: Database, color: 'text-neon-purple' },
                { label: 'Exploits Found', value: networkStats.exploitsFound.toLocaleString(), icon: AlertTriangle, color: 'text-neon-red' },
                { label: 'Bounty Paid', value: networkStats.totalBountyPaid, icon: TrendingUp, color: 'text-neon-green' },
              ].map((stat, i) => (
                <div key={i} className="glass-card glass-card-hover p-4 transition-all duration-300 cursor-default">
                  <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                  <div className={`font-orbitron text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-gray-500 text-xs mt-1 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Threat Ticker */}
      <ThreatTicker />

      {/* How It Works */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-30" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-neon-cyan font-mono text-xs tracking-widest uppercase">Architecture</span>
            <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white mt-4">How <span className="neon-text">Aegis-Net</span> Works</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">A decentralized swarm of AI miners compete to find vulnerabilities, validated by simulation judges on the Bittensor network.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "1. MINERS ATTACK",
                subtitle: "The AI Attackers",
                desc: "Specialized AI models (LLMs fine-tuned on Solidity) receive smart contract bytecode and attempt to craft exploit payloads — real calldata that could drain funds.",
                details: ["LLM-powered exploit generation", "Reentrancy, flash loans, oracle manipulation", "Proof-of-Exploit output (not just warnings)"],
                color: "neon-cyan",
                borderColor: "border-neon-cyan/20",
              },
              {
                icon: Shield,
                title: "2. VALIDATORS JUDGE",
                subtitle: "Sandboxed Simulation",
                desc: "Validators receive exploit payloads and execute them in forked blockchain environments (Anvil/Hardhat) to verify if the exploit actually works.",
                details: ["Fork mainnet state locally", "Execute miner's calldata", "Binary scoring: drained = 1, reverted = 0"],
                color: "neon-purple",
                borderColor: "border-neon-purple/20",
              },
              {
                icon: Lock,
                title: "3. CONSENSUS & REWARD",
                subtitle: "TAO Emission",
                desc: "Valid exploits earn TAO rewards. First-blood miners get 80% of bounty. Spammers are slashed. Clients receive detailed vulnerability reports.",
                details: ["First-Blood: 80% to first finder", "Anti-spam slashing mechanism", "Real-time TAO emission distribution"],
                color: "neon-green",
                borderColor: "border-neon-green/20",
              },
            ].map((step, i) => (
              <div key={i} className={`glass-card glass-card-hover p-8 relative overflow-hidden group`}>
                <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-${step.color}/50 to-transparent`} />
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-${step.color}/10 border ${step.borderColor}`}>
                  <step.icon className={`w-7 h-7 text-${step.color}`} />
                </div>
                <div className={`font-orbitron text-xs tracking-widest text-${step.color} mb-2`}>{step.title}</div>
                <div className="text-gray-400 text-xs mb-3 font-mono">{step.subtitle}</div>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{step.desc}</p>
                <ul className="space-y-2">
                  {step.details.map((d, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-gray-500">
                      <CheckCircle className={`w-3.5 h-3.5 text-${step.color} mt-0.5 shrink-0`} />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Problem */}
            <div className="glass-card p-8 border-neon-red/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-neon-red/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-neon-red" />
                </div>
                <h3 className="font-orbitron text-lg font-bold text-white">The Problem</h3>
              </div>
              <div className="space-y-4">
                {[
                  { stat: "$50K - $200K", desc: "Traditional audit cost — unaffordable for most DeFi startups" },
                  { stat: "2-6 Weeks", desc: "Average time to complete a single manual security audit" },
                  { stat: "$3.8B+", desc: "Lost to DeFi exploits in 2023 alone — most after passing audits" },
                  { stat: "Zero", desc: "Real-time protection after deployment. Hackers strike first." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-3 rounded-lg bg-red-900/5 border border-red-900/10">
                    <div className="font-orbitron text-sm font-bold text-neon-red whitespace-nowrap">{item.stat}</div>
                    <div className="text-gray-500 text-sm">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Solution */}
            <div className="glass-card p-8 border-neon-green/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-neon-green/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-neon-green" />
                </div>
                <h3 className="font-orbitron text-lg font-bold text-white">Aegis-Net Solution</h3>
              </div>
              <div className="space-y-4">
                {[
                  { stat: "1,247+", desc: "AI miners scanning 24/7 — no human bottleneck or bias" },
                  { stat: "< 2 sec", desc: "Average response time to detect a new vulnerability" },
                  { stat: "99.97%", desc: "Uptime — continuous protection, every block, every chain" },
                  { stat: "Pay-per-bug", desc: "Only pay bounties when real exploits are found & verified" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-3 rounded-lg bg-green-900/5 border border-green-900/10">
                    <div className="font-orbitron text-sm font-bold text-neon-green whitespace-nowrap">{item.stat}</div>
                    <div className="text-gray-500 text-sm">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Market */}
      <section className="relative py-24">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-neon-purple font-mono text-xs tracking-widest uppercase">Go-to-Market</span>
            <h2 className="font-orbitron text-4xl font-bold text-white mt-4">Target Users</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card glass-card-hover p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-neon-cyan" />
                </div>
                <div>
                  <h3 className="font-orbitron text-sm font-bold text-white">Early Adopters</h3>
                  <p className="text-gray-500 text-xs">DeFi Startups & New Protocols</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Startups that can't afford $200K for tier-1 audits (Certik, Trail of Bits) but need instant, reliable security coverage before launching their protocol.
              </p>
            </div>
            <div className="glass-card glass-card-hover p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-neon-purple" />
                </div>
                <div>
                  <h3 className="font-orbitron text-sm font-bold text-white">Anchor Partners</h3>
                  <p className="text-gray-500 text-xs">DEXs & Lending Protocols</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Established DEXs and lending protocols that frequently upgrade contracts and need continuous, real-time monitoring instead of one-off audits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="glass-card p-12 animate-pulse-glow">
            <Shield className="w-16 h-16 text-neon-cyan mx-auto mb-6" />
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-4">
              Secure Your Protocol <span className="neon-text">Today</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
              Join the decentralized security revolution. Submit your smart contract and let the AI swarm protect your protocol.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => onNavigate('portal')} className="neon-btn px-10 py-4 rounded-xl font-orbitron text-sm tracking-wider font-bold flex items-center gap-2">
                <Activity className="w-4 h-4" /> START AUDIT
              </button>
              <button onClick={() => onNavigate('explorer')} className="neon-btn-purple px-10 py-4 rounded-xl font-orbitron text-sm tracking-wider font-bold flex items-center gap-2">
                <BarChart3 className="w-4 h-4" /> VIEW SUBNET
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-glass-border py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-neon-cyan" />
            <span className="font-orbitron text-sm text-gray-500">AEGIS-NET</span>
            <span className="text-gray-700 text-xs">© 2024</span>
          </div>
          <div className="flex items-center gap-6 text-gray-600 text-xs">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Uptime: {networkStats.uptime}</span>
            <span className="flex items-center gap-1"><Activity className="w-3 h-3 text-neon-green" /> Network: Healthy</span>
            <span>Bittensor Subnet 47</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
