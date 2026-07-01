import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Server, GitCommit, Clock, AlertTriangle, CheckCircle, Play, 
  ExternalLink, ChevronRight, TrendingUp, Activity, Sliders, 
  MoreHorizontal, Download, Eye, RotateCw, RefreshCw, ZoomIn, 
  Settings, Battery, Sun, Wind, Compass, HardDrive, Shield, 
  Workflow, Layers, Radio, Thermometer, Database, Zap
} from 'lucide-react';

// ==========================================
// 1. COMPUTING & SOFTWARE DASHBOARD (Image 3)
// ==========================================
export const ComputingDashboard: React.FC<{ addNotification: (m: string, t?: any) => void }> = ({ addNotification }) => {
  const [loadFactor, setLoadFactor] = useState(89.4);
  const [nodes, setNodes] = useState([
    { id: 'NODE-001', active: true, load: 99.9, mem: '2 GB' },
    { id: 'NODE-002', active: true, load: 99.9, mem: '18 GB' },
    { id: 'NODE-003', active: true, load: 99.9, mem: '203 GB' },
    { id: 'NODE-004', active: true, load: 99.9, mem: '34 GB' },
    { id: 'NODE-005', active: true, load: 99.9, mem: '192 GB' },
    { id: 'NODE-006', active: true, load: 99.9, mem: '66 GB' },
    { id: 'NODE-007', active: false, load: 0, mem: '170 GB' },
    { id: 'NODE-008', active: true, load: 99.9, mem: '49 GB' },
    { id: 'NODE-009', active: true, load: 99.9, mem: '149 GB' },
    { id: 'NODE-010', active: true, load: 99.9, mem: '138 GB' },
    { id: 'NODE-011', active: true, load: 99.9, mem: '57 GB' },
    { id: 'NODE-012', active: true, load: 99.9, mem: '184 GB' },
    { id: 'NODE-013', active: true, load: 99.9, mem: '193 GB' },
    { id: 'NODE-014', active: false, load: 0, mem: '123 GB' },
    { id: 'NODE-015', active: true, load: 99.9, mem: '123 GB' },
    { id: 'NODE-016', active: true, load: 99.9, mem: '52 GB' },
  ]);

  const [commits, setCommits] = useState([
    { hash: '8fa21cc', time: '02:14:55', desc: 'Process valve optimizer build' },
    { hash: '3ee591a', time: '01:58:12', desc: 'Memory leak hotfix on grid solver' },
    { hash: 'd9401bf', time: '01:42:04', desc: 'Active sensor calibration array' }
  ]);

  const [protocols, setProtocols] = useState([
    { id: 'ENC', title: 'ENCRYPTION_LAYER_RSA_4096', active: true },
    { id: 'FW', title: 'FIREWALL_ACTIVE_SECTOR_9', active: true },
    { id: 'DPI', title: 'DEEP_PACKET_INSPECTION', active: false }
  ]);

  const [showLogs, setShowLogs] = useState(false);
  const [logMessages, setLogMessages] = useState<string[]>([]);

  // Quantum Array visual ripples
  const [rippleIndex, setRippleIndex] = useState<number | null>(null);

  // Trigger a new commit log
  const handleTriggerCommit = () => {
    const randomHash = Math.random().toString(16).substring(2, 9);
    const timeString = new Date().toTimeString().split(' ')[0];
    const descriptions = [
      'Refactored compiler pipeline dynamics',
      'Quantum coherence stabilizing sequence',
      'Structural stress matrix compilation'
    ];
    const newCommit = {
      hash: randomHash,
      time: timeString,
      desc: descriptions[Math.floor(Math.random() * descriptions.length)]
    };
    setCommits(prev => [newCommit, ...prev.slice(0, 5)]);
    addNotification(`New system commit: ${randomHash} compiled successfully.`, 'info');
  };

  // Toggle a node on/off
  const toggleNode = (id: string) => {
    setNodes(prev => prev.map(n => {
      if (n.id === id) {
        const nextState = !n.active;
        addNotification(`Infrastructure node ${id} set to ${nextState ? 'ONLINE' : 'OFFLINE'}`, nextState ? 'info' : 'warn');
        return { ...n, active: nextState, load: nextState ? 99.9 : 0 };
      }
      return n;
    }));
  };

  // Recalculate average load factor based on nodes
  useEffect(() => {
    const activeNodes = nodes.filter(n => n.active).length;
    const baseLoad = (activeNodes / nodes.length) * 100;
    setLoadFactor(Math.round((baseLoad + Math.sin(Date.now() / 5000) * 2) * 10) / 10);
  }, [nodes]);

  // Handle access logs terminal simulation
  const handleOpenLogs = () => {
    setShowLogs(true);
    setLogMessages(['[SYSTEM] Initializing stream dump...', '[SYSTEM] Secure terminal socket synced.']);
    const interval = setInterval(() => {
      const hexBytes = Array.from({ length: 8 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0').toUpperCase()).join(' ');
      setLogMessages(prev => [...prev.slice(-15), `[DECRYPTED] ADDR_0x${Math.floor(Math.random() * 65536).toString(16).toUpperCase()} // DATA: ${hexBytes}`]);
    }, 300);
    return () => clearInterval(interval);
  };

  return (
    <div className="grid grid-cols-12 gap-5 h-full overflow-y-auto pr-1 select-none font-mono">
      {/* 1. NEURAL NETWORK LOAD (Image 3 Left Top Panel) */}
      <div className="col-span-12 lg:col-span-8 border border-white/5 bg-black/60 rounded-3xl p-5 flex flex-col justify-between relative overflow-hidden min-h-[240px]">
        <div className="flex justify-between items-start z-10">
          <div>
            <span className="text-[9px] text-white/40 tracking-widest uppercase font-bold">MODULE_ID: #NEURAL-SYNAPSE-85</span>
            <h3 className="text-xl font-display font-bold tracking-tight text-white uppercase mt-1">NEURAL NETWORK LOAD</h3>
          </div>
          <div className="text-right">
            <span className="text-[9px] text-white/40 tracking-widest uppercase font-bold">LOAD_FACTOR</span>
            <p className="text-3xl font-display font-bold text-os-cyan glow-cyan mt-1">{loadFactor}%</p>
          </div>
        </div>

        {/* Neural Network SVG visual map (Image 3 center visualization) */}
        <div className="flex-1 min-h-[140px] relative flex items-center justify-center py-4">
          <svg className="w-full h-full max-h-[140px] text-os-cyan/40" viewBox="0 0 500 150">
            {/* Drawing interactive nodes and glowing neural pathways */}
            <g>
              {/* Connections */}
              <line x1="80" y1="40" x2="180" y2="40" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
              <line x1="80" y1="75" x2="180" y2="75" stroke="currentColor" strokeWidth="0.5" />
              <line x1="80" y1="110" x2="180" y2="110" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
              
              <line x1="180" y1="40" x2="280" y2="25" stroke="currentColor" strokeWidth="0.5" />
              <line x1="180" y1="40" x2="280" y2="60" stroke="currentColor" strokeWidth="0.5" />
              <line x1="180" y1="75" x2="280" y2="60" stroke="currentColor" strokeWidth="1" />
              <line x1="180" y1="75" x2="280" y2="95" stroke="currentColor" strokeWidth="0.5" />
              <line x1="180" y1="110" x2="280" y2="130" stroke="currentColor" strokeWidth="0.5" />

              <line x1="280" y1="25" x2="380" y2="50" stroke="currentColor" strokeWidth="0.5" />
              <line x1="280" y1="60" x2="380" y2="50" stroke="currentColor" strokeWidth="1" />
              <line x1="280" y1="95" x2="380" y2="85" stroke="currentColor" strokeWidth="0.5" />
              <line x1="280" y1="130" x2="380" y2="120" stroke="currentColor" strokeWidth="0.5" />

              {/* Glowing active pulses */}
              <motion.circle cx="180" cy="75" r="3" fill="#ff8577" animate={{ cx: [180, 280, 180], cy: [75, 60, 75] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} />
              <motion.circle cx="280" cy="60" r="3" fill="#ff8577" animate={{ cx: [280, 380, 280], cy: [60, 50, 60] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} />

              {/* Nodes */}
              {/* Layer 1 */}
              <circle cx="80" cy="40" r="4" fill="#111" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="80" cy="75" r="4" fill="#111" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="80" cy="110" r="4" fill="#111" stroke="#ff8577" strokeWidth="2" />
              
              {/* Layer 2 */}
              <circle cx="180" cy="40" r="5" fill="#111" stroke="#ff8577" strokeWidth="2.5" />
              <circle cx="180" cy="75" r="5" fill="#111" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="180" cy="110" r="5" fill="#111" stroke="currentColor" strokeWidth="1.5" />

              {/* Layer 3 */}
              <circle cx="280" cy="25" r="5" fill="#111" stroke="#ff8577" strokeWidth="2.5" />
              <circle cx="280" cy="60" r="5" fill="#111" stroke="#ff8577" strokeWidth="2.5" />
              <circle cx="280" cy="95" r="5" fill="#111" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="280" cy="130" r="5" fill="#111" stroke="currentColor" strokeWidth="1.5" />

              {/* Layer 4 */}
              <circle cx="380" cy="50" r="6" fill="#111" stroke="currentColor" strokeWidth="2" />
              <circle cx="380" cy="85" r="6" fill="#111" stroke="currentColor" strokeWidth="2" />
              <circle cx="380" cy="120" r="6" fill="#111" stroke="currentColor" strokeWidth="1" />
            </g>
          </svg>
        </div>

        {/* Load controller slider (makes the button highly active and interactive) */}
        <div className="flex items-center gap-4 border-t border-white/5 pt-3 text-[10px]">
          <span className="text-white/40 uppercase font-bold tracking-wider">MANUAL_OVERRIDE_DIAL</span>
          <input 
            type="range" 
            min="10" 
            max="100" 
            step="0.5"
            value={loadFactor} 
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setLoadFactor(val);
            }}
            className="flex-1 accent-os-cyan h-1 bg-white/10 rounded-lg cursor-pointer"
          />
          <span className="font-bold text-os-cyan">{loadFactor}%</span>
        </div>
      </div>

      {/* 2. COMMIT STREAM PANEL (Image 3 Right Top Panel) */}
      <div className="col-span-12 lg:col-span-4 border border-white/5 bg-black/60 rounded-3xl p-5 flex flex-col justify-between min-h-[240px]">
        <div className="flex justify-between items-start mb-3">
          <div>
            <span className="text-[9px] text-white/40 tracking-widest uppercase font-bold">REPO_PULSE // SYS_UPTIME</span>
            <h3 className="text-md font-display font-bold tracking-tight text-white uppercase mt-0.5">COMMIT STREAM</h3>
          </div>
          <button 
            onClick={handleTriggerCommit}
            className="px-2 py-1 bg-os-cyan/10 hover:bg-os-cyan/25 border border-os-cyan/30 rounded text-[9px] font-bold text-os-cyan uppercase cursor-pointer"
          >
            PUSH LOG
          </button>
        </div>

        {/* Live committing bar visualization */}
        <div className="flex gap-2.5 h-16 items-end py-1 justify-center border-b border-white/5 pb-3">
          {[40, 55, 75, 45, 95, 60, 85, 50, 70, 65].map((val, i) => (
            <div key={i} className="flex-1 bg-white/5 rounded relative group overflow-hidden h-full">
              <motion.div 
                className="absolute bottom-0 left-0 right-0 bg-os-cyan shadow-[0_0_10px_rgba(255,133,119,0.5)]"
                initial={{ height: 0 }}
                animate={{ height: `${val}%` }}
                transition={{ duration: 1, delay: i * 0.05 }}
              />
            </div>
          ))}
        </div>

        {/* Dynamic commit scroll feed */}
        <div className="flex-1 overflow-y-auto mt-3 space-y-2.5 max-h-[110px] pr-1 custom-scrollbar">
          {commits.map((c, i) => (
            <div key={i} className="flex justify-between text-[10px] p-2 bg-white/[0.01] border border-white/5 rounded-lg">
              <div className="flex gap-2 items-center min-w-0">
                <span className="px-1.5 py-0.5 bg-os-cyan/15 border border-os-cyan/30 text-os-cyan rounded text-[9px] font-bold">
                  {c.hash}
                </span>
                <span className="text-white/70 truncate text-[9px]">{c.desc}</span>
              </div>
              <span className="text-white/30 text-[9px] shrink-0 ml-2">{c.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. INFRASTRUCTURE NODES (Image 3 Center Grid) */}
      <div className="col-span-12 border border-white/5 bg-black/60 rounded-3xl p-5 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-3">
          <div>
            <span className="text-[9px] text-white/40 tracking-widest uppercase font-bold">CLUSTER_STATUS: OPTIMAL</span>
            <h3 className="text-md font-display font-bold tracking-tight text-white uppercase mt-0.5">INFRASTRUCTURE NODES</h3>
          </div>
          <div className="flex gap-4 text-[9px] uppercase font-bold text-white/40">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-os-cyan inline-block shadow-[0_0_6px_#ff8577]" /> ACTIVE</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-white/10 inline-block" /> IDLE</span>
          </div>
        </div>

        {/* 16 Interactive Nodes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
          {nodes.map((node) => (
            <div 
              key={node.id}
              onClick={() => toggleNode(node.id)}
              className={`p-3 rounded-xl border transition-all cursor-pointer select-none text-left relative ${
                node.active 
                  ? 'border-os-cyan/30 bg-os-cyan/5 hover:bg-os-cyan/10' 
                  : 'border-white/5 bg-black/40 opacity-50 hover:opacity-80'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-bold text-white/40 tracking-wider">{node.id}</span>
                <Server size={10} className={node.active ? 'text-os-cyan' : 'text-white/20'} />
              </div>
              <div className="mt-2.5">
                <p className="text-sm font-display font-bold text-white tracking-tight">
                  {node.active ? `${node.load}%` : 'OFF'}
                </p>
                <p className="text-[8px] text-white/30 font-bold mt-0.5">{node.mem}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. QUANTUM ARRAY & ACTIVE PROTOCOLS (Image 3 Bottom layout) */}
      {/* Bottom left panel: Quantum Spike Array */}
      <div className="col-span-12 lg:col-span-7 border border-white/5 bg-black/60 rounded-3xl p-5 flex flex-col justify-between min-h-[190px]">
        <div>
          <span className="text-[9px] text-white/40 tracking-widest uppercase font-bold">HARDWARE_SCAN // SECTOR_K_42</span>
          <h3 className="text-md font-display font-bold tracking-tight text-white uppercase mt-0.5">Quantum Array v2.4</h3>
        </div>

        {/* Isometric Pin-Field SVG (Makes it extremely unique!) */}
        <div className="flex-1 relative flex items-center justify-center my-2 h-[100px]">
          <svg className="w-full h-full max-h-[100px]" viewBox="0 0 400 100">
            <g transform="translate(40, 10)">
              {/* Draw an isometric mesh grid of pins that glow or ripple on hover */}
              {Array.from({ length: 15 }).map((_, col) => {
                return Array.from({ length: 4 }).map((_, row) => {
                  const idx = col * 4 + row;
                  const x = col * 22 + row * 10;
                  const y = row * 16 - col * 1.5;
                  const isHovered = rippleIndex === idx;
                  
                  // Height of quantum pins
                  const pinHeight = isHovered ? 28 : (14 + Math.sin(col * 0.5 + Date.now() / 800) * 6);
                  
                  return (
                    <g 
                      key={idx} 
                      onMouseEnter={() => setRippleIndex(idx)}
                      onMouseLeave={() => setRippleIndex(null)}
                      className="cursor-pointer"
                    >
                      {/* Grid support node */}
                      <circle cx={x} cy={y + 30} r="1" fill="rgba(255,255,255,0.06)" />
                      {/* Vertical line spike representing pin */}
                      <line 
                        x1={x} 
                        y1={y + 30} 
                        x2={x} 
                        y2={y + 30 - pinHeight} 
                        stroke={isHovered ? '#ff8577' : '#ff8577'} 
                        strokeWidth={isHovered ? 2.5 : 1} 
                        opacity={isHovered ? 1 : 0.6}
                      />
                      {/* Glowing dot head */}
                      <circle 
                        cx={x} 
                        cy={y + 30 - pinHeight} 
                        r={isHovered ? 2.5 : 1.5} 
                        fill={isHovered ? '#fff' : '#ff8577'} 
                        className="transition-all"
                      />
                    </g>
                  );
                });
              })}
            </g>
          </svg>
        </div>
        <p className="text-[9px] text-white/40 leading-normal">Core temperature stable at 2.4K. Hover cursor over sensor pins to measure local qubits coherent interference patterns.</p>
      </div>

      {/* Bottom right panel: Active Protocols list */}
      <div className="col-span-12 lg:col-span-5 border border-white/5 bg-black/60 rounded-3xl p-5 flex flex-col justify-between">
        <div>
          <span className="text-[9px] text-white/40 tracking-widest uppercase font-bold">SEC_LVL_4_ROUTING</span>
          <h3 className="text-md font-display font-bold tracking-tight text-white uppercase mt-0.5">ACTIVE PROTOCOLS</h3>
        </div>

        <div className="space-y-2 mt-4">
          {protocols.map((p) => (
            <div 
              key={p.id}
              onClick={() => {
                setProtocols(prev => prev.map(item => item.id === p.id ? { ...item, active: !item.active } : item));
                addNotification(`Protocol ${p.title} set to ${!p.active ? 'ACTIVE' : 'STANDBY'}`, !p.active ? 'info' : 'warn');
              }}
              className="flex items-center gap-3 p-2.5 rounded-xl border border-white/5 hover:border-os-cyan/20 bg-white/[0.01] hover:bg-white/[0.03] cursor-pointer transition-all"
            >
              <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${p.active ? 'border-os-cyan bg-os-cyan/15 text-os-cyan' : 'border-white/20'}`}>
                {p.active && <CheckCircle size={10} />}
              </div>
              <span className={`text-[9.5px] font-bold tracking-wider ${p.active ? 'text-white' : 'text-white/40'}`}>{p.title}</span>
            </div>
          ))}
        </div>

        <button 
          onClick={handleOpenLogs}
          className="w-full py-2.5 border border-white/10 hover:border-os-cyan bg-white/5 hover:bg-os-cyan/10 text-white hover:text-white rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all mt-4 cursor-pointer"
        >
          ACCESS LOGS
        </button>
      </div>

      {/* Full terminal simulated popup drawer */}
      <AnimatePresence>
        {showLogs && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowLogs(false)} />
            <div className="w-full max-w-2xl bg-black border border-os-cyan/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(255,133,119,0.2)] relative z-10 font-mono text-[10px] text-white flex flex-col h-[400px]">
              <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
                <span className="font-bold text-os-cyan uppercase tracking-widest flex items-center gap-2">
                  <Activity size={12} className="animate-pulse" />
                  REAL-TIME ENCRYPTED DECRYPTOR STREAM
                </span>
                <button 
                  onClick={() => setShowLogs(false)} 
                  className="px-2.5 py-1 border border-white/20 hover:border-os-cyan hover:text-os-cyan rounded uppercase text-[8px] font-bold"
                >
                  ESC.SYS
                </button>
              </div>
              <div className="flex-1 p-5 overflow-y-auto space-y-1.5 custom-scrollbar text-white/80 select-text">
                {logMessages.map((msg, i) => (
                  <div key={i} className="leading-snug">
                    <span className="text-os-cyan/60 mr-2">[{new Date().toLocaleTimeString()}]</span>
                    {msg}
                  </div>
                ))}
              </div>
              <div className="p-3 bg-white/[0.01] border-t border-white/5 flex justify-between text-[8px] text-white/30 tracking-widest">
                <span>CHANNEL_FEED: ACTIVE SECURE</span>
                <span>BAUD_RATE: 921600 KBPS</span>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};


// ==========================================
// 2. ELECTRICAL & SIGNALS DASHBOARD
// ==========================================
export const ElectricalDashboard: React.FC<{ addNotification: (m: string, t?: any) => void }> = ({ addNotification }) => {
  const [waveShape, setWaveShape] = useState<'sine' | 'square' | 'sawtooth' | 'triangle'>('sine');
  const [frequency, setFrequency] = useState(5.0);
  const [amplitude, setAmplitude] = useState(30.0);
  const [activeBand, setActiveBand] = useState('28 GHz');
  const [signals, setSignals] = useState([
    { gate: 'AND', pinA: true, pinB: false, out: false },
    { gate: 'OR', pinA: true, pinB: false, out: true },
    { gate: 'XOR', pinA: true, pinB: false, out: true }
  ]);

  const [burningHex, setBurningHex] = useState(false);
  const [burnProgress, setBurnProgress] = useState(0);

  // Oscilloscope live wave drawing path
  const drawWavePath = () => {
    let points = [];
    for (let x = 0; x <= 340; x += 1.5) {
      let y = 50;
      const angle = (x / 340) * Math.PI * 2 * frequency;
      
      if (waveShape === 'sine') {
        y = 50 + Math.sin(angle) * amplitude;
      } else if (waveShape === 'square') {
        y = 50 + (Math.sin(angle) >= 0 ? amplitude : -amplitude);
      } else if (waveShape === 'sawtooth') {
        y = 50 + (((x * frequency) % 340) / 340 - 0.5) * 2 * amplitude;
      } else if (waveShape === 'triangle') {
        y = 50 + (Math.abs((((x * frequency) % 340) / 340 - 0.5) * 4) - 1) * amplitude;
      }
      points.push(`${x},${y}`);
    }
    return `M ${points.join(' L ')}`;
  };

  const handleBurnFirmware = () => {
    if (burningHex) return;
    setBurningHex(true);
    setBurnProgress(0);
    addNotification('Initiating semiconductor custom MCU flash...', 'info');
    
    const interval = setInterval(() => {
      setBurnProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setBurningHex(false);
          addNotification('Semiconductor MCU compilation flashed successfully.', 'info');
          return 100;
        }
        return prev + 12.5;
      });
    }, 250);
  };

  const toggleGateInput = (index: number, pin: 'pinA' | 'pinB') => {
    setSignals(prev => prev.map((s, idx) => {
      if (idx === index) {
        const nextState = !s[pin];
        let nextOut = false;
        const otherPinVal = pin === 'pinA' ? s.pinB : s.pinA;
        
        if (s.gate === 'AND') nextOut = nextState && otherPinVal;
        if (s.gate === 'OR') nextOut = nextState || otherPinVal;
        if (s.gate === 'XOR') nextOut = nextState !== otherPinVal;
        
        return { ...s, [pin]: nextState, out: nextOut };
      }
      return s;
    }));
    addNotification('Gate logical input propagated.', 'info');
  };

  return (
    <div className="grid grid-cols-12 gap-5 h-full overflow-y-auto pr-1 select-none font-mono text-left">
      {/* 1. Oscilloscope Viewport */}
      <div className="col-span-12 lg:col-span-7 border border-white/5 bg-black/60 rounded-3xl p-5 flex flex-col justify-between min-h-[260px]">
        <div>
          <span className="text-[9px] text-white/40 tracking-widest uppercase font-bold">DEVICE_ID: CORE-OSCILLOSCOPE-85</span>
          <h3 className="text-md font-display font-bold tracking-tight text-white uppercase mt-0.5">OSCILLOSCOPE SIGNAL SYNTHESIZER</h3>
        </div>

        {/* Oscilloscope Grid Frame */}
        <div className="flex-1 bg-black rounded-2xl border border-white/10 relative overflow-hidden my-3 min-h-[110px] flex items-center justify-center p-2">
          {/* Wave Grid Gridlines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,133,119,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,133,119,0.02)_1px,transparent_1px)] bg-[size:10px_10px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,133,119,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,133,119,0.06)_1px,transparent_1px)] bg-[size:50px_50px]" />
          
          <svg className="w-full h-24 text-os-cyan relative z-10" viewBox="0 0 340 100" preserveAspectRatio="none">
            <path 
              d={drawWavePath()} 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              className="drop-shadow-[0_0_8px_#ff8577]"
            />
          </svg>
        </div>

        {/* Wave Adjusting sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/5 pt-3">
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] font-bold text-white/40">
              <span className="uppercase">FREQUENCY MATRIX</span>
              <span className="text-os-cyan">{frequency.toFixed(1)} GHz</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="15" 
              step="0.1"
              value={frequency} 
              onChange={(e) => setFrequency(parseFloat(e.target.value))}
              className="w-full accent-os-cyan h-1 bg-white/10 rounded-lg cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] font-bold text-white/40">
              <span className="uppercase">AMPLITUDE MATRIX</span>
              <span className="text-os-cyan">{amplitude.toFixed(0)} V</span>
            </div>
            <input 
              type="range" 
              min="5" 
              max="45" 
              step="1"
              value={amplitude} 
              onChange={(e) => setAmplitude(parseFloat(e.target.value))}
              className="w-full accent-os-cyan h-1 bg-white/10 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Shape selectors buttons */}
        <div className="flex gap-2 mt-4">
          {(['sine', 'square', 'sawtooth', 'triangle'] as const).map((shape) => (
            <button
              key={shape}
              onClick={() => {
                setWaveShape(shape);
                addNotification(`Oscilloscope wave format set to ${shape.toUpperCase()}`, 'info');
              }}
              className={`flex-1 py-1.5 rounded-lg border text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                waveShape === shape 
                  ? 'border-os-cyan bg-os-cyan/15 text-os-cyan shadow-[0_0_10px_rgba(255,133,119,0.15)]' 
                  : 'border-white/5 bg-white/5 text-white/50 hover:text-white'
              }`}
            >
              {shape}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Logic Gate Junction Matrix */}
      <div className="col-span-12 lg:col-span-5 border border-white/5 bg-black/60 rounded-3xl p-5 flex flex-col justify-between">
        <div>
          <span className="text-[9px] text-white/40 tracking-widest uppercase font-bold">VLSI_SEMICONDUCTOR_CHIP</span>
          <h3 className="text-md font-display font-bold tracking-tight text-white uppercase mt-0.5">SEMICONDUCTOR JUNCTION MATRIX</h3>
        </div>

        <div className="space-y-3.5 my-4">
          {signals.map((s, idx) => (
            <div key={idx} className="p-3 bg-white/[0.01] border border-white/5 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="px-1.5 py-0.5 bg-white/5 border border-white/10 text-white/60 text-[9px] font-bold font-mono rounded">
                  {s.gate}
                </span>
                <span className="text-[10px] text-white/40 font-bold uppercase">GATE INPUTS:</span>
              </div>

              <div className="flex items-center gap-4 text-[9px]">
                {/* Pin A Toggle */}
                <button 
                  onClick={() => toggleGateInput(idx, 'pinA')}
                  className={`px-2 py-0.5 rounded border font-bold transition-all cursor-pointer ${
                    s.pinA 
                      ? 'border-os-cyan bg-os-cyan/15 text-os-cyan' 
                      : 'border-white/10 text-white/30'
                  }`}
                >
                  A: {s.pinA ? '1' : '0'}
                </button>

                {/* Pin B Toggle */}
                <button 
                  onClick={() => toggleGateInput(idx, 'pinB')}
                  className={`px-2 py-0.5 rounded border font-bold transition-all cursor-pointer ${
                    s.pinB 
                      ? 'border-os-cyan bg-os-cyan/15 text-os-cyan' 
                      : 'border-white/10 text-white/30'
                  }`}
                >
                  B: {s.pinB ? '1' : '0'}
                </button>

                <span className="text-white/40 font-bold">//</span>

                {/* Gate Out indicator */}
                <span className={`px-2 py-0.5 rounded border font-bold ${
                  s.out 
                    ? 'border-green-400 bg-green-500/10 text-green-400 font-black shadow-[0_0_8px_rgba(74,222,128,0.2)]' 
                    : 'border-white/5 bg-black text-white/20'
                }`}>
                  OUT: {s.out ? '1' : '0'}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[9.5px] text-white/40 leading-relaxed">Adjust individual transistor input states to solve complex CMOS logical gate states at the micro-silicon level.</p>
      </div>

      {/* 3. RF Radio Band Spectrum Selector */}
      <div className="col-span-12 lg:col-span-7 border border-white/5 bg-black/60 rounded-3xl p-5 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="text-[9px] text-white/40 tracking-widest uppercase font-bold">RF_RF_SPECTRUM_ANALYSIS</span>
            <h3 className="text-md font-display font-bold tracking-tight text-white uppercase mt-0.5">RF FREQUENCY BAND SPECTRUM</h3>
          </div>
          <span className="px-2 py-0.5 bg-os-cyan/10 border border-os-cyan/20 text-os-cyan text-[8px] font-black uppercase tracking-wider rounded">ACTIVE SCAN</span>
        </div>

        {/* Bar chart representing bands */}
        <div className="flex items-end gap-3 h-20 px-2 justify-center border-b border-white/5 pb-3">
          {['10 GHz', '28 GHz', '60 GHz', '85 GHz', '100 GHz'].map((band) => {
            const isActive = activeBand === band;
            const barHeight = band === '10 GHz' ? 35 : band === '28 GHz' ? 85 : band === '60 GHz' ? 55 : band === '85 GHz' ? 40 : 65;
            
            return (
              <div 
                key={band} 
                onClick={() => {
                  setActiveBand(band);
                  addNotification(`Focused RF carrier spectrum band: ${band}`, 'info');
                }}
                className="flex-1 flex flex-col items-center gap-2 cursor-pointer group"
              >
                <div className="w-full bg-white/5 rounded-t overflow-hidden relative h-12">
                  <motion.div 
                    className={`absolute bottom-0 left-0 right-0 ${isActive ? 'bg-os-cyan shadow-[0_0_10px_rgba(255,133,119,0.5)]' : 'bg-white/25 group-hover:bg-white/40'}`}
                    initial={{ height: 0 }}
                    animate={{ height: `${barHeight}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
                <span className={`text-[8px] font-bold uppercase tracking-widest ${isActive ? 'text-os-cyan font-black' : 'text-white/30 group-hover:text-white/60'}`}>{band}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. MCU firmware burner section */}
      <div className="col-span-12 lg:col-span-5 border border-white/5 bg-black/60 rounded-3xl p-5 flex flex-col justify-between">
        <div>
          <span className="text-[9px] text-white/40 tracking-widest uppercase font-bold">EMBEDDED_FIRMWARE_BURNER</span>
          <h3 className="text-md font-display font-bold tracking-tight text-white uppercase mt-0.5">EMBEDDED MCU FIRMWARE</h3>
        </div>

        <div className="space-y-3.5 my-3">
          <div className="flex justify-between items-baseline text-[10px] text-white/50">
            <span>FIRMWARE HEX TRANSFER PROGRESS</span>
            <span className="text-white font-bold">{burnProgress}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
            <motion.div 
              className="h-full bg-os-cyan shadow-[0_0_10px_#ff8577]"
              style={{ width: `${burnProgress}%` }}
              animate={burningHex ? { opacity: [1, 0.5, 1] } : {}}
              transition={burningHex ? { duration: 1, repeat: Infinity } : {}}
            />
          </div>
        </div>

        <button 
          onClick={handleBurnFirmware}
          disabled={burningHex}
          className="w-full py-3 bg-os-cyan hover:bg-os-cyan/90 disabled:bg-os-cyan/30 text-black text-[9px] font-black uppercase tracking-[0.2em] rounded-xl transition-all cursor-pointer"
        >
          {burningHex ? 'FLASHING KERNEL...' : 'BURN MCU FIRMWARE'}
        </button>
      </div>
    </div>
  );
};


// ==========================================
// 3. MECHANICAL & DYNAMICS DASHBOARD (Image 2)
// ==========================================
export const MechanicalDashboard: React.FC<{ addNotification: (m: string, t?: any) => void }> = ({ addNotification }) => {
  const [zoomScale, setZoomScale] = useState(1);
  const [rotAngle, setRotAngle] = useState(0);
  const [focusedCylinder, setFocusedCylinder] = useState<number | null>(null);
  const [materials, setMaterials] = useState([
    { name: 'TITANIUM-GOLD', val: 45 },
    { name: 'CARBON NANOTUBE', val: 32 },
    { name: 'VIBRANIUM ALLOY', val: 23, restricted: true }
  ]);

  const [fabProgress, setFabProgress] = useState(75);
  const [rigidity, setRigidity] = useState(94);

  // Auto increment fabrication progress to 100%
  useEffect(() => {
    const timer = setInterval(() => {
      setFabProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 1;
      });
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  // Recalculate rigidity based on active alloy structure elements
  const adjustMaterialVal = (index: number, change: number) => {
    setMaterials(prev => {
      const copy = [...prev];
      const otherIdx = (index + 1) % 3;
      const otherIdx2 = (index + 2) % 3;
      
      const val1 = Math.max(0, Math.min(100, copy[index].val + change));
      const delta = val1 - copy[index].val;
      
      copy[index].val = val1;
      copy[otherIdx].val = Math.max(0, copy[otherIdx].val - delta / 2);
      copy[otherIdx2].val = Math.max(0, 100 - copy[index].val - copy[otherIdx].val);
      
      // update rigidity indicator as stress calculations factor
      setRigidity(Math.round(80 + (copy[1].val * 0.4)));
      return copy;
    });
  };

  // Generate a CAD/FEA engineering text report file download!
  const handleGenerateReport = () => {
    addNotification('Compiling FEA finite mechanical stress report...', 'info');
    
    setTimeout(() => {
      const textContent = `ENGINEER OS - MECHANICAL CAD REPORT
=================================================
TIMESTAMP: ${new Date().toISOString()}
STRUCTURAL TARGET: ALPHA_CHASSIS_WIRE_MKV
TORSIONAL RIGIDITY: ${rigidity}%
LATERAL G-LOAD CAPACITY: 88%
AERO-DRAG COEFFICIENT: 0.24 CD
-------------------------------------------------
MATERIAL METRICS MATRIX:
- TITANIUM-GOLD: ${materials[0].val}%
- CARBON NANOTUBE: ${materials[1].val}%
- VIBRANIUM ALLOY (RESTRICTED): ${materials[2].val}%
-------------------------------------------------
COMPLIANCE STATUS: VERIFIED OPTIMUM DESIGN`;

      const blob = new Blob([textContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'CAD_SCHEMATICS_STRESS_REPORT.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      addNotification('CAD structural mechanical report exported to disk queue.', 'info');
    }, 1000);
  };

  return (
    <div className="grid grid-cols-12 gap-5 h-full overflow-y-auto pr-1 select-none font-mono text-left">
      {/* Center 3D viewport (Image 2 Middle Area) */}
      <div className="col-span-12 lg:col-span-8 border border-white/5 bg-black/60 rounded-3xl p-5 flex flex-col justify-between min-h-[300px]">
        <div className="flex justify-between items-start border-b border-white/5 pb-3">
          <div>
            <span className="text-[9px] text-white/40 tracking-widest uppercase font-bold">SYSTEM STATUS: NOMINAL // CORE TEMP: 34.2°C</span>
            <h3 className="text-xl font-display font-bold tracking-tight text-white uppercase mt-0.5">MECHANICAL SYSTEMS ANALYSIS</h3>
          </div>
          <span className="px-2 py-0.5 bg-os-cyan/10 border border-os-cyan/20 text-os-cyan text-[8px] font-black uppercase tracking-wider rounded">CHASSIS_MKV</span>
        </div>

        {/* Viewport content */}
        <div className="flex-1 bg-black rounded-2xl border border-white/10 relative overflow-hidden my-3 flex flex-col justify-between min-h-[160px] p-4">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,133,119,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,133,119,0.01)_1px,transparent_1px)] bg-[size:16px_16px]" />
          
          <div className="text-[9px] text-white/40 uppercase tracking-widest">VIEWPORT: WIREFRAME_CHASSIS_MKV</div>

          {/* Interactive Car Wireframe SVG */}
          <div className="flex-1 flex items-center justify-center my-2">
            <svg 
              viewBox="0 0 200 100" 
              className="w-48 h-24 text-os-cyan transition-all duration-300 transform"
              style={{ 
                scale: zoomScale,
                rotate: `${rotAngle}deg`
              }}
            >
              {/* Symmetrical wireframe lines representing high-tech F1 chassis */}
              <g fill="none" stroke="currentColor" strokeWidth="0.8">
                {/* Nose Cone */}
                <polygon points="20,50 40,40 40,60" />
                <line x1="20" y1="50" x2="60" y2="50" />
                
                {/* Front suspension */}
                <line x1="40" y1="40" x2="60" y2="30" />
                <line x1="40" y1="60" x2="60" y2="70" />
                {/* Front Wheels wire */}
                <circle cx="60" cy="30" r="10" strokeDasharray="2 2" />
                <circle cx="60" cy="70" r="10" strokeDasharray="2 2" />

                {/* Cockpit / Tub */}
                <polygon points="60,40 140,30 140,70 60,60" />
                <rect x="90" y="42" width="30" height="16" strokeWidth="0.5" />

                {/* Power unit pod */}
                <polygon points="140,30 170,42 170,58 140,70" />

                {/* Rear suspension */}
                <line x1="160" y1="42" x2="175" y2="25" />
                <line x1="160" y1="58" x2="175" y2="75" />
                {/* Rear wheels wire */}
                <circle cx="175" cy="25" r="12" strokeDasharray="2 2" />
                <circle cx="175" cy="75" r="12" strokeDasharray="2 2" />

                {/* Wing */}
                <rect x="175" y="35" width="15" height="30" />
                <line x1="175" y1="50" x2="190" y2="50" />
              </g>
            </svg>
          </div>

          {/* Controls overlay (making buttons highly active and working!) */}
          <div className="absolute bottom-3 right-3 flex flex-col gap-2">
            {/* Zoom In */}
            <button 
              onClick={() => {
                setZoomScale(z => Math.min(1.6, z + 0.1));
              }}
              className="w-7 h-7 bg-white/5 hover:bg-os-cyan/15 border border-white/10 hover:border-os-cyan rounded-lg flex items-center justify-center text-white hover:text-os-cyan transition-all cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn size={12} />
            </button>
            {/* Rotate angle */}
            <button 
              onClick={() => {
                setRotAngle(r => (r + 15) % 360);
              }}
              className="w-7 h-7 bg-white/5 hover:bg-os-cyan/15 border border-white/10 hover:border-os-cyan rounded-lg flex items-center justify-center text-white hover:text-os-cyan transition-all cursor-pointer"
              title="Rotate Viewport"
            >
              <RotateCw size={12} />
            </button>
            {/* Reset */}
            <button 
              onClick={() => {
                setZoomScale(1);
                setRotAngle(0);
              }}
              className="w-7 h-7 bg-white/5 hover:bg-os-cyan/15 border border-white/10 hover:border-os-cyan rounded-lg flex items-center justify-center text-white hover:text-os-cyan transition-all cursor-pointer"
              title="Reset Viewport"
            >
              <RefreshCw size={12} />
            </button>
          </div>
        </div>

        {/* Dynamic coordinate labels */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[9px] text-white/40 tracking-wider">
          <div className="flex flex-col border border-white/5 p-2 rounded-lg bg-white/[0.01]">
            <span>TRIANGLES</span>
            <span className="font-bold text-white mt-0.5">4,529,102</span>
          </div>
          <div className="flex flex-col border border-white/5 p-2 rounded-lg bg-white/[0.01]">
            <span>VERTICES</span>
            <span className="font-bold text-white mt-0.5">2,109,844</span>
          </div>
          <div className="flex flex-col border border-white/5 p-2 rounded-lg bg-white/[0.01]">
            <span>FPS_SPEED</span>
            <span className="font-bold text-white mt-0.5">144.0 HZ</span>
          </div>
          <div className="flex flex-col border border-white/5 p-2 rounded-lg bg-white/[0.01]">
            <span>GPU_REND_LOAD</span>
            <span className="font-bold text-os-cyan mt-0.5 animate-pulse">64%</span>
          </div>
        </div>
      </div>

      {/* Right column: Thermal Gradient & Stress details (Image 2 Right sidebar) */}
      <div className="col-span-12 lg:col-span-4 flex flex-col gap-5">
        {/* Card 1: Thermal Gradient */}
        <div className="border border-white/5 bg-black/60 rounded-3xl p-5 flex flex-col justify-between flex-1">
          <div>
            <span className="text-[9px] text-white/40 tracking-widest uppercase font-bold">THERM_HUD_GRID_SCAN</span>
            <h3 className="text-md font-display font-bold tracking-tight text-white uppercase mt-0.5">THERMAL GRADIENT</h3>
          </div>

          {/* Engine block vector model */}
          <div className="my-3 flex items-center justify-center bg-black/40 border border-white/5 rounded-xl p-3 min-h-[90px]">
            <svg viewBox="0 0 120 50" className="w-36 h-16">
              <g strokeWidth="0.5">
                {/* Cylinder 1 */}
                <rect 
                  x="10" y="5" width="20" height="40" rx="3" 
                  fill={focusedCylinder === 0 ? 'rgba(255,133,119,0.3)' : 'rgba(255,133,119,0.1)'} 
                  stroke={focusedCylinder === 0 ? '#ff8577' : 'rgba(255,133,119,0.4)'}
                  onClick={() => { setFocusedCylinder(0); }}
                  className="cursor-pointer transition-all"
                />
                {/* Cylinder 2 */}
                <rect 
                  x="35" y="5" width="20" height="40" rx="3" 
                  fill={focusedCylinder === 1 ? 'rgba(255,133,119,0.3)' : 'rgba(255,133,119,0.1)'} 
                  stroke={focusedCylinder === 1 ? '#ff8577' : 'rgba(255,133,119,0.4)'}
                  onClick={() => { setFocusedCylinder(1); }}
                  className="cursor-pointer transition-all"
                />
                {/* Cylinder 3 */}
                <rect 
                  x="60" y="5" width="20" height="40" rx="3" 
                  fill={focusedCylinder === 2 ? 'rgba(255,133,119,0.3)' : 'rgba(255,133,119,0.1)'} 
                  stroke={focusedCylinder === 2 ? '#ff8577' : 'rgba(255,133,119,0.4)'}
                  onClick={() => { setFocusedCylinder(2); }}
                  className="cursor-pointer transition-all"
                />
                {/* Cylinder 4 */}
                <rect 
                  x="85" y="5" width="20" height="40" rx="3" 
                  fill={focusedCylinder === 3 ? 'rgba(255,133,119,0.3)' : 'rgba(255,133,119,0.1)'} 
                  stroke={focusedCylinder === 3 ? '#ff8577' : 'rgba(255,133,119,0.4)'}
                  onClick={() => { setFocusedCylinder(3); }}
                  className="cursor-pointer transition-all"
                />
              </g>
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-left">
              <span className="text-[8px] text-white/30 uppercase font-bold">PEAK DELTA</span>
              <p className="text-lg font-display font-bold text-os-cyan mt-0.5">
                {focusedCylinder !== null ? `+${(82.4 + focusedCylinder * 2.1).toFixed(1)}°C` : '+82.4°C'}
              </p>
            </div>
            <div className="text-left">
              <span className="text-[8px] text-white/30 uppercase font-bold">MIN TEMP</span>
              <p className="text-lg font-display font-bold text-white/80 mt-0.5">
                {focusedCylinder !== null ? `${(12.1 - focusedCylinder * 0.4).toFixed(1)}°C` : '12.1°C'}
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Kinematic Stress */}
        <div className="border border-white/5 bg-black/60 rounded-3xl p-5 flex flex-col justify-between flex-1">
          <div>
            <span className="text-[9px] text-white/40 tracking-widest uppercase font-bold">STRESS_FINITE_ELEMENTS</span>
            <h3 className="text-md font-display font-bold tracking-tight text-white uppercase mt-0.5">KINEMATIC STRESS</h3>
          </div>

          <div className="space-y-3.5 my-3 text-[10px]">
            <div className="space-y-1">
              <div className="flex justify-between text-white/40 font-bold">
                <span className="uppercase">TORSIONAL RIGIDITY</span>
                <span className="text-white">{rigidity}%</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-os-cyan shadow-[0_0_6px_#ff8577]" style={{ width: `${rigidity}%` }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-white/40 font-bold">
                <span className="uppercase">LATERAL G-LOAD CAPACITY</span>
                <span className="text-white">88%</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-os-cyan shadow-[0_0_6px_#ff8577]" style={{ width: '88%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-white/40 font-bold">
                <span className="uppercase">AERO-DRAG COEFFICIENT</span>
                <span className="text-os-orange">0.24 CD</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-os-orange" style={{ width: '24%' }} />
              </div>
            </div>
          </div>

          <button 
            onClick={handleGenerateReport}
            className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-os-cyan text-white text-[9px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer text-center"
          >
            GENERATE PDF REPORT
          </button>
        </div>
      </div>

      {/* Bottom Row Bento Grid Elements (Image 2 Bottom row) */}
      {/* Bento Card 1: Materials */}
      <div className="col-span-12 lg:col-span-6 border border-white/5 bg-black/60 rounded-3xl p-5 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="text-[9px] text-white/40 tracking-widest uppercase font-bold">CAD_GRADE_STRUCTURAL</span>
            <h3 className="text-md font-display font-bold tracking-tight text-white uppercase mt-0.5">MATERIALS CORES</h3>
          </div>
          <span className="px-2 py-0.5 bg-os-cyan/15 text-os-cyan text-[8px] font-bold rounded uppercase tracking-wider">GRADE ENG-85</span>
        </div>

        <div className="space-y-3 mt-3">
          {materials.map((m, idx) => (
            <div key={idx} className="p-2.5 bg-white/[0.01] border border-white/5 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-[9.5px] font-bold tracking-wider text-white">{m.name}</span>
                {m.restricted && <span className="px-1.5 py-0.5 bg-os-orange/15 border border-os-orange/30 text-os-orange text-[7.5px] rounded font-bold uppercase tracking-widest">RESTRICTED</span>}
              </div>
              <div className="flex items-center gap-3 text-[10px]">
                <button 
                  onClick={() => adjustMaterialVal(idx, -5)}
                  className="px-1.5 border border-white/15 hover:border-os-cyan text-white/40 hover:text-white rounded cursor-pointer"
                >
                  -
                </button>
                <span className="font-bold text-os-cyan w-8 text-center">{m.val}%</span>
                <button 
                  onClick={() => adjustMaterialVal(idx, 5)}
                  className="px-1.5 border border-white/15 hover:border-os-cyan text-white/40 hover:text-white rounded cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bento Card 2: Fabrication Queue */}
      <div className="col-span-12 lg:col-span-6 border border-white/5 bg-black/60 rounded-3xl p-5 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="text-[9px] text-white/40 tracking-widest uppercase font-bold">LASER_SINTERING_QUEUE</span>
            <h3 className="text-md font-display font-bold tracking-tight text-white uppercase mt-0.5">FABRICATION QUEUE</h3>
          </div>
          <span className="flex items-center gap-1 text-[8.5px] uppercase font-bold text-os-cyan">
            <span className="w-1.5 h-1.5 rounded-full bg-os-cyan animate-pulse inline-block shadow-[0_0_6px_#ff8577]" /> LIVE PRODUCTION
          </span>
        </div>

        <div className="space-y-3.5 mt-3 text-[10px]">
          {/* Job 1 */}
          <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl space-y-2">
            <div className="flex justify-between text-white/50 font-bold">
              <span className="uppercase">RIGHT FOREARM PLATE [X-90]</span>
              <span className="text-os-cyan">{fabProgress}%</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-os-cyan shadow-[0_0_6px_#ff8577]" style={{ width: `${fabProgress}%` }} />
            </div>
          </div>

          {/* Job 2 */}
          <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl flex justify-between items-center">
            <span className="uppercase font-bold text-white/40">JET ACTUATOR SUB-ASSEMBLY</span>
            <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-white/30 text-[8px] font-black uppercase tracking-widest rounded">QUEUED</span>
          </div>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// 4. CIVIL & SEISMIC DASHBOARD
// ==========================================
export const CivilDashboard: React.FC<{ addNotification: (m: string, t?: any) => void }> = ({ addNotification }) => {
  const [pointLoad, setPointLoad] = useState(50); // kN virtual load on bridge truss
  const [focusedJoint, setFocusedJoint] = useState(2);
  const [shaking, setShaking] = useState(false);
  const [seismicPeak, setSeismicPeak] = useState(1.4);

  const handleShakeTest = () => {
    if (shaking) return;
    setShaking(true);
    setSeismicPeak(7.2);
    addNotification('Triggering localized concrete shake-table simulator... seismic threshold Magnitude 7.2 active.', 'warn');
    
    setTimeout(() => {
      setShaking(false);
      setSeismicPeak(1.4);
      addNotification('Concrete seismic test completed. Structural members displacement stable.', 'info');
    }, 4000);
  };

  return (
    <div className="grid grid-cols-12 gap-5 h-full overflow-y-auto pr-1 select-none font-mono text-left">
      {/* 1. Bridge load stress analysis */}
      <div className={`col-span-12 lg:col-span-7 border border-white/5 bg-black/60 rounded-3xl p-5 flex flex-col justify-between min-h-[260px] transition-all duration-100 ${shaking ? 'animate-bounce' : ''}`}>
        <div>
          <span className="text-[9px] text-white/40 tracking-widest uppercase font-bold">DEVICE_ID: TRUSS-STRESS-SIMULATOR</span>
          <h3 className="text-md font-display font-bold tracking-tight text-white uppercase mt-0.5">TRUSS BRIDGE LOAD SIMULATOR</h3>
        </div>

        {/* Structural bridge outline */}
        <div className="flex-1 bg-black rounded-2xl border border-white/10 relative overflow-hidden my-3 min-h-[110px] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,133,119,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,133,119,0.01)_1px,transparent_1px)] bg-[size:12px_12px]" />
          
          <svg className="w-full h-24 text-white/20 relative z-10" viewBox="0 0 300 80">
            {/* Bridge nodes */}
            <g fill="none">
              {/* Bottom chords */}
              <line x1="20" y1="60" x2="280" y2="60" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
              {/* Top chords */}
              <line x1="60" y1="20" x2="240" y2="20" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
              
              {/* Truss diagonals */}
              <line x1="20" y1="60" x2="60" y2="20" stroke={focusedJoint === 0 ? '#ff8577' : '#22c55e'} strokeWidth={focusedJoint === 0 ? '3.5' : '1.5'} />
              <line x1="60" y1="20" x2="100" y2="60" stroke={focusedJoint === 1 ? '#ff8577' : '#22c55e'} strokeWidth={focusedJoint === 1 ? '3.5' : '1.5'} />
              <line x1="100" y1="60" x2="140" y2="20" stroke={focusedJoint === 2 ? '#eab308' : '#22c55e'} strokeWidth={focusedJoint === 2 ? '3.5' : '1.5'} />
              <line x1="140" y1="20" x2="180" y2="60" stroke={focusedJoint === 3 ? '#ff8577' : '#22c55e'} strokeWidth={focusedJoint === 3 ? '3.5' : '1.5'} />
              <line x1="180" y1="60" x2="220" y2="20" stroke={focusedJoint === 4 ? '#ff8577' : '#22c55e'} strokeWidth={focusedJoint === 4 ? '3.5' : '1.5'} />
              <line x1="220" y1="20" x2="260" y2="60" stroke={focusedJoint === 5 ? '#ff8577' : '#22c55e'} strokeWidth={focusedJoint === 5 ? '3.5' : '1.5'} />
              
              <line x1="60" y1="20" x2="60" y2="60" stroke="#22c55e" strokeWidth="1" />
              <line x1="140" y1="20" x2="100" y2="60" stroke="#eab308" strokeWidth="1" />
              <line x1="140" y1="20" x2="180" y2="60" stroke="#eab308" strokeWidth="1" />
              <line x1="220" y1="20" x2="220" y2="60" stroke="#22c55e" strokeWidth="1" />

              {/* Stress indicators joints */}
              <circle cx="20" cy="60" r="4.5" fill="#111" stroke="#22c55e" strokeWidth="2" />
              <circle cx="60" cy="20" r="4.5" fill="#111" stroke="#22c55e" strokeWidth="2" />
              <circle cx="100" cy="60" r="5" fill="#111" stroke="#eab308" strokeWidth="3.5" onClick={() => { setFocusedJoint(2); }} className="cursor-pointer" />
              <circle cx="140" cy="20" r="4.5" fill="#111" stroke="#22c55e" strokeWidth="2" />
              <circle cx="180" cy="60" r="4.5" fill="#111" stroke="#22c55e" strokeWidth="2" />
              <circle cx="220" cy="20" r="4.5" fill="#111" stroke="#22c55e" strokeWidth="2" />
              <circle cx="260" cy="60" r="4.5" fill="#111" stroke="#22c55e" strokeWidth="2" />
            </g>
          </svg>
        </div>

        {/* Load adjustment slider */}
        <div className="space-y-1.5 border-t border-white/5 pt-3">
          <div className="flex justify-between text-[10px] font-bold text-white/40">
            <span className="uppercase font-bold">VIRTUAL POINT LOAD FORCE</span>
            <span className="text-os-cyan font-bold">{pointLoad} kN</span>
          </div>
          <input 
            type="range" 
            min="10" 
            max="250" 
            step="10"
            value={pointLoad} 
            onChange={(e) => {
              setPointLoad(parseInt(e.target.value));
            }}
            className="w-full accent-os-cyan h-1 bg-white/10 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* 2. Seismic Monitor Section */}
      <div className="col-span-12 lg:col-span-5 border border-white/5 bg-black/60 rounded-3xl p-5 flex flex-col justify-between">
        <div>
          <span className="text-[9px] text-white/40 tracking-widest uppercase font-bold">DEVICE_ID: SHAKE-TABLE-MONITOR</span>
          <h3 className="text-md font-display font-bold tracking-tight text-white uppercase mt-0.5">SEISMIC SHAKE-TABLE MONITOR</h3>
        </div>

        {/* Seismograph readout */}
        <div className="h-24 border border-white/10 rounded-xl my-4 bg-black relative overflow-hidden flex items-center justify-center p-2">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(226,54,54,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(226,54,54,0.01)_1px,transparent_1px)] bg-[size:10px_10px]" />
          
          <svg className="w-full h-full text-os-red" viewBox="0 0 200 60" preserveAspectRatio="none">
            <path 
              d={`M 0,30 L 20,30 L 30,${shaking ? '5' : '28'} L 40,${shaking ? '55' : '32'} L 50,30 L 80,30 L 90,${shaking ? '2' : '29'} L 100,${shaking ? '58' : '31'} L 110,30 L 140,30 L 150,${shaking ? '10' : '28'} L 160,${shaking ? '50' : '32'} L 170,30 L 200,30`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className={shaking ? 'animate-pulse' : ''}
            />
          </svg>
        </div>

        <div className="flex justify-between items-center text-[10px] uppercase font-bold text-white/40">
          <span>SEISMIC ACCEL PEAK</span>
          <span className="text-os-red font-bold font-mono text-xs">{seismicPeak.toFixed(1)} Richter</span>
        </div>

        <button 
          onClick={handleShakeTest}
          disabled={shaking}
          className="w-full py-2.5 mt-4 bg-os-red/10 border border-os-red/30 hover:border-os-red text-os-red hover:text-white rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all cursor-pointer text-center"
        >
          {shaking ? 'SHAKING GRIDS...' : 'TRIGGER SHAKE TEST'}
        </button>
      </div>
    </div>
  );
};


// ==========================================
// 5. CHEMICAL & PROCESS DASHBOARD
// ==========================================
export const ChemicalDashboard: React.FC<{ addNotification: (m: string, t?: any) => void }> = ({ addNotification }) => {
  const [catalystFeed, setCatalystFeed] = useState(4.2);
  const [reactionComplete, setReactionComplete] = useState(false);
  const [refluxRatio, setRefluxRatio] = useState(2.5);

  const handleRunReaction = () => {
    if (reactionComplete) return;
    addNotification('Injecting catalytic compounds into fluid distillation column...', 'info');
    setTimeout(() => {
      setReactionComplete(true);
      addNotification('Chemical reaction balanced. Dynamic equilibrium reached.', 'info');
    }, 3000);
  };

  return (
    <div className="grid grid-cols-12 gap-5 h-full overflow-y-auto pr-1 select-none font-mono text-left">
      {/* Distillation column */}
      <div className="col-span-12 lg:col-span-7 border border-white/5 bg-black/60 rounded-3xl p-5 flex flex-col justify-between min-h-[260px]">
        <div>
          <span className="text-[9px] text-white/40 tracking-widest uppercase font-bold">REACTOR_ID: FRAC-COLUMN-85</span>
          <h3 className="text-md font-display font-bold tracking-tight text-white uppercase mt-0.5">DISTILLATION VALVE CONTROLLER</h3>
        </div>

        {/* Reaction Tower diagram */}
        <div className="flex-1 bg-black rounded-2xl border border-white/10 relative overflow-hidden my-3 min-h-[110px] flex items-center justify-center p-3">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:10px_10px]" />
          
          <svg className="w-24 h-24 text-os-cyan" viewBox="0 0 100 100">
            {/* Distillation column tube */}
            <rect x="35" y="10" width="30" height="80" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
            
            {/* Plates */}
            <line x1="35" y1="25" x2="60" y2="25" stroke="currentColor" strokeWidth="1" strokeDasharray="1 1" />
            <line x1="40" y1="40" x2="65" y2="40" stroke="currentColor" strokeWidth="1" strokeDasharray="1 1" />
            <line x1="35" y1="55" x2="60" y2="55" stroke="currentColor" strokeWidth="1" strokeDasharray="1 1" />
            <line x1="40" y1="70" x2="65" y2="70" stroke="currentColor" strokeWidth="1" strokeDasharray="1 1" />

            {/* Bubble caps animations */}
            <motion.circle cx="45" cy="40" r="2" fill="currentColor" animate={{ y: [-10, 5, -10] }} transition={{ duration: 2, repeat: Infinity }} />
            <motion.circle cx="55" cy="55" r="2.5" fill="currentColor" animate={{ y: [-5, 8, -5] }} transition={{ duration: 1.5, repeat: Infinity }} />
            <motion.circle cx="50" cy="70" r="1.5" fill="currentColor" animate={{ y: [-8, 4, -8] }} transition={{ duration: 2.5, repeat: Infinity }} />
          </svg>
        </div>

        {/* Adjust column parameter */}
        <div className="space-y-1.5 border-t border-white/5 pt-3">
          <div className="flex justify-between text-[10px] font-bold text-white/40">
            <span className="uppercase font-bold">COLUMN REFLUX RATIO</span>
            <span className="text-os-cyan font-bold">{refluxRatio.toFixed(1)} L/D</span>
          </div>
          <input 
            type="range" 
            min="0.5" 
            max="6.0" 
            step="0.1"
            value={refluxRatio} 
            onChange={(e) => {
              setRefluxRatio(parseFloat(e.target.value));
            }}
            className="w-full accent-os-cyan h-1 bg-white/10 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Chemical matrix synthesis */}
      <div className="col-span-12 lg:col-span-5 border border-white/5 bg-black/60 rounded-3xl p-5 flex flex-col justify-between">
        <div>
          <span className="text-[9px] text-white/40 tracking-widest uppercase font-bold">CATALYST_FEED_RATE</span>
          <h3 className="text-md font-display font-bold tracking-tight text-white uppercase mt-0.5">CATALYTIC PROCESS ANALYSIS</h3>
        </div>

        {/* Reaction indicators */}
        <div className="space-y-4 my-4">
          <div className="flex justify-between text-[10px] font-bold text-white/40 uppercase">
            <span>COMPLEMENT_YIELD</span>
            <span className="text-green-400 font-bold">{reactionComplete ? '98.2% REACHED' : 'BALANCING...'}</span>
          </div>

          <div className="space-y-1">
            <span className="text-[8.5px] text-white/30 uppercase font-bold">FEED FEED INLET FLOW (KG/S)</span>
            <div className="flex items-center gap-4">
              <input 
                type="range" 
                min="0.1" 
                max="10.0" 
                step="0.1"
                value={catalystFeed} 
                onChange={(e) => setCatalystFeed(parseFloat(e.target.value))}
                className="flex-1 accent-os-cyan h-1 bg-white/10 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-os-cyan font-bold w-12 text-right">{catalystFeed.toFixed(1)}</span>
            </div>
          </div>
        </div>

        <button 
          onClick={handleRunReaction}
          disabled={reactionComplete}
          className="w-full py-2.5 bg-os-cyan hover:bg-os-cyan/90 disabled:bg-white/5 disabled:text-white/20 text-black text-[9px] font-black uppercase tracking-widest rounded-xl transition-all cursor-pointer"
        >
          {reactionComplete ? 'EQUILIBRIUM SECURED' : 'RUN REACTOR SYNTHESIS'}
        </button>
      </div>
    </div>
  );
};


// ==========================================
// 6. LIFE SCIENCE & EMERGING DASHBOARD (Image 4)
// ==========================================
export const LifeScienceDashboard: React.FC<{ addNotification: (m: string, t?: any) => void }> = ({ addNotification }) => {
  const [coherence, setCoherence] = useState(99.4);
  const [bondStrength, setBondStrength] = useState(4.2);
  const [atomicCount, setAtomicCount] = useState(2408);
  const [rebalancing, setRebalancing] = useState(false);
  const [fusionCharge, setFusionCharge] = useState(84);

  const handleRebalance = () => {
    if (rebalancing) return;
    setRebalancing(true);
    addNotification('Executing load redistribution protocol sequence across micro-grid...', 'info');
    
    setTimeout(() => {
      setFusionCharge(100);
      setRebalancing(false);
      addNotification('Power grid redistribution optimal. Fusion battery charged to 100%.', 'info');
    }, 3000);
  };

  return (
    <div className="grid grid-cols-12 gap-5 h-full overflow-y-auto pr-1 select-none font-mono text-left">
      {/* 1. Quantum Decoherence Monitor (Image 4 Left panel) */}
      <div className="col-span-12 lg:col-span-7 border border-white/5 bg-black/60 rounded-3xl p-5 flex flex-col justify-between min-h-[250px]">
        <div className="flex justify-between items-start border-b border-white/5 pb-3">
          <div>
            <span className="text-[9px] text-white/40 tracking-widest uppercase font-bold">[0.000, 0.482, 1.993] // VECTOR_LOCK_ACTIVE</span>
            <h3 className="text-md font-display font-bold tracking-tight text-white uppercase mt-0.5">QUANTUM DECOHERENCE MONITOR</h3>
          </div>
          <span className="px-2 py-0.5 bg-os-cyan/10 border border-os-cyan/20 text-os-cyan text-[8px] font-black uppercase tracking-wider rounded">REAL-TIME</span>
        </div>

        {/* Decoherence graph wave map */}
        <div className="h-16 border border-white/10 rounded-xl my-4 bg-black relative overflow-hidden flex items-center justify-center p-2">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,133,119,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,133,119,0.01)_1px,transparent_1px)] bg-[size:8px_8px]" />
          
          <svg className="w-full h-full text-os-cyan" viewBox="0 0 200 40" preserveAspectRatio="none">
            <path 
              d="M 0,20 Q 20,5 40,35 T 80,20 T 120,5 T 160,35 T 200,20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* Core telemetry details */}
        <div className="grid grid-cols-3 gap-2 text-left">
          <div className="border border-white/5 p-2 rounded bg-white/[0.01]">
            <span className="text-[7.5px] text-white/30 uppercase font-bold block">ENTANGLEMENT DENSITY</span>
            <span className="text-xs font-bold text-white mt-1 block">14.2 Qubits/cm³</span>
          </div>
          <div className="border border-white/5 p-2 rounded bg-white/[0.01]">
            <span className="text-[7.5px] text-white/30 uppercase font-bold block">PHASE VARIANCE</span>
            <span className="text-xs font-bold text-white mt-1 block">0.002π rad</span>
          </div>
          <div className="border border-white/5 p-2 rounded bg-white/[0.01]">
            <span className="text-[7.5px] text-white/30 uppercase font-bold block">COOLING FACTOR</span>
            <span className="text-xs font-bold text-white mt-1 block">0.015 K</span>
          </div>
        </div>
      </div>

      {/* 2. Molecular Viewer (Image 4 Right panel) */}
      <div className="col-span-12 lg:col-span-5 border border-white/5 bg-black/60 rounded-3xl p-5 flex flex-col justify-between">
        <div className="flex justify-between items-start border-b border-white/5 pb-2">
          <div>
            <span className="text-[9px] text-white/40 tracking-widest uppercase font-bold">PROJECT: NANO-WEAVE X1</span>
            <h3 className="text-md font-display font-bold tracking-tight text-white uppercase mt-0.5">MOLECULAR VIEWER</h3>
          </div>
          <span className="text-[8px] font-black tracking-wider border border-white/10 px-1.5 py-0.5 rounded text-white/40">HUD-L</span>
        </div>

        {/* Molecular Hexagon lattice wireframe */}
        <div className="my-3 flex items-center justify-center bg-black/40 border border-white/5 rounded-2xl p-4 min-h-[90px] relative">
          <svg viewBox="0 0 100 60" className="w-24 h-12 text-os-cyan">
            <g fill="none" stroke="currentColor" strokeWidth="0.8">
              {/* Row of hexagons */}
              <polygon points="10,20 20,10 35,10 45,20 35,30 20,30" />
              <polygon points="45,20 55,10 70,10 80,20 70,30 55,30" />
              {/* Internal connector lines */}
              <line x1="35" y1="10" x2="55" y2="10" />
              <line x1="35" y1="30" x2="55" y2="30" />
            </g>
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-3 text-[9.5px]">
          <div className="text-left border-l border-os-cyan pl-2">
            <span className="text-[8px] text-white/30 uppercase font-bold">BOND_STRENGTH</span>
            <span className="font-bold text-white block mt-0.5">{bondStrength} eV</span>
          </div>
          <div className="text-left border-l border-os-cyan pl-2">
            <span className="text-[8px] text-white/30 uppercase font-bold">ATOMIC_COUNT</span>
            <span className="font-bold text-white block mt-0.5">{atomicCount}</span>
          </div>
        </div>
      </div>

      {/* 3. Smart grid load balancer (Image 4 Middle panel) */}
      <div className="col-span-12 border border-white/5 bg-black/60 rounded-3xl p-5 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-3">
          <div>
            <span className="text-[9px] text-white/40 tracking-widest uppercase font-bold">RENEWABLE INTEGRATION SECTOR: R-4</span>
            <h3 className="text-md font-display font-bold tracking-tight text-white uppercase mt-0.5">SMART GRID LOAD BALANCER</h3>
          </div>
          <div className="text-right">
            <span className="text-[9px] text-white/30 uppercase font-bold">CURRENT CAPACITY</span>
            <p className="text-lg font-display font-bold text-white tracking-tight leading-none mt-1">1.24 GW</p>
          </div>
        </div>

        {/* Progress bars of grids */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-[10px]">
          {/* Solar Arrays */}
          <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl space-y-3">
            <div className="flex justify-between items-center text-white/50 font-bold">
              <span className="flex items-center gap-1.5"><Sun size={12} className="text-os-cyan" /> SOLAR ARRAYS</span>
              <span className="text-white">24.8%</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-os-cyan" style={{ width: '24.8%' }} />
            </div>
          </div>

          {/* Wind Turbines */}
          <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl space-y-3">
            <div className="flex justify-between items-center text-white/50 font-bold">
              <span className="flex items-center gap-1.5"><Wind size={12} className="text-os-cyan" /> WIND TURBINES</span>
              <span className="text-white">62.1%</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-os-cyan" style={{ width: '62.1%' }} />
            </div>
          </div>

          {/* Fusion Battery */}
          <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl space-y-3">
            <div className="flex justify-between items-center text-white/50 font-bold">
              <span className="flex items-center gap-1.5"><Battery size={12} className="text-os-cyan" /> FUSION BATTERY</span>
              <span className="text-white">{fusionCharge}%</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-os-cyan" style={{ width: `${fusionCharge}%` }} />
            </div>
          </div>
        </div>

        <button 
          onClick={handleRebalance}
          disabled={rebalancing}
          className="w-full py-3 bg-os-cyan/15 hover:bg-os-cyan/25 border border-os-cyan/30 text-os-cyan text-[9.5px] font-black uppercase tracking-[0.2em] rounded-xl transition-all mt-5 cursor-pointer text-center"
        >
          {rebalancing ? 'RE-BALANCING POWER GRID SYSTEM...' : 'EXECUTE LOAD REDISTRIBUTION PROTOCOL'}
        </button>
      </div>
    </div>
  );
};
