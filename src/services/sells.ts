import { Purchase } from 'interfaces/Purchase';
import api from '../config/api';

const SELLS_PATH = '/sells';

export interface APIResponse {
  success: boolean;
  message: string;
}

export const getAllSells = () => api.get<{data:Purchase[]}>(`${SELLS_PATH}/get`);

export const toggleFinished = (id: string) => api.put<APIResponse>(`${SELLS_PATH}/toggleFinished/${id}`);
