import axios from "axios";
import type {
  CandidateListResponse,
  CandidatePayload,
} from "../types/candidate";
import type { Candidate } from "../types/candidate";
import type { MessageResponse } from "../types/candidate";

const API_URL = import.meta.env.VITE_API_URL as string;

export const candidateAddApi = async function (
  data: CandidatePayload
): Promise<MessageResponse> {
  const res = await axios.post(`${API_URL}/candidate/add`, data);
  return res.data;
};

export const candidateGetApi = async (
  page: number = 1,
  limit: number = 5
): Promise<CandidateListResponse> => {
  const res = await axios.get(`${API_URL}/candidate`, {
    params: { page, limit },
  });
  return res.data;
};

export const candidateDeleteApi = async (
  id: string
): Promise<MessageResponse> => {
  const res = await axios.delete(`${API_URL}/candidate/${id}`);
  return res.data;
};

export const candidateEditApi = async (
  id: string,
  data: CandidatePayload
): Promise<Candidate & MessageResponse> => {
  const res = await axios.put(`${API_URL}/candidate/${id}`, data);
  return res.data;
};
