import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useOSStore } from '../../store/useOSStore';
import { Terminal, Cpu, Database, Network, ShieldCheck } from 'lucide-react';

const BOOT_LOGS = [
  "INITIALIZING KERNEL v4.2.0-ENGINEER...",
  "SEARCHING FOR AI CORE...",
  "CORE DETECTED: J.A.R.V.I.S CLONE v9",
  "LOADING NEURAL SYNAPSE MODULES...",
  "CONNECTING TO GLOBAL RESEARCH NETWORK...",
  "ESTABLISHING SATELLITE UPLINK...",
  "CALIBRATING 3D RENDER ENGINE...",
  "SECURING BIOMETRIC DATA PATHS...",
  "REACTOR STATUS: STABLE",
  "DECRYPTING ENGINEERING PROTOCOLS...",
  "ENGINEER OS READY."
];

export const BootScreen: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const setBooted = useOSStore(state => state.setBooted);

  useEffect(() => {
    let currentLog = 0;
    const logInterval = setInterval(() => {
      if (currentLog < BOOT_LOGS.length) {
        setLogs(prev => [...prev, BOOT_LOGS[currentLog]]);
        currentLog++;
        setProgress((currentLog / BOOT_LOGS.length) * 100);
      } else {
        clearInterval(logInterval);
        setTimeout(() => setBooted(true), 1500);
      }
    }, 400);

    return () => clearInterval(logInterval);
  }, [setBooted]);

  return (
    <div className="fixed inset-0 bg-os-bg z-50 flex flex-col items-center justify-center font-mono scanlines">
      <div className="w-full max-w-2xl px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex items-center gap-4"
        >
          <div className="w-16 h-16 border-2 border-os-cyan rounded-full flex items-center justify-center animate-spin-slow">
            <Cpu className="text-os-cyan w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-os-cyan glow-cyan">ENGINEER OS</h1>
            <p className="text-xs text-os-cyan/60 uppercase tracking-widest">Advanced Research System</p>
          </div>
        </motion.div>

        <div className="space-y-1 mb-8 h-64 overflow-hidden mask-fade-top flex flex-col justify-end">
          <AnimatePresence>
            {logs.map((log, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs flex gap-2"
              >
                <span className="text-os-cyan/40">[{i.toString().padStart(2, '0')}]</span>
                <span className={i === logs.length - 1 ? 'text-os-cyan' : 'text-white/40'}>{log}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-os-cyan glow-box-cyan"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
        
        <div className="mt-4 flex justify-between text-[10px] text-os-cyan/40 uppercase tracking-widest">
          <span>Booting Subsystems...</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-12 grayscale opacity-20">
         <div className="flex flex-col items-center gap-2">
            <Database size={24} />
            <span className="text-[8px]">DATA_CORE</span>
         </div>
         <div className="flex flex-col items-center gap-2">
            <Network size={24} />
            <span className="text-[8px]">NET_LINK</span>
         </div>
         <div className="flex flex-col items-center gap-2">
            <ShieldCheck size={24} />
            <span className="text-[8px]">SEC_GATE</span>
         </div>
      </div>
    </div>
  );
};
