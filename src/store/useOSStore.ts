import { create } from 'zustand';

export type OSModule = 
  | 'BOOT' 
  | 'AI_COMMAND' 
  | 'ROBOTICS' 
  | 'AEROSPACE' 
  | 'F1_TELEMETRY' 
  | 'CYBER_CORE' 
  | 'PHYSICS_LAB' 
  | 'KNOWLEDGE_DB';

interface OSState {
  currentModule: OSModule;
  isBooted: boolean;
  selectedBranch: string;
  systemStatus: {
    reactor: string;
    temp: number;
    aiRate: number;
  };
  notifications: Array<{ id: string; message: string; type: 'info' | 'warn' | 'error' }>;
  isDiagnosticRunning: boolean;
  setModule: (module: OSModule) => void;
  setBooted: (status: boolean) => void;
  setBranch: (branch: string) => void;
  updateStatus: (update: Partial<OSState['systemStatus']>) => void;
  addNotification: (message: string, type?: 'info' | 'warn' | 'error') => void;
  removeNotification: (id: string) => void;
  toggleDiagnostic: (status: boolean) => void;
}

export const useOSStore = create<OSState>((set) => ({
  currentModule: 'BOOT',
  isBooted: false,
  selectedBranch: "Computer Science Engineering (CSE)",
  systemStatus: {
    reactor: 'OPTIMIZING',
    temp: 35,
    aiRate: 0.85,
  },
  notifications: [],
  isDiagnosticRunning: false,
  setModule: (module) => set({ currentModule: module }),
  setBooted: (status) => set({ isBooted: status, currentModule: status ? 'AI_COMMAND' : 'BOOT' }),
  setBranch: (branch) => set({ selectedBranch: branch }),
  updateStatus: (update) => set((state) => ({ 
    systemStatus: { ...state.systemStatus, ...update } 
  })),
  addNotification: (message, type = 'info') => set((state) => ({
    notifications: [...state.notifications, { id: Math.random().toString(36), message, type }]
  })),
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),
  toggleDiagnostic: (status) => set({ isDiagnosticRunning: status }),
}));
