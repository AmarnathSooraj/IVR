
export interface Staff {
  id: string;
  name: string;
  department: string;
  role: string;
  extension: string;
  phoneNumber: string;
  status: 'available' | 'busy' | 'offline';
}

export interface Student {
  id: string;
  name: string;
  enrollmentNo: string;
  course: string;
  year: number;
  gpa: number;
  attendance: string;
  outstandingBalance: number;
}

export interface CallLog {
  id: string;
  caller: string;
  timestamp: Date;
  duration: string;
  type: 'AI Resolved' | 'Forwarded' | 'Missed';
  transcriptSnippet: string;
  assignedStaff?: string;
}

export interface IVRNode {
  id: string;
  label: string;
  prompt: string;
  options: { key: string; action: string; nextNodeId?: string }[];
}
