import { Purchase } from 'interfaces/Purchase';
import api from '../config/api';

const SELLS_PATH = '/sells';

export interface APIResponse {
  success: boolean;
  message: string;
}
export interface SellsResponse {
  success: boolean;
  data: Purchase[];
  additionalInfo: AdditionalInfo;
}

export interface AdditionalInfo {
  monthPurchases: number;
  totalPurchases: number;
  monthAmount: number;
  totalAmount: number;
}
export interface UserInfo {
  name: string;
  whatsApp: number;
}

export const getAllSells = () => api.get<SellsResponse>(`${SELLS_PATH}/get`);

export const toggleFinished = (id: string) => api.put<APIResponse>(`${SELLS_PATH}/toggleFinished/${id}`, {});
