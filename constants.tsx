
import { Staff, Student, CallLog } from './types';

export const INITIAL_STAFF: Staff[] = [
  { id: '1', name: 'Dr. Sarah Jenkins', department: 'Admissions', role: 'Head', extension: '101', phoneNumber: '+1234567890', status: 'available' },
  { id: '2', name: 'James Miller', department: 'Financial Aid', role: 'Advisor', extension: '102', phoneNumber: '+1234567891', status: 'busy' },
  { id: '3', name: 'Linda Wang', department: 'Registrar', role: 'Clerk', extension: '103', phoneNumber: '+1234567892', status: 'available' },
  { id: '4', name: 'Robert Blake', department: 'IT Support', role: 'Technician', extension: '104', phoneNumber: '+1234567893', status: 'offline' },
];

export const INITIAL_STUDENTS: Student[] = [
  { id: 's1', name: 'Alice Cooper', enrollmentNo: 'CS2023001', course: 'Computer Science', year: 2, gpa: 3.8, attendance: '95%', outstandingBalance: 0 },
  { id: 's2', name: 'Bob Dylan', enrollmentNo: 'BA2022045', course: 'Business Admin', year: 3, gpa: 3.2, attendance: '82%', outstandingBalance: 1200 },
  { id: 's3', name: 'Charlie Puth', enrollmentNo: 'EE2024012', course: 'Electrical Engineering', year: 1, gpa: 3.5, attendance: '98%', outstandingBalance: 500 },
];

export const INITIAL_LOGS: CallLog[] = [
  { id: 'l1', caller: '+15550192', timestamp: new Date(Date.now() - 3600000), duration: '2:15', type: 'AI Resolved', transcriptSnippet: "Student asked about scholarship deadlines. AI provided info." },
  { id: 'l2', caller: '+15559921', timestamp: new Date(Date.now() - 7200000), duration: '5:30', type: 'Forwarded', assignedStaff: 'Dr. Sarah Jenkins', transcriptSnippet: "Parent requested to speak with Admissions regarding enrollment." },
  { id: 'l3', caller: '+15553311', timestamp: new Date(Date.now() - 10800000), duration: '1:10', type: 'AI Resolved', transcriptSnippet: "Query about library hours answered." },
];
