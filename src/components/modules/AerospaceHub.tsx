import React from 'react';
import { motion } from 'motion/react';
import { Rocket, MapPin, Globe, Wind } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Sphere, Stars, OrbitControls } from '@react-three/drei';
import { useOSStore } from '../../store/useOSStore';

const Planet: React.FC = () => (
  <group>
    <Sphere args={[1, 64, 64]}>
       <meshStandardMaterial 
          color="#E23636" 
          emissive="#551111" 
          emissiveIntensity={0.6} 
          wireframe
        />
    </Sphere>
    <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.01, 16, 100]} />
        <meshBasicMaterial color="#ffb800" transparent opacity={0.3} />
    </mesh>
  </group>
);

export const AerospaceHub: React.FC = () => {
  const { addNotification } = useOSStore();

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden">
      <div className="flex items-center justify-between border-b border-os-cyan/20 pb-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-os-cyan/10 border border-os-cyan/30 rounded-lg text-os-cyan">
            <Rocket size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white uppercase italic">Aerospace & Mission Control</h2>
            <p className="text-[10px] text-os-cyan/40 font-mono tracking-[0.2em]">DEEP_SPACE_TRACKING_ON</p>
          </div>
        </div>
        <div className="flex gap-4">
           {['VELOCITY', 'ALTITUDE', 'TRAJECTORY'].map((label, i) => (
             <div 
               key={label} 
               onClick={() => addNotification(`Detailed ${label} telemetry requested.`, "info")}
               className="border-glass px-4 py-2 rounded-lg flex flex-col items-center min-w-[100px] cursor-pointer hover:bg-os-cyan/5 transition-all"
             >
                <span className="text-[8px] text-white/40 uppercase mb-1">{label}</span>
                <span className="text-xs font-bold text-os-cyan glow-cyan italic">
                   {i === 0 ? '28,400 km/h' : i === 1 ? '354 km' : 'LOCKED'}
                </span>
             </div>
           ))}
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
        <div className="col-span-12 lg:col-span-7 border-glass rounded-2xl relative overflow-hidden bg-black/60">
           <div className="absolute top-4 left-4 z-20 flex gap-2">
              <div className="px-2 py-1 bg-os-cyan/20 border border-os-cyan/40 rounded text-[8px] font-mono text-os-cyan animate-pulse">LIVE FEED: SAT_LINK_9</div>
              <div 
                onClick={() => addNotification("Orbit synchronization status: OPTIMAL", "info")}
                className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[8px] font-mono text-white/40 uppercase tracking-widest cursor-pointer hover:bg-white/10"
              >
                Orbit Status: STABLE
              </div>
           </div>
           
           <div className="w-full h-full cursor-grab active:cursor-grabbing">
              <Canvas camera={{ position: [0, 0, 4] }}>
                 <ambientLight intensity={0.5} />
                 <Stars radius={10} depth={50} count={1000} factor={2} saturation={0} fade />
                 <Planet />
                 <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
              </Canvas>
           </div>

           <div className="absolute bottom-6 right-6 z-20">
              <div className="flex flex-col items-end gap-1">
                 <span className="text-[8px] text-white/40 uppercase font-mono tracking-widest">Atmospheric Drag</span>
                 <div className="h-1 w-32 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-os-red"
                      animate={{ width: ['20%', '40%', '20%'] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                 </div>
              </div>
           </div>
        </div>

        <div className="col-span-12 lg:col-span-5 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
           <div className="border-glass p-6 rounded-xl space-y-6">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-os-cyan" />
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-os-cyan/80">Navigation nodes</h4>
                 </div>
                 <Globe size={14} className="text-white/20" />
              </div>
              
              <div className="space-y-4">
                 {[
                   { name: 'Houston Main', dist: '12.4ms', status: 'ACTIVE' },
                   { name: 'Kourou Base', dist: '42.1ms', status: 'ACTIVE' },
                   { name: 'Baikonur Link', dist: '8.9ms', status: 'STANDBY' }
                 ].map((node, i) => (
                    <div 
                      key={i} 
                      onClick={() => addNotification(`Establishing secure uplink to ${node.name}...`, "info")}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5 hover:border-os-cyan/30 transition-all cursor-pointer group"
                    >
                       <div className="flex flex-col">
                          <span className="text-xs font-bold text-white tracking-tight group-hover:text-os-cyan transition-colors">{node.name}</span>
                          <span className="text-[8px] text-white/40 font-mono">LAT_DIST: {node.dist}</span>
                       </div>
                       <div className={`text-[8px] px-2 py-1 rounded font-mono ${node.status === 'ACTIVE' ? 'bg-os-cyan/10 text-os-cyan' : 'bg-white/5 text-white/20'}`}>
                          {node.status}
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="border-glass p-6 rounded-xl flex-1 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                 <Wind size={14} className="text-os-cyan" />
                 <h4 className="text-[10px] font-bold uppercase tracking-widest text-os-cyan/80">Solar Weather</h4>
              </div>
              <div className="flex-1 flex flex-col justify-center gap-6">
                 <div className="flex flex-col items-center">
                    <span className="text-3xl font-black italic tracking-tighter glow-cyan">Kp 2.4</span>
                    <span className="text-[8px] text-white/40 uppercase tracking-widest mt-1">Geomagnetic Activity</span>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="text-center cursor-help" onClick={() => addNotification("Ionization levels safe for extra-orbital maneuvers.", "info")}>
                       <p className="text-[8px] text-white/40 uppercase mb-1">Ionization</p>
                       <p className="text-sm font-bold text-os-cyan">LOW</p>
                    </div>
                    <div className="text-center cursor-help" onClick={() => addNotification("Solar flare risk: MINIMAL.", "info")}>
                       <p className="text-[8px] text-white/40 uppercase mb-1">Flare Risk</p>
                       <p className="text-sm font-bold text-os-red">0.02%</p>
                    </div>
                 </div>
              </div>
              <div className="pt-4 border-t border-white/5 mt-auto">
                 <button 
                   onClick={() => addNotification("Requesting full telemetry map. Standby for satellite download...", "info")}
                   className="w-full py-2 bg-os-cyan/5 border border-os-cyan/20 rounded-lg text-os-cyan text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-os-cyan/10 transition-colors"
                 >
                    Request Full Telemetry Map
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
