
import React, { useState } from 'react';

interface AuthOverlayProps {
  onLogin: () => void;
}

const AuthOverlay: React.FC<AuthOverlayProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('admin@college.edu');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-slate-100 flex items-center justify-center z-[100] p-0 md:p-6">
      <div className="max-w-5xl w-full bg-white md:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] animate-in fade-in zoom-in duration-500">
        {/* Left Side: College Visual */}
        <div className="hidden md:block md:w-1/2 relative bg-indigo-950">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/College_of_Engineering%2C_Vadakara_Main_Building.jpg/1200px-College_of_Engineering%2C_Vadakara_Main_Building.jpg" 
            alt="College of Engineering Vadakara"
            className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-[10s] hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950 via-indigo-950/40 to-transparent flex flex-col justify-end p-12 text-white">
            <div className="mb-8">
               <div className="w-16 h-1 w-16 bg-indigo-500 rounded-full mb-6"></div>
               <h2 className="text-5xl font-black tracking-tighter mb-4 leading-none">
                 Veda CEV
               </h2>
               <p className="text-indigo-200 text-lg font-medium max-w-xs leading-relaxed opacity-80">
                 Secure access to the college communication dashboard and records.
               </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold tracking-widest uppercase text-indigo-400">
               <span>EST. 1994</span>
               <span className="w-1 h-1 bg-indigo-800 rounded-full"></span>
               <span>v3.2 Stable</span>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="flex-1 p-8 md:p-16 flex flex-col justify-center bg-white">
          <div className="mb-10 text-center md:text-left">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 md:mx-0 mx-auto">
              <i className="fas fa-shield-alt text-xl text-indigo-600"></i>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Identity Verification</h1>
            <p className="text-slate-500 mt-2 font-medium">Please enter your staff credentials to continue</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Staff Email Address</label>
              <div className="relative">
                <i className="fas fa-at absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all font-bold text-slate-700"
                  placeholder="admin@college.edu"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Security Password</label>
              <div className="relative">
                <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all font-bold text-slate-700"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                <span className="text-xs font-bold text-slate-500 group-hover:text-slate-700 transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors">Emergency Reset?</a>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 mt-4"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span className="uppercase tracking-widest text-xs">Decrypting...</span>
                </div>
              ) : (
                <>
                  <span className="uppercase tracking-widest text-xs">Authorize Entry</span>
                  <i className="fas fa-arrow-right text-xs"></i>
                </>
              )}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-slate-50 text-center md:text-left">
            <p className="text-[10px] font-bold text-slate-400 tracking-wide flex items-center md:justify-start justify-center gap-2">
              <i className="fas fa-info-circle"></i>
              AUTHORIZED ACCESS ONLY • MONITORED ENVIRONMENT
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthOverlay;
