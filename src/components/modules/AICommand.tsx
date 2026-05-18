import React from 'react';
import { motion } from 'motion/react';
import { Hexagon, Terminal, Database, ShieldCheck, Zap } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';

export const AICommand: React.FC = () => {
  const { addNotification } = useOSStore();

  return (
    <div className="h-full flex flex-col gap-8 overflow-hidden">
      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-os-cyan/20 pb-6">
        <div className="flex items-center gap-6">
           <div className="relative">
              <div className="absolute inset-0 bg-os-cyan rounded-xl animate-ping opacity-20" />
              <div 
                onClick={() => addNotification("AI Core Resynchronization initialized.", "info")}
                className="w-16 h-16 bg-os-cyan/10 border border-os-cyan/30 rounded-xl flex items-center justify-center text-os-cyan relative z-10 cursor-pointer hover:bg-os-cyan/20 transition-all"
              >
                 <Hexagon size={32} className="glow-cyan" />
              </div>
           </div>
           <div>
              <h1 className="text-4xl font-black italic tracking-tighter text-white uppercase italic">J.A.R.V.I.S COMMAND CONSOLE</h1>
              <div className="flex gap-4 mt-2">
                 <span className="text-[10px] text-os-cyan font-mono tracking-[0.2em] uppercase cursor-help hover:glow-cyan transition-all">Status: OMNI_OPTIMIZED</span>
                 <span className="text-[10px] text-white/40 font-mono tracking-[0.2em] uppercase">Auth: ENGINEER_LEVEL_0</span>
              </div>
           </div>
        </div>
        <div className="flex gap-2">
           <div 
             onClick={() => addNotification("Load balancing distributed across 12 clusters.", "info")}
             className="px-6 py-3 border-glass rounded-xl flex flex-col items-center cursor-pointer hover:bg-white/5 transition-all"
           >
              <span className="text-[8px] text-white/40 uppercase mb-1">AI CORE LOAD</span>
              <span className="text-xl font-black text-os-cyan italic tracking-tighter">14.2%</span>
           </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-8 min-h-0">
        {/* Central Visual */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
           <div className="flex-1 border-glass rounded-2xl relative overflow-hidden flex flex-col p-8 bg-[radial-gradient(circle_at_top_right,rgba(0,242,255,0.05)_0%,transparent_50%)]">
              <div className="flex justify-between items-start">
                 <div className="flex flex-col gap-2">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-os-cyan">Neural Activity</h3>
                    <p className="text-[10px] text-white/40 font-mono tracking-widest max-w-xs">Real-time visualization of AI synaptic firing across distributed compute clusters.</p>
                 </div>
                 <Database size={16} className="text-white/20" />
              </div>

              <div className="flex-1 flex flex-col justify-center items-center gap-12 relative">
                 {/* Futuristic Waveform */}
                 <div className="flex gap-3 h-24 items-center">
                    {[...Array(32)].map((_, i) => (
                       <motion.div 
                          key={i}
                          className="w-1.5 bg-os-cyan/40 rounded-full"
                          animate={{ 
                             height: [20, 60 + Math.random() * 40, 20],
                             backgroundColor: ['rgba(0,242,255,0.2)', 'rgba(0,242,255,0.6)', 'rgba(0,242,255,0.2)']
                          }}
                          transition={{ 
                             duration: 1.5, 
                             repeat: Infinity, 
                             delay: i * 0.05,
                             ease: "easeInOut"
                          }}
                       />
                    ))}
                 </div>

                 <div className="grid grid-cols-4 gap-12 w-full max-w-lg px-8">
                    {[
                       { label: 'SYNAPSE_LINK', icon: Zap },
                       { label: 'DATA_DECRYPT', icon: ShieldCheck },
                       { label: 'CORE_THREAD', icon: Terminal },
                       { label: 'LOGIC_GATE', icon: Hexagon }
                    ].map((item, i) => (
                       <div 
                         key={i} 
                         onClick={() => addNotification(`${item.label} optimization protocol engaged.`, "info")}
                         className="flex flex-col items-center gap-3 group cursor-pointer"
                       >
                          <div className="w-12 h-12 border border-white/5 rounded-full flex items-center justify-center group-hover:border-os-cyan/40 group-hover:text-os-cyan transition-all group-hover:shadow-[0_0_15px_rgba(0,242,255,0.2)]">
                             <item.icon size={18} />
                          </div>
                          <span className="text-[7px] font-mono text-white/20 uppercase tracking-widest group-hover:text-os-cyan/60 transition-colors text-center">{item.label}</span>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="absolute bottom-8 left-8 flex gap-8">
                 <div className="flex flex-col cursor-help" title="Current memory throughput">
                    <span className="text-[8px] text-white/40 uppercase tracking-widest">Memory Pool</span>
                    <span className="text-md font-bold font-mono">1.2 TB / s</span>
                 </div>
                 <div className="flex flex-col cursor-help" title="Network packets per second">
                    <span className="text-[8px] text-white/40 uppercase tracking-widest">Packet Rate</span>
                    <span className="text-md font-bold font-mono text-os-orange glow-orange">998K PPS</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
           <div className="border-glass p-6 rounded-2xl flex flex-col gap-4 bg-black/40">
              <h3 className="text-xs font-bold uppercase tracking-widest text-os-cyan">Command Terminal</h3>
              <div className="bg-black/60 border border-white/5 rounded-lg p-4 font-mono text-[10px] space-y-2 h-48 overflow-y-auto custom-scrollbar shadow-inner">
                 <div className="text-os-cyan">system@jarvis:~$ initializing_core_dump...</div>
                 <div className="text-white/60">CHECKING_INTEGRITY: [ OK ]</div>
                 <div className="text-white/60">NEURAL_NET_V4: ACTIVE</div>
                 <div className="text-white/60">LOADING_HOLOGRAPHIC_SHADERS...</div>
                 <div className="text-os-orange animate-pulse">WARNING: EXTERNAL_SATELLITE_LINK_DROPPED</div>
                 <div className="text-os-cyan">AUTO_REROUTING_VIA_REDUNDANT_MESH...</div>
                 <div className="text-white/60">CONNECTION_RE_ESTABLISHED</div>
                 <div className="text-os-cyan">system@jarvis:~$ standby_for_input__</div>
              </div>
              <div className="relative">
                 <input 
                   placeholder="Enter direct command..." 
                   onKeyDown={(e) => {
                     if (e.key === 'Enter') {
                       addNotification(`Executing command: ${e.currentTarget.value}`, "info");
                       e.currentTarget.value = "";
                     }
                   }}
                   className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-xs font-mono focus:outline-none focus:border-os-cyan/40 transition-all placeholder:text-white/10"
                 />
                 <div className="absolute right-4 top-1/2 -translate-y-1/2 text-os-cyan opacity-40 text-[10px] font-mono tracking-tighter">PRESS_ENTER</div>
              </div>
           </div>

           <div className="flex-1 border-glass p-6 rounded-2xl grid grid-cols-2 gap-4 bg-black/40">
              {[...Array(4)].map((_, i) => (
                 <div 
                   key={i} 
                   onClick={() => addNotification(`Link Cluster ${i} synchronization check: PASSED`, "info")}
                   className="bg-white/5 rounded-xl border border-white/5 p-4 flex flex-col justify-between group hover:bg-os-cyan/5 transition-all cursor-pointer hover:border-os-cyan/20"
                 >
                    <div className="flex justify-between items-center mb-4">
                       <span className="text-[8px] text-white/40 uppercase tracking-widest">Link_Cluster_{i}</span>
                       <div className="w-2 h-2 rounded-full bg-os-cyan animate-pulse shadow-[0_0_8px_#00f2ff]" />
                    </div>
                    <div className="space-y-1">
                       <div className="text-[10px] font-bold group-hover:text-os-cyan transition-colors">NODE_OPTIMAL</div>
                       <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: "30%" }}
                            animate={{ width: `${60 + Math.random() * 40}%` }}
                            transition={{ duration: 1 }}
                            className="h-full bg-os-cyan/40" 
                          />
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};
