import { useState, useEffect } from 'react';
import { Shield, ArrowLeft, Trophy, BarChart3, Activity, TrendingUp, TrendingDown, Minus, Cpu, Zap, AlertTriangle, Clock, CheckCircle, Eye, Radio } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { minerLeaderboard, validatorData, emissionData, networkStats } from '../data';

interface SubnetExplorerProps {
  onNavigate: (page: string) => void;
}

function MinerLeaderboardSection() {
  const [hoveredMiner, setHoveredMiner] = useState<number | null>(null);

  return (
    <div className="glass-card overflow-hidden">
      <div className="p-6 border-b border-glass-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="w-5 h-5 text-neon-cyan" />
            <h3 className="font-orbitron text-sm font-bold text-white">Miner Leaderboard</h3>
            <span className="text-gray-600 text-xs font-mono">Proof-of-Intelligence Ranking</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            <span className="text-gray-500 text-xs font-mono">LIVE</span>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-glass-border bg-glass-bg">
              <th className="text-left text-gray-500 text-xs font-mono py-3 px-4">#</th>
              <th className="text-left text-gray-500 text-xs font-mono py-3 px-4">Miner ID / Model</th>
              <th className="text-right text-gray-500 text-xs font-mono py-3 px-4">Exploits Found</th>
              <th className="text-right text-gray-500 text-xs font-mono py-3 px-4">False Positives</th>
              <th className="text-right text-gray-500 text-xs font-mono py-3 px-4">Response Time</th>
              <th className="text-right text-gray-500 text-xs font-mono py-3 px-4">PoI Score</th>
              <th className="text-right text-gray-500 text-xs font-mono py-3 px-4">TAO Earned</th>
              <th className="text-center text-gray-500 text-xs font-mono py-3 px-4">Trend</th>
            </tr>
          </thead>
          <tbody>
            {minerLeaderboard.map((miner, i) => (
              <tr
                key={i}
                className={`border-b border-glass-border/50 transition-all duration-200 cursor-pointer ${
                  hoveredMiner === i ? 'bg-neon-cyan/5' : 'hover:bg-glass-bg'
                }`}
                onMouseEnter={() => setHoveredMiner(i)}
                onMouseLeave={() => setHoveredMiner(null)}
              >
                <td className="py-4 px-4">
                  <span className={`font-orbitron text-sm font-bold ${
                    miner.rank === 1 ? 'text-yellow-400' :
                    miner.rank === 2 ? 'text-gray-300' :
                    miner.rank === 3 ? 'text-orange-400' : 'text-gray-600'
                  }`}>
                    {miner.rank <= 3 ? ['🥇', '🥈', '🥉'][miner.rank - 1] : `#${miner.rank}`}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div>
                    <div className="text-neon-cyan text-xs font-mono font-bold">{miner.id}</div>
                    <div className="text-gray-600 text-xs mt-0.5">{miner.model}</div>
                  </div>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="text-neon-green font-mono text-sm font-bold">{miner.exploits.toLocaleString()}</span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className={`font-mono text-sm ${miner.falsePositives > 20 ? 'text-neon-red' : 'text-gray-400'}`}>
                    {miner.falsePositives}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className={`font-mono text-sm ${
                    parseFloat(miner.responseTime) < 1.5 ? 'text-neon-green' : 'text-gray-400'
                  }`}>
                    {miner.responseTime}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="progress-bar-container h-1.5 w-16 hidden md:block">
                      <div className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full" style={{width: `${miner.score}%`}} />
                    </div>
                    <span className="font-orbitron text-sm font-bold text-white">{miner.score}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="text-neon-purple font-mono text-sm font-bold">{miner.reward}</span>
                </td>
                <td className="py-4 px-4 text-center">
                  {miner.trend === 'up' ? <TrendingUp className="w-4 h-4 text-neon-green mx-auto" /> :
                   miner.trend === 'down' ? <TrendingDown className="w-4 h-4 text-neon-red mx-auto" /> :
                   <Minus className="w-4 h-4 text-gray-600 mx-auto" />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ValidatorConsensusMap() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <Radio className="w-5 h-5 text-neon-purple" />
        <h3 className="font-orbitron text-sm font-bold text-white">Validator Consensus Map</h3>
        <span className="text-gray-600 text-xs font-mono">Weight Distribution</span>
      </div>

      {/* Weight Visualization */}
      <div className="mb-6">
        <div className="flex gap-1 mb-3 h-8 rounded-lg overflow-hidden">
          {validatorData.map((v, i) => (
            <div
              key={i}
              className="relative group cursor-pointer transition-all duration-300 hover:opacity-100"
              style={{
                width: `${v.weight * 100}%`,
                background: `linear-gradient(135deg, ${
                  ['#00fff5', '#b366ff', '#39ff14', '#4d8bff', '#ff9500', '#ff3355', '#00fff5', '#b366ff'][i]
                }40, ${
                  ['#00fff5', '#b366ff', '#39ff14', '#4d8bff', '#ff9500', '#ff3355', '#00fff5', '#b366ff'][i]
                }20)`,
                opacity: 0.8,
              }}
            >
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                <div className="glass-card px-3 py-2 text-xs whitespace-nowrap neon-border">
                  <div className="text-white font-mono font-bold">{v.id}</div>
                  <div className="text-gray-400">Weight: {(v.weight * 100).toFixed(0)}%</div>
                  <div className="text-gray-400">Stake: {v.stake}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-600 font-mono">
          <span>0%</span>
          <span>Weight Distribution</span>
          <span>100%</span>
        </div>
      </div>

      {/* Validator List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {validatorData.map((v, i) => (
          <div key={i} className="bg-glass-bg rounded-lg p-4 border border-glass-border hover:border-neon-purple/30 transition-colors cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${v.status === 'active' ? 'bg-neon-green' : 'bg-neon-orange animate-pulse'}`} />
                <span className="text-neon-purple text-xs font-mono font-bold">{v.id}</span>
              </div>
              <span className="text-gray-500 text-xs font-mono">{(v.weight * 100).toFixed(0)}% weight</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <div className="text-gray-600 text-xs">Sims</div>
                <div className="text-white text-xs font-mono">{v.simulations.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-gray-600 text-xs">Consensus</div>
                <div className="text-neon-green text-xs font-mono">{v.consensusRate}%</div>
              </div>
              <div>
                <div className="text-gray-600 text-xs">Stake</div>
                <div className="text-neon-cyan text-xs font-mono">{v.stake}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmissionTracker() {
  const [timeRange, setTimeRange] = useState('24h');

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{value: number; name: string; color: string}>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 neon-border text-xs">
          <div className="text-gray-400 font-mono mb-2">{label}</div>
          {payload.map((p, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{backgroundColor: p.color}} />
              <span className="text-gray-500">{p.name}:</span>
              <span className="text-white font-mono font-bold">{p.value} TAO</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-5 h-5 text-neon-green" />
          <h3 className="font-orbitron text-sm font-bold text-white">TAO Emission Tracker</h3>
        </div>
        <div className="flex gap-1">
          {['1h', '24h', '7d', '30d'].map((t) => (
            <button
              key={t}
              onClick={() => setTimeRange(t)}
              className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                timeRange === t ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30' : 'text-gray-600 hover:text-gray-400'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Area Chart */}
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={emissionData}>
            <defs>
              <linearGradient id="colorMiners" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00fff5" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00fff5" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorValidators" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#b366ff" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#b366ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
            <XAxis dataKey="epoch" stroke="rgba(255,255,255,0.2)" tick={{fontSize: 10, fontFamily: 'JetBrains Mono'}} />
            <YAxis stroke="rgba(255,255,255,0.2)" tick={{fontSize: 10, fontFamily: 'JetBrains Mono'}} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="miners" name="Miners" stroke="#00fff5" fillOpacity={1} fill="url(#colorMiners)" strokeWidth={2} />
            <Area type="monotone" dataKey="validators" name="Validators" stroke="#b366ff" fillOpacity={1} fill="url(#colorValidators)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Emission Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-glass-bg rounded-lg p-4 border border-glass-border">
          <div className="text-gray-500 text-xs mb-1">Total Emitted</div>
          <div className="font-orbitron text-lg font-bold text-white">8,255 <span className="text-xs text-gray-500">TAO</span></div>
          <div className="flex items-center gap-1 text-neon-green text-xs mt-1">
            <TrendingUp className="w-3 h-3" /> +12.4%
          </div>
        </div>
        <div className="bg-glass-bg rounded-lg p-4 border border-glass-border">
          <div className="text-gray-500 text-xs mb-1">Miner Share</div>
          <div className="font-orbitron text-lg font-bold text-neon-cyan">67% <span className="text-xs text-gray-500">avg</span></div>
          <div className="progress-bar-container h-1.5 mt-2">
            <div className="h-full bg-neon-cyan rounded-full" style={{width: '67%'}} />
          </div>
        </div>
        <div className="bg-glass-bg rounded-lg p-4 border border-glass-border">
          <div className="text-gray-500 text-xs mb-1">Validator Share</div>
          <div className="font-orbitron text-lg font-bold text-neon-purple">33% <span className="text-xs text-gray-500">avg</span></div>
          <div className="progress-bar-container h-1.5 mt-2">
            <div className="h-full bg-neon-purple rounded-full" style={{width: '33%'}} />
          </div>
        </div>
      </div>
    </div>
  );
}

function MinerPerformanceChart() {
  const barData = minerLeaderboard.slice(0, 8).map(m => ({
    name: m.id.replace('Miner-', ''),
    exploits: m.exploits,
    score: m.score,
  }));

  const colors = ['#00fff5', '#b366ff', '#39ff14', '#4d8bff', '#ff9500', '#ff3355', '#00fff5', '#b366ff'];

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <Cpu className="w-5 h-5 text-neon-cyan" />
        <h3 className="font-orbitron text-sm font-bold text-white">Miner Performance</h3>
        <span className="text-gray-600 text-xs font-mono">Exploits Found</span>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" tick={{fontSize: 9, fontFamily: 'JetBrains Mono'}} />
            <YAxis stroke="rgba(255,255,255,0.2)" tick={{fontSize: 10, fontFamily: 'JetBrains Mono'}} />
            <Tooltip
              contentStyle={{background: 'rgba(13,17,23,0.9)', border: '1px solid rgba(0,255,245,0.3)', borderRadius: '8px', fontSize: '12px', fontFamily: 'JetBrains Mono'}}
              labelStyle={{color: '#fff'}}
              itemStyle={{color: '#00fff5'}}
            />
            <Bar dataKey="exploits" radius={[4, 4, 0, 0]}>
              {barData.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} fillOpacity={0.7} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function SubnetExplorer({ onNavigate }: SubnetExplorerProps) {
  const [activeSection, setActiveSection] = useState<'leaderboard' | 'validators' | 'emissions'>('leaderboard');
  const [liveBlockNum, setLiveBlockNum] = useState(19284756);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveBlockNum(prev => prev + 1);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

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
            <span className="text-gray-600 text-xs font-mono hidden sm:block">/ SUBNET EXPLORER</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 glass-card px-3 py-1.5">
              <Activity className="w-3 h-3 text-neon-cyan animate-pulse" />
              <span className="text-gray-400 text-xs font-mono">Block #{liveBlockNum.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2 glass-card px-3 py-1.5">
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <span className="text-neon-green text-xs font-mono">SUBNET 47</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12 max-w-7xl mx-auto px-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-orbitron text-3xl font-bold text-white mb-2">Subnet Explorer</h1>
          <p className="text-gray-500 text-sm">Real-time metrics for Miners, Validators & TAO emissions on Aegis-Net Subnet 47.</p>
        </div>

        {/* Network Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Miners', value: networkStats.totalMiners.toLocaleString(), icon: Cpu, color: 'text-neon-cyan', subtext: 'Proof-of-Intelligence' },
            { label: 'Validators', value: networkStats.totalValidators.toString(), icon: Shield, color: 'text-neon-purple', subtext: 'Simulation Judges' },
            { label: 'Contracts Scanned', value: networkStats.contractsScanned.toLocaleString(), icon: Eye, color: 'text-neon-green', subtext: 'Total Lifetime' },
            { label: 'Avg Response', value: networkStats.avgResponseTime, icon: Clock, color: 'text-neon-orange', subtext: 'Time to detect' },
          ].map((stat, i) => (
            <div key={i} className="glass-card glass-card-hover p-5 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-gray-700 text-xs font-mono">{stat.subtext}</span>
              </div>
              <div className={`font-orbitron text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-gray-500 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Section Navigation */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {[
            { id: 'leaderboard' as const, label: 'MINER LEADERBOARD', icon: Trophy },
            { id: 'validators' as const, label: 'VALIDATOR CONSENSUS', icon: Radio },
            { id: 'emissions' as const, label: 'TAO EMISSIONS', icon: BarChart3 },
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-6 py-3 rounded-lg text-xs font-orbitron tracking-wider transition-all border flex items-center gap-2 ${
                activeSection === section.id ? 'tab-active font-bold' : 'bg-glass-bg border-glass-border text-gray-500 hover:text-gray-300'
              }`}
            >
              <section.icon className="w-4 h-4" />
              {section.label}
            </button>
          ))}
        </div>

        {/* Content Sections */}
        {activeSection === 'leaderboard' && (
          <div className="space-y-8">
            <MinerLeaderboardSection />
            <MinerPerformanceChart />

            {/* Anti-Spam & Incentive Mechanism */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-neon-red/10 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-neon-red" />
                  </div>
                  <div>
                    <h4 className="font-orbitron text-xs font-bold text-white">Anti-Spam Slashing</h4>
                    <p className="text-gray-600 text-xs">Penalty Mechanism</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Spam Threshold', value: '> 30% failed payloads → Trust slashed', severity: 'high' },
                    { label: 'Cooldown Period', value: '50 epochs before trust recovery', severity: 'medium' },
                    { label: 'Zero Emission', value: 'Below 0.1 trust = no TAO emission', severity: 'critical' },
                  ].map((rule, i) => (
                    <div key={i} className="bg-red-900/5 rounded-lg p-3 border border-red-900/10">
                      <div className="text-gray-400 text-xs font-medium mb-1">{rule.label}</div>
                      <div className="text-gray-500 text-xs">{rule.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-neon-green/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-neon-green" />
                  </div>
                  <div>
                    <h4 className="font-orbitron text-xs font-bold text-white">First-Blood Reward</h4>
                    <p className="text-gray-600 text-xs">Incentive Structure</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'First Finder', value: '80% of bounty → fastest valid exploit', color: 'text-neon-green' },
                    { label: 'Confirmers', value: '20% shared among confirming miners', color: 'text-neon-cyan' },
                    { label: 'Speed Bonus', value: '< 1s response → 1.5x weight multiplier', color: 'text-neon-purple' },
                  ].map((reward, i) => (
                    <div key={i} className="bg-green-900/5 rounded-lg p-3 border border-green-900/10">
                      <div className={`text-xs font-medium mb-1 ${reward.color}`}>{reward.label}</div>
                      <div className="text-gray-500 text-xs">{reward.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'validators' && (
          <div className="space-y-8">
            <ValidatorConsensusMap />

            {/* Validator Process */}
            <div className="glass-card p-6">
              <h3 className="font-orbitron text-sm font-bold text-white mb-6 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-neon-purple" />
                Sandboxed Verification Process
              </h3>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { step: '01', title: 'Receive Payload', desc: 'Validator receives exploit calldata from Miner', icon: '📥', color: 'border-neon-cyan/20' },
                  { step: '02', title: 'Fork Network', desc: 'Spin up local fork using Anvil/Hardhat at latest block', icon: '🔄', color: 'border-neon-purple/20' },
                  { step: '03', title: 'Execute Exploit', desc: 'Fire miner\'s calldata against the contract in sandbox', icon: '⚡', color: 'border-neon-orange/20' },
                  { step: '04', title: 'Binary Score', desc: 'Balance drained = SCORE 1 ✅ | Reverted = SCORE 0 ❌', icon: '🎯', color: 'border-neon-green/20' },
                ].map((s, i) => (
                  <div key={i} className={`bg-glass-bg rounded-lg p-5 border ${s.color} text-center`}>
                    <div className="text-3xl mb-3">{s.icon}</div>
                    <div className="font-orbitron text-xs text-gray-500 mb-1">STEP {s.step}</div>
                    <div className="text-white text-sm font-semibold mb-2">{s.title}</div>
                    <div className="text-gray-500 text-xs leading-relaxed">{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'emissions' && (
          <div className="space-y-8">
            <EmissionTracker />

            {/* Token Economics */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass-card p-6">
                <div className="font-orbitron text-xs text-neon-cyan mb-4 tracking-wider">MINER EMISSIONS</div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Exploit Discovery</span>
                      <span>50%</span>
                    </div>
                    <div className="progress-bar-container h-2">
                      <div className="h-full bg-neon-cyan rounded-full" style={{width: '50%'}} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Response Speed</span>
                      <span>25%</span>
                    </div>
                    <div className="progress-bar-container h-2">
                      <div className="h-full bg-neon-green rounded-full" style={{width: '25%'}} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Accuracy (Low FP)</span>
                      <span>25%</span>
                    </div>
                    <div className="progress-bar-container h-2">
                      <div className="h-full bg-neon-purple rounded-full" style={{width: '25%'}} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="glass-card p-6">
                <div className="font-orbitron text-xs text-neon-purple mb-4 tracking-wider">VALIDATOR EMISSIONS</div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Simulation Accuracy</span>
                      <span>40%</span>
                    </div>
                    <div className="progress-bar-container h-2">
                      <div className="h-full bg-neon-purple rounded-full" style={{width: '40%'}} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Consensus Alignment</span>
                      <span>35%</span>
                    </div>
                    <div className="progress-bar-container h-2">
                      <div className="h-full bg-neon-cyan rounded-full" style={{width: '35%'}} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Stake Weight</span>
                      <span>25%</span>
                    </div>
                    <div className="progress-bar-container h-2">
                      <div className="h-full bg-neon-green rounded-full" style={{width: '25%'}} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="glass-card p-6">
                <div className="font-orbitron text-xs text-neon-green mb-4 tracking-wider">NETWORK HEALTH</div>
                <div className="space-y-3">
                  {[
                    { label: 'Total TAO Staked', value: '82,900 TAO' },
                    { label: 'Daily Emission', value: '~825 TAO/day' },
                    { label: 'Active Miners', value: '1,247' },
                    { label: 'Active Validators', value: '64' },
                    { label: 'Subnet Uptime', value: '99.97%' },
                    { label: 'Avg Block Time', value: '12s' },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-1 border-b border-glass-border/50 last:border-0">
                      <span className="text-gray-500 text-xs">{item.label}</span>
                      <span className="text-white text-xs font-mono font-bold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
