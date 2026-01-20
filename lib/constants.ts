import { Staff, Student, CallLog } from './types';

export const INITIAL_STAFF: Staff[] = [
  { id: 'st1', name: 'Dr. Aruna', department: 'Admissions', role: 'Head of Admissions', extension: '101', phoneNumber: '+91 8156831156', status: 'available' },
  { id: 'st2', name: 'Proff. Nithya', department: 'Financial Aid', role: 'Officer', extension: '102', phoneNumber: '+91 9876543210', status: 'busy' },
  { id: 'st3', name: 'Proff. Mumthas', department: 'Registrar', role: 'Assistant Registrar', extension: '103', phoneNumber: '+91 8234567890', status: 'available' },
];

export const INITIAL_STUDENTS: Student[] = [
  { id: 's6', name: 'Jomin Binny', enrollmentNo: 'VDA23CS036', course: 'Computer Science', year: 2, gpa: 9.2, attendance: '95%', outstandingBalance: 0 },
  { id: 's6', name: 'AMARNATH PS', enrollmentNo: 'VDA23CS007', course: 'Computer Science', year: 3, gpa: 8.5, attendance: '88%', outstandingBalance: 5000 },
  { id: 's6', name: 'ARJUN B', enrollmentNo: 'VDA23CS018', course: 'Computer Science', year: 3, gpa: 7.8, attendance: '92%', outstandingBalance: 12500 },
  { id: 's6', name: 'ABHIN C', enrollmentNo: 'VDA23CS001', course: 'Computer Science', year: 3, gpa: 7.8, attendance: '92%', outstandingBalance: 12500 },

];

export const INITIAL_LOGS: CallLog[] = [];
