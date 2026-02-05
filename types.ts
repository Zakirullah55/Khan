
export type Step = 'step1' | 'step2' | 'step3';
export type ViewMode = 'user' | 'admin';

export interface UserData {
  name: string;
  fatherName: string;
  cnic: string;
  phone: string;
  paymentMethod: string;
  paymentNumber: string;
  district: string;
  tehsil: string;
  familyMembers: string;
  locationUrl?: string;
  status?: 'Approved' | 'Pending';
}

export interface Submission extends UserData {
  id: string;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  name: string;
  message: string;
  isUser?: boolean;
}
