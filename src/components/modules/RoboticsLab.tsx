import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Zap, Activity, Shield } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';
import { TechnicalBlueprintSuit } from './TechnicalBlueprintSuit';

export const RoboticsLab: React.FC = () => {
  const { addNotification, toggleDiagnostic } = useOSStore();

  const handleInitDiagnostic = () => {
    addNotification("Initiating robotics diagnostic...", "info");
    toggleDiagnostic(true);
    setTimeout(() => {
      toggleDiagnostic(false);
      addNotification("Robotics systems: OPTIMAL", "info");
    }, 4000);
  };

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden">
      <div className="flex items-center justify-between border-b border-os-cyan/20 pb-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-os-cyan/10 border border-os-cyan/30 rounded-lg text-os-cyan">
            <Cpu size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white uppercase italic">Mecha & Robotics Lab</h2>
            <p className="text-[10px] text-os-cyan/40 font-mono tracking-[0.2em] font-bold">NEURAL_SYNC_OPTIMIZED // MK-LV.7_INIT</p>
          </div>
        </div>
        <div className="flex gap-4">
           {['HELMET', 'TORSO', 'GAUNTLETS'].map(label => (
             <div 
               key={label} 
               onClick={() => addNotification(`Recalibrating ${label} servos...`, "info")}
               className="border-glass px-4 py-2 rounded-lg flex flex-col items-center cursor-pointer hover:bg-os-cyan/5 transition-all min-w-[80px]"
             >
                <span className="text-[8px] text-white/40 uppercase mb-1 font-bold">{label}</span>
                <span className="text-xs font-black text-os-cyan glow-cyan italic">SYNC_100%</span>
             </div>
           ))}
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
        {/* Schematic Area */}
        <div className="col-span-8 h-full relative border-glass rounded-2xl overflow-hidden p-4">
           <TechnicalBlueprintSuit />
           
           <div className="absolute bottom-6 left-6 grid grid-cols-2 gap-4 pointer-events-none z-20">
               <div className="flex flex-col">
                  <span className="text-[8px] text-white/40 uppercase font-bold">Servo Temp</span>
                  <span className="text-lg font-black text-os-orange italic tracking-tighter glow-orange">32.4°C</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-[8px] text-white/40 uppercase font-bold">Torque Load</span>
                  <span className="text-lg font-black text-os-cyan italic tracking-tighter glow-cyan">0.14 Nm</span>
               </div>
            </div>
        </div>

        {/* Right Info Column */}
        <div className="col-span-4 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar font-mono">
           <div className="border-glass p-4 rounded-xl space-y-4 bg-black/20">
              <div className="flex items-center gap-2">
                 <Activity size={14} className="text-os-cyan" />
                 <h4 className="text-[10px] font-bold uppercase tracking-widest text-os-cyan/80">Neural Mapping</h4>
              </div>
              <div className="space-y-2">
                 {[...Array(4)].map((_, i) => (
                    <div 
                      key={i} 
                      onClick={() => addNotification(`Optimizing Neural Layer ${i+1}...`, "info")}
                      className="flex flex-col gap-1 cursor-pointer group"
                    >
                       <div className="flex justify-between text-[8px] text-white/40 uppercase group-hover:text-white transition-colors">
                          <span>Layer_{i+1}</span>
                          <span>Sync: {85 + i * 3}%</span>
                       </div>
                       <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                             className="h-full bg-os-cyan/40 group-hover:bg-os-cyan transition-colors"
                             initial={{ width: 0 }}
                             animate={{ width: `${85 + i * 3}%` }}
                             transition={{ duration: 1, delay: i * 0.2 }}
                          />
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="border-glass p-4 rounded-xl space-y-4 flex-1 bg-black/20">
              <div className="flex items-center gap-2">
                 <Shield size={14} className="text-os-cyan" />
                 <h4 className="text-[10px] font-bold uppercase tracking-widest text-os-cyan/80">Component Health</h4>
              </div>
              <div className="grid grid-cols-2 gap-2">
                 {[
                   { n: 'CPU_CORE', s: '98%' },
                   { n: 'ACTUATORS', s: '100%' },
                   { n: 'MEM_BUFFER', s: '74%' },
                   { n: 'SYNC_BUS', s: '99%' }
                 ].map((c, i) => (
                    <div 
                      key={i} 
                      onClick={() => addNotification(`Checking health of module ${c.n}`, "info")}
                      className="bg-white/5 p-3 rounded-lg border border-white/5 hover:border-os-cyan/30 transition-all cursor-pointer group"
                    >
                       <p className="text-[8px] text-white/40 uppercase group-hover:text-os-cyan/60">{c.n}</p>
                       <p className="text-sm font-bold text-os-cyan">{c.s}</p>
                    </div>
                 ))}
              </div>
              <div className="pt-4 border-t border-white/5 mt-auto">
                 <button 
                   onClick={handleInitDiagnostic}
                   className="w-full py-2 bg-os-cyan/10 border border-os-cyan/30 rounded-lg text-os-cyan text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-os-cyan/20 transition-all active:scale-95"
                 >
                    Initialize Full Diagnostic
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
