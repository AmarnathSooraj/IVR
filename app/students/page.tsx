"use client";

import StudentList from '../../components/StudentList';
import { useAppContext } from '../../context/AppContext';

export default function StudentsPage() {
  const { students, addStudent, deleteStudent } = useAppContext();
  return <StudentList students={students} onAdd={addStudent} onDelete={deleteStudent} />;
}
