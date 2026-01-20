"use client";

import React from 'react';
import { Sidebar } from '../components/Sidebar';
import AuthOverlay from '../components/AuthOverlay';
import { useAppContext } from '../context/AppContext';
import { usePathname } from 'next/navigation';

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, setIsAuthenticated } = useAppContext();
  const pathname = usePathname();

  if (!isAuthenticated) {
    return <AuthOverlay onLogin={() => setIsAuthenticated(true)} />;
  }

  const getTitle = () => {
    if (pathname.includes('/staff')) return "Staff Governance";
    if (pathname.includes('/students')) return "Student Registry";
    if (pathname.includes('/simulator')) return "Voice Testing Lab";
    return "Admin Overview";
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Sidebar />
      
      <main className="flex-1 p-8 lg:p-12 max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">System Live • Stable Connection</p>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              {getTitle()}
            </h2>
          </div>
          <div className="flex items-center gap-3">
             <div className="px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 leading-none">SERVER STATUS</p>
                  <p className="text-xs font-bold text-slate-700 mt-1">v3.2.0-Alpha</p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                  <i className="fas fa-server text-indigo-600 text-xs"></i>
                </div>
             </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
