"use client";

import CallSimulator from '../../components/CallSimulator';
import { useAppContext } from '../../context/AppContext';

export default function SimulatorPage() {
  const { staff, students, addLog } = useAppContext();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <CallSimulator staffList={staff} studentList={students} onCallEnd={addLog} />
      </div>
      <div className="space-y-6">
        <div className="bg-indigo-600 text-white p-8 rounded-3xl shadow-2xl shadow-indigo-200 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <h4 className="font-black text-xl mb-4 relative z-10">AI Deployment Guide</h4>
          <ul className="space-y-4 relative z-10">
            <li className="flex gap-3 text-sm">
              <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center shrink-0 font-bold text-xs">1</div>
              <p className="opacity-90 italic">"Can I check my current GPA? My name is Alice Cooper, ID CS2023001."</p>
            </li>
            <li className="flex gap-3 text-sm">
              <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center shrink-0 font-bold text-xs">2</div>
              <p className="opacity-90 italic">"I have a problem with my laptop, transfer me to IT support."</p>
            </li>
            <li className="flex gap-3 text-sm">
              <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center shrink-0 font-bold text-xs">3</div>
              <p className="opacity-90 opacity-80">AI will automatically pull data from your "Student Database" state in real-time.</p>
            </li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Live Integration Logs</p>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
              <i className="fas fa-check-circle text-emerald-500"></i>
              <span>Gemini Live session initialized</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
              <i className="fas fa-check-circle text-emerald-500"></i>
              <span>Student DB synchronized (v14)</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
              <i className="fas fa-check-circle text-emerald-500"></i>
              <span>SIP Trunking active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
