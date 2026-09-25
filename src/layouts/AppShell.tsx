import React from 'react';
import { BottomNav } from '../components/common/BottomNav';

interface AppShellProps {
  children: React.ReactNode;
  showBottomNav?: boolean;
}

export const AppShell: React.FC<AppShellProps> = ({ children, showBottomNav = true }) => {
  return (
    <div className="min-h-screen bg-[#FFFBEB] text-[#1C1917] flex flex-col">
      <main className="w-full flex-1 flex flex-col">
        {children}
      </main>
      {showBottomNav && <BottomNav />}
    </div>
  );
};

