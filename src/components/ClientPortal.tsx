import { useState } from 'react';
import { Shield, ArrowLeft, Search, DollarSign, FileText, AlertTriangle, CheckCircle, Clock, Eye, ExternalLink, Copy, ChevronDown, ChevronUp, Zap, Activity, Code } from 'lucide-react';
import { vulnerabilityReports } from '../data';

interface ClientPortalProps {
  onNavigate: (page: string) => void;
}

function AuditRequestForm() {
  const [inputType, setInputType] = useState<'address' | 'github'>('address');
  const [address, setAddress] = useState('');
  const [chain, setChain] = useState('ethereum');
  const [submitted, setSubmitted] = useState(false);
  const [scanning, setScanning] = useState(false);

  const handleSubmit = () => {
    if (!address) return;
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setSubmitted(true);
    }, 3000);
  };

  if (scanning) {
    return (
      <div className="glass-card p-8 text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 border-2 border-neon-cyan/30 rounded-full animate-rotate-slow" />
          <div className="absolute inset-2 border-2 border-neon-purple/30 rounded-full animate-rotate-slow" style={{animationDirection: 'reverse', animationDuration: '15s'}} />
          <div className="absolute inset-4 border-2 border-neon-green/30 rounded-full animate-rotate-slow" style={{animationDuration: '10s'}} />
          <Shield className="absolute inset-0 m-auto w-8 h-8 text-neon-cyan animate-pulse" />
        </div>
        <h3 className="font-orbitron text-lg font-bold text-white mb-2">Deploying AI Swarm...</h3>
        <p className="text-gray-500 text-sm mb-4">1,247 miners are analyzing your contract</p>
        <div className="max-w-md mx-auto">
          <div className="progress-bar-container h-2 mb-2">
            <div className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full transition-all duration-300" style={{width: '67%', animation: 'glow-pulse 1s ease-in-out infinite'}} />
          </div>
          <div className="flex justify-between text-xs text-gray-600 font-mono">
            <span>Bytecode Analysis</span>
            <span>67%</span>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="glass-card p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-neon-green/10 border border-neon-green/20 flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-neon-green" />
          </div>
          <div>
            <h3 className="font-orbitron text-sm font-bold text-white">Audit Request Submitted</h3>
            <p className="text-gray-500 text-xs">Request ID: AEG-2024-0847</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-glass-bg rounded-lg p-3 border border-glass-border">
            <div className="text-gray-500 text-xs mb-1">Status</div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <span className="text-neon-green text-sm font-mono">ACTIVE</span>
            </div>
          </div>
          <div className="bg-glass-bg rounded-lg p-3 border border-glass-border">
            <div className="text-gray-500 text-xs mb-1">Miners Assigned</div>
            <div className="text-neon-cyan text-sm font-mono">1,247</div>
          </div>
          <div className="bg-glass-bg rounded-lg p-3 border border-glass-border">
            <div className="text-gray-500 text-xs mb-1">Est. Completion</div>
            <div className="text-white text-sm font-mono">~2 min</div>
          </div>
          <div className="bg-glass-bg rounded-lg p-3 border border-glass-border">
            <div className="text-gray-500 text-xs mb-1">Chain</div>
            <div className="text-neon-purple text-sm font-mono">{chain.toUpperCase()}</div>
          </div>
        </div>
        <button onClick={() => { setSubmitted(false); setAddress(''); }} className="neon-btn px-6 py-2 rounded-lg text-xs font-orbitron tracking-wider w-full">
          SUBMIT ANOTHER AUDIT
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card p-8">
      <div className="flex items-center gap-3 mb-6">
        <Search className="w-5 h-5 text-neon-cyan" />
        <h3 className="font-orbitron text-sm font-bold text-white">Submit Audit Request</h3>
      </div>
      
      {/* Input Type Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setInputType('address')}
          className={`px-4 py-2 rounded-lg text-xs font-mono transition-all ${
            inputType === 'address' ? 'tab-active border' : 'bg-glass-bg border border-glass-border text-gray-500 hover:text-gray-300'
          }`}
        >
          Contract Address
        </button>
        <button
          onClick={() => setInputType('github')}
          className={`px-4 py-2 rounded-lg text-xs font-mono transition-all ${
            inputType === 'github' ? 'tab-active border' : 'bg-glass-bg border border-glass-border text-gray-500 hover:text-gray-300'
          }`}
        >
          GitHub Repo
        </button>
      </div>

      {/* Input Field */}
      <div className="mb-4">
        <label className="text-gray-500 text-xs mb-2 block font-mono">
          {inputType === 'address' ? 'Smart Contract Address' : 'GitHub Repository URL'}
        </label>
        <input
          type="text"
          placeholder={inputType === 'address' ? '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D' : 'https://github.com/org/repo'}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full bg-cyber-dark border border-glass-border rounded-lg px-4 py-3 text-white text-sm font-mono placeholder-gray-700 focus:outline-none focus:border-neon-cyan/50 transition-colors"
        />
      </div>

      {/* Chain Select */}
      <div className="mb-4">
        <label className="text-gray-500 text-xs mb-2 block font-mono">Target Chain</label>
        <select
          value={chain}
          onChange={(e) => setChain(e.target.value)}
          className="w-full bg-cyber-dark border border-glass-border rounded-lg px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-neon-cyan/50 transition-colors appearance-none"
        >
          <option value="ethereum">Ethereum Mainnet</option>
          <option value="bsc">BNB Smart Chain</option>
          <option value="polygon">Polygon</option>
          <option value="arbitrum">Arbitrum One</option>
          <option value="optimism">Optimism</option>
          <option value="base">Base</option>
          <option value="avalanche">Avalanche C-Chain</option>
        </select>
      </div>

      {/* Priority */}
      <div className="mb-6">
        <label className="text-gray-500 text-xs mb-2 block font-mono">Scan Priority</label>
        <div className="grid grid-cols-3 gap-2">
          {['Standard', 'Priority', 'Critical'].map((p) => (
            <button key={p} className={`py-2 rounded-lg text-xs font-mono border transition-all ${
              p === 'Standard' ? 'tab-active' : 'bg-glass-bg border-glass-border text-gray-500 hover:text-gray-300'
            }`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      <button onClick={handleSubmit} className="neon-btn px-6 py-3 rounded-lg text-xs font-orbitron tracking-wider w-full font-bold flex items-center justify-center gap-2">
        <Zap className="w-4 h-4" /> DEPLOY AI SWARM
      </button>
    </div>
  );
}

function BountyConfig() {
  const [bountyAmount, setBountyAmount] = useState('5000');
  const [token, setToken] = useState('USDC');

  return (
    <div className="glass-card p-8">
      <div className="flex items-center gap-3 mb-6">
        <DollarSign className="w-5 h-5 text-neon-green" />
        <h3 className="font-orbitron text-sm font-bold text-white">Bounty Configuration</h3>
      </div>

      <div className="mb-4">
        <label className="text-gray-500 text-xs mb-2 block font-mono">Bounty Amount</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={bountyAmount}
            onChange={(e) => setBountyAmount(e.target.value)}
            className="flex-1 bg-cyber-dark border border-glass-border rounded-lg px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-neon-green/50 transition-colors"
          />
          <select
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="bg-cyber-dark border border-glass-border rounded-lg px-4 py-3 text-neon-green text-sm font-mono focus:outline-none appearance-none w-28"
          >
            <option value="USDC">USDC</option>
            <option value="TAO">TAO</option>
            <option value="ETH">ETH</option>
          </select>
        </div>
      </div>

      <div className="bg-glass-bg rounded-lg p-4 border border-glass-border mb-4">
        <div className="text-gray-500 text-xs mb-3 font-mono">Reward Distribution</div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-xs">First-Blood Finder (80%)</span>
            <span className="text-neon-green text-sm font-mono font-bold">{(parseFloat(bountyAmount || '0') * 0.8).toLocaleString()} {token}</span>
          </div>
          <div className="progress-bar-container h-1.5">
            <div className="h-full bg-neon-green rounded-full" style={{width: '80%'}} />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-xs">Confirming Miners (20%)</span>
            <span className="text-neon-cyan text-sm font-mono font-bold">{(parseFloat(bountyAmount || '0') * 0.2).toLocaleString()} {token}</span>
          </div>
          <div className="progress-bar-container h-1.5">
            <div className="h-full bg-neon-cyan rounded-full" style={{width: '20%'}} />
          </div>
        </div>
      </div>

      <div className="bg-glass-bg rounded-lg p-4 border border-glass-border mb-6">
        <div className="text-gray-500 text-xs mb-2 font-mono">Payout Conditions</div>
        <div className="space-y-2">
          {[
            'Only paid for verified exploits (simulated successfully)',
            'Critical severity: 100% of bounty',
            'Medium severity: 50% of bounty',
            'Low severity: 25% of bounty',
          ].map((rule, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-gray-400">
              <CheckCircle className="w-3 h-3 text-neon-green mt-0.5 shrink-0" />
              <span>{rule}</span>
            </div>
          ))}
        </div>
      </div>

      <button className="neon-btn px-6 py-3 rounded-lg text-xs font-orbitron tracking-wider w-full font-bold" style={{borderColor: 'rgba(57,255,20,0.4)', color: '#39ff14'}}>
        CONFIGURE BOUNTY
      </button>
    </div>
  );
}

function VulnerabilityReport({ report }: { report: typeof vulnerabilityReports[0] }) {
  const [expanded, setExpanded] = useState(false);

  const riskColors = {
    critical: { bg: 'risk-badge-critical', text: 'text-neon-red', border: 'border-neon-red/20' },
    medium: { bg: 'risk-badge-medium', text: 'text-neon-orange', border: 'border-neon-orange/20' },
    low: { bg: 'risk-badge-low', text: 'text-neon-green', border: 'border-neon-green/20' },
  };

  const colors = riskColors[report.risk];

  return (
    <div className={`glass-card glass-card-hover overflow-hidden transition-all duration-300 ${colors.border}`}>
      <div className="p-6 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className={`px-2 py-1 rounded text-xs font-mono font-bold ${colors.bg}`}>
              {report.risk.toUpperCase()}
            </span>
            <span className="text-gray-600 text-xs font-mono">{report.id}</span>
          </div>
          <div className="flex items-center gap-2">
            {report.status === 'confirmed' ? (
              <span className="flex items-center gap-1 text-xs text-neon-green"><CheckCircle className="w-3 h-3" /> Confirmed</span>
            ) : (
              <span className="flex items-center gap-1 text-xs text-neon-orange"><Clock className="w-3 h-3 animate-pulse" /> Simulating</span>
            )}
            {expanded ? <ChevronUp className="w-4 h-4 text-gray-600" /> : <ChevronDown className="w-4 h-4 text-gray-600" />}
          </div>
        </div>
        
        <h4 className="text-white font-semibold text-sm mb-2">{report.title}</h4>
        
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1 font-mono"><Code className="w-3 h-3" /> Line {report.line}</span>
          <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {report.protocol}</span>
          <span className={`flex items-center gap-1 font-bold ${colors.text}`}>
            <AlertTriangle className="w-3 h-3" /> Est. Loss: {report.estimatedLoss}
          </span>
        </div>
      </div>

      {expanded && (
        <div className="px-6 pb-6 space-y-4 border-t border-glass-border pt-4">
          <p className="text-gray-400 text-sm leading-relaxed">{report.description}</p>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 text-xs font-mono">Vulnerable Code — Line {report.line}</span>
              <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-neon-cyan transition-colors">
                <Copy className="w-3 h-3" /> Copy
              </button>
            </div>
            <pre className="bg-cyber-dark rounded-lg p-4 text-xs font-mono text-gray-300 overflow-x-auto border border-glass-border leading-relaxed">
              {report.codeSnippet}
            </pre>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-glass-bg rounded-lg p-3 border border-glass-border">
              <div className="text-gray-600 text-xs mb-1">Found by</div>
              <div className="text-neon-cyan text-xs font-mono">{report.minerFound}</div>
            </div>
            <div className="bg-glass-bg rounded-lg p-3 border border-glass-border">
              <div className="text-gray-600 text-xs mb-1">Validators</div>
              <div className="text-neon-purple text-xs font-mono">{report.validatorConfirmed}/8 confirmed</div>
            </div>
            <div className="bg-glass-bg rounded-lg p-3 border border-glass-border">
              <div className="text-gray-600 text-xs mb-1">Timestamp</div>
              <div className="text-gray-400 text-xs font-mono">{report.timestamp.split(' ')[1]}</div>
            </div>
            <div className="bg-glass-bg rounded-lg p-3 border border-glass-border">
              <div className="text-gray-600 text-xs mb-1">Contract</div>
              <div className="text-gray-400 text-xs font-mono flex items-center gap-1">
                {report.contract.slice(0, 8)}...{report.contract.slice(-4)}
                <ExternalLink className="w-3 h-3 text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ClientPortal({ onNavigate }: ClientPortalProps) {
  const [activeTab, setActiveTab] = useState<'audit' | 'reports'>('audit');

  return (
    <div className="min-h-screen gradient-bg">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-cyber-black/70 border-b border-glass-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('landing')} className="text-gray-500 hover:text-neon-cyan transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-neon-cyan" />
              <span className="font-orbitron text-lg font-bold text-white">AEGIS<span className="neon-text">-NET</span></span>
            </div>
            <span className="text-gray-600 text-xs font-mono hidden sm:block">/ CLIENT PORTAL</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 glass-card px-3 py-1.5">
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <span className="text-neon-green text-xs font-mono">CONNECTED</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12 max-w-7xl mx-auto px-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-orbitron text-3xl font-bold text-white mb-2">Client Portal</h1>
          <p className="text-gray-500 text-sm">Submit contracts for AI-powered security auditing and configure bounty rewards.</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-6 py-3 rounded-lg text-xs font-orbitron tracking-wider transition-all border ${
              activeTab === 'audit' ? 'tab-active font-bold' : 'bg-glass-bg border-glass-border text-gray-500 hover:text-gray-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              SUBMIT AUDIT
            </div>
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-6 py-3 rounded-lg text-xs font-orbitron tracking-wider transition-all border ${
              activeTab === 'reports' ? 'tab-active font-bold' : 'bg-glass-bg border-glass-border text-gray-500 hover:text-gray-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              VULNERABILITY REPORTS
              <span className="bg-neon-red/20 text-neon-red text-xs px-2 py-0.5 rounded-full font-mono">{vulnerabilityReports.length}</span>
            </div>
          </button>
        </div>

        {activeTab === 'audit' ? (
          <div className="grid lg:grid-cols-2 gap-8">
            <AuditRequestForm />
            <BountyConfig />
          </div>
        ) : (
          <div className="space-y-4">
            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Total Findings', value: '4', color: 'text-white' },
                { label: 'Critical', value: '2', color: 'text-neon-red' },
                { label: 'Medium', value: '1', color: 'text-neon-orange' },
                { label: 'Low', value: '1', color: 'text-neon-green' },
              ].map((s, i) => (
                <div key={i} className="glass-card p-4">
                  <div className={`font-orbitron text-2xl font-bold ${s.color}`}>{s.value}</div>
                  <div className="text-gray-500 text-xs mt-1">{s.label}</div>
                </div>
              ))}
            </div>
            
            {/* Reports */}
            {vulnerabilityReports.map((report) => (
              <VulnerabilityReport key={report.id} report={report} />
            ))}
          </div>
        )}

        {/* Active Audits Status */}
        <div className="mt-12">
          <h2 className="font-orbitron text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-neon-cyan" />
            Active Audit Queue
          </h2>
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-glass-border">
                    <th className="text-left text-gray-500 text-xs font-mono py-3 px-4">Request ID</th>
                    <th className="text-left text-gray-500 text-xs font-mono py-3 px-4">Contract</th>
                    <th className="text-left text-gray-500 text-xs font-mono py-3 px-4">Chain</th>
                    <th className="text-left text-gray-500 text-xs font-mono py-3 px-4">Status</th>
                    <th className="text-left text-gray-500 text-xs font-mono py-3 px-4">Miners</th>
                    <th className="text-left text-gray-500 text-xs font-mono py-3 px-4">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 'AEG-0847', contract: '0x7a25...488D', chain: 'ETH', status: 'Scanning', miners: 847, progress: 92 },
                    { id: 'AEG-0848', contract: '0x1f98...F984', chain: 'BSC', status: 'Scanning', miners: 1102, progress: 67 },
                    { id: 'AEG-0849', contract: '0xdead...1a23', chain: 'ARB', status: 'Queued', miners: 0, progress: 0 },
                    { id: 'AEG-0850', contract: '0x5c69...2aAB', chain: 'POLY', status: 'Complete', miners: 1247, progress: 100 },
                  ].map((audit, i) => (
                    <tr key={i} className="border-b border-glass-border/50 hover:bg-glass-bg transition-colors">
                      <td className="py-3 px-4 text-neon-cyan text-xs font-mono">{audit.id}</td>
                      <td className="py-3 px-4 text-gray-400 text-xs font-mono">{audit.contract}</td>
                      <td className="py-3 px-4">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-glass-bg border border-glass-border text-gray-400">{audit.chain}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`flex items-center gap-1.5 text-xs font-mono ${
                          audit.status === 'Complete' ? 'text-neon-green' :
                          audit.status === 'Scanning' ? 'text-neon-cyan' : 'text-gray-500'
                        }`}>
                          {audit.status === 'Scanning' && <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />}
                          {audit.status === 'Complete' && <CheckCircle className="w-3 h-3" />}
                          {audit.status === 'Queued' && <Clock className="w-3 h-3" />}
                          {audit.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-400 text-xs font-mono">{audit.miners.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="progress-bar-container h-1.5 w-20">
                            <div className={`h-full rounded-full ${
                              audit.progress === 100 ? 'bg-neon-green' : audit.progress > 0 ? 'bg-neon-cyan' : 'bg-gray-700'
                            }`} style={{width: `${audit.progress}%`}} />
                          </div>
                          <span className="text-gray-500 text-xs font-mono">{audit.progress}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
