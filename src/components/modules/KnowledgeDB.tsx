import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Search, Database, ChevronRight, FileText, Globe, Star } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';

const ARTICLES = [
  { id: '1', title: 'ARC REACTOR PHYSICS', category: 'Energy', date: '2026-05-18', content: 'Detailed analysis of the cold fusion containment systems...' },
  { id: '2', title: 'NEURAL LINK INTERFACE', category: 'Biotech', date: '2026-05-15', content: 'Protocol specifications for high-bandwidth neural telemetry...' },
  { id: '3', title: 'ORBITAL MECHANICS V4', category: 'Aerospace', date: '2026-05-12', content: 'Advanced trajectory calculations for deep space exploration...' },
  { id: '4', id_tag: 'S-76', title: 'NANO-COMPOSITE DURABILITY', category: 'Materials', date: '2026-05-10', content: 'Stress testing results for titanium-carbon weave structures...' },
];

export const KnowledgeDB: React.FC = () => {
  const { addNotification } = useOSStore();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<typeof ARTICLES[0] | null>(null);

  const filtered = ARTICLES.filter(a => 
    a.title.toLowerCase().includes(search.toLowerCase()) || 
    a.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden text-os-cyan">
      <div className="flex items-center justify-between border-b border-os-cyan/20 pb-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-os-cyan/10 border border-os-cyan/30 rounded-lg">
            <BookOpen size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white uppercase italic">Central Knowledge Repository</h2>
            <p className="text-[10px] font-mono tracking-[0.2em] text-os-cyan/60">INTELLIGENCE_DATABASE_LINK_ESTABLISHED</p>
          </div>
        </div>
        <div className="relative w-64 group">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-os-cyan transition-colors" />
          <input 
            type="text"
            placeholder="Search Intelligence..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-xs font-mono focus:outline-none focus:border-os-cyan/40 transition-all"
          />
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-4 overflow-hidden border-glass p-6 rounded-2xl bg-black/40">
           <div className="flex justify-between items-center mb-2">
              <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-60 flex items-center gap-2">
                <Database size={14} />
                Index_Results ({filtered.length})
              </h3>
              <Globe size={14} className="text-os-cyan animate-pulse" />
           </div>
           
           <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
              {filtered.map((article) => (
                <motion.div 
                  key={article.id}
                  layout
                  onClick={() => {
                    setSelected(article);
                    addNotification(`Retrieved: ${article.title}`, "info");
                  }}
                  className={`p-4 border border-white/5 rounded-xl cursor-pointer transition-all group ${
                    selected?.id === article.id ? 'bg-os-cyan/20 border-os-cyan/40 shadow-[0_0_20px_rgba(0,242,255,0.1)]' : 'bg-white/2 hover:bg-white/5'
                  }`}
                >
                   <div className="flex justify-between items-start mb-2">
                      <span className="text-[8px] font-mono opacity-40 uppercase">{article.category}</span>
                      <span className="text-[8px] font-mono opacity-40 uppercase">{article.date}</span>
                   </div>
                   <h4 className="text-xs font-bold uppercase tracking-tight group-hover:text-os-cyan transition-colors">{article.title}</h4>
                   <div className="mt-3 flex items-center justify-between">
                      <div className="flex gap-1 text-[8px] font-mono text-os-cyan/60">
                         <span>ID: {article.id_tag || 'M-42'}</span>
                         <span>•</span>
                         <span>PUBLIC: NO</span>
                      </div>
                      <ChevronRight size={14} className={`transition-transform ${selected?.id === article.id ? 'rotate-90 text-os-cyan' : 'text-white/20'}`} />
                   </div>
                </motion.div>
              ))}
           </div>
        </div>

        <div className="col-span-12 lg:col-span-7 border-glass rounded-2xl bg-black/40 overflow-hidden relative p-8">
           <AnimatePresence mode="wait">
             {selected ? (
               <motion.div 
                 key={selected.id}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -20 }}
                 className="h-full flex flex-col"
               >
                  <div className="flex items-center gap-2 text-os-cyan mb-8">
                     <FileText size={20} />
                     <h3 className="text-xl font-black italic uppercase tracking-tighter">{selected.title}</h3>
                  </div>
                  
                  <div className="flex-1 p-6 border border-white/10 rounded-xl bg-white/2 font-mono text-[10px] leading-loose text-white/80 overflow-y-auto custom-scrollbar">
                     <div className="mb-4 flex gap-4 text-[8px] font-black uppercase tracking-widest text-os-cyan border-b border-os-cyan/10 pb-2">
                        <span className="flex items-center gap-1"><Star size={8} /> Classified</span>
                        <span>Revision: 4B</span>
                        <span>Hash: {Math.random().toString(36).substring(7).toUpperCase()}</span>
                     </div>
                     <p className="mb-6">{selected.content}</p>
                     <p className="opacity-60 italic">Additional research confirms that the {selected.category.toLowerCase()} implications exceed initial projections by 14.8%. Further structural analysis required at sector 4G using the sub-atomic imaging array.</p>
                     
                     <div className="mt-8 grid grid-cols-2 gap-4">
                        {[...Array(4)].map((_, i) => (
                           <div key={i} className="h-2 w-full bg-os-cyan/10 rounded-full overflow-hidden">
                              <motion.div 
                                className="h-full bg-os-cyan/40"
                                initial={{ width: 0 }}
                                animate={{ width: `${60 + Math.random() * 40}%` }}
                                transition={{ duration: 1, delay: i * 0.1 }}
                              />
                           </div>
                        ))}
                     </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end gap-3">
                     <button className="px-6 py-2 border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-colors">Download_Raw</button>
                     <button className="px-6 py-2 bg-os-cyan/10 border border-os-cyan/40 text-os-cyan rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-os-cyan/20 transition-all">Request_Decrypt</button>
                  </div>
               </motion.div>
             ) : (
               <div className="h-full flex flex-col items-center justify-center opacity-20">
                  <Database size={80} strokeWidth={1} className="mb-4 animate-pulse" />
                  <p className="font-mono text-xs uppercase tracking-[0.4em]">Select Document to decrypt</p>
               </div>
             )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
