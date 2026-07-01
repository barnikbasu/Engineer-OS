import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  PenTool, 
  Trash2, 
  Eye, 
  Settings, 
  Undo, 
  Download, 
  Sun, 
  Moon, 
  Ruler, 
  Boxes, 
  Scale, 
  RefreshCw, 
  FileText, 
  Layers, 
  Play, 
  Pause, 
  ChevronRight, 
  Info,
  Activity,
  Maximize2
} from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';

interface DrawItem {
  id: string;
  type: 'pencil' | 'line' | 'circle' | 'rect';
  points: { x: number; y: number }[];
  color: string;
  width: number;
}

interface AnatomicalNode {
  id: string;
  name: string;
  x: number; // percentage coordinates on 400x800 blueprint grid
  y: number;
  codexLatin: string;
  mechanicalSpec: string;
  ratioNotes: string;
}

export const TechnicalBlueprintSuit: React.FC = () => {
  const { addNotification } = useOSStore();

  // Layout and theme states
  const [themeMode, setThemeMode] = useState<'parchment' | 'modern'>('parchment');
  const [activePreset, setActivePreset] = useState<'vitruvian' | 'aerial' | 'gears'>('vitruvian');
  const [activeTool, setActiveTool] = useState<'pencil' | 'line' | 'circle' | 'rect' | 'none'>('pencil');
  const [strokeWidth, setStrokeWidth] = useState(2.5);
  
  // Sketching Canvas states
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [drawHistory, setDrawHistory] = useState<DrawItem[]>([]);
  const [currentPoints, setCurrentPoints] = useState<{ x: number; y: number }[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showPerspectiveGrid, setShowPerspectiveGrid] = useState(true);
  const [showGoldenSpiral, setShowGoldenSpiral] = useState(false);

  // Dynamic simulation multipliers
  const [baseDimension, setBaseDimension] = useState<number>(100);
  
  // Preset 1: Vitruvian Exo-suit morphing states
  const [biometricArmSpan, setBiometricArmSpan] = useState<number>(1.0);
  const [biometricTorsoHeight, setBiometricTorsoHeight] = useState<number>(1.0);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('cranium');

  // Preset 2: Aerial Screw rotational states
  const [isRotorSpinning, setIsRotorSpinning] = useState(true);
  const [rotorAngle, setRotorAngle] = useState(0);
  const [rotorSpeed, setRotorSpeed] = useState(45); // RPM
  const [bladePitch, setBladePitch] = useState(30); // pitch degrees

  // Preset 3: Gear clock states
  const [gearTeeth1, setGearTeeth1] = useState(24);
  const [gearTeeth2, setGearTeeth2] = useState(8);
  const [gearRotation, setGearRotation] = useState(0);

  // Vitruvian Exo-suit subsystems annotations
  const anatomicalNodes: AnatomicalNode[] = [
    {
      id: 'cranium',
      name: 'CRANIUM MODULE (VIRTUAL EYE COGNITION)',
      x: 50,
      y: 11,
      codexLatin: 'Caput quadratum in mensura proportionis perfectae continetur.',
      mechanicalSpec: 'Integrated neural-link ocular visor, processing 8K multispectral HUD telemetry. Augmented with biomechatronic load balancing stabilizer.',
      ratioNotes: 'Proportional Quotient: Exactly 1/8 of total height. Perfect vertical golden alignment.'
    },
    {
      id: 'pectus',
      name: 'PECTORAL INTEGRITY MATRIX (ARC CORE)',
      x: 50,
      y: 33,
      codexLatin: 'Pectus hominis ad circulum perfectum ac quadratum exacte respondet.',
      mechanicalSpec: 'Primary cold-fusion arc energy radiator. Houses 4.5 kN structural compression titanium lattice cage with carbon nanotube shock absorbers.',
      ratioNotes: 'Proportional Quotient: Intersects the horizontal axis of the golden rectangle segment.'
    },
    {
      id: 'manus_sin',
      name: 'ARM & MANIPULATOR ARTICULATION (LEFT)',
      x: 10,
      y: 28,
      codexLatin: 'Brachiorum expansio hominis longitudini totius corporis aequatur.',
      mechanicalSpec: 'Carbon-fiber biomechanical manipulator. Driven by 12 independent high-tension fiber bundles delivering up to 450 Nm gripping torque.',
      ratioNotes: 'Proportional Quotient: Outer fingertip touches the vertical square frame border.'
    },
    {
      id: 'coxa',
      name: 'PELVIC STRUCTURAL FORWARD TRANSMISSION',
      x: 50,
      y: 52,
      codexLatin: 'Lumbus centrum totius corporis et stabilitatis est.',
      mechanicalSpec: 'Dual-axis mechatronic hip joint stabilizer. Equipped with real-time force transmission sensors with automatic load redistribution.',
      ratioNotes: 'Proportional Quotient: Centerpoint of the vertical height of the human torso.'
    },
    {
      id: 'knees',
      name: 'KINETIC DAMPER SYSTEM (LOWER LIMBS)',
      x: 32,
      y: 75,
      codexLatin: 'Genua flexibilia pro pondere portando rotantur.',
      mechanicalSpec: 'Hydro-pneumatic active dampers. Adapts to impact loads dynamically within 0.05 milliseconds; provides 35% kinetic energy recycling.',
      ratioNotes: 'Proportional Quotient: Golden ratio segment split between hip joint and sole of the foot.'
    }
  ];

  const selectedNode = anatomicalNodes.find(n => n.id === selectedNodeId) || anatomicalNodes[0];

  // Canvas context drawer loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas completely
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Color theme assignments
    const inkColor = themeMode === 'parchment' ? '#4a321a' : '#ff3333';
    const guideColor = themeMode === 'parchment' ? 'rgba(74, 50, 26, 0.06)' : 'rgba(255, 51, 51, 0.05)';
    const goldColor = themeMode === 'parchment' ? 'rgba(184, 134, 11, 0.25)' : 'rgba(255, 184, 0, 0.22)';

    // 1. Draw Architectural Perspective Vanishing Lines (Renaissance Study grid)
    if (showPerspectiveGrid) {
      ctx.strokeStyle = guideColor;
      ctx.lineWidth = 0.5;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Convergence lines radiating from center vanishing point
      for (let angle = 0; angle < 360; angle += 15) {
        const rad = (angle * Math.PI) / 180;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(rad) * 1000, cy + Math.sin(rad) * 1000);
        ctx.stroke();
      }

      // Isometric bounding squares representing Renaissance proportions
      for (let size = 60; size < 900; size += 60) {
        ctx.beginPath();
        ctx.rect(cx - size / 2, cy - size / 2, size, size);
        ctx.stroke();
      }

      // Draw horizontal horizon line
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(canvas.width, cy);
      ctx.stroke();

      // Draw vertical alignment centerline
      ctx.beginPath();
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, canvas.height);
      ctx.stroke();
    }

    // 2. Draw Golden Ratio Spiral Overlay (Sacred Geometry scale)
    if (showGoldenSpiral) {
      ctx.strokeStyle = goldColor;
      ctx.lineWidth = 1;
      
      let x = canvas.width / 2 - 80;
      let y = canvas.height / 2 + 50;
      let size = 8;
      let rotationAngle = 0;

      ctx.beginPath();
      ctx.moveTo(x, y);

      for (let i = 0; i < 11; i++) {
        const nextSize = size * 1.618033;
        const rad = (rotationAngle * Math.PI) / 180;
        
        ctx.arc(
          x, y, 
          size, 
          rad, 
          rad + Math.PI / 2
        );
        
        // Pivot formulas
        rotationAngle += 90;
        size = nextSize;
      }
      ctx.stroke();
    }

    // 3. Render Historical sketches drawn by user
    drawHistory.forEach(item => {
      ctx.strokeStyle = item.color;
      ctx.lineWidth = item.width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (item.type === 'pencil') {
        ctx.beginPath();
        if (item.points.length > 0) {
          ctx.moveTo(item.points[0].x, item.points[0].y);
          for (let i = 1; i < item.points.length; i++) {
            ctx.lineTo(item.points[i].x, item.points[i].y);
          }
        }
        ctx.stroke();
      } else if (item.type === 'line') {
        if (item.points.length >= 2) {
          ctx.beginPath();
          ctx.moveTo(item.points[0].x, item.points[0].y);
          ctx.lineTo(item.points[1].x, item.points[1].y);
          ctx.stroke();

          // Calculate distance in pixels & translate to metric scale
          const dx = item.points[1].x - item.points[0].x;
          const dy = item.points[1].y - item.points[0].y;
          const lengthPx = Math.sqrt(dx * dx + dy * dy);
          const mmVal = lengthPx * 0.42;

          ctx.fillStyle = item.color;
          ctx.font = '8.5px monospace';
          ctx.fillText(`s: ${mmVal.toFixed(1)} mm`, (item.points[0].x + item.points[1].x) / 2 + 6, (item.points[0].y + item.points[1].y) / 2 - 4);
        }
      } else if (item.type === 'circle') {
        if (item.points.length >= 2) {
          const dx = item.points[1].x - item.points[0].x;
          const dy = item.points[1].y - item.points[0].y;
          const r = Math.sqrt(dx * dx + dy * dy);

          ctx.beginPath();
          ctx.arc(item.points[0].x, item.points[0].y, r, 0, Math.PI * 2);
          ctx.stroke();

          // Inner radius dimension vector
          ctx.beginPath();
          ctx.moveTo(item.points[0].x, item.points[0].y);
          ctx.lineTo(item.points[1].x, item.points[1].y);
          ctx.setLineDash([2, 3]);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.fillStyle = item.color;
          ctx.font = '8.5px monospace';
          ctx.fillText(`r: ${(r * 0.42).toFixed(1)} mm`, item.points[1].x + 4, item.points[1].y - 4);
        }
      } else if (item.type === 'rect') {
        if (item.points.length >= 2) {
          const w = item.points[1].x - item.points[0].x;
          const h = item.points[1].y - item.points[0].y;

          ctx.beginPath();
          ctx.rect(item.points[0].x, item.points[0].y, w, h);
          ctx.stroke();

          ctx.fillStyle = item.color;
          ctx.font = '8.5px monospace';
          ctx.fillText(`w: ${(Math.abs(w) * 0.42).toFixed(1)} h: ${(Math.abs(h) * 0.42).toFixed(1)} mm`, item.points[0].x + 4, item.points[0].y + 12);
        }
      }
    });

    // 4. Render Active sketching path in progress
    if (isDrawing && currentPoints.length > 0) {
      ctx.strokeStyle = inkColor;
      ctx.lineWidth = strokeWidth;
      ctx.lineCap = 'round';

      if (activeTool === 'pencil') {
        ctx.beginPath();
        ctx.moveTo(currentPoints[0].x, currentPoints[0].y);
        for (let i = 1; i < currentPoints.length; i++) {
          ctx.lineTo(currentPoints[i].x, currentPoints[i].y);
        }
        ctx.stroke();
      } else if (activeTool === 'line') {
        if (currentPoints.length >= 2) {
          ctx.beginPath();
          ctx.moveTo(currentPoints[0].x, currentPoints[0].y);
          ctx.lineTo(currentPoints[1].x, currentPoints[1].y);
          ctx.stroke();
        }
      } else if (activeTool === 'circle') {
        if (currentPoints.length >= 2) {
          const dx = currentPoints[1].x - currentPoints[0].x;
          const dy = currentPoints[1].y - currentPoints[0].y;
          const r = Math.sqrt(dx * dx + dy * dy);
          ctx.beginPath();
          ctx.arc(currentPoints[0].x, currentPoints[0].y, r, 0, Math.PI * 2);
          ctx.stroke();
        }
      } else if (activeTool === 'rect') {
        if (currentPoints.length >= 2) {
          const w = currentPoints[1].x - currentPoints[0].x;
          const h = currentPoints[1].y - currentPoints[0].y;
          ctx.beginPath();
          ctx.rect(currentPoints[0].x, currentPoints[0].y, w, h);
          ctx.stroke();
        }
      }
    }

  }, [drawHistory, currentPoints, isDrawing, activeTool, strokeWidth, themeMode, showPerspectiveGrid, showGoldenSpiral]);

  // Sketch pad drawing event handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (activeTool === 'none') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height;

    setIsDrawing(true);
    setCurrentPoints([{ x, y }]);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || activeTool === 'none') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height;

    setCurrentPoints(prev => {
      if (activeTool === 'pencil') {
        return [...prev, { x, y }];
      } else {
        return [prev[0], { x, y }];
      }
    });
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (currentPoints.length > 0) {
      const newItem: DrawItem = {
        id: Math.random().toString(36).substr(2, 9),
        type: activeTool as any,
        points: currentPoints,
        color: themeMode === 'parchment' ? '#4a321a' : '#E23636',
        width: strokeWidth
      };
      setDrawHistory(prev => [...prev, newItem]);
    }
    setCurrentPoints([]);
  };

  const undoLastStroke = () => {
    setDrawHistory(prev => prev.slice(0, -1));
    addNotification("Removed last sketch element.", "info");
  };

  const clearSketchpad = () => {
    setDrawHistory([]);
    addNotification("Drafting canvas cleared.", "info");
  };

  // Rotation Animation loop for Leonardo's Aerial Screw
  useEffect(() => {
    if (!isRotorSpinning || activePreset !== 'aerial') return;
    let animFrame: number;
    const speedFactor = (rotorSpeed / 60) * 360; // degrees per second
    let lastTime = performance.now();

    const update = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      setRotorAngle(prev => (prev + speedFactor * dt) % 360);
      animFrame = requestAnimationFrame(update);
    };

    animFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animFrame);
  }, [isRotorSpinning, rotorSpeed, activePreset]);

  // Coupled Gear Rotation Animation loop
  useEffect(() => {
    if (activePreset !== 'gears') return;
    let animFrame: number;
    let lastTime = performance.now();

    const update = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      // Driver gear rotates constantly, driven gear couples opposite
      setGearRotation(prev => (prev + 30 * dt) % 360);
      animFrame = requestAnimationFrame(update);
    };

    animFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animFrame);
  }, [activePreset]);

  // Programmatic gear wheel tooth vector path generation
  const getGearPath = (cx: number, cy: number, r: number, teeth: number) => {
    let path = '';
    const step = (2 * Math.PI) / teeth;
    const toothDepth = 6;
    
    for (let i = 0; i < teeth; i++) {
      const angle = i * step;
      const angleNext = (i + 0.5) * step;
      
      const x1 = cx + Math.cos(angle) * (r + toothDepth);
      const y1 = cy + Math.sin(angle) * (r + toothDepth);
      
      const x2 = cx + Math.cos(angleNext) * (r + toothDepth);
      const y2 = cy + Math.sin(angleNext) * (r + toothDepth);
      
      const x3 = cx + Math.cos(angleNext) * r;
      const y3 = cy + Math.sin(angleNext) * r;
      
      const x4 = cx + Math.cos(angle + step) * r;
      const y4 = cy + Math.sin(angle + step) * r;
      
      if (i === 0) {
        path += `M ${x1} ${y1} `;
      } else {
        path += `L ${x1} ${y1} `;
      }
      path += `L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4} `;
    }
    path += 'Z';
    return path;
  };

  // Golden ratio calculations
  const goldenProportion = baseDimension * 1.6180339887;
  const fibonacciSequence = [
    Math.round(baseDimension / 8),
    Math.round(baseDimension / 5),
    Math.round(baseDimension / 3),
    Math.round(baseDimension / 2),
    Math.round(baseDimension / 1.618),
    Math.round(baseDimension),
    Math.round(goldenProportion),
    Math.round(goldenProportion * 1.618)
  ];

  // Aerodynamic Lift calculations for Aerial Screw preset
  const calculatedThrust = (Math.pow(rotorSpeed, 2) * Math.sin((bladePitch * Math.PI) / 180) * 0.0014 * baseDimension).toFixed(2);
  const airDensityDrag = (rotorSpeed * 0.12 * bladePitch * 0.008 * baseDimension).toFixed(2);

  // Mechanical clock torque calculations
  const velocityRatio = (gearTeeth1 / gearTeeth2).toFixed(2);
  const outputTorque = (120 * parseFloat(velocityRatio)).toFixed(1);

  // Schematic download mock trigger
  const triggerDownloadReport = () => {
    addNotification(`Exporting architectural DWG & Codex spec for ${activePreset.toUpperCase()}...`, "info");
    setTimeout(() => {
      addNotification("Blueprint spec successfully downloaded to storage queue.", "info");
    }, 1200);
  };

  return (
    <div className={`h-full w-full flex flex-col rounded-3xl overflow-hidden transition-all duration-500 relative select-none border border-white/5 ${
      themeMode === 'parchment' 
        ? "bg-gradient-to-br from-[#f8f3e8] via-[#eedfc3] to-[#e4d2ae] text-[#4a321a] shadow-[inset_0_0_80px_rgba(74,50,26,0.15)]"
        : "bg-gradient-to-br from-[#0c0505] via-[#050508] to-[#120505] text-white"
    }`}>
      
      {/* Dynamic background canvas sketch overlays */}
      <div className={`absolute inset-0 pointer-events-none opacity-[0.03] ${themeMode === 'parchment' ? 'mix-blend-multiply' : ''}`}
           style={{ 
             backgroundImage: themeMode === 'parchment' 
               ? 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' 
               : 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' 
           }} 
      />

      {/* TOP HEADER CONTROLS BAR */}
      <header className={`h-16 px-6 border-b flex items-center justify-between shrink-0 font-mono text-xs select-none ${
        themeMode === 'parchment' ? 'border-[#4a321a]/15 bg-[#4a321a]/5' : 'border-white/5 bg-white/[0.02]'
      }`}>
        <div className="flex items-center gap-4 text-left">
          <div className={`p-2 rounded-lg ${themeMode === 'parchment' ? 'bg-[#4a321a]/10 text-[#4a321a]' : 'bg-os-cyan/10 text-os-cyan'}`}>
            <Compass className="animate-spin-slow" size={18} />
          </div>
          <div>
            <h2 className={`font-display font-black text-sm tracking-wide uppercase leading-none ${themeMode === 'parchment' ? 'text-[#4a321a]' : 'text-white'}`}>
              Codex Leonardo Blueprint Lab
            </h2>
            <p className="text-[8.5px] opacity-50 tracking-[0.2em] font-bold mt-1">RESEARCH_WORKBENCH // SCALE_ENG_V8</p>
          </div>
        </div>

        {/* Preset switch & aesthetic theme toggle */}
        <div className="flex items-center gap-3">
          {/* Preset Buttons */}
          <div className={`flex rounded-xl p-0.5 border ${themeMode === 'parchment' ? 'bg-[#4a321a]/5 border-[#4a321a]/15' : 'bg-black/40 border-white/5'}`}>
            {(['vitruvian', 'aerial', 'gears'] as const).map(preset => (
              <button
                key={preset}
                onClick={() => {
                  setActivePreset(preset);
                  addNotification(`Active blueprint calibrated to: ${preset.toUpperCase()}`, "info");
                }}
                className={`px-3 py-1.5 rounded-lg text-[9px] uppercase tracking-wider font-black cursor-pointer transition-all ${
                  activePreset === preset 
                    ? (themeMode === 'parchment' ? 'bg-[#4a321a] text-[#eedfc3]' : 'bg-os-cyan text-black shadow-[0_0_10px_rgba(226,54,54,0.35)]')
                    : 'opacity-40 hover:opacity-100'
                }`}
              >
                {preset === 'vitruvian' ? 'Exo Vitruvian' : preset === 'aerial' ? 'Aerial Screw' : 'Gear Train'}
              </button>
            ))}
          </div>

          {/* Theme Mode Toggle (Parchment Codex vs Neon CAD) */}
          <button
            onClick={() => {
              setThemeMode(prev => prev === 'parchment' ? 'modern' : 'parchment');
              addNotification(themeMode === 'parchment' ? "Modern HUD laser CAD activated." : "Codex parchment drawing mode active.", "info");
            }}
            className={`p-2 rounded-xl cursor-pointer transition-all border ${
              themeMode === 'parchment' 
                ? 'bg-[#4a321a]/10 border-[#4a321a]/20 text-[#4a321a] hover:bg-[#4a321a]/20' 
                : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
            }`}
            title={themeMode === 'parchment' ? "Switch to Cybernetic CAD Mode" : "Switch to Sepia Parchment Mode"}
          >
            {themeMode === 'parchment' ? <Moon size={14} /> : <Sun size={14} />}
          </button>
        </div>
      </header>

      {/* DUAL WORKSPACE LAYOUT */}
      <div className="flex-1 grid grid-cols-12 min-h-0 relative">
        
        {/* LEFT WORKSPACE PANEL: Dynamic Blueprint Visualizer */}
        <div className="col-span-12 lg:col-span-8 flex flex-col min-h-0 relative border-r border-black/5 lg:border-white/5">
          
          {/* Active Blueprint & Sketch Canvas Overlays container */}
          <div className="flex-1 relative overflow-hidden flex items-center justify-center p-6 min-h-[350px]">
            
            {/* HTML5 Canvas overlay for manual drafting */}
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className={`absolute inset-0 w-full h-full z-20 ${
                activeTool !== 'none' ? 'cursor-crosshair' : 'cursor-default'
              }`}
            />

            {/* PRESET VIEWPORT 1: Vitruvian Man Exo-Stabilizer Hybrid */}
            {activePreset === 'vitruvian' && (
              <div className="w-full h-full flex items-center justify-center relative select-none">
                {/* Traditional vitruvian geometry constraints */}
                <svg viewBox="0 0 400 400" className={`w-[340px] h-[340px] absolute z-10 transition-colors duration-500 opacity-25 ${
                  themeMode === 'parchment' ? 'text-[#4a321a]' : 'text-[#ffb800]'
                }`}>
                  {/* Perfect Circle constraint */}
                  <circle cx="200" cy="200" r="190" fill="none" stroke="currentColor" strokeWidth="0.8" />
                  {/* Perfect Square constraint */}
                  <rect x="10" y="10" width="380" height="380" fill="none" stroke="currentColor" strokeWidth="0.8" />
                  {/* Golden proportion center axes */}
                  <line x1="200" y1="0" x2="200" y2="400" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
                  <line x1="0" y1="200" x2="400" y2="200" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
                </svg>

                {/* Biomechanical Exoskeleton human wireframe vector representation */}
                <svg viewBox="0 0 400 800" className={`w-full h-full max-h-[480px] absolute z-0 transition-colors duration-500 ${
                  themeMode === 'parchment' ? 'text-[#4a321a]' : 'text-os-red'
                }`}>
                  {/* Back bones / Spinal support column */}
                  <motion.path 
                    d="M200 130 L200 450" 
                    fill="none" stroke="currentColor" strokeWidth="1.5" 
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
                  />

                  {/* Helmet / Head mechatronics */}
                  <motion.path 
                    d="M175 125 C175 105 225 105 225 125 L215 155 L185 155 Z" 
                    fill="none" stroke="currentColor" strokeWidth="2" 
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2 }}
                  />
                  {/* Visor sensor beam */}
                  <motion.line 
                    x1="185" y1="135" x2="215" y2="135" 
                    stroke={themeMode === 'parchment' ? '#b8860b' : '#ffb800'} strokeWidth="1.5" 
                  />

                  {/* Chest Cage & Rib stabilizers - adapts dynamically to scale sliders */}
                  <motion.path 
                    d={`M200 180 L${200 - 60 * biometricArmSpan} 220 L${200 - 65 * biometricArmSpan} 340 L200 ${360 * biometricTorsoHeight} L${200 + 65 * biometricArmSpan} 340 L${200 + 60 * biometricArmSpan} 220 Z`}
                    fill="none" stroke="currentColor" strokeWidth="1.8" 
                    transition={{ type: 'spring', stiffness: 80 }}
                  />
                  {/* Energy core containment */}
                  <circle 
                    cx="200" cy="250" r="22" 
                    fill="none" stroke={themeMode === 'parchment' ? '#b8860b' : '#ffb800'} strokeWidth="1.5" 
                    className="animate-pulse"
                  />
                  {/* Rotating internal core rotor */}
                  <g transform="translate(200, 250)">
                    {[0, 120, 240].map(angle => (
                      <line 
                        key={angle} x1="0" y1="0" 
                        x2={Math.cos((angle * Math.PI) / 180) * 16} y2={Math.sin((angle * Math.PI) / 180) * 16} 
                        stroke="currentColor" strokeWidth="1.2" 
                      />
                    ))}
                  </g>

                  {/* Left Arm Structural Exoskeleton member */}
                  <motion.path 
                    d={`M${200 - 60 * biometricArmSpan} 220 L${120 - 70 * biometricArmSpan} 210 L${50 - 80 * biometricArmSpan} 180`}
                    fill="none" stroke="currentColor" strokeWidth="2.2" 
                    transition={{ type: 'spring', stiffness: 80 }}
                  />
                  {/* Right Arm Structural Exoskeleton member */}
                  <motion.path 
                    d={`M${200 + 60 * biometricArmSpan} 220 L${280 + 70 * biometricArmSpan} 210 L${350 + 80 * biometricArmSpan} 180`}
                    fill="none" stroke="currentColor" strokeWidth="2.2" 
                    transition={{ type: 'spring', stiffness: 80 }}
                  />

                  {/* Left Leg member */}
                  <motion.path 
                    d={`M${200 - 35 * biometricArmSpan} ${360 * biometricTorsoHeight} L140 550 L110 740 L80 755`}
                    fill="none" stroke="currentColor" strokeWidth="2.2" 
                    transition={{ type: 'spring', stiffness: 80 }}
                  />
                  {/* Right Leg member */}
                  <motion.path 
                    d={`M${200 + 35 * biometricArmSpan} ${360 * biometricTorsoHeight} L260 550 L290 740 L320 755`}
                    fill="none" stroke="currentColor" strokeWidth="2.2" 
                    transition={{ type: 'spring', stiffness: 80 }}
                  />

                  {/* Biomechanical Joints (glowing node rings) */}
                  <circle cx="200" cy="135" r="5" fill="none" stroke="currentColor" strokeWidth="1" />
                  <circle cx="140" cy="215" r="4.5" fill="currentColor" />
                  <circle cx="260" cy="215" r="4.5" fill="currentColor" />
                  <circle cx="140" cy="550" r="5" fill="none" stroke="currentColor" strokeWidth="1" />
                  <circle cx="260" cy="550" r="5" fill="none" stroke="currentColor" strokeWidth="1" />
                </svg>

                {/* Interactive Hotspot Buttons overlying the Vitruvian model */}
                <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                  <div className="w-[320px] h-[480px] relative">
                    {anatomicalNodes.map(node => (
                      <button
                        key={node.id}
                        onClick={() => {
                          setSelectedNodeId(node.id);
                          addNotification(`Focused biometric analysis: ${node.name}`, "info");
                        }}
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                        className={`absolute w-7.5 h-7.5 -translate-x-1/2 -translate-y-1/2 rounded-full border flex items-center justify-center pointer-events-auto cursor-pointer transition-all ${
                          selectedNodeId === node.id
                            ? (themeMode === 'parchment' ? 'bg-[#4a321a] border-[#4a321a] text-[#eedfc3] shadow-md' : 'bg-os-cyan border-os-cyan text-black shadow-[0_0_15px_#ff3333]')
                            : (themeMode === 'parchment' ? 'bg-[#fcf9f2]/90 border-[#4a321a]/40 text-[#4a321a] hover:bg-[#eedfc3]' : 'bg-black/80 border-white/20 text-white hover:bg-white/10')
                        }`}
                        title={node.name}
                      >
                        <span className="text-[9px] font-black font-mono">
                          {node.id === 'cranium' ? 'I' : node.id === 'pectus' ? 'II' : node.id === 'manus_sin' ? 'III' : node.id === 'coxa' ? 'IV' : 'V'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="absolute top-4 left-6 text-left opacity-35 max-w-[200px] leading-relaxed hidden md:block">
                  <p className="text-[8.5px] font-black uppercase tracking-widest">Codex Annotation [Latin]</p>
                  <p className="text-[10px] italic font-serif leading-snug mt-1">"{selectedNode.codexLatin}"</p>
                </div>
              </div>
            )}

            {/* PRESET VIEWPORT 2: Leonardo's Aerial Screw (3D helical spinning) */}
            {activePreset === 'aerial' && (
              <div className="w-full h-full flex flex-col items-center justify-center relative select-none">
                {/* Helicopter 3D visual platform */}
                <div className="perspective-1000 w-full max-w-[340px] aspect-square flex items-center justify-center relative">
                  
                  {/* Rotating Helicoid spiral canopy */}
                  <motion.div 
                    style={{ 
                      transform: `rotateX(62deg) rotateY(10deg) rotateZ(${rotorAngle}deg)`, 
                      transformStyle: 'preserve-3d' 
                    }}
                    className="w-72 h-72 relative transition-transform duration-75"
                  >
                    <svg viewBox="0 0 100 100" className={`w-full h-full ${themeMode === 'parchment' ? 'text-[#4a321a]' : 'text-os-cyan'}`}>
                      {/* Compass guide circle rings */}
                      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="3 3" />
                      <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 2" />
                      
                      {/* Inner struts radiating outward from shaft */}
                      {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
                        <line 
                          key={deg}
                          x1="50" y1="50"
                          x2={50 + Math.cos((deg * Math.PI) / 180) * 46}
                          y2={50 + Math.sin((deg * Math.PI) / 180) * 46}
                          stroke="currentColor" strokeWidth="0.8"
                          opacity="0.75"
                        />
                      ))}

                      {/* Continuous Helical spiral canvas canopy profile */}
                      <path 
                        d="M 50,50 
                           A 12,12 0 0,1 62,50 
                           A 20,20 0 0,1 50,70 
                           A 28,28 0 0,1 22,50 
                           A 36,36 0 0,1 50,14 
                           A 44,44 0 0,1 94,50"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        className="opacity-95"
                      />

                      {/* Outer heavy tension rope frame */}
                      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  </motion.div>

                  {/* Static structural vertical axis shaft and base */}
                  <div className="absolute inset-x-0 bottom-2 flex flex-col items-center pointer-events-none">
                    {/* Vertically converging core shaft */}
                    <div className={`w-1.5 h-44 ${themeMode === 'parchment' ? 'bg-[#4a321a]/85' : 'bg-gradient-to-t from-os-red to-os-cyan'} rounded`} />
                    {/* Supporting diagonal structural braces */}
                    <div className="w-24 h-12 relative flex items-end justify-center">
                      <svg viewBox="0 0 100 40" className={`w-full h-full ${themeMode === 'parchment' ? 'text-[#4a321a]' : 'text-white/40'}`}>
                        <line x1="10" y1="40" x2="50" y2="0" stroke="currentColor" strokeWidth="1.5" />
                        <line x1="90" y1="40" x2="50" y2="0" stroke="currentColor" strokeWidth="1.5" />
                        <rect x="5" y="36" width="90" height="4" fill="currentColor" rx="1" />
                      </svg>
                    </div>
                  </div>

                </div>

                {/* Spin controls HUD */}
                <div className="absolute bottom-4 right-6 flex items-center gap-3 z-30">
                  <button
                    onClick={() => setIsRotorSpinning(!isRotorSpinning)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer border ${
                      themeMode === 'parchment' 
                        ? 'bg-[#4a321a]/10 border-[#4a321a]/20 text-[#4a321a] hover:bg-[#4a321a]/25' 
                        : 'bg-os-cyan/15 border-os-cyan/30 text-os-cyan hover:bg-os-cyan/25'
                    }`}
                  >
                    {isRotorSpinning ? <Pause size={14} /> : <Play size={14} />}
                  </button>
                  <div className="text-left leading-none font-mono text-[9px] uppercase tracking-wider opacity-60">
                    <p className="font-bold">AERODYNAMIC_THRUST</p>
                    <p className="text-xs font-black mt-1">{calculatedThrust} N</p>
                  </div>
                </div>
              </div>
            )}

            {/* PRESET VIEWPORT 3: Interlocking Gear Clock Engine */}
            {activePreset === 'gears' && (
              <div className="w-full h-full flex items-center justify-center relative select-none">
                
                {/* Dynamic rotating gear trains */}
                <div className="w-full max-w-[360px] aspect-square relative flex items-center justify-center">
                  
                  <svg viewBox="0 0 400 400" className={`w-full h-full ${themeMode === 'parchment' ? 'text-[#4a321a]' : 'text-os-cyan'}`}>
                    
                    {/* Bounding template frame */}
                    <rect x="20" y="20" width="360" height="360" rx="12" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />
                    
                    {/* Left Driver Gear (Large Gear wheel) */}
                    <g transform={`translate(140, 200) rotate(${gearRotation})`}>
                      <path 
                        d={getGearPath(0, 0, 80, gearTeeth1)} 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="1.6" 
                      />
                      {/* Gear spokes */}
                      <circle cx="0" cy="0" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
                      {[0, 60, 120, 180, 240, 300].map(deg => (
                        <line 
                          key={deg} x1="0" y1="0" 
                          x2={Math.cos((deg * Math.PI) / 180) * 80} y2={Math.sin((deg * Math.PI) / 180) * 80} 
                          stroke="currentColor" strokeWidth="0.8" 
                        />
                      ))}
                      <circle cx="0" cy="0" r="4" fill="currentColor" />
                    </g>

                    {/* Right Driven Pinion Gear (Small Gear wheel) */}
                    {/* Position offset matches spacing of (r1 + r2) + tooth depth overlap */}
                    <g transform={`translate(${140 + 80 + (80 * (gearTeeth2 / gearTeeth1)) + 6.2}, 200) rotate(${-gearRotation * (gearTeeth1 / gearTeeth2) + (180 / gearTeeth2)})`}>
                      <path 
                        d={getGearPath(0, 0, 80 * (gearTeeth2 / gearTeeth1), gearTeeth2)} 
                        fill="none" 
                        stroke={themeMode === 'parchment' ? '#b8860b' : '#ffb800'} 
                        strokeWidth="1.4" 
                      />
                      {/* Spokes */}
                      <circle cx="0" cy="0" r="6" fill="none" stroke="currentColor" strokeWidth="0.8" />
                      {[0, 90, 180, 270].map(deg => (
                        <line 
                          key={deg} x1="0" y1="0" 
                          x2={Math.cos((deg * Math.PI) / 180) * (80 * (gearTeeth2 / gearTeeth1))} y2={Math.sin((deg * Math.PI) / 180) * (80 * (gearTeeth2 / gearTeeth1))} 
                          stroke="currentColor" strokeWidth="0.8" 
                          opacity="0.6"
                        />
                      ))}
                      <circle cx="0" cy="0" r="3.2" fill="currentColor" />
                    </g>

                    {/* Centerline indicators */}
                    <line x1="40" y1="200" x2="360" y2="200" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 3" opacity="0.4" />
                  </svg>

                </div>

                <div className="absolute bottom-4 left-6 text-left font-mono text-[9px] uppercase tracking-wider opacity-60">
                  <p className="font-bold">VELOCITY_RATIO</p>
                  <p className="text-xs font-black mt-1">1 : {velocityRatio}</p>
                </div>
              </div>
            )}

            {/* Bounding corner framing tabs for classical draftsman blueprint feel */}
            <div className={`absolute top-3 left-3 w-4 h-4 border-t border-l ${themeMode === 'parchment' ? 'border-[#4a321a]/40' : 'border-white/20'}`} />
            <div className={`absolute top-3 right-3 w-4 h-4 border-t border-r ${themeMode === 'parchment' ? 'border-[#4a321a]/40' : 'border-white/20'}`} />
            <div className={`absolute bottom-3 left-3 w-4 h-4 border-b border-l ${themeMode === 'parchment' ? 'border-[#4a321a]/40' : 'border-white/20'}`} />
            <div className={`absolute bottom-3 right-3 w-4 h-4 border-b border-r ${themeMode === 'parchment' ? 'border-[#4a321a]/40' : 'border-white/20'}`} />
          </div>

          {/* FLOATING ACTION TOOLBAR OVER THE SKETCHPAD (Interactive drafting tools) */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 p-1 rounded-2xl border bg-black/60 backdrop-blur-md shadow-2xl border-white/10 text-white font-mono text-[10px]">
            
            {/* Sketch tool icons */}
            <div className="flex items-center gap-1 border-r border-white/10 pr-2">
              {[
                { id: 'pencil', icon: PenTool, label: 'Free' },
                { id: 'line', icon: Ruler, label: 'Line' },
                { id: 'circle', icon: Compass, label: 'Circle' },
                { id: 'rect', icon: Boxes, label: 'Rect' }
              ].map(tool => (
                <button
                  key={tool.id}
                  onClick={() => {
                    setActiveTool(tool.id as any);
                    addNotification(`Drafting tool armed: ${tool.label.toUpperCase()}`, "info");
                  }}
                  className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer text-[8px] uppercase tracking-wider font-bold transition-all ${
                    activeTool === tool.id 
                      ? 'bg-os-cyan text-black font-black' 
                      : 'hover:bg-white/5 opacity-60 hover:opacity-100'
                  }`}
                  title={`${tool.label} Drawing Tool`}
                >
                  <tool.icon size={11} />
                  <span>{tool.label}</span>
                </button>
              ))}
              <button
                onClick={() => {
                  setActiveTool('none');
                  addNotification("Drawing tools disarmed. HUD Viewport navigation activated.", "info");
                }}
                className={`px-2 py-1.5 rounded-lg text-[8px] uppercase tracking-wider font-bold transition-all cursor-pointer ${
                  activeTool === 'none' ? 'bg-white/20 text-white' : 'opacity-60 hover:opacity-100'
                }`}
                title="Pan/Inspect Viewport"
              >
                Inspect
              </button>
            </div>

            {/* Grid & Guide Toggles */}
            <div className="flex items-center gap-1 border-r border-white/10 pr-2 px-1">
              <button
                onClick={() => {
                  setShowPerspectiveGrid(!showPerspectiveGrid);
                  addNotification(showPerspectiveGrid ? "Perspective guides hidded." : "Renaissance perspective grid overlaid.", "info");
                }}
                className={`p-1.5 rounded-lg cursor-pointer transition-all ${
                  showPerspectiveGrid ? 'text-os-cyan bg-os-cyan/10' : 'opacity-40 hover:opacity-100'
                }`}
                title="Toggle Perspective Grid"
              >
                <Layers size={12} />
              </button>
              <button
                onClick={() => {
                  setShowGoldenSpiral(!showGoldenSpiral);
                  addNotification(showGoldenSpiral ? "Golden spiral hidden." : "Golden mean (1.618) spiral guide overlaid.", "info");
                }}
                className={`p-1.5 rounded-lg cursor-pointer transition-all ${
                  showGoldenSpiral ? 'text-os-cyan bg-os-cyan/10' : 'opacity-40 hover:opacity-100'
                }`}
                title="Toggle Golden Ratio Spiral"
              >
                <Scale size={12} />
              </button>
            </div>

            {/* Clear and undo */}
            <div className="flex items-center gap-1 pl-1">
              <button
                onClick={undoLastStroke}
                disabled={drawHistory.length === 0}
                className="p-1.5 rounded-lg hover:bg-white/5 disabled:opacity-20 cursor-pointer text-white"
                title="Undo Sketch"
              >
                <Undo size={12} />
              </button>
              <button
                onClick={clearSketchpad}
                disabled={drawHistory.length === 0}
                className="p-1.5 rounded-lg hover:bg-white/5 disabled:opacity-20 cursor-pointer text-red-400"
                title="Clear Sketches"
              >
                <Trash2 size={12} />
              </button>
            </div>

          </div>

        </div>

        {/* RIGHT WORKSPACE PANEL: Mathematical calculations & Scientific metadata */}
        <div className={`col-span-12 lg:col-span-4 p-5 md:p-6 flex flex-col justify-between overflow-y-auto font-mono text-[10px] space-y-5 select-none ${
          themeMode === 'parchment' ? 'bg-[#4a321a]/3 text-[#4a321a]' : 'bg-black/40 text-white'
        }`}>
          
          {/* SECTION 1: Dynamic Golden Proportion Calculator (Mathematics panel) */}
          <div className={`p-4 border rounded-2xl flex flex-col gap-3.5 ${
            themeMode === 'parchment' ? 'border-[#4a321a]/15 bg-[#fbf9f4]' : 'border-white/5 bg-black/50'
          }`}>
            <span className={`text-[8px] font-black uppercase tracking-widest block border-b pb-1.5 ${
              themeMode === 'parchment' ? 'border-[#4a321a]/10 text-[#b8860b]' : 'border-white/5 text-os-cyan'
            }`}>
              ● SECTIO AUREA // THE GOLDEN PROPORTIONS
            </span>

            <div className="flex justify-between items-center text-[9.5px]">
              <span className="opacity-60 uppercase font-bold">Base Dimension Scale (A)</span>
              <span className="font-black">{baseDimension} mm</span>
            </div>

            <input 
              type="range"
              min="20"
              max="250"
              value={baseDimension}
              onChange={(e) => setBaseDimension(parseInt(e.target.value))}
              className="w-full h-1 accent-os-cyan bg-white/5 cursor-pointer rounded-full"
            />

            <div className={`grid grid-cols-2 gap-3 pt-1 text-[9px] ${themeMode === 'parchment' ? 'text-[#4a321a]/80' : 'text-white/70'}`}>
              <div className={`p-2 border rounded-xl flex flex-col ${themeMode === 'parchment' ? 'bg-[#4a321a]/5 border-[#4a321a]/10' : 'bg-white/[0.02] border-white/5'}`}>
                <span className="opacity-60 text-[7px] uppercase font-bold">Minor Proportion (B)</span>
                <span className="font-bold text-xs mt-0.5">{(baseDimension / 1.618033).toFixed(1)} mm</span>
              </div>
              <div className={`p-2 border rounded-xl flex flex-col ${themeMode === 'parchment' ? 'bg-[#4a321a]/5 border-[#4a321a]/10' : 'bg-white/[0.02] border-white/5'}`}>
                <span className="opacity-60 text-[7px] uppercase font-bold">Major Golden Mean (C)</span>
                <span className="font-bold text-xs text-os-cyan mt-0.5">{goldenProportion.toFixed(1)} mm</span>
              </div>
            </div>

            {/* Dynamic Fibonacci Sequence tracker block */}
            <div className="space-y-1 pt-1">
              <span className="text-[7.5px] opacity-60 uppercase font-black tracking-widest">Fibonacci Structural Grid (N=8)</span>
              <div className="flex gap-1">
                {fibonacciSequence.map((val, idx) => (
                  <div 
                    key={idx} 
                    className={`flex-1 text-center py-1 rounded text-[8px] font-bold ${
                      idx === 5 
                        ? (themeMode === 'parchment' ? 'bg-[#4a321a] text-[#eedfc3]' : 'bg-os-cyan text-black')
                        : (themeMode === 'parchment' ? 'bg-[#4a321a]/10' : 'bg-white/5')
                    }`}
                    title={`Fibonacci F(${idx+2}): ${val}`}
                  >
                    {val}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 2: Dynamic Preset Specifications Sub-Panel */}
          <div className="flex-1 min-h-0 flex flex-col justify-center">
            
            <AnimatePresence mode="wait">
              {/* Preset 1: Vitruvian Exo-Stabilizer Analysis Panel */}
              {activePreset === 'vitruvian' && (
                <motion.div
                  key="v-pane"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4"
                >
                  <div className={`p-4.5 border rounded-2xl text-left space-y-3.5 ${
                    themeMode === 'parchment' ? 'border-[#4a321a]/15 bg-[#fbf9f4]' : 'border-white/5 bg-black/50'
                  }`}>
                    <div className="flex justify-between items-center">
                      <span className={`text-[8.5px] font-black uppercase tracking-wider block ${
                        themeMode === 'parchment' ? 'text-[#b8860b]' : 'text-os-cyan'
                      }`}>
                        Biometric Exo morph ratios
                      </span>
                      <Activity className="animate-pulse text-os-cyan" size={12} />
                    </div>

                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between font-bold text-[8.5px]">
                          <span className="opacity-50 uppercase">Arm Span Extension Multiplier</span>
                          <span className="text-os-cyan">{(biometricArmSpan).toFixed(2)}x</span>
                        </div>
                        <input 
                          type="range"
                          min="0.8" max="1.3" step="0.05"
                          value={biometricArmSpan}
                          onChange={(e) => setBiometricArmSpan(parseFloat(e.target.value))}
                          className="w-full h-1 accent-os-cyan bg-white/5 cursor-pointer rounded-full"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between font-bold text-[8.5px]">
                          <span className="opacity-50 uppercase">Spinal Torso Compression Factor</span>
                          <span className="text-os-cyan">{(biometricTorsoHeight).toFixed(2)}x</span>
                        </div>
                        <input 
                          type="range"
                          min="0.9" max="1.2" step="0.02"
                          value={biometricTorsoHeight}
                          onChange={(e) => setBiometricTorsoHeight(parseFloat(e.target.value))}
                          className="w-full h-1 accent-os-cyan bg-white/5 cursor-pointer rounded-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Anatomical focused specification card */}
                  <div className={`p-4.5 border rounded-2xl text-left space-y-2 ${
                    themeMode === 'parchment' ? 'border-[#4a321a]/15 bg-[#fbf9f4]' : 'border-white/5 bg-black/50'
                  }`}>
                    <span className="text-[7.5px] font-black tracking-widest uppercase opacity-45 block">Subsystem Alignment: Code {selectedNodeId.toUpperCase()}</span>
                    <h3 className={`font-display font-black text-[11px] uppercase tracking-wide leading-none ${themeMode === 'parchment' ? 'text-[#4a321a]' : 'text-white'}`}>
                      {selectedNode.name}
                    </h3>
                    <p className={`text-[10px] italic leading-normal font-serif ${themeMode === 'parchment' ? 'text-[#4a321a]/70' : 'text-white/60'}`}>
                      "{selectedNode.codexLatin}"
                    </p>
                    <p className={`text-[9.5px] leading-relaxed border-t pt-2 mt-1.5 ${
                      themeMode === 'parchment' ? 'border-[#4a321a]/10 text-[#4a321a]/85' : 'border-white/5 text-white/70'
                    }`}>
                      {selectedNode.mechanicalSpec}
                    </p>
                    <div className="flex items-center gap-1.5 text-[8.5px] font-bold text-os-cyan mt-1">
                      <Info size={10} />
                      <span>{selectedNode.ratioNotes}</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Preset 2: Aerial Screw Helical Pitch Controls */}
              {activePreset === 'aerial' && (
                <motion.div
                  key="a-pane"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4"
                >
                  <div className={`p-4.5 border rounded-2xl text-left space-y-3.5 ${
                    themeMode === 'parchment' ? 'border-[#4a321a]/15 bg-[#fbf9f4]' : 'border-white/5 bg-black/50'
                  }`}>
                    <span className={`text-[8.5px] font-black uppercase tracking-wider block ${
                      themeMode === 'parchment' ? 'text-[#b8860b]' : 'text-os-cyan'
                    }`}>
                      Helix Rotational Aerodynamics
                    </span>

                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between font-bold text-[8.5px]">
                          <span className="opacity-50 uppercase">Rotor Drive Speed (RPM)</span>
                          <span className="text-os-cyan">{rotorSpeed} RPM</span>
                        </div>
                        <input 
                          type="range"
                          min="10" max="150" step="5"
                          value={rotorSpeed}
                          onChange={(e) => setRotorSpeed(parseInt(e.target.value))}
                          className="w-full h-1 accent-os-cyan bg-white/5 cursor-pointer rounded-full"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between font-bold text-[8.5px]">
                          <span className="opacity-50 uppercase">Blade Spiral Pitch Angle</span>
                          <span className="text-os-cyan">{bladePitch}° Pitch</span>
                        </div>
                        <input 
                          type="range"
                          min="15" max="60" step="1"
                          value={bladePitch}
                          onChange={(e) => setBladePitch(parseInt(e.target.value))}
                          className="w-full h-1 accent-os-cyan bg-white/5 cursor-pointer rounded-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Flight telemetry readings */}
                  <div className={`p-4.5 border rounded-2xl text-left space-y-2.5 ${
                    themeMode === 'parchment' ? 'border-[#4a321a]/15 bg-[#fbf9f4]' : 'border-white/5 bg-black/50'
                  }`}>
                    <span className="text-[7.5px] font-black tracking-widest uppercase opacity-45 block">HELICAL_LIFT_FLUID_DYNAMICS</span>
                    
                    <div className="space-y-2 text-[9px]">
                      <div className="flex justify-between border-b pb-1 border-black/5">
                        <span className="opacity-60">Lift Coeff ($C_L$)</span>
                        <span className="font-bold text-white">{(Math.sin((bladePitch*Math.PI)/180) * 1.4).toFixed(3)}</span>
                      </div>
                      <div className="flex justify-between border-b pb-1 border-black/5">
                        <span className="opacity-60">Vertical Thrust force</span>
                        <span className="font-black text-os-cyan">{calculatedThrust} Newtons</span>
                      </div>
                      <div className="flex justify-between border-b pb-1 border-black/5">
                        <span className="opacity-60">Centrifugal Air Drag</span>
                        <span className="font-bold text-white">{airDensityDrag} kg·m/s²</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-60">Aerodynamic Efficiency Ratio</span>
                        <span className="font-bold text-green-400">{(parseFloat(calculatedThrust)/parseFloat(airDensityDrag) || 1).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Preset 3: Mechanical Gear Tooth calculations */}
              {activePreset === 'gears' && (
                <motion.div
                  key="g-pane"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4"
                >
                  <div className={`p-4.5 border rounded-2xl text-left space-y-3.5 ${
                    themeMode === 'parchment' ? 'border-[#4a321a]/15 bg-[#fbf9f4]' : 'border-white/5 bg-black/50'
                  }`}>
                    <span className={`text-[8.5px] font-black uppercase tracking-wider block ${
                      themeMode === 'parchment' ? 'text-[#b8860b]' : 'text-os-cyan'
                    }`}>
                      Kinematic Gear Transmission
                    </span>

                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between font-bold text-[8.5px]">
                          <span className="opacity-50 uppercase">Driving Wheel Cogs (Z1)</span>
                          <span className="text-os-cyan">{gearTeeth1} Teeth</span>
                        </div>
                        <input 
                          type="range"
                          min="16" max="32" step="1"
                          value={gearTeeth1}
                          onChange={(e) => setGearTeeth1(parseInt(e.target.value))}
                          className="w-full h-1 accent-os-cyan bg-white/5 cursor-pointer rounded-full"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between font-bold text-[8.5px]">
                          <span className="opacity-50 uppercase">Driven Pinion Cogs (Z2)</span>
                          <span className="text-os-cyan">{gearTeeth2} Teeth</span>
                        </div>
                        <input 
                          type="range"
                          min="6" max="15" step="1"
                          value={gearTeeth2}
                          onChange={(e) => setGearTeeth2(parseInt(e.target.value))}
                          className="w-full h-1 accent-os-cyan bg-white/5 cursor-pointer rounded-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Gear ratios readouts */}
                  <div className={`p-4.5 border rounded-2xl text-left space-y-2.5 ${
                    themeMode === 'parchment' ? 'border-[#4a321a]/15 bg-[#fbf9f4]' : 'border-white/5 bg-black/50'
                  }`}>
                    <span className="text-[7.5px] font-black tracking-widest uppercase opacity-45 block">COUPLED_RATIO_ANALYSIS</span>
                    
                    <div className="space-y-2 text-[9px]">
                      <div className="flex justify-between border-b pb-1 border-black/5">
                        <span className="opacity-60">Gear Tooth Ratio ($i$)</span>
                        <span className="font-bold text-white">{velocityRatio} : 1</span>
                      </div>
                      <div className="flex justify-between border-b pb-1 border-black/5">
                        <span className="opacity-60">Output Speed Multiplier</span>
                        <span className="font-bold text-os-cyan">{velocityRatio}x Velocity</span>
                      </div>
                      <div className="flex justify-between border-b pb-1 border-black/5">
                        <span className="opacity-60">Base Torque Multiplier</span>
                        <span className="font-bold text-white">{(1/parseFloat(velocityRatio)).toFixed(2)}x Torque</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-60">Driven Mechanical Advantage</span>
                        <span className="font-bold text-green-400">{(gearTeeth1 / gearTeeth2 > 1 ? 'High Speed' : 'High Torque')}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* SECTION 3: Bottom Action compile & export controls */}
          <div className="space-y-3 pt-4 select-none shrink-0">
            <div className="flex gap-2">
              <button
                onClick={triggerDownloadReport}
                className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-black text-[9px] uppercase tracking-wider cursor-pointer transition-all border ${
                  themeMode === 'parchment' 
                    ? 'bg-[#4a321a] text-[#eedfc3] border-[#4a321a] hover:bg-[#4a321a]/95' 
                    : 'bg-os-cyan text-black border-os-cyan hover:bg-os-cyan/95 shadow-[0_0_15px_rgba(226,54,54,0.25)]'
                }`}
              >
                <Download size={12} />
                <span>Compile Blueprint</span>
              </button>
            </div>
            <p className="text-[7px] text-center opacity-40 uppercase tracking-[0.2em] leading-normal font-sans">
              "Art is the queen of all sciences, conferring knowledge to all the generations of the world." — Leonardo da Vinci
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
