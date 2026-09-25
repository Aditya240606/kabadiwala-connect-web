import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Layers, Receipt, User } from 'lucide-react';
import { useApp } from '../../hooks/useApp';

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useApp();

  const currentPath = location.pathname;

  const tabs = [
    {
      id: 'home',
      label: t.navHome,
      path: '/collector',
      icon: Home,
      isActive: currentPath === '/collector',
    },
    {
      id: 'collections',
      label: t.navCollections,
      path: '/collector/collections',
      icon: Layers,
      isActive: currentPath.startsWith('/collector/collections'),
    },
    {
      id: 'transactions',
      label: t.navTransactions,
      path: '/collector/transactions',
      icon: Receipt,
      isActive: currentPath === '/collector/transactions',
    },
    {
      id: 'profile',
      label: t.navProfile,
      path: '/collector/profile',
      icon: User,
      isActive: currentPath === '/collector/profile',
    },
  ];

  return (
    <nav className="sticky bottom-0 z-40 bg-white border-t-2 border-[#1C1917] px-4 py-2 shadow-[0_-2px_6px_rgba(0,0,0,0.06)]">
      <div className="w-full max-w-2xl mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = tab.isActive;
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded transition-transform active:scale-95 ${
                active ? 'text-[#14532D]' : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              <div
                className={`p-1 rounded-md mb-0.5 transition-colors ${
                  active ? 'bg-[#ECFDF5] text-[#14532D] border border-[#14532D]' : ''
                }`}
              >
                <Icon className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className={`text-[11px] font-extrabold tracking-tight leading-tight mt-0.5 ${active ? 'text-[#14532D]' : ''}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
