import React from 'react';
import { motion } from 'motion/react';
import { Zap, Triangle, Circle, Square } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';

export const PhysicsLab: React.FC = () => {
  const { addNotification } = useOSStore();

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden font-mono">
      <div className="flex items-center justify-between border-b border-os-cyan/20 pb-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-os-cyan/10 border border-os-cyan/30 rounded-lg text-os-cyan">
            <Zap size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white uppercase italic font-sans">Theoretical Physics Lab</h2>
            <p className="text-[10px] text-os-cyan/40 font-mono tracking-[0.2em]">QUANTUM_COHERENCE_LOCKED</p>
          </div>
        </div>
        <div className="flex gap-4">
            <div 
              onClick={() => addNotification("Quantum equation solved for N=14. No anomalies found.", "info")}
              className="border-glass px-4 py-2 rounded-lg text-xs font-bold text-os-cyan glow-cyan tracking-widest cursor-pointer hover:bg-os-cyan/5 transition-all"
            >
               ψ(x,t) = Σ cₙ φₙ(x) e⁻ⁱᴱⁿᵗ/ℏ
            </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
        <div className="col-span-8 flex flex-col gap-6">
           {/* Vector Field Visualization */}
           <div 
             onClick={() => addNotification("Singularity point re-centered. Flux density minimized.", "info")}
             className="flex-1 border-glass rounded-2xl relative overflow-hidden flex items-center justify-center cursor-crosshair group"
           >
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
              
              <div className="grid grid-cols-10 grid-rows-6 gap-8 opacity-40">
                 {[...Array(60)].map((_, i) => (
                   <motion.div 
                     key={i}
                     className="w-4 h-0.5 bg-os-cyan rounded-full origin-left"
                     animate={{ 
                        rotate: [0, 360],
                        opacity: [0.2, 0.8, 0.2]
                     }}
                     transition={{ 
                        duration: 8, 
                        repeat: Infinity, 
                        delay: (i % 10) * 0.1 + Math.floor(i / 10) * 0.1 
                     }}
                   />
                 ))}
              </div>
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                 <div className="w-16 h-16 border-2 border-os-cyan rounded-full flex items-center justify-center animate-ping-slow">
                    <div className="w-4 h-4 bg-os-cyan rounded-full glow-box-cyan" />
                 </div>
                 <span className="text-[10px] text-os-cyan mt-4 font-bold tracking-widest group-hover:glow-cyan transition-all">SINGULARITY_POINT</span>
              </div>
           </div>

           <div className="h-48 flex gap-4">
              <div className="flex-1 border-glass p-4 rounded-xl flex flex-col justify-between bg-black/20">
                 <span className="text-[10px] text-white/40 uppercase tracking-widest">WAVE_FUNCTION_STABILITY</span>
                 <div className="h-24 flex items-end gap-1">
                    {[...Array(20)].map((_, i) => (
                       <motion.div 
                         key={i}
                         className="flex-1 bg-os-cyan/30 rounded-t-sm"
                         animate={{ height: [`${Math.random() * 100}%`, `${Math.random() * 100}%`] }}
                         transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
                        />
                    ))}
                 </div>
              </div>
              <div className="w-64 border-glass p-4 rounded-xl flex flex-col gap-2 bg-black/20">
                 <span className="text-[10px] text-white/40 uppercase tracking-widest">CONSTANTS</span>
                 <div className="space-y-1 text-[10px] sm:text-xs">
                    <div 
                      onClick={() => addNotification("Applying constant c to current simulation model.", "info")}
                      className="flex justify-between border-b border-white/5 py-1 cursor-pointer hover:bg-white/5 px-1 rounded transition-all"
                    >
                       <span className="text-white/40 italic">c</span>
                       <span className="text-os-cyan">299,792,458 m/s</span>
                    </div>
                    <div 
                      onClick={() => addNotification("Gravity constant G fixed. Spacetime curvature re-calculated.", "info")}
                      className="flex justify-between border-b border-white/5 py-1 cursor-pointer hover:bg-white/5 px-1 rounded transition-all"
                    >
                       <span className="text-white/40 italic">G</span>
                       <span className="text-os-cyan">6.674×10⁻¹¹</span>
                    </div>
                    <div 
                      onClick={() => addNotification("Planck constant h active. Quantum resolution prioritized.", "info")}
                      className="flex justify-between border-b border-white/5 py-1 cursor-pointer hover:bg-white/5 px-1 rounded transition-all"
                    >
                       <span className="text-white/40 italic">h</span>
                       <span className="text-os-cyan">6.626×10⁻³⁴</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="col-span-4 flex flex-col gap-4">
           {[
             { title: 'SCHRÖDINGER_CORE', n: 'STABLE', icon: Circle },
             { title: 'HIGGS_FIELD', n: 'CONNECTED', icon: Triangle },
             { title: 'ENTROPY_INDEX', n: '0.00045', icon: Square }
           ].map((card, i) => (
             <div 
               key={i} 
               onClick={() => addNotification(`Detailed analysis of ${card.title}: OPTIMAL STATUS`, "info")}
               className="border-glass p-6 rounded-2xl flex flex-col gap-4 group hover:bg-os-cyan/5 transition-all cursor-pointer bg-black/20"
             >
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-os-cyan/10 rounded-lg text-os-cyan group-hover:bg-os-cyan/20 transition-colors">
                      <card.icon size={16} />
                   </div>
                   <h4 className="text-[10px] font-bold uppercase tracking-widest text-os-cyan/80 group-hover:text-os-cyan transition-colors">{card.title}</h4>
                </div>
                <div className="text-2xl font-black italic text-white tracking-tighter">
                   {card.n}
                </div>
                <div className="flex gap-1">
                   {[...Array(10)].map((_, j) => (
                     <div key={j} className={`h-1 flex-1 rounded-full ${j < 7 ? 'bg-os-cyan shadow-[0_0_5px_#00f2ff]' : 'bg-white/10'}`} />
                   ))}
                </div>
             </div>
           ))}
           
           <div 
             onClick={() => addNotification("Measuring spacetime strain... Calibration required in sector 7G.", "info")}
             className="flex-1 border-glass p-6 rounded-2xl relative overflow-hidden flex flex-col bg-black/20 cursor-pointer group"
           >
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-os-cyan/80 mb-4 group-hover:text-os-cyan">Space-Time Strain</h4>
              <div className="flex-1 flex items-center justify-center">
                 <motion.div 
                    className="w-32 h-32 border-2 border-os-cyan/20 rounded-full flex items-center justify-center"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity }}
                 >
                    <div className="w-16 h-16 border border-os-cyan rounded-full flex items-center justify-center animate-pulse" />
                 </motion.div>
              </div>
              <div className="text-center text-[8px] text-white/40 uppercase tracking-[0.4em] mt-4">Observational_Mode_Active</div>
           </div>
        </div>
      </div>
    </div>
  );
};
