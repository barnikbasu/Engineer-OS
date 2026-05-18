import React from 'react';
import { useOSStore } from './store/useOSStore';
import { BootScreen } from './components/os/BootScreen';
import { Shell } from './components/os/Shell';

export default function App() {
  const isBooted = useOSStore(state => state.isBooted);

  return (
    <div className="w-full h-screen relative bg-os-bg selection:bg-os-cyan selection:text-os-bg">
      {!isBooted ? (
        <BootScreen />
      ) : (
        <Shell />
      )}
    </div>
  );
}
