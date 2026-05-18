import React from 'react';
import { motion } from 'motion/react';

export const TechnicalBlueprintSuit: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-8 overflow-hidden bg-black/40 border border-white/5 rounded-3xl group">
      {/* Schematic Lines Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #00f2ff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(to right, #00f2ff 1px, transparent 1px), linear-gradient(to bottom, #00f2ff 1px, transparent 1px)', backgroundSize: '100px 100px' }} />

      {/* Main Suit SVG (Simplified Iron Man Silhouette) */}
      <svg viewBox="0 0 400 800" className="w-full h-full max-h-[600px] text-os-cyan drop-shadow-[0_0_20px_rgba(0,242,255,0.3)]">
        <motion.path
          d="M200 50 L240 70 L240 120 L200 140 L160 120 L160 70 Z" /* Helmet */
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.path
          d="M160 140 L100 180 L100 350 L200 400 L300 350 L300 180 L240 140 Z" /* Torso */
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay: 0.5 }}
        />
        <motion.path
          d="M100 180 L40 220 L40 450 L70 480" /* Left Arm */
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1 }}
        />
        <motion.path
          d="M300 180 L360 220 L360 450 L330 480" /* Right Arm */
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1 }}
        />
        <motion.path
          d="M140 400 L120 700 L180 750 L200 700 L220 750 L280 700 L260 400" /* Legs */
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay: 1.5 }}
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

        {/* Reactor Core Light in Suit */}
        <motion.circle
          cx="200"
          cy="260"
          r="15"
          className="text-os-cyan fill-os-cyan/20"
          stroke="currentColor"
          strokeWidth="2"
          animate={{ opacity: [0.3, 1, 0.3], r: [15, 18, 15] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>

      {/* Floating Labels & Annotations */}
      <div className="absolute top-1/4 left-10 text-[8px] font-mono border-l border-os-cyan pl-2">
        <p className="text-os-cyan font-bold">MK-LV.7_HELMET_ARRAY</p>
        <p className="text-white/40">SENS_INIT: 0.002ms</p>
        <p className="text-white/40">HUD_RES: 8K_HDR</p>
      </div>

      <div className="absolute top-1/2 right-10 text-[8px] font-mono border-r border-os-cyan pr-2 text-right">
        <p className="text-os-cyan font-bold">PLASMA_CELL_CAPACITOR</p>
        <p className="text-white/40">CHARGE_RATE: 4.8GW/s</p>
        <p className="text-white/40">STABILITY: 99.98%</p>
      </div>

      <div className="absolute bottom-1/4 left-20 text-[8px] font-mono border-l border-os-orange pl-2">
        <p className="text-os-orange font-bold">NANO_REPAIR_NANITES</p>
        <p className="text-white/40">REGEN_LINK: ACTIVE</p>
        <p className="text-white/40">COUNT: 1.2M</p>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-mono text-os-cyan/40 tracking-[0.5em] animate-pulse">
        STARK_INDUSTRIES_CONFIDENTIAL // DO_NOT_DISTRIBUTE
      </div>
    </div>
  );
};
