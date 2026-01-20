'use client';

import React, { useEffect, useState } from 'react';

interface TwilioLog {
  id: string;
  caller: string;
  to: string;
  status: string;
  startTime: string;
  duration: string;
  direction: string;
  price: string;
}

const TwilioLiveLogs: React.FC = () => {
  const [logs, setLogs] = useState<TwilioLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      const response = await fetch('/api/twilio/logs');
      const data = await response.json();
      if (!data.error) {
        setLogs(data);
      }
    } catch (error) {
      console.error('Error fetching Twilio logs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading && logs.length === 0) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {logs.map((log) => (
        <div key={log.id} className="p-4 rounded-xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all">
          <div className="flex justify-between items-center mb-2">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
              log.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
            }`}>
              {log.status}
            </span>
            <span className="text-[10px] font-medium text-slate-400">
              {new Date(log.startTime).toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
              <i className="fas fa-phone-alt text-xs text-slate-500"></i>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">{log.caller}</p>
              <p className="text-[10px] text-slate-500">Duration: {log.duration} • Cost: {log.price}</p>
            </div>
          </div>
        </div>
      ))}
      <button 
        onClick={fetchLogs}
        className="w-full py-2 text-[10px] font-bold text-indigo-600 border border-indigo-100 rounded-lg hover:bg-indigo-50 transition-colors"
      >
        Refresh Logs
      </button>
    </div>
  );
};

export default TwilioLiveLogs;
