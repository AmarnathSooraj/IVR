"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Staff, Student, CallLog } from '../lib/types';
import { INITIAL_STAFF, INITIAL_STUDENTS, INITIAL_LOGS } from '../lib/constants';

interface AppContextType {
  staff: Staff[];
  students: Student[];
  logs: CallLog[];
  addStaff: (s: Staff) => void;
  deleteStaff: (id: string) => void;
  addStudent: (st: Student) => void;
  deleteStudent: (id: string) => void;
  addLog: (log: CallLog) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [staff, setStaff] = useState<Staff[]>(INITIAL_STAFF);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [logs, setLogs] = useState<CallLog[]>(INITIAL_LOGS);

  const addStaff = (s: Staff) => setStaff(prev => [...prev, s]);
  const deleteStaff = (id: string) => setStaff(prev => prev.filter(s => s.id !== id));
  const addStudent = (st: Student) => setStudents(prev => [...prev, st]);
  const deleteStudent = (id: string) => setStudents(prev => prev.filter(st => st.id !== id));
  const addLog = (log: CallLog) => setLogs(prev => [...prev, log]);

  return (
    <AppContext.Provider value={{
      staff, students, logs,
      addStaff, deleteStaff,
      addStudent, deleteStudent,
      addLog,
      isAuthenticated, setIsAuthenticated
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
