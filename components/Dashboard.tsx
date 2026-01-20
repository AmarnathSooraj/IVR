
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CallLog, Staff, Student } from '../lib/types';
import TwilioLiveLogs from './TwilioLiveLogs';

interface DashboardProps {
  logs: CallLog[];
  staff: Staff[];
  students: Student[];
}

const Dashboard: React.FC<DashboardProps> = ({ logs, staff, students }) => {
  // Process real data for the chart
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const chartData = days.map(day => ({ name: day, calls: 0, resolved: 0 }));

  logs.forEach(log => {
    const date = new Date(log.timestamp);
    const dayIndex = date.getDay();
    chartData[dayIndex].calls += 1;
    if (log.type === 'AI Resolved') {
      chartData[dayIndex].resolved += 1;
    }
  });

  const aiResolvedCount = logs.filter(l => l.type === 'AI Resolved').length;
  const forwardedCount = logs.filter(l => l.type === 'Forwarded').length;
  const totalCalls = logs.length;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon="fa-phone-volume" label="Real Interactions" value={totalCalls.toString()} trend="Syncing" color="bg-indigo-600" />
        <StatCard icon="fa-robot" label="AI Autopilot" value={`${totalCalls > 0 ? Math.round((aiResolvedCount / totalCalls) * 100) : 0}%`} trend="Automated" color="bg-emerald-500" />
        <StatCard icon="fa-users" label="Staff Online" value={staff.filter(s => s.status === 'available').length.toString()} trend="Live" color="bg-amber-500" />
        <StatCard icon="fa-user-graduate" label="Registered Students" value={students.length.toString()} trend="Database" color="bg-blue-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-800">Operational Insights</h3>
              <p className="text-sm text-slate-500">Call volume vs automated resolution rate</p>
            </div>
            <div className="flex gap-2">
              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400"><span className="w-2 h-2 rounded-full bg-indigo-500"></span> Volume</span>
              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Automation</span>
            </div>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="calls" stroke="#6366f1" fillOpacity={1} fill="url(#colorCalls)" strokeWidth={3} />
                <Area type="monotone" dataKey="resolved" stroke="#10b981" fillOpacity={0} strokeWidth={2} strokeDasharray="6 6" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-50">
            <h3 className="font-bold text-slate-800">Recent Activity</h3>
            <p className="text-xs text-slate-500 mt-1">Latest IVR transactions</p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[450px]">
            {logs.length > 0 ? (
              [...logs].reverse().map((log) => (
                <div key={log.id} className="group p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                  <div className="flex justify-between items-start">
                    <div className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter ${
                      log.type === 'Forwarded' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {log.type}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">{log.duration} duration</span>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm font-bold text-slate-800">{log.caller}</p>
                    <p className="text-[10px] text-slate-400 mt-1">{new Date(log.timestamp).toLocaleString()}</p>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1 italic">{log.transcriptSnippet}</p>
                  </div>
                  {log.assignedStaff && (
                    <div className="mt-3 pt-3 border-t border-slate-50 flex items-center gap-2">
                      <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center">
                        <i className="fas fa-headset text-[10px] text-indigo-600"></i>
                      </div>
                      <p className="text-[10px] font-bold text-slate-600">Handled by {log.assignedStaff}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center opacity-40 py-20">
                <i className="fas fa-history text-4xl mb-3"></i>
                <p className="text-sm">No recent calls logged</p>
              </div>
            )}
          </div>
          <button className="w-full py-4 bg-slate-50 text-indigo-600 font-bold text-xs hover:bg-slate-100 transition-colors">
            View Historical Archive
          </button>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: string; label: string; value: string; trend: string; color: string }> = ({ icon, label, value, trend, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden group hover:shadow-md transition-shadow">
    <div className={`absolute -right-4 -top-4 w-24 h-24 ${color} opacity-[0.03] rounded-full group-hover:scale-110 transition-transform`}></div>
    <div className="flex justify-between items-start mb-4">
      <div className={`w-12 h-12 ${color} text-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100`}>
        <i className={`fas ${icon} text-xl`}></i>
      </div>
      <span className={`text-[10px] font-black px-2 py-1 rounded-full uppercase ${trend.startsWith('+') ? 'bg-green-100 text-green-700' : trend === 'Live' ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-blue-100 text-blue-700'}`}>
        {trend}
      </span>
    </div>
    <h4 className="text-slate-500 text-xs font-bold uppercase tracking-widest">{label}</h4>
    <p className="text-3xl font-black text-slate-900 mt-1">{value}</p>
  </div>
);

export default Dashboard;
