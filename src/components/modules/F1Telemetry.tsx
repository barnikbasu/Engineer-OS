import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Wind, Gauge, Zap, Activity, Info } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useOSStore } from '../../store/useOSStore';

const mockData = Array.from({ length: 20 }, (_, i) => ({
  name: i,
  speed: 280 + Math.random() * 40,
  downforce: 1500 + Math.random() * 200,
  temp: 85 + Math.random() * 10
}));

export const F1Telemetry: React.FC = () => {
  const { addNotification } = useOSStore();
  const [data, setData] = useState(mockData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1), {
          name: prev[prev.length - 1].name + 1,
          speed: 280 + Math.random() * 40,
          downforce: 1500 + Math.random() * 200,
          temp: 85 + Math.random() * 10
        }];
        return newData;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden text-os-orange">
      <div className="flex items-center justify-between border-b border-os-orange/20 pb-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-os-orange/10 border border-os-orange/30 rounded-lg">
            <Wind size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white uppercase italic">Advanced Telemetry Hub</h2>
            <p className="text-[10px] font-mono tracking-[0.2em] text-os-orange/60">AERODYNAMIC_PERFORMANCE_REALTIME</p>
          </div>
        </div>
        <button 
           onClick={() => addNotification("Calibrating airflow sensors...", "warn")}
           className="px-4 py-2 bg-os-orange/10 border border-os-orange/20 rounded-lg text-os-orange text-[10px] font-bold uppercase tracking-widest hover:bg-os-orange/20 transition-all font-mono"
        >
           Recalibrate_Sensors
        </button>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
           <div className="flex-1 border-glass p-6 rounded-2xl bg-black/40 relative overflow-hidden group">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-xs font-bold uppercase tracking-widest opacity-60 flex items-center gap-2">
                    <Gauge size={16} />
                    Live Speed Profile (km/h)
                 </h3>
                 <span className="text-2xl font-black italic text-os-orange glow-orange animate-pulse">
                    {Math.round(data[data.length - 1].speed)}
                 </span>
              </div>
              <div className="h-64 mt-4">
                 <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                       <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                       <XAxis dataKey="name" hide />
                       <YAxis 
                         domain={[200, 400]} 
                         stroke="#ffffff20" 
                         fontSize={10} 
                         tickFormatter={(v) => `${v}`}
                       />
                       <Tooltip 
                         contentStyle={{ backgroundColor: '#020508', border: '1px solid #FF7A0033', borderRadius: '8px' }}
                         itemStyle={{ color: '#FF7A00', fontSize: '10px' }}
                         labelStyle={{ display: 'none' }}
                       />
                       <Line 
                         type="monotone" 
                         dataKey="speed" 
                         stroke="#FF7A00" 
                         strokeWidth={2} 
                         dot={false} 
                         isAnimationActive={false}
                       />
                    </LineChart>
                 </ResponsiveContainer>
              </div>
              <div className="absolute bottom-4 left-6 flex gap-4 text-[8px] font-mono opacity-40">
                 <span>SAMPLING_RATE: 1000HZ</span>
                 <span>BUFFER_SIZE: 2048KB</span>
              </div>
           </div>

           <div className="grid grid-cols-3 gap-6">
              {[
                { l: 'Engine Temp', v: '92°C', icon: Zap, status: 'OPTIMAL' },
                { l: 'Tire Pressure', v: '1.4 bar', icon: Activity, status: 'STABLE' },
                { l: 'Fuel Flow', v: '100 kg/h', icon: Info, status: 'MAX' }
              ].map((card, i) => (
                <div 
                  key={i} 
                  onClick={() => addNotification(`${card.l} diagnostics complete.`, "info")}
                  className="border-glass p-4 rounded-xl bg-black/20 hover:bg-os-orange/5 cursor-pointer transition-all border-os-orange/10 group"
                >
                   <div className="flex justify-between items-start mb-3">
                      <card.icon size={16} className="text-os-orange/40 group-hover:text-os-orange transition-colors" />
                      <span className="text-[8px] font-mono text-os-orange bg-os-orange/10 px-1.5 py-0.5 rounded">{card.status}</span>
                   </div>
                   <p className="text-[10px] font-bold uppercase opacity-60 tracking-wider font-mono">{card.l}</p>
                   <p className="text-xl font-black italic text-white mt-1">{card.v}</p>
                </div>
              ))}
           </div>
        </div>

        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
           <div className="flex-1 border-glass p-6 rounded-2xl bg-black/40 flex flex-col gap-6">
              <h4 className="text-xs font-bold uppercase tracking-widest opacity-60">Aerodynamic Mapping</h4>
              <div className="flex-1 relative border border-white/5 rounded-xl overflow-hidden bg-white/2">
                 <div className="absolute inset-0 flex items-center justify-center">
                    {/* Simulated Aero Model */}
                    <div className="w-48 h-12 bg-os-orange/20 rounded-full blur-xl animate-pulse" />
                    <div className="absolute inset-0 flex flex-col justify-around py-4">
                       {[...Array(6)].map((_, i) => (
                         <motion.div 
                           key={i}
                           className="h-px bg-os-orange/40 w-full"
                           animate={{ 
                             x: ['-100%', '100%'],
                             opacity: [0, 1, 0]
                           }}
                           transition={{ 
                             duration: 1 + Math.random(), 
                             repeat: Infinity, 
                             ease: "linear",
                             delay: i * 0.2
                           }}
                         />
                       ))}
                    </div>
                 </div>
                 <div className="absolute top-2 left-2 text-[8px] font-mono bg-black/60 p-1 rounded">WIND_TUNNEL_SIM: ACTIVE</div>
              </div>
              <div className="space-y-4">
                 <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-white/40 uppercase">Drag Coefficient</span>
                    <span className="text-os-orange">0.24 cD</span>
                 </div>
                 <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-white/40 uppercase">Downforce Load</span>
                    <span className="text-os-orange">1644 kg</span>
                 </div>
                 <button 
                   onClick={() => addNotification("Aero profile updated.", "info")}
                   className="w-full py-3 border border-os-orange/30 text-os-orange rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-os-orange/10 transition-all font-mono"
                 >
                   Update_Profile
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
