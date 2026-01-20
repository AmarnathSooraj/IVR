
import React, { useState } from 'react';
import { Student } from '../lib/types';

interface StudentListProps {
  students: Student[];
  onAdd: (student: Student) => void;
  onDelete: (id: string) => void;
}

const StudentList: React.FC<StudentListProps> = ({ students, onAdd, onDelete }) => {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    name: '',
    enrollmentNo: '',
    course: 'Computer Science',
    year: 1,
    gpa: 4.0,
    attendance: '100%',
    outstandingBalance: 0
  });

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.enrollmentNo.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...newStudent as Student,
      id: 's' + Math.random().toString(36).substr(2, 5),
    });
    setShowModal(false);
    setNewStudent({ name: '', enrollmentNo: '', course: 'Computer Science', year: 1, gpa: 4.0, attendance: '100%', outstandingBalance: 0 });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="text-lg font-bold">Student Database</h3>
          <p className="text-sm text-slate-500">Managing {students.length} enrollment records</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
            <input 
              type="text" 
              placeholder="Search by name or ID..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors flex items-center gap-2 shrink-0"
          >
            <i className="fas fa-user-plus"></i> Enroll Student
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Student Details</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Course Info</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Stats</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredStudents.map((st) => (
              <tr key={st.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-slate-800">{st.name}</p>
                  <p className="text-xs text-slate-500 font-mono uppercase">{st.enrollmentNo}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-700">{st.course}</p>
                  <p className="text-xs text-slate-500">Year {st.year}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase text-slate-400">
                      <span>GPA: {st.gpa}</span>
                      <span>{st.attendance} Att.</span>
                    </div>
                    <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden flex">
                      <div className="h-full bg-indigo-500" style={{ width: `${(st.gpa / 4) * 100}%` }}></div>
                      <div className="h-full bg-emerald-400 opacity-50" style={{ width: st.attendance }}></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => onDelete(st.id)}
                    className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">No students found matching your search.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h4 className="font-bold text-lg text-indigo-900">New Student Enrollment</h4>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><i className="fas fa-times"></i></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name</label>
                  <input required type="text" value={newStudent.name} onChange={e => setNewStudent({...newStudent, name: e.target.value})} className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Enrollment ID</label>
                  <input required type="text" value={newStudent.enrollmentNo} onChange={e => setNewStudent({...newStudent, enrollmentNo: e.target.value})} placeholder="CS2024001" className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Course</label>
                  <select value={newStudent.course} onChange={e => setNewStudent({...newStudent, course: e.target.value})} className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>Computer Science</option>
                    <option>Business Admin</option>
                    <option>Electrical Engineering</option>
                    <option>Civil Engineering</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Year</label>
                  <input type="number" min="1" max="4" value={newStudent.year} onChange={e => setNewStudent({...newStudent, year: parseInt(e.target.value)})} className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">GPA (0-4.0)</label>
                  <input type="number" step="0.1" min="0" max="4" value={newStudent.gpa} onChange={e => setNewStudent({...newStudent, gpa: parseFloat(e.target.value)})} className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2 text-slate-600 font-bold border rounded-lg hover:bg-slate-50">Cancel</button>
                <button type="submit" className="flex-1 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-lg shadow-indigo-100">Enroll Student</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
