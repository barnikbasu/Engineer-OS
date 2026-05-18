import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, ContactShadows } from '@react-three/drei';
import { useOSStore, OSModule } from '../../store/useOSStore';
import { ArcReactor } from '../three/ArcReactor';
import { AICommand } from '../modules/AICommand';
import { RoboticsLab } from '../modules/RoboticsLab';
import { AerospaceHub } from '../modules/AerospaceHub';
import { PhysicsLab } from '../modules/PhysicsLab';
import { CyberCore } from '../modules/CyberCore';
import { F1Telemetry } from '../modules/F1Telemetry';
import { KnowledgeDB } from '../modules/KnowledgeDB';
import { 
  Hexagon, 
  Cpu, 
  Rocket, 
  Wind, 
  Monitor, 
  Zap, 
  BookOpen, 
  Settings,
  Bell,
  Activity,
  Maximize2,
  Lock,
  Wifi,
  Radio,
  Dna,
  ShieldAlert
} from 'lucide-react';

// Placeholder for unindexed modules
const ModulePlaceholder: React.FC<{ title: string; icon: React.ReactNode }> = ({ title, icon }) => (
  <div className="flex flex-col gap-6 h-full">
    <div className="flex items-center gap-4 border-b border-os-cyan/20 pb-4">
      <div className="p-3 bg-os-cyan/10 border border-os-cyan/30 rounded-lg text-os-cyan">
        {icon}
      </div>
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white uppercase italic">{title}</h2>
        <p className="text-[10px] text-os-cyan/40 font-mono tracking-[0.2em]">OPERATIONAL_UNIT_ONLINE</p>
      </div>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
       {[...Array(6)].map((_, i) => (
         <div key={i} className="border-glass p-4 rounded-xl hover:bg-os-cyan/5 transition-colors group cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center -translate-y-1/4 translate-x-1/4 rotate-45 bg-os-cyan/20 font-mono text-[8px] text-os-cyan">V-{i}</div>
            <p className="text-[10px] text-os-cyan/60 font-mono mb-2">SYSTEM_VAR_{i+1024}</p>
            <div className="flex items-center justify-between">
                <span className="text-lg font-black italic">MODE_{i % 2 === 0 ? 'ALPHA' : 'STABLE'}</span>
                <Maximize2 size={12} className="text-os-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                 className="h-full bg-os-cyan/50"
                 animate={{ width: `${Math.random() * 100}%` }}
                 transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                />
            </div>
         </div>
       ))}
    </div>
  </div>
);

const MODULE_DATA: Record<OSModule, { title: string; icon: any }> = {
  BOOT: { title: "Boot", icon: Hexagon },
  AI_COMMAND: { title: "AI Command Center", icon: Hexagon },
  ROBOTICS: { title: "Robotics Lab", icon: Cpu },
  AEROSPACE: { title: "Aerospace Hub", icon: Rocket },
  F1_TELEMETRY: { title: "F1 Telemetry", icon: Wind },
  CYBER_CORE: { title: "Cyber Security Core", icon: Monitor },
  PHYSICS_LAB: { title: "Physics Lab", icon: Zap },
  KNOWLEDGE_DB: { title: "Knowledge Database", icon: BookOpen }
};

const MODULE_COMPONENTS: Record<OSModule, React.FC | null> = {
  AI_COMMAND: AICommand,
  ROBOTICS: RoboticsLab,
  AEROSPACE: AerospaceHub,
  PHYSICS_LAB: PhysicsLab,
  CYBER_CORE: CyberCore,
  F1_TELEMETRY: F1Telemetry,
  KNOWLEDGE_DB: KnowledgeDB,
  BOOT: null,
};

export const Shell: React.FC = () => {
  const { currentModule, setModule, addNotification, notifications, removeNotification, isDiagnosticRunning, toggleDiagnostic } = useOSStore();

  const handleDiagnostic = () => {
    if (isDiagnosticRunning) return;
    toggleDiagnostic(true);
    addNotification("Initiating Full System Deep Scan...", "info");
    setTimeout(() => {
      toggleDiagnostic(false);
      addNotification("System Scan Complete. 0 Anomalies Found.", "info");
    }, 5000);
  };
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-screen w-screen bg-os-bg flex flex-col font-sans selection:bg-os-cyan selection:text-os-bg">
      {/* Diagnostic Overlay */}
      <AnimatePresence>
        {isDiagnosticRunning && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] pointer-events-none border-[20px] border-os-cyan/20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-8">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-64 h-64 border-2 border-dashed border-os-cyan rounded-full flex items-center justify-center"
              >
                <div className="w-48 h-48 border border-os-cyan/30 rounded-full flex items-center justify-center animate-pulse">
                  <div className="text-os-cyan text-4xl font-black italic">SCANNING</div>
                </div>
              </motion.div>
              <div className="w-96 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "easeInOut" }}
                  className="h-full bg-os-cyan shadow-[0_0_20px_rgba(0,242,255,0.8)]"
                />
              </div>
            </div>
            
            <div className="absolute top-10 left-10 text-os-cyan text-xs font-mono">ENCRYPTED_SCAN_INITIALIZED</div>
            <div className="absolute bottom-10 right-10 text-os-cyan text-xs font-mono">SECTOR_ANALYSIS: {Math.floor(Math.random() * 100)}%</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notifications Portal */}
      <div className="fixed bottom-12 right-6 z-[110] flex flex-col gap-3 w-80 pointer-events-none">
        <AnimatePresence>
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className={`p-4 rounded-xl border border-white/10 pointer-events-auto flex items-start gap-4 backdrop-blur-2xl shadow-2xl ${
                n.type === 'error' ? 'border-os-red/40 bg-os-red/10' :
                n.type === 'warn' ? 'border-os-orange/40 bg-os-orange/10' :
                'border-os-cyan/40 bg-os-cyan/10'
              }`}
            >
              <div className={n.type === 'error' ? 'text-os-red' : n.type === 'warn' ? 'text-os-orange' : 'text-os-cyan'}>
                {n.type === 'error' || n.type === 'warn' ? <ShieldAlert size={20} /> : <Activity size={20} />}
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-mono leading-tight">{n.message}</p>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  removeNotification(n.id);
                }} 
                className="text-white/40 hover:text-white transition-colors"
              >
                <div className="h-4 w-4 flex items-center justify-center">×</div>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Top Navigation Bar */}
      <nav className="h-16 border-b border-white/5 bg-os-bg/80 backdrop-blur-xl flex items-center justify-between px-8 z-40">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setModule('AI_COMMAND')}>
             <div className="w-10 h-10 border border-os-cyan/30 rounded-lg flex items-center justify-center bg-os-cyan/10 group-hover:bg-os-cyan/20 transition-colors">
                <Hexagon className="text-os-cyan glow-cyan" size={24} />
             </div>
             <div className="flex flex-col">
                <span className="font-black italic text-lg leading-none tracking-tight font-sans">ENGINEER OS</span>
                <span className="text-[8px] text-os-cyan tracking-[0.3em] font-mono leading-none mt-1 uppercase font-bold">ARC-SYS_4.2.0 // STARK_INDUSTRIES</span>
             </div>
          </div>
          
          <div className="h-8 w-px bg-white/10 mx-2" />
          
          <div className="flex gap-1 overflow-x-auto no-scrollbar max-w-4xl">
             {Object.entries(MODULE_DATA).filter(([key]) => key !== 'BOOT').map(([key, data]) => (
               <button
                 key={key}
                 onClick={() => setModule(key as OSModule)}
                 className={`px-4 h-10 rounded-lg flex items-center gap-2 transition-all shrink-0 group relative ${
                   currentModule === key 
                    ? 'bg-os-cyan/10 text-os-cyan border border-os-cyan/20' 
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                 }`}
               >
                 <data.icon size={16} />
                 <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em] hidden xl:block">{data.title}</span>
                 {currentModule === key && (
                   <motion.div 
                     layoutId="nav-glow"
                     className="absolute -bottom-px left-0 right-0 h-px bg-os-cyan shadow-[0_0_10px_#00f2ff]"
                   />
                 )}
               </button>
             ))}
          </div>
        </div>

        <div className="flex items-center gap-8">
           <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex flex-col items-end">
                 <span className="text-os-cyan glow-cyan flex items-center gap-2">
                   <Wifi size={10} className="animate-pulse" />
                   AI_CORE_LINK: ACTIVE
                 </span>
                 <span className="text-[10px] text-white/40 uppercase">Latency: 12ms</span>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="flex flex-col items-end">
                 <span className="text-[10px] text-white/40 uppercase">{time.toLocaleDateString()}</span>
                 <span className="text-lg font-bold tabular-nums">
                    {time.toLocaleTimeString([], { hour12: false })}
                 </span>
              </div>
           </div>
           
           <div className="flex gap-3">
              <button 
                onClick={() => addNotification("New message: Orbital alignment confirmed for satellite link ARC-09.", "info")}
                className="w-10 h-10 border-glass rounded-full flex items-center justify-center hover:bg-white/10 transition-colors relative"
              >
                 <Bell size={18} />
                 <div className="absolute top-2 right-2 w-2 h-2 bg-os-red rounded-full animate-ping" />
              </button>
              <button 
                onClick={handleDiagnostic}
                className="w-10 h-10 border-glass rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-os-cyan"
              >
                 <Activity size={18} />
              </button>
              <button 
                onClick={() => addNotification("SYSTEM_LOCKDOWN: Encryption layers engaged.", "error")}
                className="w-10 h-10 border-glass rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-os-orange"
              >
                 <Lock size={18} />
              </button>
           </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex gap-4 p-4 min-h-0 relative overflow-hidden">
        {/* Background Visual (3D - Arc Reactor Core) */}
        <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <ContactShadows opacity={1} scale={10} blur={1} far={10} resolution={256} color="#000000" />
            <ArcReactor />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>

        {/* Left Stats Sidebar */}
        <div className="hidden lg:flex w-80 flex-col gap-4 z-10">
           <section className="os-panel p-6 flex flex-col gap-6">
              <div className="flex justify-between items-center">
                 <h3 className="text-[10px] font-mono text-os-cyan/60 uppercase tracking-widest flex items-center gap-2 font-bold">
                   <Radio size={12} />
                   System Diagnostics
                 </h3>
                 <button onClick={handleDiagnostic} className="text-white/20 hover:text-os-cyan transition-colors">
                    <Settings size={14} />
                 </button>
              </div>
              <div className="space-y-4">
                 {[
                   { label: 'Reactor Core', val: 'OPTIMAL', color: 'text-os-cyan' },
                   { label: 'Temp', val: '42.8°C', color: 'text-os-orange' },
                   { label: 'Efficiency', val: '99.98%', color: 'text-os-cyan' },
                   { label: 'Neural Link', val: 'STABLE', color: 'text-os-cyan' },
                   { label: 'Power Grid', val: 'LOAD: 24%', color: 'text-white/60' }
                 ].map((stat, i) => (
                   <div key={i} className="flex justify-between text-xs font-mono">
                      <span className="text-white/40 uppercase font-bold">{stat.label}</span>
                      <span className={`${stat.color} font-black glow-cyan`}>{stat.val}</span>
                   </div>
                 ))}
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden flex gap-1 px-1 py-0.5">
                 {[...Array(12)].map((_, i) => (
                   <motion.div 
                     key={i} 
                     className={`flex-1 rounded-sm ${i < 10 ? 'bg-os-cyan shadow-[0_0_10px_rgba(0,242,255,0.5)]' : 'bg-white/10'}`} 
                     animate={{ opacity: [0.4, 1, 0.4] }}
                     transition={{ duration: 1.5 + Math.random(), repeat: Infinity, delay: i * 0.1 }}
                   />
                 ))}
              </div>
           </section>

           <section className="flex-1 os-panel p-6 flex flex-col overflow-hidden">
              <h3 className="text-[10px] font-mono text-os-cyan/60 uppercase tracking-widest mb-4 flex items-center gap-2 font-bold">
                <Dna size={12} />
                Neural Feed
              </h3>
              <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar text-[10px]">
                 {[...Array(12)].map((_, i) => (
                   <div key={i} className="font-mono leading-relaxed p-3 rounded-xl bg-white/5 border border-white/5 relative overflow-hidden group hover:border-os-cyan/20 transition-all cursor-pointer">
                      <div className="absolute top-0 left-0 w-1 h-full bg-os-cyan/20 group-hover:bg-os-cyan transition-all" />
                      <span className="text-os-cyan/60 block mb-1 font-bold">[{Math.floor(Math.random() * 99)}:XX:SS]</span>
                      System update: Module {MODULE_DATA[currentModule].title} synchronization locked at sector {String.fromCharCode(65 + Math.floor(Math.random() * 6))}{Math.floor(Math.random() * 9)}.
                   </div>
                 ))}
              </div>
           </section>
        </div>

        {/* Central Dynamic Module */}
        <div className="flex-1 os-panel p-8 z-10 relative">
           <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none font-mono text-[8px] tracking-[0.2em]">
              MOD_ID: {currentModule} // SECTOR_LINK_{Math.floor(Math.random() * 999)}
           </div>
           <AnimatePresence mode="wait">
              <motion.div
                key={currentModule}
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                {MODULE_COMPONENTS[currentModule] ? (
                   React.createElement(MODULE_COMPONENTS[currentModule]!)
                ) : (
                  <ModulePlaceholder 
                   title={MODULE_DATA[currentModule].title} 
                   icon={React.createElement(MODULE_DATA[currentModule].icon, { size: 24 })} 
                  />
                )}
              </motion.div>
           </AnimatePresence>
        </div>

        {/* Right HUD Widgets */}
        <div className="hidden xl:flex w-96 flex-col gap-4 z-10">
           <div className="grid grid-cols-2 gap-4">
              <div className="border-glass p-6 rounded-2xl flex flex-col gap-2 aspect-square justify-center items-center group cursor-pointer hover:bg-os-cyan/5 transition-all bg-black/40">
                 <div className="w-16 h-16 rounded-full border border-os-cyan/20 flex items-center justify-center text-os-cyan relative">
                    <div className="absolute inset-0 rounded-full border border-os-cyan animate-ping-slow opacity-10" />
                    <Activity size={32} />
                 </div>
                 <span className="text-[10px] font-mono text-white/40 uppercase mt-2 tracking-widest font-bold">Health Index</span>
                 <span className="text-3xl font-black italic tracking-tighter text-white">99.9%</span>
              </div>
              <div className="border-glass p-6 rounded-2xl flex flex-col gap-2 aspect-square justify-center items-center group cursor-pointer hover:bg-os-orange/5 transition-all bg-black/40">
                 <div className="w-16 h-16 rounded-full border border-os-orange/20 flex items-center justify-center text-os-orange relative">
                    <div className="absolute inset-0 rounded-full border border-os-orange animate-ping-slow opacity-10" />
                    <Zap size={32} />
                 </div>
                 <span className="text-[10px] font-mono text-white/40 uppercase mt-2 tracking-widest font-bold">Core Load</span>
                 <span className="text-3xl font-black italic tracking-tighter text-os-orange">MAX</span>
              </div>
           </div>

           <section className="flex-1 border-glass p-6 rounded-2xl flex flex-col gap-6 overflow-hidden bg-black/40 backdrop-blur-xl">
             <div className="flex justify-between items-center">
                <h3 className="text-[10px] font-mono text-os-cyan/60 uppercase tracking-widest">Reactor Telemetry</h3>
                <span className="flex items-center gap-2 text-[10px] font-mono text-os-cyan px-2 py-0.5 bg-os-cyan/10 rounded border border-os-cyan/20">
                  <div className="w-1.5 h-1.5 bg-os-cyan rounded-full animate-pulse" />
                  LIVE
                </span>
             </div>
             
             <div className="relative flex-1 flex flex-col items-center justify-center bg-white/2 rounded-full border border-white/5 p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.05)_0%,transparent_70%)]" />
                <div className="w-56 h-56 rounded-full border border-os-cyan/20 flex items-center justify-center relative overflow-hidden backdrop-blur-sm shadow-[0_0_50px_rgba(0,242,255,0.05)]">
                   <div className="absolute inset-0 bg-gradient-to-t from-os-cyan/10 to-transparent animate-pulse" />
                   <div className="text-os-cyan/20 absolute inset-0 flex items-center justify-center">
                      <Hexagon size={240} strokeWidth={0.5} className="animate-spin-slow rotate-12" />
                   </div>
                   <div className="z-10 flex flex-col items-center">
                      <span className="text-4xl font-black italic text-os-cyan glow-cyan tracking-tighter">ARC-01</span>
                      <span className="text-[10px] text-white/40 uppercase font-mono tracking-[0.3em]">SYNCHRONIZED</span>
                   </div>
                </div>
                <div className="mt-8 grid grid-cols-3 gap-8 w-full relative z-10 px-4">
                   {['CORES', 'PLASMA', 'SYNC'].map(label => (
                     <div key={label} className="flex flex-col items-center">
                        <div className="text-[10px] font-bold text-white/60 mb-2 uppercase tracking-tighter">{label}</div>
                        <div className="h-16 w-1.5 bg-white/5 rounded-full overflow-hidden relative border border-white/10">
                           <motion.div 
                             className="absolute bottom-0 left-0 w-full bg-os-cyan shadow-[0_0_10px_#00f2ff]"
                             animate={{ height: [`${40 + Math.random() * 50}%`, `${30 + Math.random() * 60}%`] }}
                             transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
                           />
                        </div>
                     </div>
                   ))}
                </div>
             </div>
           </section>
        </div>
      </main>

      {/* Footer / Status Bar */}
      <footer className="h-10 border-t border-white/5 bg-os-bg/95 flex items-center justify-between px-10 text-[10px] font-mono text-white/20 tracking-[0.3em] z-40 shrink-0">
        <div className="flex gap-10">
           <span className="text-os-cyan/80 font-black border-r border-white/10 pr-8 glow-cyan">STARK_SYSTEMS_ACTIVE_v4.2</span>
           <span className="hidden md:inline uppercase font-bold text-white/40">Link: <span className="text-os-cyan/60">SECURE_ENCRYPTED</span></span>
           <span className="hidden sm:inline text-os-orange font-bold animate-pulse">! REGULATOR_OFFLINE</span>
        </div>
        <div className="flex gap-10 uppercase font-black">
           <span className="hidden md:inline text-white/40">THROUGHPUT: <span className="text-white/80">4.8 PFLOPS</span></span>
           <span className="text-os-cyan/80 italic glow-cyan">NODE: ARC_MASTER_BRIDGE_01</span>
        </div>
      </footer>
    </div>
  );
};

