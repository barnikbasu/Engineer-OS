import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, ContactShadows } from '@react-three/drei';
import { useOSStore } from '../../store/useOSStore';
import { ArcReactor } from '../three/ArcReactor';
import { BlueprintDecorations } from './BlueprintDecorations';
import { 
  ComputingDashboard,
  ElectricalDashboard,
  MechanicalDashboard,
  CivilDashboard,
  ChemicalDashboard,
  LifeScienceDashboard
} from '../modules/EngineeringDashboards';
import { MasterHub } from '../modules/MasterHub';
import { RoboticsLab } from '../modules/RoboticsLab';
import { F1Telemetry } from '../modules/F1Telemetry';
import { CyberCore } from '../modules/CyberCore';
import { PhysicsLab } from '../modules/PhysicsLab';
import { AerospaceHub } from '../modules/AerospaceHub';
import { KnowledgeDB } from '../modules/KnowledgeDB';
import { TechnicalBlueprintSuit } from '../modules/TechnicalBlueprintSuit';
import { 
  Wrench, 
  LogOut, 
  Search, 
  Bell, 
  Activity, 
  Wifi, 
  CheckCircle, 
  Download, 
  ShieldAlert, 
  Cpu, 
  Settings, 
  Hexagon, 
  Shield, 
  Terminal, 
  Plus, 
  Users, 
  Sliders, 
  ChevronRight, 
  Info
} from 'lucide-react';

const SUB_DISCIPLINES: Record<string, string[]> = {
  Computing: ['CS CORE', 'DEVOPS', 'AI / ML', 'DATA SCIENCE', 'CYBERSEC', 'BLOCKCHAIN', 'VR / AR'],
  Electrical: ['ELECTRICAL CORE', 'ELECTRONICS', 'VLSI DESIGN', 'SEMICONDUCTORS', 'TELECOM', 'EMBEDDED SYS', 'SIGNAL PROC'],
  Mechanical: ['MECHANICAL', 'AUTOMOTIVE', 'AEROSPACE', 'ROBOTICS', 'MECHATRONICS', 'INDUSTRIAL', 'MANUFACTURING', 'MARINE', 'MATERIALS', 'THERMAL'],
  Civil: ['CIVIL CORE', 'STRUCTURAL', 'GEOTECHNICAL', 'TRANSPORTATION', 'WATER RES', 'URBAN PLANNING'],
  Chemical: ['CHEMICAL CORE', 'PROCESS ENG', 'PETROLEUM', 'REACTION DYNAMICS', 'THERMODYNAMICS'],
  'Life Science': ['EMERGING TECH', 'QUANTUM', 'NANO', 'RENEWABLE', 'SYSTEMS', 'FINANCIAL', 'BIOMIMETIC']
};

export const Shell: React.FC = () => {
  const setBooted = useOSStore(state => state.setBooted);
  const notifications = useOSStore(state => state.notifications);
  const addNotification = useOSStore(state => state.addNotification);
  const removeNotification = useOSStore(state => state.removeNotification);
  const isDiagnosticRunning = useOSStore(state => state.isDiagnosticRunning);
  const toggleDiagnostic = useOSStore(state => state.toggleDiagnostic);

  // Core high-fidelity active tabs and sub-disciplines
  const [activeTab, setActiveTab] = useState<'Home' | 'Computing' | 'Electrical' | 'Mechanical' | 'Civil' | 'Chemical' | 'Life Science'>('Home');
  const [activeSub, setActiveSub] = useState<string>('CS CORE');
  const [homeSection, setHomeSection] = useState<'CORE MODULES' | 'SUB-DISCIPLINES' | 'SCHEMATICS' | 'MATERIAL SPECS' | 'STRESS TESTS' | 'SIMULATION' | 'EMERGING TECH'>('CORE MODULES');

  // Sync activeSub on tab change
  useEffect(() => {
    if (activeTab !== 'Home') {
      setActiveSub(SUB_DISCIPLINES[activeTab][0]);
    }
  }, [activeTab]);

  // Command palette state
  const [showSearch, setShowSearch] = useState(false);
  const [selectedNode, setSelectedNode] = useState('FEA_STRUCTURAL');

  // Compiler state
  const [showCompiler, setShowCompiler] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [compilerProgress, setCompilerProgress] = useState(0);
  const [compilerLog, setCompilerLog] = useState('');
  const [compileSucceeded, setCompileSucceeded] = useState(false);
  const [compilerCategory, setCompilerCategory] = useState('');

  // Diagnostic deep scanning sequence trigger
  const handleDiagnostic = () => {
    toggleDiagnostic(true);
    addNotification("Diagnostic suite initiated. Scanning multidisciplinary system partitions...", "warn");
    setTimeout(() => {
      toggleDiagnostic(false);
      addNotification("All partitions nominal. Memory fragmentation 0.04% // COMPRESSED", "info");
    }, 5000);
  };

  // Compiler sequence trigger
  const startSchematicCompile = (disciplineName: string) => {
    setIsCompiling(true);
    setCompileSucceeded(false);
    setCompilerProgress(0);
    setCompilerCategory(disciplineName);
    
    addNotification(`Compiler started: Building CAD schematics for ${disciplineName}...`, "info");
    
    let currentLog = 0;
    const compileLogs = [
      "SYNCHRONIZING CAD COORDINATE SYSTEM...",
      "BUILDING FINITE ELEMENT LOAD GRIDS...",
      "RUNNING PARALLEL SOLVER ALGORITHMS...",
      "VERIFYING STRESS MATRIX INTEGRITY...",
      "WRITING OUTPUT CAD GEOMETRY BUFFERS..."
    ];
    
    const interval = setInterval(() => {
      if (currentLog < compileLogs.length) {
        setCompilerLog(compileLogs[currentLog]);
        setCompilerProgress(((currentLog + 1) / compileLogs.length) * 100);
        currentLog++;
      } else {
        clearInterval(interval);
        setIsCompiling(false);
        setCompileSucceeded(true);
        addNotification(`CAD compiler successfully exported vector package for ${disciplineName}!`, "info");
      }
    }, 1200);
  };

  return (
    <div className="h-screen w-screen bg-os-bg flex text-white font-sans selection:bg-os-cyan selection:text-os-bg overflow-hidden relative">
      
      {/* CAD Blueprint sketches texture layer */}
      <BlueprintDecorations />

      {/* Background Visual (3D Engineering Reactor Core) */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <ContactShadows opacity={1} scale={10} blur={1} far={10} resolution={256} color="#000000" />
          <ArcReactor />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* 1. LEFT SIDE NAVIGATION BAR (Image 2 Left Sidebar layout) */}
      <aside className="w-[280px] h-full bg-black/70 border-r border-white/5 flex flex-col z-40 relative select-none font-mono">
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-os-cyan/20 via-os-cyan/5 to-transparent" />
        
        {/* Branch Title Coordinate Area */}
        <div className="p-5 border-b border-white/5 flex flex-col gap-1.5 bg-white/[0.01]">
          <span className="font-display font-black text-sm tracking-wider text-white uppercase leading-none">
            BRANCH: {activeTab === 'Home' ? 'MK-85' : activeSub}
          </span>
          <span className="text-[9px] text-os-cyan tracking-[0.1em] font-mono leading-none mt-1 uppercase font-bold text-white/50">
            SECTOR-7 COORDINATES // {activeTab === 'Home' ? 'MASTER HUB' : activeTab.toUpperCase()}
          </span>
        </div>

        {/* Sub-discipline buttons list */}
        <nav className="flex-1 px-4 py-5 space-y-2.5 overflow-y-auto custom-scrollbar text-left">
          {activeTab === 'Home' ? (
            (['CORE MODULES', 'SUB-DISCIPLINES', 'SCHEMATICS', 'MATERIAL SPECS', 'STRESS TESTS', 'SIMULATION', 'EMERGING TECH'] as const).map((section) => {
              const isActive = homeSection === section;
              return (
                <button
                  key={section}
                  onClick={() => setHomeSection(section)}
                  className={`w-full px-4 h-11 rounded-xl flex items-center gap-3.5 transition-all group relative text-left cursor-pointer ${
                    isActive 
                      ? 'bg-os-cyan text-black font-black font-display shadow-[0_0_15px_rgba(226,54,54,0.35)]' 
                      : 'text-white/40 hover:text-white hover:bg-white/5 font-bold font-mono'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-black' : 'bg-white/20'}`} />
                  <span className="text-[10px] uppercase tracking-[0.15em]">{section}</span>
                </button>
              );
            })
          ) : (
            SUB_DISCIPLINES[activeTab]?.map((sub) => {
              const isActive = activeSub === sub;
              return (
                <button
                  key={sub}
                  onClick={() => {
                    setActiveSub(sub);
                  }}
                  className={`w-full px-4 h-11 rounded-xl flex items-center gap-3.5 transition-all group relative text-left cursor-pointer ${
                    isActive 
                      ? 'bg-os-cyan text-black font-black font-display shadow-[0_0_15px_rgba(226,54,54,0.35)]' 
                      : 'text-white/40 hover:text-white hover:bg-white/5 font-bold font-mono'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-black' : 'bg-white/20'}`} />
                  <span className="text-[10px] uppercase tracking-[0.15em]">{sub}</span>
                </button>
              );
            })
          )}
        </nav>

        {/* Bottom Actions and Status Card (Image 2 Bottom Left) */}
        <div className="p-6 border-t border-white/5 space-y-4 bg-white/[0.01]">
          {/* INITIATE DESIGN Coral/Salmon Button */}
          <button 
            onClick={() => {
              setShowCompiler(true);
              addNotification(`CAD schematic compilers loaded for ${activeTab} // ${activeSub}.`, "info");
            }}
            className="w-full h-12 bg-os-cyan text-black hover:bg-os-cyan/90 font-display font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl transition-all shadow-[0_0_20px_rgba(255,133,119,0.25)] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Wrench size={13} />
            INITIATE DESIGN
          </button>

          {/* Small Diagnostics & Terminal readout */}
          <div className="flex justify-between items-center text-[9px] font-mono text-white/30 pt-1 border-t border-white/5">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse shadow-[0_0_4px_rgba(74,222,128,0.5)]" />
              Diagnostics: 98.4%
            </span>
            <span 
              onClick={() => addNotification("Terminal session active. Access logs via bottom panel.", "info")}
              className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors"
            >
              Terminal [•]
            </span>
          </div>

          {/* Secure neural link power button */}
          <div className="flex justify-between items-center text-[8.5px] font-mono text-white/20 pt-1">
            <span>SECURE NEURAL LINK</span>
            <button 
              onClick={() => {
                setBooted(false);
                addNotification("System shutdown. Reboot sequence standing by.", "warn");
              }}
              className="text-white/30 hover:text-os-red transition-all cursor-pointer"
              title="Logout / Shutdown HUD"
            >
              <LogOut size={12} />
            </button>
          </div>
        </div>
      </aside>

      {/* RIGHT SIDE VIEWPORTS */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative z-10">
        
        {/* 2. TOP HEADER BAR (Image 4 Top Bar layout) */}
        <header className="h-20 border-b border-white/5 bg-os-bg/60 backdrop-blur-xl flex items-center justify-between px-8 z-30 shrink-0 select-none">
          <div className="flex items-center gap-8">
            {/* Title / Brand Stack */}
            <div 
              onClick={() => {
                setActiveTab('Home');
                setHomeSection('CORE MODULES');
                addNotification("Returned to Master Engineering Command Hub.", "info");
              }}
              className="flex flex-col text-left cursor-pointer group select-none"
              title="Return to Master Hub (Home)"
            >
              <span className="font-black tracking-[0.25em] text-[9px] font-mono text-white/40 leading-none uppercase group-hover:text-os-cyan transition-colors">MULTIDISCIPLINARY ENGINE SYSTEM</span>
              <span className="text-lg font-black tracking-tight text-white mt-1 leading-none font-display uppercase group-hover:text-white/80 transition-colors">
                ENGINEER OS <span className="text-os-cyan font-bold font-mono text-[9px] tracking-normal ml-2 bg-os-cyan/10 px-1.5 py-0.5 rounded border border-os-cyan/20">V11.0</span>
              </span>
            </div>

            <div className="h-8 w-px bg-white/10" />

            {/* Central Tabs: Computing | Electrical | Mechanical | Civil | Chemical | Life Science */}
            <div className="flex gap-6 text-[10.5px] font-display font-bold tracking-wider">
              {['Computing', 'Electrical', 'Mechanical', 'Civil', 'Chemical', 'Life Science'].map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button 
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab as any);
                    }}
                    className={`relative py-2.5 uppercase hover:text-white transition-all cursor-pointer font-bold ${isActive ? 'text-os-cyan font-black' : 'text-white/30'}`}
                  >
                    {tab}
                    {isActive && (
                      <motion.div 
                        layoutId="top-tab-active"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-os-cyan shadow-[0_0_8px_#E23636]"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right hand system items */}
          <div className="flex items-center gap-6">
            {/* Search Pill */}
            <div 
              onClick={() => setShowSearch(true)}
              className="w-56 h-9 border border-white/10 rounded-lg bg-black/40 hover:bg-black/60 transition-all px-3 flex items-center gap-2 cursor-pointer text-white/30 hover:text-white/60 relative"
            >
              <Search size={14} className="text-os-cyan" />
              <span className="text-[10px] font-mono tracking-widest">TERMINAL SEARCH...</span>
              <div className="absolute right-2 px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[8px] font-mono">⌘K</div>
            </div>

            {/* Telemetry Status info */}
            <div className="hidden md:flex flex-col items-end text-right font-mono">
              <span className="text-xs font-bold text-os-cyan flex items-center gap-1.5">
                <Wifi size={11} className="animate-pulse text-os-cyan" />
                NEURAL_LINK: ACTIVE
              </span>
              <span className="text-[8px] text-white/30 uppercase mt-0.5">LATENCY: 12ms</span>
            </div>

            <div className="h-8 w-px bg-white/10 hidden md:block" />

            {/* Actions bells & dials */}
            <div className="flex gap-2">
              <button 
                onClick={() => addNotification("Synaptic sensor alignment synchronized with orbital grid.", "info")}
                className="w-9 h-9 border border-white/10 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-all relative cursor-pointer"
              >
                <Bell size={15} />
                <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-os-red rounded-full animate-ping" />
              </button>
              <button 
                onClick={handleDiagnostic}
                className="w-9 h-9 border border-white/10 rounded-lg bg-white/5 flex items-center justify-center text-os-cyan hover:text-white hover:border-white/20 transition-all cursor-pointer"
                title="System Diagnostic"
              >
                <Activity size={15} />
              </button>
            </div>
          </div>
        </header>

        {/* 3. CENTRAL VIEWPORT AREA */}
        <main className="flex-1 p-6 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${activeSub}-${homeSection}`}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -10 }}
              transition={{ duration: 0.25 }}
              className="h-full"
            >
              {activeTab === 'Home' && (
                <MasterHub 
                  setActiveTab={setActiveTab} 
                  setActiveSub={setActiveSub} 
                  homeSection={homeSection}
                  addNotification={addNotification}
                />
              )}

              {activeTab === 'Computing' && (
                activeSub === 'CYBERSEC' ? <CyberCore /> :
                activeSub === 'DATA SCIENCE' ? <KnowledgeDB /> :
                <ComputingDashboard addNotification={addNotification} />
              )}

              {activeTab === 'Electrical' && <ElectricalDashboard addNotification={addNotification} />}

              {activeTab === 'Mechanical' && (
                activeSub === 'AUTOMOTIVE' ? <F1Telemetry /> :
                activeSub === 'AEROSPACE' ? <AerospaceHub /> :
                activeSub === 'ROBOTICS' ? <RoboticsLab /> :
                activeSub === 'MATERIALS' ? <TechnicalBlueprintSuit /> :
                <MechanicalDashboard addNotification={addNotification} />
              )}

              {activeTab === 'Civil' && <CivilDashboard addNotification={addNotification} />}

              {activeTab === 'Chemical' && <ChemicalDashboard addNotification={addNotification} />}

              {activeTab === 'Life Science' && (
                activeSub === 'QUANTUM' ? <PhysicsLab /> :
                activeSub === 'NANO' ? <TechnicalBlueprintSuit /> :
                <LifeScienceDashboard addNotification={addNotification} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* 4. FOOTER STATUS BAR */}
        <footer className="h-10 border-t border-white/5 bg-[#030304]/90 flex items-center justify-between px-8 text-[9px] font-mono text-white/30 tracking-[0.25em] shrink-0 z-30 select-none">
          <div className="flex gap-8">
            <span className="text-os-cyan/80 font-black border-r border-white/10 pr-6 glow-cyan">ENGINEERING_OS_ACTIVE_v11.0</span>
            <span className="hidden md:inline uppercase font-bold text-white/40">Link: <span className="text-os-cyan/60">SECURE_NEURAL_LINK</span></span>
            <span className="hidden sm:inline text-os-orange font-bold animate-pulse">! REGULATOR_ONLINE</span>
          </div>
          <div className="flex gap-8 uppercase font-black">
            <span className="hidden md:inline text-white/40">COMPUTE: <span className="text-white/80">14.8 PFLOPS</span></span>
            <span className="text-os-cyan/80 glow-cyan">COGNITIVE_OS_MASTER_BRIDGE</span>
          </div>
        </footer>

      </div>

      {/* 5. SEARCH PROTOCOL MODAL */}
      <AnimatePresence>
        {showSearch && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSearch(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-full max-w-xl bg-black/90 border border-os-cyan/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(255,133,119,0.2)] relative z-10 text-left font-mono"
            >
              <div className="absolute top-0 bottom-0 left-0 w-1 bg-os-cyan" />
              
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.01]">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full border border-os-cyan animate-ping opacity-30" />
                    <div className="w-5 h-5 rounded-full border-2 border-os-cyan flex items-center justify-center text-os-cyan">
                      <div className="w-2.5 h-2.5 bg-os-cyan rounded-full animate-pulse" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-black tracking-tight text-white uppercase">INITIATING SEARCH PROTOCOL...</h3>
                    <p className="text-[8px] text-white/40 font-mono tracking-widest mt-0.5">COGNITIVE SENSOR CORRELATION</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowSearch(false)}
                  className="px-3 py-1.5 border border-white/15 hover:border-os-red hover:text-os-red transition-all rounded-lg text-[9px] font-mono bg-white/5 uppercase font-bold"
                >
                  SYS.ESC
                </button>
              </div>

              <div className="px-6 py-4 border-b border-white/5 bg-black/40">
                <input 
                  autoFocus
                  placeholder="Enter semantic query or direct command identifier..." 
                  className="w-full bg-transparent text-sm font-mono placeholder:text-white/20 focus:outline-none focus:border-none text-white font-bold"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addNotification(`Search query matched: ${e.currentTarget.value}`, "info");
                      setShowSearch(false);
                    }
                  }}
                />
              </div>

              <div className="p-6 space-y-6 max-h-[350px] overflow-y-auto custom-scrollbar font-mono text-[10px]">
                <div className="space-y-3">
                  <h4 className="text-[8px] text-os-cyan tracking-[0.2em] font-bold uppercase">OPERATIONAL_CMDS</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div 
                      onClick={() => {
                        addNotification("Deployment builder initialized.", "info");
                        setShowSearch(false);
                      }}
                      className="border border-white/10 p-3.5 rounded-xl bg-white/[0.02] hover:bg-os-cyan/10 hover:border-os-cyan/30 transition-all cursor-pointer flex justify-between items-center group"
                    >
                      <div className="flex items-center gap-3">
                        <Plus size={14} className="text-white/60 group-hover:text-os-cyan" />
                        <span className="font-bold text-white/80 group-hover:text-white uppercase">DEPLOY NEW</span>
                      </div>
                      <div className="flex gap-1 text-[8px] text-white/30 group-hover:text-os-cyan/80">
                        <span className="px-1 border border-white/10 rounded">CMD</span>
                        <span className="px-1 border border-white/10 rounded">N</span>
                      </div>
                    </div>

                    <div 
                      onClick={() => {
                        addNotification("Syncing multidisciplinary team project parameters.", "info");
                        setShowSearch(false);
                      }}
                      className="border border-white/10 p-3.5 rounded-xl bg-white/[0.02] hover:bg-os-cyan/10 hover:border-os-cyan/30 transition-all cursor-pointer flex justify-between items-center group"
                    >
                      <div className="flex items-center gap-3">
                        <Users size={14} className="text-white/60 group-hover:text-os-cyan" />
                        <span className="font-bold text-white/80 group-hover:text-white uppercase">SYNC TEAM</span>
                      </div>
                      <div className="flex gap-1 text-[8px] text-white/30 group-hover:text-os-cyan/80">
                        <span className="px-1 border border-white/10 rounded">CMD</span>
                        <span className="px-1 border border-white/10 rounded">S</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[8px] text-os-orange tracking-[0.2em] font-bold uppercase">ACTIVE_DESIGN_CORES</h4>
                  <div className="space-y-2.5">
                    <div 
                      onClick={() => setSelectedNode('FEA_STRUCTURAL')}
                      className={`border p-4 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                        selectedNode === 'FEA_STRUCTURAL' 
                          ? 'border-os-cyan bg-os-cyan/10' 
                          : 'border-white/5 bg-white/[0.01] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-2 h-2 rounded-full ${selectedNode === 'FEA_STRUCTURAL' ? 'bg-os-cyan shadow-[0_0_8px_#ff8577]' : 'bg-white/20'}`} />
                        <div className="flex flex-col">
                          <span className="font-bold text-white text-xs uppercase">STRUCTURAL LOAD ANALYSIS ARCHIVE</span>
                          <span className="text-[8px] text-white/40 mt-1">FINITE ELEMENT MODEL CONVERGENCE: 98.4% // STABLE</span>
                        </div>
                      </div>
                      {selectedNode === 'FEA_STRUCTURAL' ? (
                        <span className="text-[8px] font-black tracking-widest text-os-cyan bg-os-cyan/20 px-2 py-0.5 rounded border border-os-cyan/20">
                          SELECTED
                        </span>
                      ) : (
                        <span className="text-[8px] text-white/20">STANDBY</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-white/5 bg-white/[0.01] flex justify-between text-[8px] font-mono text-white/30 tracking-widest uppercase font-black">
                <span>[ENTER] EXECUTE SELECTION</span>
                <span>[NAV] TOGGLE ARCHIVE NODES</span>
                <span className="text-os-cyan">ENGINEERING OS V.11.0.42</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5.5. BLUEPRINT COMPILER MODAL */}
      <AnimatePresence>
        {showCompiler && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { if (!isCompiling) setShowCompiler(false); }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="w-full max-w-2xl bg-[#08080c]/95 border border-os-cyan/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(255,133,119,0.2)] relative z-10 font-mono text-xs text-white text-left"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-os-cyan/15 flex items-center justify-center text-os-cyan">
                    <Wrench size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black tracking-tight text-white uppercase font-display">CAD SCHEMATICS & MODEL COMPILER</h3>
                    <p className="text-[8px] text-white/40 tracking-widest mt-0.5">{activeSub} // {activeTab.toUpperCase()}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowCompiler(false)}
                  disabled={isCompiling}
                  className="px-3 py-1.5 border border-white/15 hover:border-os-red hover:text-os-red transition-all rounded-lg text-[9px] bg-white/5 uppercase font-bold disabled:opacity-40"
                >
                  SYS.ESC
                </button>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-white/5 bg-black/40 space-y-3">
                    <span className="text-[9px] text-os-cyan tracking-wider font-bold uppercase">BUILD PARAMETERS</span>
                    
                    <div className="space-y-2 text-[10px]">
                      <div className="flex items-center justify-between p-2 rounded bg-white/[0.02] border border-white/5">
                        <span className="text-white/60">FEA STRESS MATRIX</span>
                        <span className="text-os-cyan font-bold">100% ENABLED</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded bg-white/[0.02] border border-white/5">
                        <span className="text-white/60">BOUNDING BOX VERIFIER</span>
                        <span className="text-os-cyan font-bold">ACTIVE</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded bg-white/[0.02] border border-white/5">
                        <span className="text-white/60">CALCULATION TOLERANCE</span>
                        <span className="text-os-orange font-bold">±0.0001mm</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-white/5 bg-black/40 space-y-3">
                    <span className="text-[9px] text-os-orange tracking-wider font-bold uppercase">COMPILATION METRICS</span>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] text-white/50">
                        <span>STAGE PROGRESS</span>
                        <span className="text-white font-bold font-mono">{Math.round(compilerProgress)}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <div 
                          className="h-full bg-os-cyan transition-all duration-300 shadow-[0_0_10px_#ff8577]"
                          style={{ width: `${compilerProgress}%` }}
                        />
                      </div>
                    </div>

                    <div className="p-3 rounded bg-black border border-white/10 font-mono text-[9px] text-white/60 min-h-[60px] flex items-center">
                      {isCompiling ? (
                        <div className="flex items-center gap-2 text-os-cyan">
                          <div className="w-2 h-2 rounded-full bg-os-cyan animate-ping shrink-0" />
                          <span className="animate-pulse">{compilerLog}</span>
                        </div>
                      ) : compileSucceeded ? (
                        <div className="flex items-center gap-2 text-green-400">
                          <CheckCircle size={14} className="shrink-0" />
                          <span>Build completed successfully! CAD schematic exported to buffer.</span>
                        </div>
                      ) : (
                        <span>Calibrated and standing by to execute schematic compilation.</span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => startSchematicCompile(activeSub)}
                    disabled={isCompiling}
                    className="w-full h-11 bg-os-cyan hover:bg-os-cyan/90 disabled:bg-os-cyan/30 text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isCompiling ? "COMPILING SCHEMATICS..." : "EXECUTE RE-COMPILE"}
                  </button>
                </div>

                <div className="border border-white/10 rounded-xl bg-black/60 relative overflow-hidden p-4 flex flex-col items-center justify-center min-h-[220px]">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px]" />
                  
                  {isCompiling ? (
                    <div className="text-center relative z-10 space-y-4">
                      <div className="w-12 h-12 border-2 border-dashed border-os-cyan rounded-full animate-spin mx-auto flex items-center justify-center">
                        <Cpu size={18} className="text-os-cyan" />
                      </div>
                      <p className="text-[10px] tracking-widest text-os-cyan/80 animate-pulse uppercase">SIMULATING FINITE GRID...</p>
                    </div>
                  ) : compileSucceeded ? (
                    <div className="w-full h-full relative z-10 flex flex-col justify-between">
                      <div className="flex-1 flex items-center justify-center py-2">
                        <svg viewBox="0 0 100 100" className="w-32 h-32 text-os-cyan opacity-85">
                          <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                          <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.5" />
                          <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.5" />
                          
                          <polygon points="50,25 80,42.5 80,77.5 50,95 20,77.5 20,42.5" fill="none" stroke="currentColor" strokeWidth="1" />
                          <line x1="50" y1="25" x2="50" y2="95" stroke="currentColor" strokeWidth="0.5" />
                          <line x1="20" y1="42.5" x2="50" y2="60" stroke="currentColor" strokeWidth="0.5" />
                          <line x1="80" y1="42.5" x2="50" y2="60" stroke="currentColor" strokeWidth="0.5" />
                          
                          <text x="53" y="35" className="text-[4.5px] fill-os-orange font-mono font-bold">R = 35.02mm</text>
                          <text x="24" y="55" className="text-[4.5px] fill-os-orange font-mono font-bold">θ = 120.0°</text>
                        </svg>
                      </div>

                      <div className="border-t border-white/15 pt-3 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-[8px] text-white/40 uppercase">EXPORT PAYLOAD</span>
                          <span className="text-[9px] font-bold text-white uppercase">{compilerCategory.substring(0, 15)}</span>
                        </div>
                        <button
                          onClick={() => {
                            addNotification("Schematic vector package exported successfully.", "info");
                          }}
                          className="px-2.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-os-cyan rounded flex items-center gap-1.5 text-[8px] uppercase tracking-wider font-bold transition-all text-white/80 hover:text-white cursor-pointer"
                        >
                          <Download size={10} />
                          EXPORT DWG
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center relative z-10 space-y-2">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8 text-white/20 mx-auto">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <line x1="9" y1="3" x2="9" y2="21" />
                        <line x1="15" y1="3" x2="15" y2="21" />
                      </svg>
                      <p className="text-[9px] text-white/30 tracking-wider uppercase font-bold">GRID BLUEPRINT EMPTY</p>
                      <p className="text-[8px] text-white/20 max-w-[160px] mx-auto leading-normal">Run compilation to generate interactive 2D engineering schematics.</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="px-6 py-4 border-t border-white/5 bg-white/[0.01] flex justify-between text-[8px] tracking-widest text-white/30 uppercase font-black">
                <span>STATUS: {isCompiling ? "GRID SOLVER RUNNING" : compileSucceeded ? "SUCCESS" : "CALIBRATED STANDBY"}</span>
                <span className="text-os-cyan">CAD MODULE V1.4.1</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. DIAGNOSTIC FULL DEEP SCAN OVERLAY */}
      <AnimatePresence>
        {isDiagnosticRunning && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] pointer-events-none border-[20px] border-os-cyan/20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-8">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-64 h-64 border-2 border-dashed border-os-cyan rounded-full flex items-center justify-center"
              >
                <div className="w-48 h-48 border border-os-cyan/30 rounded-full flex items-center justify-center animate-pulse bg-black/40">
                  <div className="text-os-cyan text-4xl font-black tracking-tighter uppercase font-display glow-cyan">SCANNING</div>
                </div>
              </motion.div>
              <div className="w-96 h-1.5 bg-white/10 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "easeInOut" }}
                  className="h-full bg-os-cyan shadow-[0_0_20px_rgba(255,133,119,0.8)]"
                />
              </div>
            </div>
            
            <div className="absolute top-10 left-10 text-os-cyan text-xs font-mono font-bold tracking-widest">ENCRYPTED_SCAN_INITIALIZED</div>
            <div className="absolute bottom-10 right-10 text-os-cyan text-xs font-mono font-bold tracking-widest">SECTOR_ANALYSIS: {Math.floor(Math.random() * 100)}%</div>
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
              className={`p-4 rounded-xl border pointer-events-auto flex items-start gap-4 backdrop-blur-2xl shadow-2xl text-left ${
                n.type === 'error' ? 'border-os-red/40 bg-os-red/15 text-white' :
                n.type === 'warn' ? 'border-os-orange/40 bg-os-orange/15 text-white' :
                'border-os-cyan/40 bg-os-cyan/15 text-white'
              }`}
            >
              <div className={n.type === 'error' ? 'text-os-red' : n.type === 'warn' ? 'text-os-orange' : 'text-os-cyan'}>
                <Activity size={20} className="glow-cyan text-os-cyan" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-mono leading-tight font-black uppercase tracking-wider">{n.type === 'error' ? 'CRITICAL ALERT' : n.type === 'warn' ? 'SYSTEM WARNING' : 'TELEMETRY SYNC'}</p>
                <p className="text-[10px] font-mono leading-snug mt-1 text-white/80">{n.message}</p>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  removeNotification(n.id);
                }} 
                className="text-white/40 hover:text-white transition-colors cursor-pointer"
              >
                <div className="h-4 w-4 flex items-center justify-center text-xs font-mono">×</div>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
};
