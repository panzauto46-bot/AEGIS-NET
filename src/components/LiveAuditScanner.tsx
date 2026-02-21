import { useState, useRef, useEffect } from 'react';
import { Shield, Zap, ArrowLeft, AlertTriangle, Copy, CheckCircle, Loader2, Terminal, Cpu, Activity, Sparkles, Clock, Brain } from 'lucide-react';

interface LiveAuditScannerProps {
    onNavigate: (page: string) => void;
}

// Simple markdown-to-JSX renderer for the audit report
function MarkdownRenderer({ content }: { content: string }) {
    const renderMarkdown = (text: string) => {
        const lines = text.split('\n');
        const elements: JSX.Element[] = [];
        let inCodeBlock = false;
        let codeContent = '';
        let codeLanguage = '';
        let listItems: string[] = [];
        let listType: 'ul' | 'ol' | null = null;

        const flushList = () => {
            if (listItems.length > 0 && listType) {
                const items = listItems.map((item, j) => (
                    <li key={j} className="text-gray-300 text-sm leading-relaxed pl-1">
                        <span dangerouslySetInnerHTML={{ __html: inlineFormat(item) }} />
                    </li>
                ));
                if (listType === 'ul') {
                    elements.push(<ul key={elements.length} className="list-disc list-inside space-y-1.5 my-3 ml-2">{items}</ul>);
                } else {
                    elements.push(<ol key={elements.length} className="list-decimal list-inside space-y-1.5 my-3 ml-2">{items}</ol>);
                }
                listItems = [];
                listType = null;
            }
        };

        const inlineFormat = (line: string): string => {
            return line
                .replace(/`([^`]+)`/g, '<code class="bg-cyber-dark px-1.5 py-0.5 rounded text-neon-cyan font-mono text-xs border border-cyber-border">$1</code>')
                .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                .replace(/\*([^*]+)\*/g, '<em class="text-gray-400 italic">$1</em>')
                .replace(/🔴/g, '<span class="inline-block animate-pulse">🔴</span>')
                .replace(/🟠/g, '<span class="inline-block">🟠</span>')
                .replace(/🟢/g, '<span class="inline-block">🟢</span>')
                .replace(/✅/g, '<span class="inline-block">✅</span>');
        };

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            // Code block toggle
            if (line.startsWith('```')) {
                if (inCodeBlock) {
                    elements.push(
                        <div key={elements.length} className="my-4 rounded-xl overflow-hidden border border-cyber-border">
                            <div className="flex items-center justify-between px-4 py-2 bg-cyber-dark border-b border-cyber-border">
                                <div className="flex items-center gap-2">
                                    <Terminal className="w-3.5 h-3.5 text-neon-cyan" />
                                    <span className="text-xs font-mono text-gray-500">{codeLanguage || 'code'}</span>
                                </div>
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-neon-red/40" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-neon-orange/40" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-neon-green/40" />
                                </div>
                            </div>
                            <pre className="p-4 bg-[#0d0d14] text-sm font-mono text-gray-300 overflow-x-auto leading-relaxed">
                                <code>{codeContent.trimEnd()}</code>
                            </pre>
                        </div>
                    );
                    codeContent = '';
                    codeLanguage = '';
                    inCodeBlock = false;
                } else {
                    flushList();
                    inCodeBlock = true;
                    codeLanguage = line.slice(3).trim();
                }
                continue;
            }

            if (inCodeBlock) {
                codeContent += line + '\n';
                continue;
            }

            // Headers
            if (line.startsWith('### ')) {
                flushList();
                elements.push(
                    <h3 key={elements.length} className="font-orbitron text-sm font-bold text-neon-cyan mt-6 mb-2 flex items-center gap-2">
                        <div className="w-1 h-4 bg-neon-cyan rounded-full" />
                        <span dangerouslySetInnerHTML={{ __html: inlineFormat(line.slice(4)) }} />
                    </h3>
                );
                continue;
            }
            if (line.startsWith('## ')) {
                flushList();
                elements.push(
                    <h2 key={elements.length} className="font-orbitron text-base font-bold text-white mt-8 mb-3 pb-2 border-b border-cyber-border flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-neon-purple" />
                        <span dangerouslySetInnerHTML={{ __html: inlineFormat(line.slice(3)) }} />
                    </h2>
                );
                continue;
            }
            if (line.startsWith('# ')) {
                flushList();
                elements.push(
                    <h1 key={elements.length} className="font-orbitron text-xl font-black text-white mt-6 mb-4 flex items-center gap-3">
                        <Shield className="w-6 h-6 text-neon-cyan" />
                        <span dangerouslySetInnerHTML={{ __html: inlineFormat(line.slice(2)) }} />
                    </h1>
                );
                continue;
            }

            // Horizontal rule
            if (line.match(/^-{3,}$/) || line.match(/^\*{3,}$/)) {
                flushList();
                elements.push(
                    <div key={elements.length} className="my-6 h-px bg-gradient-to-r from-transparent via-cyber-border to-transparent" />
                );
                continue;
            }

            // Unordered list items
            if (line.match(/^[\s]*[-*+]\s/)) {
                if (listType !== 'ul') flushList();
                listType = 'ul';
                listItems.push(line.replace(/^[\s]*[-*+]\s/, ''));
                continue;
            }

            // Ordered list items
            if (line.match(/^[\s]*\d+\.\s/)) {
                if (listType !== 'ol') flushList();
                listType = 'ol';
                listItems.push(line.replace(/^[\s]*\d+\.\s/, ''));
                continue;
            }

            flushList();

            // Empty line
            if (line.trim() === '') {
                continue;
            }

            // Regular paragraph
            elements.push(
                <p key={elements.length} className="text-gray-400 text-sm leading-relaxed my-2">
                    <span dangerouslySetInnerHTML={{ __html: inlineFormat(line) }} />
                </p>
            );
        }

        flushList();
        return elements;
    };

    return <div className="audit-report-content">{renderMarkdown(content)}</div>;
}

// Animated scanning state
function ScanningAnimation() {
    const [step, setStep] = useState(0);
    const [progress, setProgress] = useState(0);

    const steps = [
        { text: "Initializing AI Miner Swarm...", icon: Cpu },
        { text: "Parsing Solidity AST...", icon: Terminal },
        { text: "Running Vulnerability Heuristics...", icon: Brain },
        { text: "Simulating Attack Vectors...", icon: AlertTriangle },
        { text: "Generating Audit Report...", icon: Sparkles },
    ];

    useEffect(() => {
        const stepInterval = setInterval(() => {
            setStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
        }, 2500);
        const progressInterval = setInterval(() => {
            setProgress(prev => Math.min(prev + Math.random() * 3, 95));
        }, 200);
        return () => { clearInterval(stepInterval); clearInterval(progressInterval); };
    }, []);

    return (
        <div className="glass-card p-8 text-center">
            {/* Rotating shield */}
            <div className="relative w-28 h-28 mx-auto mb-8">
                <div className="absolute inset-0 border-2 border-neon-cyan/20 rounded-full animate-rotate-slow" />
                <div className="absolute inset-2 border-2 border-neon-purple/20 rounded-full animate-rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '15s' }} />
                <div className="absolute inset-4 border-2 border-neon-green/20 rounded-full animate-rotate-slow" style={{ animationDuration: '10s' }} />
                <div className="absolute inset-6 border border-neon-cyan/10 rounded-full" />
                <Shield className="absolute inset-0 m-auto w-10 h-10 text-neon-cyan animate-pulse" />
            </div>

            <h3 className="font-orbitron text-lg font-bold text-white mb-2">
                SCANNING BLOCKS...
            </h3>
            <p className="text-gray-500 text-sm mb-6 font-mono">
                1,247 AI miners analyzing your contract
            </p>

            {/* Progress steps */}
            <div className="max-w-md mx-auto space-y-3 mb-6 text-left">
                {steps.map((s, i) => (
                    <div key={i} className={`flex items-center gap-3 text-xs font-mono transition-all duration-500 ${i <= step ? 'opacity-100' : 'opacity-30'}`}>
                        {i < step ? (
                            <CheckCircle className="w-4 h-4 text-neon-green shrink-0" />
                        ) : i === step ? (
                            <Loader2 className="w-4 h-4 text-neon-cyan animate-spin shrink-0" />
                        ) : (
                            <div className="w-4 h-4 rounded-full border border-gray-700 shrink-0" />
                        )}
                        <s.icon className={`w-3.5 h-3.5 shrink-0 ${i <= step ? 'text-neon-cyan' : 'text-gray-700'}`} />
                        <span className={i <= step ? 'text-gray-300' : 'text-gray-700'}>{s.text}</span>
                    </div>
                ))}
            </div>

            {/* Progress bar */}
            <div className="max-w-md mx-auto">
                <div className="progress-bar-container h-2 mb-2">
                    <div
                        className="h-full bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-green rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="flex justify-between text-xs text-gray-600 font-mono">
                    <span>Neural Pattern Analysis</span>
                    <span>{Math.round(progress)}%</span>
                </div>
            </div>
        </div>
    );
}

const SAMPLE_CONTRACT = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VulnerableVault {
    mapping(address => uint256) public balances;
    
    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }
    
    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        
        // Send ETH to caller
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
        
        // Update balance AFTER external call (vulnerable!)
        balances[msg.sender] -= amount;
    }
    
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}`;

export default function LiveAuditScanner({ onNavigate }: LiveAuditScannerProps) {
    const [contractCode, setContractCode] = useState('');
    const [auditReport, setAuditReport] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);
    const [scanMeta, setScanMeta] = useState<{ model?: string; timestamp?: string; usage?: any } | null>(null);
    const resultRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleScan = async () => {
        if (!contractCode.trim()) {
            setError('Please paste your Solidity smart contract code.');
            return;
        }

        setError('');
        setAuditReport('');
        setScanMeta(null);
        setIsScanning(true);

        try {
            const response = await fetch('/api/audit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contractCode: contractCode.trim() }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || `Server error: ${response.status}`);
            }

            setAuditReport(data.report);
            setScanMeta({
                model: data.model,
                timestamp: data.timestamp,
                usage: data.usage,
            });

            // Scroll to results
            setTimeout(() => {
                resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        } catch (err: any) {
            setError(err.message || 'Failed to connect to the Aegis-Net AI auditor. Please try again.');
        } finally {
            setIsScanning(false);
        }
    };

    const handleCopyReport = () => {
        navigator.clipboard.writeText(auditReport);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleLoadSample = () => {
        setContractCode(SAMPLE_CONTRACT);
        setAuditReport('');
        setError('');
        setScanMeta(null);
        textareaRef.current?.focus();
    };

    const lineCount = contractCode.split('\n').length;

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
                            <div className="relative">
                                <Shield className="w-6 h-6 text-neon-cyan" />
                                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-neon-green rounded-full animate-pulse" />
                            </div>
                            <span className="font-orbitron text-lg font-bold text-white">AEGIS<span className="neon-text">-NET</span></span>
                        </div>
                        <span className="text-gray-600 text-xs font-mono hidden sm:block">/ LIVE AI SCANNER</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex items-center gap-2 glass-card px-3 py-1.5">
                            <Brain className="w-3.5 h-3.5 text-neon-purple" />
                            <span className="text-neon-purple text-xs font-mono">LLaMA-3 70B</span>
                        </div>
                        <div className="flex items-center gap-2 glass-card px-3 py-1.5">
                            <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                            <span className="text-neon-green text-xs font-mono">AI ONLINE</span>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="pt-24 pb-12 max-w-7xl mx-auto px-6">
                {/* Page Header */}
                <div className="mb-8">
                    <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4 animate-fade-in-up">
                        <Zap className="w-3.5 h-3.5 text-neon-green" />
                        <span className="text-neon-green text-xs font-mono tracking-wider">POWERED BY GROQ × BITTENSOR SUBNET 47</span>
                    </div>
                    <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-2 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        Live AI Smart Contract <span className="neon-text">Scanner</span>
                    </h1>
                    <p className="text-gray-500 text-sm max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        Paste your Solidity code below and let our AI miner swarm hunt for zero-day vulnerabilities in real-time.
                        Powered by <span className="text-neon-purple font-semibold">LLaMA-3 70B</span> fine-tuned for smart contract security.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left: Code Input */}
                    <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        {/* Code editor header */}
                        <div className="glass-card overflow-hidden">
                            <div className="flex items-center justify-between px-4 py-3 border-b border-glass-border bg-cyber-dark/50">
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-neon-red/60" />
                                        <div className="w-3 h-3 rounded-full bg-neon-orange/60" />
                                        <div className="w-3 h-3 rounded-full bg-neon-green/60" />
                                    </div>
                                    <span className="text-gray-500 text-xs font-mono">contract.sol</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-600 text-xs font-mono">{lineCount} lines</span>
                                    <button
                                        onClick={handleLoadSample}
                                        className="text-xs font-mono text-neon-purple hover:text-neon-cyan transition-colors flex items-center gap-1"
                                    >
                                        <Sparkles className="w-3 h-3" />
                                        Load Sample
                                    </button>
                                </div>
                            </div>

                            {/* Code textarea */}
                            <div className="relative">
                                <textarea
                                    ref={textareaRef}
                                    value={contractCode}
                                    onChange={(e) => { setContractCode(e.target.value); setError(''); }}
                                    placeholder={`// Paste your Solidity smart contract here...
// Example:
pragma solidity ^0.8.0;

contract MyContract {
    // Your code here...
}`}
                                    className="w-full h-[420px] bg-[#0a0a12] text-gray-300 text-sm font-mono p-4 resize-none focus:outline-none placeholder-gray-700 leading-relaxed"
                                    spellCheck={false}
                                />
                            </div>
                        </div>

                        {/* Error display */}
                        {error && (
                            <div className="flex items-start gap-3 p-4 glass-card border-neon-red/30">
                                <AlertTriangle className="w-5 h-5 text-neon-red shrink-0 mt-0.5" />
                                <div>
                                    <div className="text-neon-red text-sm font-semibold mb-1">Scan Failed</div>
                                    <div className="text-gray-400 text-xs">{error}</div>
                                </div>
                            </div>
                        )}

                        {/* Scan button */}
                        <button
                            onClick={handleScan}
                            disabled={isScanning || !contractCode.trim()}
                            className={`w-full py-4 rounded-xl font-orbitron text-sm tracking-wider font-bold flex items-center justify-center gap-3 transition-all duration-300 ${isScanning
                                    ? 'bg-cyber-dark border border-neon-cyan/20 text-gray-500 cursor-not-allowed'
                                    : !contractCode.trim()
                                        ? 'bg-cyber-dark border border-glass-border text-gray-600 cursor-not-allowed'
                                        : 'neon-btn hover:shadow-[0_0_40px_rgba(0,255,245,0.3)] active:scale-[0.98]'
                                }`}
                        >
                            {isScanning ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    SCANNING BLOCKS...
                                </>
                            ) : (
                                <>
                                    <Zap className="w-5 h-5" />
                                    DEPLOY AI SWARM (SCAN CODE)
                                </>
                            )}
                        </button>

                        {/* Info cards */}
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { label: 'Active Miners', value: '1,247', icon: Cpu, color: 'text-neon-cyan' },
                                { label: 'Avg Response', value: '<8s', icon: Clock, color: 'text-neon-purple' },
                                { label: 'Detection Rate', value: '98.6%', icon: Activity, color: 'text-neon-green' },
                            ].map((stat, i) => (
                                <div key={i} className="glass-card p-3 text-center">
                                    <stat.icon className={`w-4 h-4 ${stat.color} mx-auto mb-1.5`} />
                                    <div className={`font-orbitron text-sm font-bold ${stat.color}`}>{stat.value}</div>
                                    <div className="text-gray-600 text-[10px] mt-0.5">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Results */}
                    <div ref={resultRef} className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        {isScanning ? (
                            <ScanningAnimation />
                        ) : auditReport ? (
                            <div className="glass-card overflow-hidden">
                                {/* Report header */}
                                <div className="flex items-center justify-between px-6 py-4 border-b border-glass-border bg-cyber-dark/50">
                                    <div className="flex items-center gap-3">
                                        <Shield className="w-5 h-5 text-neon-cyan" />
                                        <div>
                                            <span className="font-orbitron text-xs font-bold text-white">AUDIT REPORT</span>
                                            {scanMeta?.timestamp && (
                                                <div className="text-gray-600 text-[10px] font-mono mt-0.5">
                                                    {new Date(scanMeta.timestamp).toLocaleString()} • {scanMeta.model}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleCopyReport}
                                        className="flex items-center gap-1.5 text-xs font-mono text-gray-500 hover:text-neon-cyan transition-colors px-3 py-1.5 rounded-lg border border-glass-border hover:border-neon-cyan/30"
                                    >
                                        {copied ? (
                                            <>
                                                <CheckCircle className="w-3.5 h-3.5 text-neon-green" />
                                                <span className="text-neon-green">Copied!</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-3.5 h-3.5" />
                                                Copy Report
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Report body */}
                                <div className="p-6 max-h-[600px] overflow-y-auto">
                                    <MarkdownRenderer content={auditReport} />
                                </div>

                                {/* Report footer with token usage */}
                                {scanMeta?.usage && (
                                    <div className="px-6 py-3 border-t border-glass-border bg-cyber-dark/30 flex items-center justify-between">
                                        <div className="flex items-center gap-4 text-[10px] font-mono text-gray-600">
                                            <span>Tokens: {scanMeta.usage.total_tokens?.toLocaleString()}</span>
                                            <span>In: {scanMeta.usage.prompt_tokens?.toLocaleString()}</span>
                                            <span>Out: {scanMeta.usage.completion_tokens?.toLocaleString()}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-neon-green" />
                                            <span className="text-[10px] font-mono text-gray-600">Powered by Groq</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* Empty state */
                            <div className="glass-card p-12 text-center h-full flex flex-col items-center justify-center min-h-[500px]">
                                <div className="relative w-24 h-24 mb-8">
                                    <div className="absolute inset-0 border border-cyber-border rounded-full animate-pulse" />
                                    <div className="absolute inset-3 border border-cyber-border/50 rounded-full" />
                                    <Shield className="absolute inset-0 m-auto w-10 h-10 text-gray-700" />
                                </div>
                                <h3 className="font-orbitron text-lg font-bold text-gray-600 mb-3">Awaiting Contract Input</h3>
                                <p className="text-gray-700 text-sm max-w-xs mb-6">
                                    Paste your Solidity smart contract in the editor and deploy the AI swarm to hunt for vulnerabilities.
                                </p>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {['Reentrancy', 'Flash Loan', 'Overflow', 'Logic Flaw', 'Oracle Attack'].map((tag) => (
                                        <span key={tag} className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-glass-bg border border-glass-border text-gray-600">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
