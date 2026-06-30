import React from 'react';
import { motion } from 'motion/react';

export const BlueprintDecorations: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 opacity-15">
      {/* Blueprint grid with technical axis numbers */}
      <div className="absolute inset-0 flex justify-between px-12 py-12 font-mono text-[8px] text-os-cyan/30">
        <div>LAT_77.108 / LON_11.839</div>
        <div>ENG_OS_KERN.SYS</div>
        <div>FRAME_STABILITY: 99.98%</div>
        <div>GRID_REF: E-85</div>
      </div>

      <div className="absolute inset-0 flex justify-between items-end px-12 py-12 font-mono text-[8px] text-os-cyan/30">
        <div>ALTITUDE_REF: 420KM</div>
        <div>DIVISION_CORE: ACTIVE</div>
        <div>CALIBRATION: ACTIVE</div>
        <div>SECURE_SHIELD: 100%</div>
      </div>

      {/* Grid Coordinates Overlay */}
      <div className="absolute top-1/4 left-1/3 font-mono text-[9px] text-os-cyan/20 border-l border-t border-os-cyan/20 p-2">
        <p className="font-bold">COORDS: 42.42 // -108.31</p>
        <p>MATRIX: [1, 0, 0, 1]</p>
        <p>P_LOSS: 0.00%</p>
      </div>

      <div className="absolute bottom-1/4 right-1/4 font-mono text-[9px] text-os-cyan/20 border-r border-b border-os-cyan/20 p-2 text-right">
        <p className="font-bold">ROT_SPEED: 1.25 RAD/S</p>
        <p>REDUNDANCY: 3X</p>
        <p>FREQ: 433.92 MHz</p>
      </div>

      {/* Floating Physics & Engineering Formulas */}
      <div className="absolute top-12 left-10 max-w-xs font-mono text-[10px] text-os-cyan/15 space-y-1">
        <p className="text-xs font-bold text-os-cyan/25">// KINEMATIC_CALCULATIONS</p>
        <p>v² = u² + 2as</p>
        <p>F_drag = 0.5 * ρ * v² * Cd * A</p>
        <p>τ = I * α</p>
      </div>

      <div className="absolute top-1/2 right-12 max-w-xs font-mono text-[10px] text-os-cyan/15 space-y-1 text-right">
        <p className="text-xs font-bold text-os-cyan/25">// QUANTUM_FIELD_RESONANCE</p>
        <p>iℏ ∂/∂t |Ψ(t)⟩ = Ĥ |Ψ(t)⟩</p>
        <p>E = ℏω</p>
        <p>Δx · Δp ≥ ℏ/2</p>
      </div>

      <div className="absolute bottom-20 left-12 max-w-xs font-mono text-[10px] text-os-cyan/15 space-y-1">
        <p className="text-xs font-bold text-os-cyan/25">// ELECTROMAGNETIC_FLUX</p>
        <p>∇ · E = ρ / ε₀</p>
        <p>∇ × B = μ₀(J + ε₀ ∂E/∂t)</p>
        <p>∮ B · dl = μ₀ I_enclosed</p>
      </div>

      {/* SVG Engineering Drawings / Outlines */}
      <svg className="absolute inset-0 w-full h-full text-os-cyan/10" xmlns="http://www.w3.org/2000/svg">
        {/* Large Blueprint Radial Dial in bottom-left */}
        <g transform="translate(100, 650)" className="animate-spin-slow">
          <circle r="180" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" />
          <circle r="150" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle r="145" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="20 40" />
          <circle r="100" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="-190" y1="0" x2="190" y2="0" stroke="currentColor" strokeWidth="0.5" />
          <line x1="0" y1="-190" x2="0" y2="190" stroke="currentColor" strokeWidth="0.5" />
        </g>

        {/* Dynamic Finite Element Analysis (FEA) Stress Truss & Node Mesh representation in top-right */}
        <g transform="translate(1100, 150)">
          {/* FEA Node lattice structure representing structural load balances */}
          <polygon points="0,0 80,-40 120,40 40,100 -60,80 -100,0 -40,-80" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
          <polygon points="0,0 40,-20 60,20 20,50 -30,40 -50,0 -20,-40" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <line x1="0" y1="0" x2="160" y2="-80" stroke="currentColor" strokeWidth="0.5" />
          <line x1="0" y1="0" x2="240" y2="80" stroke="currentColor" strokeWidth="0.5" />
          <line x1="0" y1="0" x2="80" y2="200" stroke="currentColor" strokeWidth="0.5" />
          <line x1="0" y1="0" x2="-120" y2="160" stroke="currentColor" strokeWidth="0.5" />
          <line x1="0" y1="0" x2="-200" y2="0" stroke="currentColor" strokeWidth="0.5" />
          <line x1="0" y1="0" x2="-80" y2="-160" stroke="currentColor" strokeWidth="0.5" />

          {/* Core nodes */}
          <circle cx="0" cy="0" r="4" className="fill-os-cyan" />
          <circle cx="80" cy="-40" r="2" className="fill-os-cyan" />
          <circle cx="120" cy="40" r="2" className="fill-os-cyan" />
          <circle cx="40" cy="100" r="2" className="fill-os-cyan" />
          <circle cx="-60" cy="80" r="2" className="fill-os-cyan" />
          <circle cx="-100" cy="0" r="2" className="fill-os-cyan" />
          <circle cx="-40" cy="-80" r="2" className="fill-os-cyan" />
        </g>

        {/* Mechanical CAD Assembly Draw under the center panel */}
        <g transform="translate(600, 350)" className="opacity-70">
          <rect x="-150" y="-100" width="300" height="200" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 10" />
          <circle cx="0" cy="0" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="0" cy="0" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
          <polygon points="0,-90 -90,0 0,90 90,0" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <line x1="-160" y1="0" x2="160" y2="0" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 5" />
          <line x1="0" y1="-110" x2="0" y2="110" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 5" />
        </g>
      </svg>
    </div>
  );
};
