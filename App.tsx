
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import StaffList from './components/StaffList';
import StudentList from './components/StudentList';
import CallSimulator from './components/CallSimulator';
import AuthOverlay from './components/AuthOverlay';
import { INITIAL_STAFF, INITIAL_STUDENTS, INITIAL_LOGS } from './constants';
import { Staff, Student, CallLog } from './types';

const Sidebar: React.FC = () => {
  const location = useLocation();
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
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all group border border-transparent ${
              location.pathname === item.path 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40 border-indigo-500' 
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <i className={`fas ${item.icon} text-lg ${location.pathname === item.path ? 'text-white' : 'group-hover:text-indigo-400 transition-colors'}`}></i>
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

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [staff, setStaff] = useState<Staff[]>(INITIAL_STAFF);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [logs, setLogs] = useState<CallLog[]>(INITIAL_LOGS);

  const addStaff = (s: Staff) => setStaff(prev => [...prev, s]);
  const deleteStaff = (id: string) => setStaff(prev => prev.filter(s => s.id !== id));
  const addStudent = (st: Student) => setStudents(prev => [...prev, st]);
  const deleteStudent = (id: string) => setStudents(prev => prev.filter(st => st.id !== id));
  const addLog = (log: CallLog) => setLogs(prev => [...prev, log]);

  if (!isAuthenticated) {
    return <AuthOverlay onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <HashRouter>
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
                {location.hash.includes('staff') ? "Staff Governance" : 
                 location.hash.includes('students') ? "Student Registry" : 
                 location.hash.includes('simulator') ? "Voice Testing Lab" : "Admin Overview"}
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

          <Routes>
            <Route path="/" element={<Dashboard logs={logs} staff={staff} students={students} />} />
            <Route path="/simulator" element={
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
            } />
            <Route path="/staff" element={<StaffList staff={staff} onAdd={addStaff} onDelete={deleteStaff} />} />
            <Route path="/students" element={<StudentList students={students} onAdd={addStudent} onDelete={deleteStudent} />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;
