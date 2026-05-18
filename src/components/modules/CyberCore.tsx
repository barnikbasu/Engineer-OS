import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Lock, Monitor, ShieldAlert, Cpu } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';

export const CyberCore: React.FC = () => {
  const [glitchText, setGlitchText] = useState("ENCRYPTION_LAYER_01_ACTIVE");
  const { addNotification } = useOSStore();

  useEffect(() => {
    const interval = setInterval(() => {
      const texts = ["ENCRYPTION_LAYER_01_ACTIVE", "THREAT_DETECTED_SECTOR_4", "DECRYPTING_NEURAL_BUS", "BYPASSING_FIREWALL_7", "SECURE_PROTOCOL_INIT"];
      setGlitchText(texts[Math.floor(Math.random() * texts.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden text-[#00ffc6]">
      <div className="flex items-center justify-between border-b border-[#00ffc6]/20 pb-4">
        <div className="flex items-center gap-4">
          <div 
            onClick={() => addNotification("Security core integrity: 100%", "info")}
            className="p-3 bg-[#00ffc6]/10 border border-[#00ffc6]/30 rounded-lg cursor-pointer hover:bg-[#00ffc6]/20 transition-all font-bold"
          >
            <Shield size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white uppercase italic">Cyber Security Division</h2>
            <p className="text-[10px] font-mono tracking-[0.2em]">{glitchText}</p>
          </div>
        </div>
        <div className="flex gap-4">
            <div 
              onClick={() => addNotification("Analyzing intrusion signature. Origin: DARK_NET_ROUTER_04", "warn")}
              className="bg-os-red/10 border border-os-red/20 px-4 py-2 rounded text-[10px] font-mono text-os-red animate-pulse flex items-center gap-2 cursor-pointer hover:bg-os-red/20 transition-all font-bold"
            >
               <ShieldAlert size={14} />
               INTRUSION_ATTEMPT_BLOCKED
            </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
        <div className="col-span-12 lg:col-span-8 border border-[#00ffc6]/10 rounded-2xl relative overflow-hidden bg-black/40 backdrop-blur-xl">
           {/* Matrix Code Rain Simulation */}
           <div className="absolute inset-0 opacity-20 pointer-events-none flex justify-around overflow-hidden">
             {[...Array(20)].map((_, i) => (
               <motion.div 
                 key={i}
                 className="w-px h-full bg-gradient-to-b from-[#00ffc6] to-transparent"
                 animate={{ y: ['-100%', '100%'] }}
                 transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, ease: 'linear', delay: Math.random() * 2 }}
               />
             ))}
           </div>

           <div className="relative h-full p-8 flex flex-col">
              <div className="flex justify-between items-start mb-12">
                 <div className="space-y-1">
                    <h3 className="text-xs font-bold uppercase tracking-widest opacity-60">Global Threat Monitoring</h3>
                    <div className="flex gap-2">
                       <span 
                         onClick={() => addNotification("Node EU status check: STABLE", "info")}
                         className="text-[10px] font-mono bg-[#00ffc6]/10 px-2 py-0.5 rounded cursor-pointer hover:bg-[#00ffc6]/30 transition-all font-bold"
                       >
                         EU_NODE: STANDBY
                       </span>
                       <span 
                         onClick={() => addNotification("Node US status check: ACTIVE_LOAD", "info")}
                         className="text-[10px] font-mono bg-[#00ffc6]/10 px-2 py-0.5 rounded cursor-pointer hover:bg-[#00ffc6]/30 transition-all font-bold"
                       >
                         US_NODE: ACTIVE
                       </span>
                       <span 
                         onClick={() => addNotification("AS_NODE under heavy DDoS pressure. Scaling mitigation...", "warn")}
                         className="text-[10px] font-mono bg-os-red/20 px-2 py-0.5 rounded text-os-red animate-pulse cursor-pointer hover:bg-os-red/40 transition-all font-bold"
                       >
                         AS_NODE: HIGH_LOAD
                       </span>
                    </div>
                 </div>
                 <div className="text-right">
                    <p className="text-[8px] opacity-40 uppercase tracking-widest font-bold">Uptime</p>
                    <p className="text-xl font-black italic tracking-tighter">999:24:12</p>
                 </div>
              </div>

              <div className="flex-1 flex items-center justify-center relative">
                 <div className="absolute w-64 h-64 border border-[#00ffc6]/10 rounded-full animate-spin-slow opacity-20" />
                 <div className="absolute w-80 h-80 border border-[#00ffc6]/10 rounded-full animate-spin-reverse-slow opacity-10" />
                 <div className="relative z-10 flex flex-col items-center">
                    <div 
                      onClick={() => addNotification("Biometric handprint required for Master Key access.", "warn")}
                      className="w-24 h-24 rounded-2xl bg-[#00ffc6]/5 border border-[#00ffc6]/20 flex items-center justify-center relative group cursor-pointer hover:bg-[#00ffc6]/10 transition-all shadow-[0_0_15px_rgba(0,255,198,0.1)] hover:shadow-[0_0_25px_rgba(0,255,198,0.2)]"
                    >
                       <Lock size={48} className="text-[#00ffc6] group-hover:scale-110 transition-transform" />
                       <div className="absolute -top-1 -right-1 w-4 h-4 bg-os-red rounded-full flex items-center justify-center text-[8px] font-bold text-white border-2 border-black">!</div>
                    </div>
                    <span className="mt-6 text-[10px] font-mono font-bold tracking-[0.4em] opacity-40">ENCRYPTION_MASTER_KEY</span>
                 </div>
              </div>

              <div className="mt-auto grid grid-cols-4 gap-6 pt-6 border-t border-[#00ffc6]/10">
                 {[
                   { l: 'Packets/s', v: '124,092' },
                   { l: 'Bitrate', v: '8.4 Gbps' },
                   { l: 'Dropped', v: '0.001%' },
                   { l: 'Latency', v: '4ms' }
                 ].map((stat, i) => (
                   <div key={i}>
                      <p className="text-[8px] opacity-40 uppercase font-bold mb-1">{stat.l}</p>
                      <p className="text-xs font-mono font-bold">{stat.v}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
           <div className="border border-[#00ffc6]/10 p-6 rounded-2xl bg-black/40 backdrop-blur-xl flex flex-col gap-4">
              <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-60 flex items-center gap-2">
                <Monitor size={14} />
                Network Map
              </h4>
              <div className="h-48 relative border border-[#00ffc6]/10 rounded-lg overflow-hidden p-4 bg-black/20">
                 <div className="absolute inset-0 bg-[#00ffc6]/5 opacity-20 animate-pulse" />
                 {[...Array(8)].map((_, i) => (
                    <motion.div 
                      key={i}
                      onClick={() => addNotification(`Tracing node ${i}... Connection stable.`, "info")}
                      className="absolute w-2 h-2 bg-[#00ffc6] rounded-full shadow-[0_0_10px_rgba(0,255,198,0.5)] cursor-pointer hover:scale-150 transition-all z-20"
                      style={{ top: `${Math.random() * 80 + 10}%`, left: `${Math.random() * 80 + 10}%` }}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                    />
                 ))}
                 <div className="text-[8px] font-mono opacity-20 absolute bottom-2 right-2 uppercase tracking-widest font-bold">Tracing_Packets...</div>
              </div>
           </div>

           <div className="flex-1 border border-[#00ffc6]/10 p-6 rounded-2xl bg-black/40 backdrop-blur-xl flex flex-col gap-4">
              <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-60 flex items-center gap-2">
                <Cpu size={14} />
                Neural Log Feed
              </h4>
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar flex flex-col font-mono">
                 {[...Array(10)].map((_, i) => (
                   <div 
                     key={i} 
                     onClick={() => addNotification(`Log entry ${i} detailed view requested.`, "info")}
                     className="text-[9px] font-mono leading-tight p-2 rounded bg-[#00ffc6]/5 border border-[#00ffc6]/10 cursor-pointer hover:bg-[#00ffc6]/10 hover:border-[#00ffc6]/30 transition-all"
                   >
                      <span className="opacity-40">[{Math.random().toString(36).substring(7).toUpperCase()}]</span> Connection from node_81.42.10.3 restricted by policy 04.
                   </div>
                 ))}
              </div>
              <button 
                onClick={() => addNotification("EMERGENCY SYSTEM LOCKDOWN ENGAGED. ALL ACCESS REVOKED.", "warn")}
                className="w-full py-2 bg-[#00ffc6]/10 border border-[#00ffc6]/20 rounded-lg text-[#00ffc6] text-[10px] font-bold uppercase tracking-widest hover:bg-os-red/20 hover:border-os-red/40 hover:text-os-red transition-all active:scale-95 shadow-[0_0_15px_rgba(0,255,198,0.1)] hover:shadow-[0_0_20px_rgba(255,59,48,0.2)]"
              >
                 System Lockdown
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};
