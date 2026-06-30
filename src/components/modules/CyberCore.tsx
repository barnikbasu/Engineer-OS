import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Monitor, ShieldAlert, Cpu, Download, Wifi, Activity } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';

export const CyberCore: React.FC = () => {
  const { addNotification } = useOSStore();
  const [logs, setLogs] = useState<string[]>([
    "[04:12:09] SECURE_TUNNEL :: Initializing Handshake...",
    "[04:12:10] CRYPTO_BRIDGE :: RSA 4096 layer handshaked successfully",
    "[04:12:12] FIREWALL :: Ingress traffic rate normal (4.2k pkt/s)",
    "[04:12:15] PORT_SCAN_ALERT :: Minor scan detected from 182.44.92.11 - Blocked",
    "[04:12:19] INTEL_NODE :: Quantum cryptographic alignment completed"
  ]);

  // Feed simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const timestamps = new Date().toLocaleTimeString([], { hour12: false });
      const randomLogs = [
        `[${timestamps}] SECURE_TUNNEL :: Synced cluster heartbeat beacon`,
        `[${timestamps}] THREAT_MITIGATION :: Blocked unauthorized ping from host_91.10.3`,
        `[${timestamps}] NEURAL_BUS :: Shield strength calibrated at 100%`,
        `[${timestamps}] DECRYPTING_NEURAL_BUS :: Packet signatures: OK`,
        `[${timestamps}] FIREWALL_GRID :: Port integrity verification: PASSED`
      ];
      setLogs(prev => [randomLogs[Math.floor(Math.random() * randomLogs.length)], ...prev.slice(0, 8)]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col gap-5 overflow-hidden text-white font-sans">
      
      {/* Module Header block */}
      <div className="flex items-center justify-between border-b border-os-cyan/20 pb-4">
        <div className="flex items-center gap-4">
          <div 
            onClick={() => addNotification("Security core integrity: 100%", "info")}
            className="p-3 bg-os-cyan/10 border border-os-cyan/30 rounded-lg cursor-pointer hover:bg-os-cyan/20 transition-all font-bold text-os-cyan"
          >
            <Shield size={24} className="glow-cyan" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white uppercase">Cyber Security Core</h2>
            <p className="text-[10px] font-mono tracking-[0.2em] text-os-cyan/60 uppercase font-bold">NODE_ID: CYBER_SEC_GLOBAL // SECTOR_LNK_99</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div 
            onClick={() => addNotification("Analyzing intrusion signatures in real time...", "warn")}
            className="bg-os-red/10 border border-os-red/20 px-4 py-2 rounded-lg text-[10px] font-mono text-os-red animate-pulse flex items-center gap-2 cursor-pointer hover:bg-os-red/20 transition-all font-bold"
          >
            <ShieldAlert size={14} />
            DEFENSIVE OVERRIDE ACTIVE
          </div>
        </div>
      </div>

      {/* Main Content Pane (Two columns as in Image 3) */}
      <div className="flex-1 grid grid-cols-12 gap-5 min-h-0">
        
        {/* Left main card: GLOBAL THREAT PERIMETER with map visualization (7/12) */}
        <div className="col-span-12 lg:col-span-8 os-panel flex flex-col relative overflow-hidden bg-black/60 border-white/5">
          {/* Subtle grid background */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(226,54,54,0.15)_0%,transparent_100%)] pointer-events-none" />
          <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:30px_30px]" />

          {/* Title bar */}
          <div className="p-5 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-os-cyan font-bold tracking-widest uppercase">DISCIPLINARY COGNITIVE SECURITY ENGINE ARC-SYS_4.2.0</span>
              <h3 className="text-base font-black tracking-tight text-white uppercase mt-0.5">GLOBAL THREAT PERIMETER</h3>
            </div>
            <div className="flex gap-3 text-[10px] font-mono">
              <span className="px-2.5 py-0.5 bg-os-red/10 border border-os-red/30 text-os-red rounded font-bold animate-pulse">ACTIVE THREAT FEED</span>
              <span className="px-2.5 py-0.5 bg-white/5 border border-white/10 text-white/50 rounded font-bold uppercase">14.2% LOAD</span>
            </div>
          </div>

          {/* Tactical map with dotted arcs and target nodes (Image 3) */}
          <div className="flex-1 relative flex items-center justify-center p-8 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.8)_0%,transparent_100%)]">
            
            {/* Styled tactical circular concentric lines */}
            <div className="absolute w-[450px] h-[450px] border border-white/5 rounded-full flex items-center justify-center pointer-events-none">
              <div className="w-[350px] h-[350px] border border-os-cyan/5 rounded-full flex items-center justify-center">
                <div className="w-[220px] h-[220px] border border-white/5 rounded-full flex items-center justify-center border-dashed">
                  <div className="w-[100px] h-[100px] border border-os-cyan/10 rounded-full flex items-center justify-center" />
                </div>
              </div>
            </div>

            {/* Static high-tech map overlay (Image 3 coordinates & node nodes) */}
            <svg viewBox="0 0 800 400" className="w-full h-full max-h-[260px] opacity-40 absolute inset-0 m-auto pointer-events-none">
              {/* Simplified world map outline */}
              <path d="M 150 150 Q 200 120 250 160 T 350 180 T 450 140 T 550 170 T 650 130 T 750 150 L 750 250 T 650 280 T 550 240 T 450 270 T 350 250 T 250 230 Z" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
              <path d="M 50 180 Q 80 140 120 190 T 200 210" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeDasharray="3 3" />
              
              {/* Tactical arcs (Image 3 threat vectors) */}
              <path d="M 180 150 Q 300 80 420 140" fill="none" stroke="#E23636" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
              <path d="M 580 160 Q 420 80 320 250" fill="none" stroke="#ffb800" strokeWidth="1.5" strokeDasharray="2 2" />
              <path d="M 280 220 Q 450 350 620 180" fill="none" stroke="#E23636" strokeWidth="1" />
            </svg>

            {/* Hot glowing nodes overlay */}
            <div className="absolute inset-0">
              {/* Interactive Threat Node 1 */}
              <div 
                onClick={() => addNotification("Node security trace: Moscow core active.", "info")}
                className="absolute top-[35%] left-[30%] cursor-pointer group z-20"
              >
                <div className="w-3 h-3 bg-os-cyan rounded-full animate-ping absolute" />
                <div className="w-3 h-3 bg-os-cyan rounded-full border border-black relative z-10" />
                <div className="absolute left-5 -top-2 bg-black/80 border border-os-cyan/30 px-1.5 py-0.5 rounded text-[8px] font-mono text-os-cyan opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  EU_GATEWAY // SECTOR_8
                </div>
              </div>

              {/* Threat Node 2 */}
              <div 
                onClick={() => addNotification("Node security trace: Tokyo satellite link standard.", "info")}
                className="absolute top-[55%] left-[75%] cursor-pointer group z-20"
              >
                <div className="w-3 h-3 bg-os-orange rounded-full animate-ping absolute" />
                <div className="w-3 h-3 bg-os-orange rounded-full border border-black relative z-10" />
                <div className="absolute left-5 -top-2 bg-black/80 border border-os-orange/30 px-1.5 py-0.5 rounded text-[8px] font-mono text-os-orange opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  ASIA_SYNC // SECTOR_12
                </div>
              </div>

              {/* Threat Node 3 */}
              <div 
                onClick={() => addNotification("Node security trace: US East threat vector mitigated.", "info")}
                className="absolute top-[45%] left-[18%] cursor-pointer group z-20"
              >
                <div className="w-3 h-3 bg-os-red rounded-full animate-ping absolute" />
                <div className="w-3 h-3 bg-os-red rounded-full border border-black relative z-10" />
                <div className="absolute left-5 -top-2 bg-black/80 border border-os-red/30 px-1.5 py-0.5 rounded text-[8px] font-mono text-os-red opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  US_EAST // THREAT_SRC
                </div>
              </div>
            </div>

            {/* Interactive Threat status message */}
            <div className="absolute bottom-6 left-6 flex flex-col gap-1 bg-black/80 border border-white/5 rounded-xl p-3 z-10 font-mono text-[9px]">
              <span className="text-white/40 uppercase">THREAT PERIMETER STATUS</span>
              <span className="text-os-red font-black tracking-widest animate-pulse">DEFENSIVE MANEUVER ENGAGED</span>
            </div>

            {/* Biometric validation block */}
            <div className="absolute top-6 right-6 flex items-center gap-3 bg-black/60 border border-white/5 rounded-xl p-3 z-10">
              <div className="w-8 h-8 rounded-lg bg-os-cyan/10 border border-os-cyan/30 flex items-center justify-center text-os-cyan animate-pulse">
                <Lock size={14} className="glow-cyan" />
              </div>
              <div className="flex flex-col font-mono text-[8px]">
                <span className="text-white/40 uppercase">ENCRYPTION PROTOCOL</span>
                <span className="text-white font-bold">ARC-KEY_4096_ON</span>
              </div>
            </div>
          </div>

          {/* Network traffic logs console at bottom (Image 3 Bottom part) */}
          <div className="p-5 border-t border-white/5 bg-black/40 flex flex-col gap-3 font-mono">
            <div className="flex justify-between items-center text-[9px]">
              <span className="text-white/40 uppercase font-bold">NETWORK TRAFFIC LOGS</span>
              <span className="text-os-cyan font-bold">SECURE_SOCKET_TUNNEL</span>
            </div>
            <div className="bg-black/80 border border-white/5 p-3 rounded-lg h-24 overflow-y-auto text-[9px] text-white/70 space-y-1.5 custom-scrollbar">
              {logs.map((log, idx) => (
                <div key={idx} className={idx === 0 ? "text-os-cyan animate-pulse" : "text-white/60"}>
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebars: Encryption metrics (4/12) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-5">
          
          {/* Panel 1: Encryption integrity ring chart (Image 3) */}
          <div className="border-glass p-6 rounded-2xl bg-black/40 backdrop-blur-xl flex flex-col gap-4">
            <h4 className="text-[10px] font-bold uppercase font-mono tracking-widest text-white/50 flex items-center gap-2">
              <Activity size={14} className="text-os-cyan" />
              ENCRYPTION INTEGRITY
            </h4>

            <div className="relative py-4 flex flex-col items-center justify-center">
              {/* Circular SVG percentage indicator ring */}
              <svg className="w-32 h-32 transform -rotate-90">
                <circle cx="64" cy="64" r="54" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="6" />
                <motion.circle 
                  cx="64" 
                  cy="64" 
                  r="54" 
                  fill="none" 
                  stroke="#E23636" 
                  strokeWidth="6"
                  strokeDasharray="339.29"
                  initial={{ strokeDashoffset: 339.29 }}
                  animate={{ strokeDashoffset: 3.39 }} // 99.9%
                  transition={{ duration: 2, ease: "easeOut" }}
                  style={{ filter: "drop-shadow(0 0 6px #E23636)" }}
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-black text-white font-sans tracking-tighter">99.9%</span>
                <span className="text-[8px] font-mono text-os-cyan/60 tracking-widest uppercase">ENCRYPTED</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center text-[9px] font-mono pt-2 border-t border-white/5 bg-white/[0.01] rounded-lg p-2">
              <div>
                <p className="text-white/30 uppercase font-bold">ALGORITHM</p>
                <p className="text-white font-bold mt-0.5">AES_256_GCM</p>
              </div>
              <div>
                <p className="text-white/30 uppercase font-bold">KEY STATE</p>
                <p className="text-os-cyan font-bold mt-0.5">ROTATED_05M</p>
              </div>
            </div>
          </div>

          {/* Panel 2: Firewall load progress bars (Image 3) */}
          <div className="flex-1 border-glass p-6 rounded-2xl bg-black/40 backdrop-blur-xl flex flex-col gap-5">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h4 className="text-[10px] font-bold uppercase font-mono tracking-widest text-white/50 flex items-center gap-2">
                <Cpu size={14} className="text-os-cyan" />
                FIREWALL LOAD
              </h4>
              <span className="text-[9px] font-mono text-os-red font-bold animate-pulse">CRITICAL</span>
            </div>

            <div className="space-y-4 flex-1 flex flex-col justify-center font-mono">
              {[
                { name: 'US_EAST GATEWAY', val: 88, color: 'bg-os-red shadow-[0_0_8px_#E23636]' },
                { name: 'EU_WEST SHIELD', val: 34, color: 'bg-os-cyan' },
                { name: 'ASIA_PACIFIC HUB', val: 92, color: 'bg-os-red shadow-[0_0_8px_#E23636] animate-pulse' },
                { name: 'LATAM TUNNEL', val: 12, color: 'bg-white/40' }
              ].map((fw, i) => (
                <div key={i} className="space-y-1.5 cursor-pointer group" onClick={() => addNotification(`Calibrating firewall route for ${fw.name}...`, "info")}>
                  <div className="flex justify-between text-[8px] text-white/40 uppercase font-bold group-hover:text-white transition-colors">
                    <span>{fw.name}</span>
                    <span>{fw.val}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5 p-px">
                    <motion.div 
                      className={`h-full rounded-full ${fw.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${fw.val}%` }}
                      transition={{ duration: 1.5, delay: i * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Downloader Button (Image 3 Asset download) */}
            <button 
              onClick={() => addNotification("Securing asset recovery package: SECURE_ENCRYPTED_LOGS_BUNDLE.RAW. Download initiated...", "info")}
              className="w-full py-3 bg-os-cyan/10 hover:bg-os-cyan/20 border border-os-cyan/40 hover:border-os-cyan text-os-cyan text-[10px] font-mono font-black uppercase tracking-[0.2em] rounded-xl transition-all shadow-[0_0_10px_rgba(226,54,54,0.15)] flex items-center justify-center gap-2 mt-auto cursor-pointer"
            >
              <Download size={13} className="animate-bounce" />
              SECURE ASSET RECOVERY: SECURE_ENCRYPTED_LOGS_BUNDLE.RAW
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
