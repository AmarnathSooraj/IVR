"use client";

import Dashboard from '../components/Dashboard';
import { useAppContext } from '../context/AppContext';

export default function Home() {
  const { logs, staff, students } = useAppContext();
  return <Dashboard logs={logs} staff={staff} students={students} />;
}
