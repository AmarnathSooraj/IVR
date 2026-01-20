"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const menuItems = [
    { path: '/', icon: 'fa-chart-pie', label: 'Dashboard' },
    { path: '/simulator', icon: 'fa-phone-square', label: 'IVR Simulator' },
    { path: '/staff', icon: 'fa-users-cog', label: 'Staff Management' },
    { path: '/students', icon: 'fa-user-graduate', label: 'Student Database' },
  ];

  return (
    <aside className="w-64 bg-slate-900 h-screen sticky top-0 text-slate-400 flex flex-col p-4 z-50 shadow-2xl">
      <div className="flex items-center gap-3 px-2 mb-10 mt-2">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-indigo-900/50">
          <i className="fas fa-graduation-cap"></i>
        </div>
        <div>
          <h1 className="text-white font-black text-lg leading-tight tracking-tight">EduCall AI</h1>
          <p className="text-[9px] uppercase tracking-[0.2em] font-black text-indigo-400 opacity-80">SaaS Platform</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all group border border-transparent ${
              pathname === item.path 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40 border-indigo-500' 
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <i className={`fas ${item.icon} text-lg ${pathname === item.path ? 'text-white' : 'group-hover:text-indigo-400 transition-colors'}`}></i>
            <span className="font-bold text-sm">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-800">
        <div className="flex items-center gap-3 px-2 p-3 bg-slate-800/50 rounded-2xl border border-slate-700/50">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs uppercase shadow-inner">
            AD
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-bold truncate">Admin Staff</p>
            <p className="text-[10px] font-bold opacity-60 truncate uppercase tracking-tighter">Super Admin</p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="ml-auto text-slate-500 hover:text-red-400 transition-colors p-2"
          >
            <i className="fas fa-power-off"></i>
          </button>
        </div>
      </div>
    </aside>
  );
};
