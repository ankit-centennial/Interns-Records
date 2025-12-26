export interface CandidateFormData {
  name: string;
  email: string;
  phone: string;
  status: string;
  joiningDate: string;
  duration: string;
}

export interface CandidatePayload {
  name: string;
  email: string;
  phone: string;
  status: string;
  joiningDate: string;
  duration: string;
}

export interface Candidate {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  joiningDate: string;
  duration: string;
}

export interface MessageResponse {
  message: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CandidateListResponse {
  candidate: Candidate[];
  pagination: Pagination;
}
