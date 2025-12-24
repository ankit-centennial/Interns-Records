import axios from "axios";
import type { AxiosResponse } from "axios";
import type { CandidatePayload } from "../types/candidate";
import  type { Candidate } from "../types/candidate";

const API_URL = import.meta.env.VITE_API_URL as string;

export const candidateAddApi = async function (
  data: CandidatePayload
): Promise<AxiosResponse> {
  return axios.post(`${API_URL}/candidate/add`, data);
};

export const candidateGetApi = async ():Promise<Candidate[]> => {
  const res = await axios.get(`${API_URL}/candidate`)
  return res.data
}

export const candidateDeleteApi = async (id:string) => {
  return axios.delete(`${API_URL}/candidate/${id}`)
}