import React from 'react';
import { motion } from 'motion/react';

export const TechnicalBlueprintSuit: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-8 overflow-hidden bg-black/40 border border-white/5 rounded-3xl group">
      {/* Schematic Lines Background */}
      <div className="absolute inset-0 opacity-15 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #E23636 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(to right, #E23636 0.5px, transparent 0.5px), linear-gradient(to bottom, #E23636 0.5px, transparent 0.5px)', backgroundSize: '100px 100px' }} />

      {/* Biomechanical Exoskeleton CAD Wireframe */}
      <svg viewBox="0 0 400 800" className="w-full h-full max-h-[600px] text-os-cyan drop-shadow-[0_0_20px_rgba(226,54,54,0.45)]">
        {/* Helmet / Head unit */}
        <motion.path
          d="M200 50 L240 70 L240 120 L200 140 L160 120 L160 70 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        {/* Eyes Visor / Sensor sweep */}
        <motion.path
          d="M175 90 L195 95 L200 95 L205 95 L225 90 L220 100 L200 105 L180 100 Z"
          fill="none"
          stroke="#ffb800"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />
        {/* Torso / Frame cage */}
        <motion.path
          d="M160 140 L100 180 L100 350 L200 400 L300 350 L300 180 L240 140 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay: 0.5 }}
        />
        {/* Left Arm structural member */}
        <motion.path
          d="M100 180 L40 220 L40 450 L70 480"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1 }}
        />
        {/* Right Arm structural member */}
        <motion.path
          d="M300 180 L360 220 L360 450 L330 480"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1 }}
        />
        {/* Legs / Lower extremities framework */}
        <motion.path
          d="M140 400 L120 700 L180 750 L200 700 L220 750 L280 700 L260 400"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay: 1.5 }}
        />

        {/* Structural Stress Distribution Lattice over Torso */}
        <motion.path
          d="M200 230 L200 330 M200 270 Q225 280 250 260 M200 270 Q175 280 150 260 M200 280 Q230 300 265 295 M200 280 Q170 300 135 295 M200 295 Q235 320 255 350 M200 295 Q165 320 145 350 M200 245 Q215 235 230 200 M200 245 Q185 235 170 200"
          fill="none"
          stroke="#ffb800"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, delay: 1 }}
        />
        
        {/* Internal Mechanical Details (Gears/Wires) */}
        {[...Array(5)].map((_, i) => (
          <motion.circle
            key={i}
            cx={150 + i * 20}
            cy={250 + i * 30}
            r={5 + Math.random() * 10}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="2 2"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        ))}

        {/* Arc Reactor Core Light in Suit */}
        <motion.circle
          cx="200"
          cy="260"
          r="15"
          className="text-white fill-white/20"
          stroke="#ffb800"
          strokeWidth="2"
          animate={{ opacity: [0.5, 1, 0.5], r: [15, 18, 15] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>

      {/* Floating Labels & Annotations */}
      <div className="absolute top-1/4 left-10 text-[8px] font-mono border-l border-os-cyan pl-2">
        <p className="text-os-cyan font-bold">EXO-BIOMETRIC_VISOR_V11</p>
        <p className="text-white/40">SENS_INIT: 0.002ms</p>
        <p className="text-white/40">HUD_RES: 8K_HDR_NEURAL</p>
      </div>

      <div className="absolute top-1/2 right-10 text-[8px] font-mono border-r border-os-cyan pr-2 text-right">
        <p className="text-os-cyan font-bold">HYBRID_LATTICE_CAPACITOR</p>
        <p className="text-white/40">CHARGE_RATE: 4.8GW/s</p>
        <p className="text-white/40">TENSILE_STRENGTH: 1200 MPa</p>
      </div>

      <div className="absolute bottom-1/4 left-20 text-[8px] font-mono border-l border-os-orange pl-2">
        <p className="text-os-orange font-bold">SYSTEM_REGENERATION_ARRAY</p>
        <p className="text-white/40">THERMAL_SYNC: ACTIVE</p>
        <p className="text-white/40">COUNT: 1.2M ACTIVE</p>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-mono text-os-cyan/40 tracking-[0.5em] animate-pulse">
        ENGINEERING_SYSTEMS_CONFIDENTIAL // DO_NOT_DISTRIBUTE
      </div>
    </div>
  );
};
