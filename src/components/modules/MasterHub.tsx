import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, Cpu, Wrench, Shield, Sliders, Activity, 
  Settings, Hexagon, ChevronRight, Info, Check, 
  RotateCw, RefreshCw, ZoomIn, Download, Zap, 
  Layers, Hammer, Eye, Compass, FlaskConical, Play
} from 'lucide-react';

interface MasterHubProps {
  setActiveTab: (tab: 'Computing' | 'Electrical' | 'Mechanical' | 'Civil' | 'Chemical' | 'Life Science') => void;
  setActiveSub: (sub: string) => void;
  homeSection: string;
  addNotification: (message: string, type?: 'info' | 'warn' | 'error') => void;
}

export const MasterHub: React.FC<MasterHubProps> = ({ 
  setActiveTab, 
  setActiveSub, 
  homeSection,
  addNotification 
}) => {
  // 1. CORE MODULES States & Logic
  const [computeLoad, setComputeLoad] = useState(64.2);
  const [activeEngineers, setActiveEngineers] = useState(66.2);
  const [isMetersFluctuating, setIsMetersFluctuating] = useState(true);

  useEffect(() => {
    if (!isMetersFluctuating) return;
    const timer = setInterval(() => {
      setComputeLoad(prev => {
        const delta = (Math.random() - 0.5) * 1.5;
        return Math.max(40, Math.min(95, prev + delta));
      });
      setActiveEngineers(prev => {
        const delta = (Math.random() - 0.5) * 0.8;
        return Math.max(50, Math.min(85, prev + delta));
      });
    }, 2500);
    return () => clearInterval(timer);
  }, [isMetersFluctuating]);

  // Telemetry Log Feed Ticker
  const [logs, setLogs] = useState<string[]>([
    "SEC-7: CALIBRATING HYBRID THRUSTER ARRAY CORE...",
    "NODE_LNK: ALIGNING OPTICAL TRANSDUCER MIRRORS...",
    "RE-ACTIVE FLUID FLUX FLOW ENTRAINED AT NOMINAL VELOCITY...",
    "ARC_STAB: MAINTAINING MAGNETIC CONTAINMENT FIELD MATRIX..."
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      const parts = [
        "SEC-7: RECALIBRATING GAUNTLET FLIGHT SERVO RECTIFIERS...",
        "DATA_BUS: OPTIMIZING SYNAPTIC TELEMETRY SCANRATE...",
        "reactor: PLASMATIC OVERPRESSURE REGULATED TO NOMINAL...",
        "GRID_BAL: INITIATING ENERGY DISPERSION DISSIPATIVE CYCLE...",
        "nano: NANO-SHIELD COATING DEPLOYED OVER CHASSIS MEMBERS...",
        "SEISM_DET: SUB-PLATE SHAKE CONVERGENCE SETTLED NOMINAL..."
      ];
      setLogs(prev => [parts[Math.floor(Math.random() * parts.length)], ...prev.slice(0, 3)]);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // 2. SCHEMATICS States & Logic
  const [arcPower, setArcPower] = useState(85);
  const [stabilized, setStabilized] = useState(true);
  const [plasmaReg, setPlasmaReg] = useState(true);
  const [neuralUp, setNeuralUp] = useState(false);

  const handleExportDWG = () => {
    const dataText = `ENGINEERING OS - ARC REACTOR SPECIFICATION
=========================================
STARK INDUSTRIES COGNITIVE ENGINEERING
TIMESTAMP: ${new Date().toISOString()}
MODEL DESIGNATION: ARC-REACTOR-MK85
POWER SETTING: ${arcPower}%
STABILIZER ARRAY: ${stabilized ? 'ONLINE' : 'OFFLINE'}
PLASMA REGULATORS: ${plasmaReg ? 'ENABLED' : 'DISABLED'}
NEURAL UPLINK LINK: ${neuralUp ? 'ESTABLISHED' : 'STANDBY'}
-----------------------------------------
CALCULATED OUTPUT: ${(arcPower * 14.2).toFixed(2)} GW/s
CONTAINMENT GRID: SECURE`;

    const blob = new Blob([dataText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ARC_REACTOR_DWG_BLUEPRINT.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addNotification("DWG blueprint file generated and saved to download queue.", "info");
  };

  // 3. MATERIAL SPECS States & Logic
  const [alloys, setAlloys] = useState([
    { name: 'VIBRANIUM CORE MATRIX', val: 40, baseStrength: 15 },
    { name: 'TITANIUM-GOLD COMPLEX', val: 30, baseStrength: 8 },
    { name: 'CARBON NANOTUBE WEAVE', val: 20, baseStrength: 11 },
    { name: 'ADAMANTIUM STABILIZER', val: 10, baseStrength: 18 }
  ]);

  const adjustAlloy = (index: number, delta: number) => {
    setAlloys(prev => {
      const copy = [...prev];
      const targetVal = Math.max(0, Math.min(100, copy[index].val + delta));
      const valDiff = targetVal - copy[index].val;
      copy[index].val = targetVal;
      
      // Redistribute difference to other alloys to maintain total 100%
      const otherIdxs = copy.map((_, i) => i).filter(i => i !== index);
      const share = valDiff / otherIdxs.length;
      
      otherIdxs.forEach(idx => {
        copy[idx].val = Math.max(0, copy[idx].val - share);
      });

      // Normalize total to exactly 100
      const total = copy.reduce((sum, item) => sum + item.val, 0);
      if (total > 0) {
        copy.forEach(item => {
          item.val = Math.round((item.val / total) * 100);
        });
      }
      return copy;
    });
  };

  const calculatedTensile = Math.round(
    alloys.reduce((sum, item) => sum + (item.val * item.baseStrength), 0) / 10
  );

  // 4. STRESS TESTS States & Logic
  const [feaProgress, setFeaProgress] = useState(0);
  const [isFeaSynthetic, setIsFeaSynthetic] = useState(false);
  const [feaResult, setFeaResult] = useState<'idle' | 'running' | 'converged' | 'failed'>('idle');

  const runFeaSolver = () => {
    if (isFeaSynthetic) return;
    setIsFeaSynthetic(true);
    setFeaProgress(0);
    setFeaResult('running');
    addNotification("Initializing High-Performance Finite Element Solver...", "info");

    const interval = setInterval(() => {
      setFeaProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsFeaSynthetic(false);
          setFeaResult('converged');
          addNotification("Finite Element Analysis CONVERGED: Stress margins stable.", "info");
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  // 5. SIMULATION Kinematics Canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [particleSpeed, setParticleSpeed] = useState(2);
  const [gravStrength, setGravStrength] = useState(0);
  const [particleColor, setParticleColor] = useState<'red' | 'cyan' | 'gold'>('red');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || homeSection !== 'SIMULATION') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    const particles: { x: number; y: number; vx: number; vy: number; radius: number; alpha: number }[] = [];

    // Create initial particles
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * particleSpeed,
        vy: (Math.random() - 0.5) * particleSpeed,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.5
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw background grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const step = 20;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw particles
      particles.forEach(p => {
        // Apply gravity pull to bottom center
        if (gravStrength > 0) {
          const dx = canvas.width / 2 - p.x;
          const dy = canvas.height - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          p.vx += (dx / dist) * (gravStrength * 0.05);
          p.vy += (dy / dist) * (gravStrength * 0.05);
        }

        p.x += p.vx * (particleSpeed / 2);
        p.y += p.vy * (particleSpeed / 2);

        // Bound collisions
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        const colorHex = particleColor === 'red' ? '226, 54, 54' : particleColor === 'gold' ? '255, 184, 0' : '255, 133, 119';
        ctx.fillStyle = `rgba(${colorHex}, ${p.alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = particleColor === 'red' ? '#E23636' : particleColor === 'gold' ? '#ffb800' : '#ff8577';
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      // Draw node connection lines
      ctx.strokeStyle = particleColor === 'red' ? 'rgba(226, 54, 54, 0.15)' : particleColor === 'gold' ? 'rgba(255, 184, 0, 0.15)' : 'rgba(255, 133, 119, 0.15)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 45) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animFrame);
  }, [homeSection, particleSpeed, gravStrength, particleColor]);

  // 6. EMERGING TECH experimental controls
  const [quantumStabilizedVal, setQuantumStabilizedVal] = useState(84);
  const [nanobotMode, setNanobotMode] = useState('DEFENSIVE BLOCKADE');
  const [isNanobotSweeping, setIsNanobotSweeping] = useState(false);

  const triggerNanobotSweep = () => {
    if (isNanobotSweeping) return;
    setIsNanobotSweeping(true);
    addNotification("Broadcasting localized nanobot assembly sequence...", "warn");
    setTimeout(() => {
      setIsNanobotSweeping(false);
      setQuantumStabilizedVal(100);
      addNotification("Nanobot sweep complete. Quantum field stabilized at 100.00%.", "info");
    }, 3000);
  };

  return (
    <div className="h-full w-full flex flex-col justify-between overflow-hidden">
      <AnimatePresence mode="wait">
        
        {/* =========================================
            SECTION: CORE MODULES
            ========================================= */}
        {homeSection === 'CORE MODULES' && (
          <motion.div 
            key="core"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex-1 flex flex-col justify-between"
          >
            {/* Top row with Ecosystem heading & stat card */}
            <div className="grid grid-cols-12 gap-6 items-start shrink-0 text-left select-none">
              <div className="col-span-12 md:col-span-8">
                <span className="text-[10px] text-os-cyan font-mono font-bold tracking-[0.3em] uppercase leading-none">● SYSTEM ONLINE // MASTER HUB</span>
                <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight text-white uppercase mt-2.5 leading-none">
                  ENGINEERING
                </h1>
                <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight text-os-cyan uppercase mt-1 leading-none">
                  ECOSYSTEM
                </h2>
              </div>

              {/* Status Meter Card #SYS-HUB-01 */}
              <div className="col-span-12 md:col-span-4 border border-white/5 bg-black/50 backdrop-blur-md rounded-2xl p-4.5 space-y-3 font-mono text-[10px]">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="font-bold text-white/50">#SYS-HUB-01</span>
                  <button 
                    onClick={() => {
                      setIsMetersFluctuating(prev => !prev);
                      addNotification(isMetersFluctuating ? "Stat fluctuating cycle paused." : "Real-time fluctuation resumed.", "info");
                    }}
                    className="text-os-cyan hover:text-white transition-all text-[8px] uppercase tracking-widest font-bold"
                  >
                    {isMetersFluctuating ? 'PAUSE LIVE' : 'LIVE'}
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between font-bold text-white/45">
                    <span>ACTIVE ENGINEERS</span>
                    <span className="text-white">{activeEngineers.toFixed(1)}%</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-os-cyan" style={{ width: `${activeEngineers}%` }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between font-bold text-white/45">
                    <span>COMPUTE LOAD</span>
                    <span className="text-white">{computeLoad.toFixed(1)}%</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-os-cyan" style={{ width: `${computeLoad}%` }} />
                  </div>
                </div>

                <div className="flex justify-between font-bold text-white/45">
                  <span>NETWORK INTEGRITY</span>
                  <span className="text-green-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                    99.98%
                  </span>
                </div>
              </div>
            </div>

            {/* Middle: 7-Card High-Density Mission-Control Grid */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 my-6 overflow-y-auto pr-1">
              
              {/* Card 1: Computing */}
              <div 
                onClick={() => {
                  setActiveTab('Computing');
                  setActiveSub('CS CORE');
                }}
                className="group border border-white/5 hover:border-os-cyan/30 bg-black/60 hover:bg-os-cyan/[0.02] rounded-2xl p-4.5 flex flex-col justify-between transition-all duration-300 cursor-pointer text-left relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-os-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-all" />
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[9px] text-white/30 uppercase tracking-wider">BR-CMP-01</span>
                  <span className="px-1.5 py-0.5 bg-green-400/10 border border-green-400/20 text-green-400 text-[7px] rounded uppercase tracking-wider font-bold">OPTIMAL</span>
                </div>
                <div className="my-3">
                  <h3 className="font-display font-bold text-sm tracking-wide text-white uppercase group-hover:text-os-cyan transition-colors">COMPUTING</h3>
                  <p className="text-[9.5px] font-mono text-white/40 mt-1 leading-snug">Quantum simulation clusters and neural network models.</p>
                </div>
                <div className="flex justify-between items-center border-t border-white/5 pt-2.5 text-[8.5px] font-mono text-white/30 group-hover:text-os-cyan/80">
                  <span>ACTIVE NODES: 4,102</span>
                  <ChevronRight size={10} className="transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Card 2: Electrical */}
              <div 
                onClick={() => {
                  setActiveTab('Electrical');
                  setActiveSub('ELECTRICAL CORE');
                }}
                className="group border border-white/5 hover:border-os-cyan/30 bg-black/60 hover:bg-os-cyan/[0.02] rounded-2xl p-4.5 flex flex-col justify-between transition-all duration-300 cursor-pointer text-left relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-os-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-all" />
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[9px] text-white/30 uppercase tracking-wider">BR-ELC-02</span>
                  <span className="px-1.5 py-0.5 bg-green-400/10 border border-green-400/20 text-green-400 text-[7px] rounded uppercase tracking-wider font-bold">NOMINAL</span>
                </div>
                <div className="my-3">
                  <h3 className="font-display font-bold text-sm tracking-wide text-white uppercase group-hover:text-os-cyan transition-colors">ELECTRICAL</h3>
                  <p className="text-[9.5px] font-mono text-white/40 mt-1 leading-snug">Arc reactor grid maintenance and high-voltage power.</p>
                </div>
                <div className="flex justify-between items-center border-t border-white/5 pt-2.5 text-[8.5px] font-mono text-white/30 group-hover:text-os-cyan/80">
                  <span>ACTIVE NODES: 12,850</span>
                  <ChevronRight size={10} className="transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Card 3: Mechanical */}
              <div 
                onClick={() => {
                  setActiveTab('Mechanical');
                  setActiveSub('MECHANICAL');
                }}
                className="group border border-white/5 hover:border-os-cyan/30 bg-black/60 hover:bg-os-cyan/[0.02] rounded-2xl p-4.5 flex flex-col justify-between transition-all duration-300 cursor-pointer text-left relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-os-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-all" />
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[9px] text-white/30 uppercase tracking-wider">BR-MCH-03</span>
                  <span className="px-1.5 py-0.5 bg-os-orange/10 border border-os-orange/20 text-os-orange text-[7px] rounded uppercase tracking-wider font-bold">HIGH LOAD</span>
                </div>
                <div className="my-3">
                  <h3 className="font-display font-bold text-sm tracking-wide text-white uppercase group-hover:text-os-cyan transition-colors">MECHANICAL</h3>
                  <p className="text-[9.5px] font-mono text-white/40 mt-1 leading-snug">Suit assembly protocols, chassis structure wireframes.</p>
                </div>
                <div className="flex justify-between items-center border-t border-white/5 pt-2.5 text-[8.5px] font-mono text-white/30 group-hover:text-os-cyan/80">
                  <span>ACTIVE NODES: 842</span>
                  <ChevronRight size={10} className="transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Card 4: Civil */}
              <div 
                onClick={() => {
                  setActiveTab('Civil');
                  setActiveSub('CIVIL CORE');
                }}
                className="group border border-white/5 hover:border-os-cyan/30 bg-black/60 hover:bg-os-cyan/[0.02] rounded-2xl p-4.5 flex flex-col justify-between transition-all duration-300 cursor-pointer text-left relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-os-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-all" />
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[9px] text-white/30 uppercase tracking-wider">BR-CVL-04</span>
                  <span className="px-1.5 py-0.5 bg-white/5 border border-white/10 text-white/40 text-[7px] rounded uppercase tracking-wider font-bold">STANDBY</span>
                </div>
                <div className="my-3">
                  <h3 className="font-display font-bold text-sm tracking-wide text-white uppercase group-hover:text-os-cyan transition-colors">CIVIL</h3>
                  <p className="text-[9.5px] font-mono text-white/40 mt-1 leading-snug">Smart city infrastructure and seismic stress analysis.</p>
                </div>
                <div className="flex justify-between items-center border-t border-white/5 pt-2.5 text-[8.5px] font-mono text-white/30 group-hover:text-os-cyan/80">
                  <span>ACTIVE NODES: 2,119</span>
                  <ChevronRight size={10} className="transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Card 5: Chemical */}
              <div 
                onClick={() => {
                  setActiveTab('Chemical');
                  setActiveSub('CHEMICAL CORE');
                }}
                className="group border border-white/5 hover:border-os-cyan/30 bg-black/60 hover:bg-os-cyan/[0.02] rounded-2xl p-4.5 flex flex-col justify-between transition-all duration-300 cursor-pointer text-left relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-os-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-all" />
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[9px] text-white/30 uppercase tracking-wider">BR-CHM-05</span>
                  <span className="px-1.5 py-0.5 bg-green-400/10 border border-green-400/20 text-green-400 text-[7px] rounded uppercase tracking-wider font-bold">NOMINAL</span>
                </div>
                <div className="my-3">
                  <h3 className="font-display font-bold text-sm tracking-wide text-white uppercase group-hover:text-os-cyan transition-colors">CHEMICAL</h3>
                  <p className="text-[9.5px] font-mono text-white/40 mt-1 leading-snug">Composite alloy development and refinery distillation.</p>
                </div>
                <div className="flex justify-between items-center border-t border-white/5 pt-2.5 text-[8.5px] font-mono text-white/30 group-hover:text-os-cyan/80">
                  <span>ACTIVE NODES: 564</span>
                  <ChevronRight size={10} className="transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Card 6: Life Science */}
              <div 
                onClick={() => {
                  setActiveTab('Life Science');
                  setActiveSub('EMERGING TECH');
                }}
                className="group border border-white/5 hover:border-os-cyan/30 bg-black/60 hover:bg-os-cyan/[0.02] rounded-2xl p-4.5 flex flex-col justify-between transition-all duration-300 cursor-pointer text-left relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-os-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-all" />
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[9px] text-white/30 uppercase tracking-wider">BR-BIO-06</span>
                  <span className="px-1.5 py-0.5 bg-os-cyan/15 border border-os-cyan/30 text-os-cyan text-[7px] rounded uppercase tracking-wider font-bold animate-pulse">SYNCING</span>
                </div>
                <div className="my-3">
                  <h3 className="font-display font-bold text-sm tracking-wide text-white uppercase group-hover:text-os-cyan transition-colors">LIFE SCIENCE</h3>
                  <p className="text-[9.5px] font-mono text-white/40 mt-1 leading-snug">Bio-sensor integration and synthetic organic compounds.</p>
                </div>
                <div className="flex justify-between items-center border-t border-white/5 pt-2.5 text-[8.5px] font-mono text-white/30 group-hover:text-os-cyan/80">
                  <span>ACTIVE NODES: 1,830</span>
                  <ChevronRight size={10} className="transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Card 7: Emerging Tech (Double Width) */}
              <div 
                onClick={() => {
                  setActiveTab('Life Science');
                  setActiveSub('EMERGING TECH');
                }}
                className="col-span-2 group border border-white/10 hover:border-os-cyan/40 bg-black/75 hover:bg-os-cyan/[0.03] rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer text-left relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-os-cyan/8 to-transparent opacity-0 group-hover:opacity-100 transition-all" />
                
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[9.5px] text-os-cyan font-bold uppercase tracking-wider">BR-EMG-07 // EXPERIMENTAL</span>
                  <span className="px-2 py-0.5 bg-os-cyan/25 border border-os-cyan/30 text-os-cyan text-[7.5px] rounded-md font-black uppercase tracking-widest animate-pulse">SYSTEM PRIORITY</span>
                </div>

                <div className="my-3.5 space-y-1.5">
                  <h3 className="font-display font-black text-base tracking-wider text-white uppercase group-hover:text-os-cyan transition-colors">EMERGING TECH HUB</h3>
                  <p className="text-[10px] font-mono text-white/50 leading-relaxed">Dimensional quantum fields, molecular nano-weave, biomimetic exoskeleton mechanics, and solar fusion arbitrage networks.</p>
                </div>

                <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-3 text-[9px] font-mono text-white/40 group-hover:text-os-cyan/80">
                  <div className="flex flex-col">
                    <span>PROJECTS</span>
                    <span className="font-bold text-white text-xs mt-0.5">12 CLASSIFIED</span>
                  </div>
                  <div className="flex flex-col">
                    <span>THREAT</span>
                    <span className="font-bold text-green-400 text-xs mt-0.5">LOW LEVEL</span>
                  </div>
                  <div className="flex flex-col items-end justify-center">
                    <span className="px-2 py-1 bg-os-cyan text-black rounded font-black text-[8px] uppercase tracking-wider shadow-[0_0_10px_rgba(255,133,119,0.3)]">ACCESS</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Row Telemetry bar & Metric display (Image 1 Bottom row) */}
            <div className="grid grid-cols-12 gap-5 border-t border-white/5 pt-4 shrink-0 text-left items-center select-none">
              
              {/* Telemetry log bar */}
              <div className="col-span-12 lg:col-span-9 flex items-center gap-4.5 bg-black/40 border border-white/5 p-3 rounded-xl overflow-hidden font-mono text-[9.5px]">
                <div className="w-10 h-10 border border-os-cyan/30 rounded-full flex items-center justify-center text-os-cyan shrink-0 relative animate-spin-slow">
                  <span className="absolute text-[8px] font-black">98%</span>
                  <svg className="w-full h-full text-os-cyan" viewBox="0 0 36 36">
                    <path
                      className="text-white/10"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-os-cyan"
                      strokeDasharray="98, 100"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                </div>
                
                <div className="flex-1 min-w-0">
                  <span className="text-[7.5px] text-white/30 uppercase font-black block tracking-widest">REAL-TIME TELEMETRY FEED [LOG]</span>
                  <div className="h-4.5 overflow-hidden relative mt-1">
                    <AnimatePresence mode="popLayout">
                      <motion.div 
                        key={logs[0]}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-white/75 truncate font-mono text-[9px] uppercase tracking-widest"
                      >
                        {logs[0]}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Status metric blocks */}
              <div className="col-span-12 lg:col-span-3 grid grid-cols-2 gap-4 font-mono text-[9px] tracking-wider uppercase text-white/40">
                <div className="border border-white/5 p-2 rounded-xl bg-white/[0.01]">
                  <span>CORE TEMP</span>
                  <span className="font-bold text-white text-xs block mt-0.5">42.0°C</span>
                </div>
                <div className="border border-white/5 p-2 rounded-xl bg-white/[0.01]">
                  <span>STABILITY</span>
                  <span className="font-bold text-os-cyan text-xs block mt-0.5">MAX INTEGRITY</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* =========================================
            SECTION: SUB-DISCIPLINES
            ========================================= */}
        {homeSection === 'SUB-DISCIPLINES' && (
          <motion.div 
            key="sub-disciplines"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex-1 flex flex-col justify-between h-full select-none"
          >
            <div className="text-left shrink-0">
              <span className="text-[9px] text-os-cyan font-mono font-bold tracking-[0.2em] uppercase">SYSTEM ATLAS</span>
              <h2 className="text-2xl font-display font-black tracking-tight text-white uppercase mt-1">
                ENGINEERING BRANCH ARCHITECTURE
              </h2>
              <p className="text-[10px] font-mono text-white/45 mt-1 leading-relaxed">
                Direct access routing gateways mapped for all thirty-six operational sub-disciplinary branches.
              </p>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-5 my-6 overflow-y-auto pr-1">
              
              {/* Box 1: Digital / Computing */}
              <div className="border border-white/5 bg-black/60 rounded-2xl p-5 space-y-4 text-left">
                <span className="px-2 py-0.5 bg-os-cyan/15 border border-os-cyan/30 text-os-cyan text-[8px] font-bold rounded uppercase tracking-widest font-mono">DIGITAL CORE (7 BR)</span>
                <div className="space-y-2 font-mono text-[10px]">
                  {['CS CORE', 'DEVOPS', 'AI / ML', 'DATA SCIENCE', 'CYBERSEC', 'BLOCKCHAIN', 'VR / AR'].map((item) => (
                    <div 
                      key={item}
                      onClick={() => {
                        setActiveTab('Computing');
                        setActiveSub(item);
                        addNotification(`Routed to Computing // ${item}`, "info");
                      }}
                      className="p-2.5 bg-white/[0.01] hover:bg-os-cyan/10 border border-white/5 hover:border-os-cyan/30 rounded-xl flex items-center justify-between cursor-pointer transition-all"
                    >
                      <span className="font-bold text-white uppercase">{item}</span>
                      <span className="text-[8px] text-os-cyan font-bold uppercase tracking-widest">LAUNCH →</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Box 2: Physical / Mechanics */}
              <div className="border border-white/5 bg-black/60 rounded-2xl p-5 space-y-4 text-left">
                <span className="px-2 py-0.5 bg-os-cyan/15 border border-os-cyan/30 text-os-cyan text-[8px] font-bold rounded uppercase tracking-widest font-mono">PHYSICAL SECTOR (10 BR)</span>
                <div className="space-y-2 font-mono text-[10px] max-h-[360px] overflow-y-auto custom-scrollbar">
                  {['MECHANICAL', 'AUTOMOTIVE', 'AEROSPACE', 'ROBOTICS', 'MECHATRONICS', 'MANUFACTURING', 'MATERIALS', 'THERMAL'].map((item) => (
                    <div 
                      key={item}
                      onClick={() => {
                        setActiveTab('Mechanical');
                        setActiveSub(item);
                        addNotification(`Routed to Mechanical // ${item}`, "info");
                      }}
                      className="p-2.5 bg-white/[0.01] hover:bg-os-cyan/10 border border-white/5 hover:border-os-cyan/30 rounded-xl flex items-center justify-between cursor-pointer transition-all"
                    >
                      <span className="font-bold text-white uppercase">{item}</span>
                      <span className="text-[8px] text-os-cyan font-bold uppercase tracking-widest">LAUNCH →</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Box 3: Advanced / Infrastructure */}
              <div className="border border-white/5 bg-black/60 rounded-2xl p-5 space-y-4 text-left">
                <span className="px-2 py-0.5 bg-os-cyan/15 border border-os-cyan/30 text-os-cyan text-[8px] font-bold rounded uppercase tracking-widest font-mono">INFRASTRUCTURE & BIO (12 BR)</span>
                <div className="space-y-2 font-mono text-[10px] max-h-[360px] overflow-y-auto custom-scrollbar">
                  <div className="text-[8px] text-white/30 uppercase font-black border-b border-white/5 pb-1">CIVIL & SEISMIC</div>
                  {['CIVIL CORE', 'STRUCTURAL', 'GEOTECHNICAL'].map(item => (
                    <div 
                      key={item}
                      onClick={() => {
                        setActiveTab('Civil');
                        setActiveSub(item);
                      }}
                      className="p-2 bg-white/[0.01] hover:bg-os-cyan/10 border border-white/5 hover:border-os-cyan/30 rounded-lg flex items-center justify-between cursor-pointer transition-all"
                    >
                      <span className="font-bold text-white uppercase">{item}</span>
                      <span className="text-[8px] text-os-cyan font-bold">LAUNCH</span>
                    </div>
                  ))}

                  <div className="text-[8px] text-white/30 uppercase font-black border-b border-white/5 pb-1 pt-2">CHEMICAL & PROCESS</div>
                  {['CHEMICAL CORE', 'PROCESS ENG', 'REACTION DYNAMICS'].map(item => (
                    <div 
                      key={item}
                      onClick={() => {
                        setActiveTab('Chemical');
                        setActiveSub(item);
                      }}
                      className="p-2 bg-white/[0.01] hover:bg-os-cyan/10 border border-white/5 hover:border-os-cyan/30 rounded-lg flex items-center justify-between cursor-pointer transition-all"
                    >
                      <span className="font-bold text-white uppercase">{item}</span>
                      <span className="text-[8px] text-os-cyan font-bold">LAUNCH</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* =========================================
            SECTION: SCHEMATICS
            ========================================= */}
        {homeSection === 'SCHEMATICS' && (
          <motion.div 
            key="schematics"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex-1 flex flex-col justify-between h-full text-left font-mono select-none"
          >
            <div className="shrink-0">
              <span className="text-[9px] text-os-cyan font-mono font-bold tracking-[0.2em] uppercase">CAD_COMPILER_WORKBENCH</span>
              <h2 className="text-2xl font-display font-black tracking-tight text-white uppercase mt-1">
                STARK ARC-REACTOR BLUEPRINT MODEL
              </h2>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 my-5">
              
              {/* Interactive Vector Workbench CAD View */}
              <div className="col-span-12 md:col-span-7 border border-white/5 bg-black rounded-2xl relative overflow-hidden flex items-center justify-center p-6 min-h-[250px]">
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.01)_1.5px,transparent_1.5px)] bg-[size:16px_16px]" />
                
                {/* Vector Arc Reactor Schematic Overlay */}
                <svg viewBox="0 0 100 100" className="w-48 h-48 text-os-cyan drop-shadow-[0_0_15px_rgba(226,54,54,0.4)]">
                  {/* Outer rings */}
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
                  
                  {/* Plasmatic coil segment nodes */}
                  {[...Array(12)].map((_, i) => {
                    const angle = (i * 30 * Math.PI) / 180;
                    const x1 = 50 + Math.cos(angle) * 30;
                    const y1 = 50 + Math.sin(angle) * 30;
                    const x2 = 50 + Math.cos(angle) * 40;
                    const y2 = 50 + Math.sin(angle) * 40;
                    return (
                      <line 
                        key={i} 
                        x1={x1} y1={y1} x2={x2} y2={y2} 
                        stroke={plasmaReg ? 'currentColor' : 'rgba(255,255,255,0.2)'} 
                        strokeWidth="1.5" 
                      />
                    );
                  })}

                  {/* Inner stabilization matrix */}
                  <polygon 
                    points="50,22 75,65 25,65" 
                    fill="none" 
                    stroke={stabilized ? '#ffb800' : 'rgba(255,255,255,0.2)'} 
                    strokeWidth="1.2" 
                    className={stabilized ? 'animate-pulse' : ''} 
                  />

                  {/* Core glow */}
                  <circle 
                    cx="50" cy="50" 
                    r={arcPower * 0.15} 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    className="animate-pulse" 
                  />
                  
                  {/* Central Node */}
                  <circle cx="50" cy="50" r="4" fill="#ffffff" />
                </svg>

                <div className="absolute bottom-4 left-4 text-[8px] text-white/30 tracking-widest uppercase font-bold">
                  MODEL DESIGNATION: ARC-LV_MK85
                </div>
              </div>

              {/* Adjustments control column */}
              <div className="col-span-12 md:col-span-5 flex flex-col justify-between gap-4">
                
                {/* Toggles */}
                <div className="border border-white/5 bg-black/60 rounded-2xl p-5 space-y-4 text-xs">
                  <span className="text-[8.5px] text-os-cyan font-bold uppercase tracking-widest block border-b border-white/5 pb-2">ACTIVE MODULE CONTROLS</span>
                  
                  <div className="flex items-center justify-between p-2.5 bg-white/[0.01] border border-white/5 rounded-xl">
                    <span className="font-bold text-white/70">STABILIZER ARRAY</span>
                    <button 
                      onClick={() => {
                        setStabilized(prev => !prev);
                        addNotification(stabilized ? "Stabilizer disabled." : "Stabilizer array engaged.", "warn");
                      }}
                      className={`px-3 py-1 text-[8.5px] font-black rounded uppercase transition-all ${stabilized ? 'bg-os-cyan text-black' : 'bg-white/10 text-white/40'}`}
                    >
                      {stabilized ? 'ONLINE' : 'STANDBY'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-white/[0.01] border border-white/5 rounded-xl">
                    <span className="font-bold text-white/70">PLASMA REGULATORS</span>
                    <button 
                      onClick={() => {
                        setPlasmaReg(prev => !prev);
                        addNotification(plasmaReg ? "Plasma coil regulated bypass engaged." : "Plasma flow regulated.", "info");
                      }}
                      className={`px-3 py-1 text-[8.5px] font-black rounded uppercase transition-all ${plasmaReg ? 'bg-os-cyan text-black' : 'bg-white/10 text-white/40'}`}
                    >
                      {plasmaReg ? 'ACTIVE' : 'BYPASS'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-white/[0.01] border border-white/5 rounded-xl">
                    <span className="font-bold text-white/70">NEURAL LINK VISOR</span>
                    <button 
                      onClick={() => {
                        setNeuralUp(prev => !prev);
                        addNotification(neuralUp ? "Visor cognitive interface offlined." : "Visor uplink authorized.", "info");
                      }}
                      className={`px-3 py-1 text-[8.5px] font-black rounded uppercase transition-all ${neuralUp ? 'bg-os-cyan text-black' : 'bg-white/10 text-white/40'}`}
                    >
                      {neuralUp ? 'ESTABLISHED' : 'STANDBY'}
                    </button>
                  </div>
                </div>

                {/* Power slider */}
                <div className="border border-white/5 bg-black/60 rounded-2xl p-5 space-y-3.5">
                  <div className="flex justify-between items-center text-[10px] font-bold text-white/40">
                    <span>ARC REACTOR POWER OUTPUT</span>
                    <span className="text-os-cyan text-xs">{(arcPower * 14.2).toFixed(1)} GW/s</span>
                  </div>
                  
                  <input 
                    type="range"
                    min="10" max="120"
                    value={arcPower}
                    onChange={(e) => setArcPower(parseInt(e.target.value))}
                    className="w-full accent-os-cyan h-1 bg-white/10 rounded-lg cursor-pointer"
                  />

                  <button 
                    onClick={handleExportDWG}
                    className="w-full py-2.5 bg-os-cyan text-black text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-os-cyan/95 transition-all"
                  >
                    COMPILE & EXPORT SPECIFICATION
                  </button>
                </div>

              </div>

            </div>
          </motion.div>
        )}

        {/* =========================================
            SECTION: MATERIAL SPECS
            ========================================= */}
        {homeSection === 'MATERIAL SPECS' && (
          <motion.div 
            key="materials"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex-1 flex flex-col justify-between h-full text-left font-mono select-none"
          >
            <div className="shrink-0">
              <span className="text-[9px] text-os-cyan font-mono font-bold tracking-[0.2em] uppercase">ALLOY_COGNITIVE_LAB</span>
              <h2 className="text-2xl font-display font-black tracking-tight text-white uppercase mt-1">
                COMPOSITE ALLOYS & STRENGTH RECIPES
              </h2>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              
              {/* Left Column: Alloy formulation sliders */}
              <div className="border border-white/5 bg-black/60 rounded-2xl p-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="text-[8.5px] text-os-cyan font-bold uppercase tracking-widest block border-b border-white/5 pb-2">ALLOY COMPOUND INTEGRITY MIXTURE</span>
                  
                  {alloys.map((item, idx) => (
                    <div key={item.name} className="space-y-2 p-3 bg-white/[0.01] border border-white/5 rounded-xl">
                      <div className="flex justify-between items-center text-[10px] font-bold">
                        <span className="text-white/70">{item.name}</span>
                        <span className="text-os-cyan">{item.val}%</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => adjustAlloy(idx, -5)}
                          className="w-6 h-6 border border-white/10 hover:border-os-cyan text-white/40 hover:text-white rounded-lg flex items-center justify-center cursor-pointer text-xs"
                        >
                          -
                        </button>
                        <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-os-cyan" style={{ width: `${item.val}%` }} />
                        </div>
                        <button 
                          onClick={() => adjustAlloy(idx, 5)}
                          className="w-6 h-6 border border-white/10 hover:border-os-cyan text-white/40 hover:text-white rounded-lg flex items-center justify-center cursor-pointer text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-[8px] text-white/30 uppercase mt-2">
                  * ALL COMPOSITE FRACTIONS RESOLVE DYNAMICALLY TO EQUAL A TOTAL MATRIX OF 100%.
                </div>
              </div>

              {/* Right Column: Calculations readout */}
              <div className="border border-white/5 bg-black/60 rounded-2xl p-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="text-[8.5px] text-os-cyan font-bold uppercase tracking-widest block border-b border-white/5 pb-2">TENSILE STRENGTH AND RIGIDITY FACTOR</span>
                  
                  <div className="py-8 flex flex-col items-center justify-center relative">
                    {/* Ring gauge representation */}
                    <div className="w-36 h-36 border-4 border-dashed border-os-cyan/20 rounded-full flex flex-col items-center justify-center animate-spin-slow absolute" />
                    <div className="w-28 h-28 border border-os-cyan/30 rounded-full flex flex-col items-center justify-center bg-black/40 relative z-10">
                      <span className="text-2xl font-black text-white">{calculatedTensile}</span>
                      <span className="text-[7.5px] text-white/40 tracking-wider font-bold">MPA STRESS CAPACITY</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-[10px] p-3 bg-white/[0.01] border border-white/5 rounded-xl">
                    <div className="flex justify-between">
                      <span className="text-white/50">TORSIONAL RESISTANCE:</span>
                      <span className="text-white font-bold">{Math.round(calculatedTensile * 1.45)} N·m/deg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">YIELD STRENGTH METRIC:</span>
                      <span className="text-white font-bold">{Math.round(calculatedTensile * 0.92)} GPa</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">MAX CORROSION BARRIER:</span>
                      <span className="text-green-400 font-bold">OPTIMAL (99.8%)</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    addNotification(`Composite composite recipe locked. Hardness density validated at ${calculatedTensile} GPa.`, "info");
                  }}
                  className="w-full py-2.5 bg-os-cyan text-black font-black uppercase text-[9px] tracking-widest rounded-xl hover:bg-os-cyan/95 transition-all mt-4"
                >
                  SAVE RECIPE CONFIGURE
                </button>
              </div>

            </div>
          </motion.div>
        )}

        {/* =========================================
            SECTION: STRESS TESTS
            ========================================= */}
        {homeSection === 'STRESS TESTS' && (
          <motion.div 
            key="stress"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex-1 flex flex-col justify-between h-full text-left font-mono select-none"
          >
            <div className="shrink-0">
              <span className="text-[9px] text-os-cyan font-mono font-bold tracking-[0.2em] uppercase">STRESS_FINITE_ELEMENTS</span>
              <h2 className="text-2xl font-display font-black tracking-tight text-white uppercase mt-1">
                STRUCTURAL FINITE STRESS ANALYSIS (FEA)
              </h2>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              
              {/* Solver progress pane */}
              <div className="border border-white/5 bg-black/60 rounded-2xl p-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="text-[8.5px] text-os-cyan font-bold uppercase tracking-widest block border-b border-white/5 pb-2">MATRIC SOLVER COMPILER</span>
                  
                  <div className="p-4 bg-black rounded-xl border border-white/10 space-y-3">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-white/40">CALCULATION CONVERGENCE:</span>
                      <span className="text-os-cyan font-bold">{feaProgress}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
                      <div className="h-full bg-os-cyan transition-all duration-100" style={{ width: `${feaProgress}%` }} />
                    </div>
                  </div>

                  <div className="p-3 bg-black/80 rounded-lg border border-white/5 text-[9px] text-white/50 h-28 overflow-y-auto custom-scrollbar font-mono leading-relaxed space-y-1">
                    {feaProgress > 0 && <p className="text-os-cyan">[0.000s] Parsing CAD geometry meshes...</p>}
                    {feaProgress > 25 && <p className="text-os-cyan">[0.210s] Injecting 6,104 load constraint boundaries...</p>}
                    {feaProgress > 50 && <p className="text-os-cyan">[0.450s] Re-solving structural stiffness equations...</p>}
                    {feaProgress > 75 && <p className="text-os-cyan">[0.890s] Calculating von Mises stress deformations...</p>}
                    {feaProgress === 100 && <p className="text-green-400 font-bold">[1.200s] CONVERGENCE SUCCESSFUL. ERROR DELTA: 0.0001%</p>}
                    {feaProgress === 0 && <p>Standing by. Run FEA solver to calculate structural strain vector profiles.</p>}
                  </div>
                </div>

                <button 
                  onClick={runFeaSolver}
                  disabled={isFeaSynthetic}
                  className="w-full h-11 bg-os-cyan hover:bg-os-cyan/95 disabled:bg-white/5 disabled:text-white/25 text-black font-black uppercase text-[10px] tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Play size={12} fill="currentColor" />
                  {isFeaSynthetic ? 'SOLVING ELEMENT CORES...' : 'RUN FINITE SOLVER'}
                </button>
              </div>

              {/* Stress deformation model */}
              <div className="border border-white/5 bg-black/60 rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <span className="text-[8.5px] text-os-cyan font-bold uppercase tracking-widest block border-b border-white/5 pb-2">STRESS PLOT DEFORMATION PROFILE</span>
                  
                  <div className="my-4 h-40 border border-white/5 rounded-xl bg-black relative overflow-hidden flex items-center justify-center p-2">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,133,119,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,133,119,0.01)_1px,transparent_1px)] bg-[size:10px_10px]" />
                    
                    {/* Simulated beam truss deformation */}
                    <svg className="w-full h-full text-os-cyan" viewBox="0 0 200 80">
                      {/* Original flat beam dotted */}
                      <line x1="20" y1="40" x2="180" y2="40" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />
                      
                      {/* Deformed beam curve */}
                      <path 
                        d={feaProgress > 0 
                          ? `M 20,40 Q 100,${40 + (feaProgress * 0.2)} 180,40` 
                          : "M 20,40 Q 100,40 180,40"
                        }
                        fill="none"
                        stroke={feaProgress === 100 ? '#E23636' : 'currentColor'}
                        strokeWidth="2.5"
                        className="transition-all duration-300"
                      />
                      
                      {/* Load arrow */}
                      {feaProgress > 0 && (
                        <g transform={`translate(100, ${20 + (feaProgress * 0.15)})`}>
                          <line x1="0" y1="-15" x2="0" y2="0" stroke="#ffb800" strokeWidth="1.5" />
                          <polygon points="-3,-4 0,0 3,-4" fill="#ffb800" />
                          <text x="5" y="-5" className="text-[5px] fill-os-orange font-bold font-mono">LOAD POINT</text>
                        </g>
                      )}
                    </svg>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-[9.5px]">
                  <div className="border border-white/5 p-2 rounded bg-white/[0.01]">
                    <span className="text-[7.5px] text-white/30 block uppercase font-bold">MAX VON MISES</span>
                    <span className="text-white font-bold block mt-0.5">{feaProgress === 100 ? '124.8 MPa' : '0.0 MPa'}</span>
                  </div>
                  <div className="border border-white/5 p-2 rounded bg-white/[0.01]">
                    <span className="text-[7.5px] text-white/30 block uppercase font-bold">SAFETY FACTOR</span>
                    <span className="text-green-400 font-bold block mt-0.5">{feaProgress === 100 ? '4.85 (STABLE)' : 'STANDBY'}</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* =========================================
            SECTION: SIMULATION (HTML5 Canvas Particle Engine)
            ========================================= */}
        {homeSection === 'SIMULATION' && (
          <motion.div 
            key="simulation"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex-1 flex flex-col justify-between h-full text-left font-mono select-none"
          >
            <div className="shrink-0">
              <span className="text-[9px] text-os-cyan font-mono font-bold tracking-[0.2em] uppercase">KINEMATIC_PARTICLE_SIMULATOR</span>
              <h2 className="text-2xl font-display font-black tracking-tight text-white uppercase mt-1">
                PLASMA FLOW FLUID KINEMATICS ENGINE
              </h2>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 my-5">
              
              {/* Interactive Canvas Viewport */}
              <div className="col-span-12 md:col-span-7 border border-white/5 bg-black rounded-2xl relative overflow-hidden h-[300px]">
                <canvas 
                  ref={canvasRef} 
                  width={400} 
                  height={300} 
                  className="w-full h-full block" 
                />
                
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-2 py-0.5 bg-black/60 border border-white/15 text-white/60 text-[8px] font-bold rounded uppercase tracking-wider">CANVAS REALTIME</span>
                </div>
              </div>

              {/* Adjustments control column */}
              <div className="col-span-12 md:col-span-5 flex flex-col justify-between gap-4 text-xs">
                
                {/* Adjustments panel */}
                <div className="border border-white/5 bg-black/60 rounded-2xl p-5 space-y-4">
                  <span className="text-[8.5px] text-os-cyan font-bold uppercase tracking-widest block border-b border-white/5 pb-2">SIMULATION PARAMETERS</span>
                  
                  {/* Speed slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between font-bold text-white/40">
                      <span>PLASMA FLUID SPEED</span>
                      <span className="text-os-cyan font-bold">{particleSpeed}x</span>
                    </div>
                    <input 
                      type="range"
                      min="1" max="10"
                      value={particleSpeed}
                      onChange={(e) => setParticleSpeed(parseInt(e.target.value))}
                      className="w-full accent-os-cyan h-1 bg-white/10 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Gravity slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between font-bold text-white/40">
                      <span>MAGNETIC GRAVITY SHIELD</span>
                      <span className="text-os-cyan font-bold">{gravStrength}G</span>
                    </div>
                    <input 
                      type="range"
                      min="0" max="10"
                      value={gravStrength}
                      onChange={(e) => setGravStrength(parseInt(e.target.value))}
                      className="w-full accent-os-cyan h-1 bg-white/10 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* Color and preset choices */}
                <div className="border border-white/5 bg-black/60 rounded-2xl p-5 space-y-3">
                  <span className="text-[8.5px] text-os-cyan font-bold uppercase tracking-widest block border-b border-white/5 pb-2">PARTICLE MATRIX SPECTRA</span>
                  
                  <div className="grid grid-cols-3 gap-2">
                    {['red', 'cyan', 'gold'].map((c) => (
                      <button
                        key={c}
                        onClick={() => {
                          setParticleColor(c as any);
                          addNotification(`Particle stream spectrum shifted to ${c.toUpperCase()}.`, "info");
                        }}
                        className={`py-2 text-[9px] font-black uppercase tracking-wider rounded-lg border transition-all cursor-pointer ${
                          particleColor === c 
                            ? 'bg-os-cyan/15 border-os-cyan text-white' 
                            : 'bg-white/5 border-white/10 text-white/40'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={() => {
                      setParticleSpeed(2);
                      setGravStrength(0);
                      setParticleColor('red');
                      addNotification("Plasma stream kinematic parameters normalized.", "info");
                    }}
                    className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white/60 hover:text-white rounded-lg text-[9px] font-bold uppercase tracking-wider text-center cursor-pointer transition-all mt-2"
                  >
                    RESET FLUID SIMULATOR
                  </button>
                </div>

              </div>

            </div>
          </motion.div>
        )}

        {/* =========================================
            SECTION: EMERGING TECH
            ========================================= */}
        {homeSection === 'EMERGING TECH' && (
          <motion.div 
            key="emerging-tech"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex-1 flex flex-col justify-between h-full text-left font-mono select-none"
          >
            <div className="shrink-0">
              <span className="text-[9px] text-os-cyan font-mono font-bold tracking-[0.2em] uppercase">CLASSIFIED_EXPERIMENTAL_PORTAL</span>
              <h2 className="text-2xl font-display font-black tracking-tight text-white uppercase mt-1">
                QUANTUM FIELDS & MOL-WEAVE SWARMS
              </h2>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              
              {/* Quantum stabilization slider panel */}
              <div className="border border-white/5 bg-black/60 rounded-2xl p-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="text-[8.5px] text-os-cyan font-bold uppercase tracking-widest block border-b border-white/5 pb-2">DIMENSIONAL QUANTUM STABILIZER</span>
                  
                  <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl text-center py-6">
                    <span className="text-[8px] text-white/30 uppercase tracking-wider block">STABILIZATION INTEGRITY</span>
                    <span className="text-4xl font-black text-white block mt-1.5">{quantumStabilizedVal.toFixed(2)}%</span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between font-bold text-white/40 text-[10px]">
                      <span>MANUAL ALIGNMENT DRIVER</span>
                      <span>{quantumStabilizedVal}%</span>
                    </div>
                    <input 
                      type="range"
                      min="50" max="100"
                      value={quantumStabilizedVal}
                      onChange={(e) => setQuantumStabilizedVal(parseInt(e.target.value))}
                      className="w-full accent-os-cyan h-1 bg-white/10 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                <div className="text-[8.5px] text-white/30 uppercase leading-normal mt-2">
                  * ADJUST WITH CAUTION. EXCEEDING NOMINAL DECOHERENCE VELOCITIES RISK DISRUPTING BIO-LINK CONDUITS.
                </div>
              </div>

              {/* Molecular nanobot swarm actions */}
              <div className="border border-white/5 bg-black/60 rounded-2xl p-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="text-[8.5px] text-os-cyan font-bold uppercase tracking-widest block border-b border-white/5 pb-2">NANOBOT SYSTEM COMMANDER</span>
                  
                  <div className="space-y-2.5 text-xs text-left">
                    <label className="text-[8.5px] text-white/40 uppercase font-bold">NANOBOT ASSEMBLY PRESET</label>
                    <div className="grid grid-cols-1 gap-2">
                      {['DEFENSIVE BLOCKADE', 'MOLECULAR HEAL MATRIX', 'PROPULSION VECTOR THRUST'].map((mode) => (
                        <div 
                          key={mode}
                          onClick={() => {
                            setNanobotMode(mode);
                            addNotification(`Nanobot swarm sequence updated to ${mode}.`, "info");
                          }}
                          className={`p-3 border rounded-xl flex justify-between items-center cursor-pointer transition-all ${
                            nanobotMode === mode 
                              ? 'border-os-cyan bg-os-cyan/10' 
                              : 'border-white/5 bg-white/[0.01] hover:border-white/15'
                          }`}
                        >
                          <span className="font-bold text-white uppercase text-[10px]">{mode}</span>
                          {nanobotMode === mode && <Check size={12} className="text-os-cyan" />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={triggerNanobotSweep}
                  disabled={isNanobotSweeping}
                  className="w-full py-3 bg-os-cyan text-black font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-os-cyan/95 transition-all mt-4"
                >
                  {isNanobotSweeping ? 'BROADCASTING SWEEP RECONFIG...' : 'DEPLOY ACTIVE SWARM INTEGRATION'}
                </button>
              </div>

            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};
