import axios from 'axios';
import { Intake } from '../models/Intake';

const API_BASE = '/intake';

export const fetchIntakes = () => axios.get<Intake[]>(API_BASE);
export const fetchIntakeById = (id: string) => axios.get<Intake>(`${API_BASE}/${id}`);
export const createIntake = (intake: Omit<Intake, 'id' | 'status'>) => axios.post<Intake>(API_BASE, intake);
export const updateIntake = (data: Intake) => {
    return axios.put(`${API_BASE}/${data.id}`, data);
};
export const submitIntake = (id: string) => {
    return axios.post(`${API_BASE}/${id}/submit`);
};
