"use client";

import StaffList from '../../components/StaffList';
import { useAppContext } from '../../context/AppContext';

export default function StaffPage() {
  const { staff, addStaff, deleteStaff } = useAppContext();
  return <StaffList staff={staff} onAdd={addStaff} onDelete={deleteStaff} />;
}
