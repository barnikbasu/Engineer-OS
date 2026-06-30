import React from 'react';
import { motion } from 'motion/react';
import { 
  Server, 
  GitCommit, 
  User, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Play, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Activity,
  Sliders,
  MoreHorizontal
} from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';

export const AICommand: React.FC = () => {
  const { addNotification } = useOSStore();

  // Metrics Data matching Image 1
  const metrics = [
    {
      title: "LATENCY (P99)",
      value: "42.8ms",
      change: "+2.4%",
      changeType: "up",
      color: "text-os-cyan",
      graphColor: "rgba(226, 54, 54, 0.7)",
      // custom fluctuating path
      points: [20, 45, 10, 55, 30, 75, 40, 25, 60, 45, 25, 35, 70, 50, 40]
    },
    {
      title: "THROUGHPUT",
      value: "12.5k req/s",
      change: "-0.1%",
      changeType: "down",
      color: "text-white",
      graphColor: "rgba(255, 255, 255, 0.4)",
      points: [40, 42, 38, 41, 45, 43, 39, 44, 40, 42, 41, 39, 43, 40, 42]
    },
    {
      title: "ERROR RATE",
      value: "0.02%",
      change: "STABLE",
      changeType: "stable",
      color: "text-os-red",
      graphColor: "rgba(226, 54, 54, 0.3)",
      points: [60, 60, 59, 61, 60, 60, 60, 60, 60, 61, 60, 60, 59, 60, 60]
    },
    {
      title: "MEMORY USAGE",
      value: "16.4 GB",
      change: "68% CAP",
      changeType: "stable",
      color: "text-white",
      graphColor: "rgba(255, 255, 255, 0.5)",
      points: [20, 25, 25, 30, 35, 35, 40, 45, 50, 52, 58, 60, 64, 66, 68]
    }
  ];

  // Active Deployments matching Image 1
  const deployments = [
    {
      id: "auth-gateway-v2",
      commit: "8f3c1a2",
      status: "HEALTHY",
      uid: "S.CHEN",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
      uptime: "12D 04H"
    },
    {
      id: "data-ingest-worker",
      commit: "bc92e4d",
      status: "DEPLOYING",
      uid: "M.ROSS",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
      uptime: "00D 00H"
    },
    {
      id: "frontend-core-main",
      commit: "4a21f7b",
      status: "FAILED",
      uid: "K.SATO",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
      uptime: "--"
    }
  ];

  // System Activity Feed matching Image 1
  const systemActivity = [
    {
      type: "DEPLOY_TRIGGERED",
      desc: "Push initiated: ",
      target: "auth-gateway-v2",
      time: "02M AGO",
      author: "S.CHEN",
      iconColor: "bg-os-cyan/10 border-os-cyan text-os-cyan shadow-[0_0_10px_rgba(226,54,54,0.3)]",
    },
    {
      type: "LATENCY_CRITICAL",
      desc: "US-EAST-1: ELEVATED P99 DETECTED.",
      time: "45M AGO",
      author: "SYSTEM",
      iconColor: "bg-os-red/10 border-os-red text-os-red shadow-[0_0_15px_rgba(226,54,54,0.5)] animate-pulse",
    },
    {
      type: "PR_MERGED // #442",
      desc: "Fix: stream processor memory optimization.",
      time: "02H AGO",
      author: "J.DOE",
      iconColor: "bg-white/5 border-white/10 text-white/60",
    },
    {
      type: "CONFIG_UPDATE",
      desc: "MAX_CONN: 5000.",
      time: "05H AGO",
      author: "A.KUMAR",
      iconColor: "bg-os-orange/10 border-os-orange text-os-orange",
    }
  ];

  return (
    <div className="h-full flex flex-col gap-5 overflow-hidden font-sans">
      
      {/* Top row of Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => (
          <div 
            key={idx} 
            onClick={() => addNotification(`Detailed telemetric audit for ${metric.title} scheduled.`, "info")}
            className="os-panel p-4 flex flex-col justify-between hover:bg-white/[0.03] transition-all cursor-pointer group relative overflow-hidden h-[105px]"
            style={{
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.05)"
            }}
          >
            {/* Top title and percentage */}
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-bold text-white/50 tracking-[0.2em] uppercase font-mono">{metric.title}</span>
              <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                metric.changeType === 'up' ? 'text-os-red bg-os-red/10' :
                metric.changeType === 'down' ? 'text-white/60 bg-white/5' : 'text-os-gold bg-os-gold/10'
              }`}>
                {metric.changeType === 'up' ? '▲' : metric.changeType === 'down' ? '▼' : ''} {metric.change}
              </span>
            </div>

            {/* Middle value and bottom spark graph overlay */}
            <div className="flex justify-between items-end mt-auto relative z-10">
              <span className={`text-2xl font-black italic tracking-tighter ${metric.color} glow-cyan`}>
                {metric.value}
              </span>

              {/* Mini spark graph using SVG for extreme visual fidelity */}
              <div className="w-24 h-10 overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity">
                <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
                  {/* Glowing background gradient */}
                  <defs>
                    <linearGradient id={`grad-${idx}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={metric.graphColor} stopOpacity="0.4" />
                      <stop offset="100%" stopColor={metric.graphColor} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Fill Area */}
                  <motion.path
                    d={`M 0 100 ${metric.points.map((p, i) => `L ${(i / (metric.points.length - 1)) * 100} ${100 - p}`).join(' ')} L 100 100 Z`}
                    fill={`url(#grad-${idx})`}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />

                  {/* Spark line */}
                  <motion.path
                    d={metric.points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${(i / (metric.points.length - 1)) * 100} ${100 - p}`).join(' ')}
                    fill="none"
                    stroke={metric.graphColor}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Active Deployments & System Activity */}
      <div className="flex-1 grid grid-cols-12 gap-5 min-h-0">
        
        {/* Active Deployments Panel (Image 1 left side, col-span-7) */}
        <div className="col-span-12 lg:col-span-7 os-panel flex flex-col overflow-hidden">
          <div className="p-5 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
            <div className="flex flex-col">
              <h3 className="text-sm font-black tracking-tight text-white uppercase italic flex items-center gap-2">
                <Server size={14} className="text-os-cyan" />
                ACTIVE DEPLOYMENTS
              </h3>
              <p className="text-[9px] text-white/30 font-mono tracking-widest mt-0.5">LATEST KERNEL PIPELINES</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => addNotification("Adjusting telemetry collection parameters...", "info")}
                className="w-8 h-8 border border-white/10 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all bg-white/5"
              >
                <Sliders size={12} />
              </button>
              <button 
                onClick={() => addNotification("Pipeline manual override controls synced.", "warn")}
                className="w-8 h-8 border border-white/10 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all bg-white/5"
              >
                <MoreHorizontal size={12} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[9px] font-mono uppercase tracking-[0.2em] text-white/30 bg-black/20">
                  <th className="py-3 px-5 font-bold">SERVICE_ID</th>
                  <th className="py-3 px-5 font-bold">COMMIT</th>
                  <th className="py-3 px-5 font-bold">STATUS</th>
                  <th className="py-3 px-5 font-bold">UID</th>
                  <th className="py-3 px-5 font-bold text-right">UPTIME</th>
                </tr>
              </thead>
              <tbody>
                {deployments.map((dep, idx) => (
                  <tr 
                    key={idx}
                    onClick={() => addNotification(`Direct socket connection to service ${dep.id} initiated.`, "info")}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors cursor-pointer group text-xs font-mono"
                  >
                    {/* SERVICE ID */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          dep.status === 'HEALTHY' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' :
                          dep.status === 'DEPLOYING' ? 'bg-os-gold animate-ping shadow-[0_0_8px_rgba(255,184,0,0.6)]' :
                          'bg-os-red shadow-[0_0_8px_rgba(226,54,54,0.6)]'
                        }`} />
                        <span className="font-bold text-white group-hover:text-os-cyan transition-colors">{dep.id}</span>
                      </div>
                    </td>

                    {/* COMMIT */}
                    <td className="py-4 px-5">
                      <span className="text-white/40 group-hover:text-white/80 flex items-center gap-1">
                        <GitCommit size={10} className="opacity-50" />
                        {dep.commit}
                      </span>
                    </td>

                    {/* STATUS BADGE */}
                    <td className="py-4 px-5">
                      <span className={`text-[9px] font-black tracking-widest px-2 py-0.5 rounded-md border ${
                        dep.status === 'HEALTHY' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                        dep.status === 'DEPLOYING' ? 'bg-os-gold/10 border-os-gold/20 text-os-gold animate-pulse' :
                        'bg-os-red/10 border-os-red/20 text-os-red'
                      }`}>
                        {dep.status}
                      </span>
                    </td>

                    {/* USER ID (Avatar + Username) */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-2">
                        <img 
                          src={dep.avatar} 
                          alt={dep.uid} 
                          referrerPolicy="no-referrer"
                          className="w-5 h-5 rounded-full border border-white/10 object-cover"
                        />
                        <span className="text-white/60 text-[10px] font-bold">{dep.uid}</span>
                      </div>
                    </td>

                    {/* UPTIME */}
                    <td className="py-4 px-5 text-right font-bold text-white/50 group-hover:text-white transition-colors">
                      {dep.uptime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-white/5 bg-black/20 flex justify-end">
            <button 
              onClick={() => addNotification("Direct routing to main developer logs stream.", "info")}
              className="text-[9px] font-mono font-black uppercase tracking-[0.2em] text-os-cyan hover:text-white hover:glow-cyan transition-all flex items-center gap-1"
            >
              VIEW_ALL_LOGS
              <ChevronRight size={10} />
            </button>
          </div>
        </div>

        {/* System Activity Panel (Image 1 right side, col-span-5) */}
        <div className="col-span-12 lg:col-span-5 os-panel flex flex-col overflow-hidden">
          <div className="p-5 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
            <div className="flex flex-col">
              <h3 className="text-sm font-black tracking-tight text-os-cyan uppercase italic flex items-center gap-2">
                <Activity size={14} />
                SYSTEM ACTIVITY
              </h3>
              <p className="text-[9px] text-white/30 font-mono tracking-widest mt-0.5">COGNITIVE SENSOR STREAM</p>
            </div>
            <span className="text-[9px] font-mono text-white/30 font-bold bg-white/5 px-2 py-0.5 rounded border border-white/5">
              SECURE
            </span>
          </div>

          <div className="flex-1 p-5 overflow-y-auto custom-scrollbar space-y-4">
            {systemActivity.map((act, idx) => (
              <div 
                key={idx}
                onClick={() => addNotification(`Analyzing log event: ${act.type}`, "info")}
                className="flex gap-4 p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-os-cyan/20 transition-all cursor-pointer group"
              >
                {/* Timeline Icon Badge */}
                <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 text-xs font-mono font-black ${act.iconColor}`}>
                  {act.type.startsWith('DEPLOY') ? 'DP' : act.type.startsWith('LATENCY') ? 'LT' : act.type.startsWith('PR') ? 'PR' : 'CF'}
                </div>

                {/* Log textual details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-[9px] font-mono font-black text-white/40 group-hover:text-os-cyan uppercase tracking-wider transition-colors">
                      {act.type}
                    </span>
                  </div>
                  <p className="text-xs text-white/80 leading-snug">
                    {act.desc}
                    {act.target && (
                      <span className="text-os-cyan font-mono font-bold">{act.target}</span>
                    )}
                  </p>
                  
                  {/* Author and relative time footer */}
                  <div className="flex gap-3 text-[9px] font-mono text-white/30 uppercase mt-2 font-black tracking-widest">
                    <span className="text-os-cyan/60">{act.time}</span>
                    <span>//</span>
                    <span>{act.author}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
