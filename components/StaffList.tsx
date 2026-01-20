
import React, { useState } from 'react';
import { Staff } from '../types';

interface StaffListProps {
  staff: Staff[];
  onAdd: (newStaff: Staff) => void;
  onDelete: (id: string) => void;
}

const StaffList: React.FC<StaffListProps> = ({ staff, onAdd, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [newStaff, setNewStaff] = useState<Partial<Staff>>({
    name: '',
    department: 'Admissions',
    role: '',
    extension: '',
    phoneNumber: '',
    status: 'available'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...newStaff as Staff,
      id: Math.random().toString(36).substr(2, 9),
    });
    setShowModal(false);
    setNewStaff({ name: '', department: 'Admissions', role: '', extension: '', phoneNumber: '', status: 'available' });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold">Staff Directory</h3>
          <p className="text-sm text-slate-500">{staff.length} staff members registered</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors flex items-center gap-2"
        >
          <i className="fas fa-plus"></i> Add Staff
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Name</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Department</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Extension</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {staff.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600 text-xs uppercase">
                      {s.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{s.name}</p>
                      <p className="text-xs text-slate-500">{s.role}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{s.department}</td>
                <td className="px-6 py-4">
                  <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-mono">#{s.extension}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                    s.status === 'available' ? 'bg-green-50 text-green-700 border-green-200' :
                    s.status === 'busy' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      s.status === 'available' ? 'bg-green-500' : s.status === 'busy' ? 'bg-amber-500' : 'bg-slate-400'
                    }`}></span>
                    {s.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => onDelete(s.id)}
                    className="text-slate-400 hover:text-red-600 transition-colors p-1"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h4 className="font-bold text-lg">Add New Staff Member</h4>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><i className="fas fa-times"></i></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name</label>
                <input required type="text" value={newStaff.name} onChange={e => setNewStaff({...newStaff, name: e.target.value})} className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Department</label>
                  <select value={newStaff.department} onChange={e => setNewStaff({...newStaff, department: e.target.value})} className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>Admissions</option>
                    <option>Financial Aid</option>
                    <option>Registrar</option>
                    <option>IT Support</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Extension</label>
                  <input required type="text" value={newStaff.extension} onChange={e => setNewStaff({...newStaff, extension: e.target.value})} placeholder="105" className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Role</label>
                <input required type="text" value={newStaff.role} onChange={e => setNewStaff({...newStaff, role: e.target.value})} placeholder="e.g. Coordinator" className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2 text-slate-600 font-bold border rounded-lg hover:bg-slate-50">Cancel</button>
                <button type="submit" className="flex-1 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700">Add Staff</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffList;
