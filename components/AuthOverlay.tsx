
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
    <div className="fixed inset-0 bg-slate-900 flex items-center justify-center z-[100] p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="bg-indigo-600 p-8 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <i className="fas fa-graduation-cap text-3xl"></i>
          </div>
          <h1 className="text-2xl font-bold">EduCall AI</h1>
          <p className="text-indigo-100 mt-1 opacity-80">College Staff & Admin Portal</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Staff Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="name@college.edu"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <i className="fas fa-circle-notch animate-spin"></i>
            ) : (
              <>
                <i className="fas fa-sign-in-alt"></i>
                Sign In to Dashboard
              </>
            )}
          </button>
          <div className="text-center">
            <a href="#" className="text-sm text-slate-400 hover:text-indigo-600 transition-colors">Forgot your password?</a>
          </div>
        </form>
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">Restricted access for authorized college personnel only.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthOverlay;
