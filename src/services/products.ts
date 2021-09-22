import api from '../config/api';
import { Product } from '../interfaces/Products';

const PRODUCTS_PATH = '/products';

export interface APIResponse {
  success: boolean;
  message: string;
}

export interface UploadResponse {
  success: boolean;
  links: string[];
}

export const addProduct = (product: Product) => api.post<APIResponse>(`${PRODUCTS_PATH}/create`, product);

export const getAllProducts = () => api.get<{ success: boolean; response: Product[] }>(`${PRODUCTS_PATH}/get`);

export const getProduct = (productId: string) => api.get<{ success: boolean; response: Product }>(
  `${PRODUCTS_PATH}/getSingle/${productId}`,
);

export const editProduct = (productId: string, newProduct: Product) => api.put<APIResponse>(`${PRODUCTS_PATH}/edit/${productId}`, newProduct);

export const deleteProduct = (productId: string) => api.delete(`${PRODUCTS_PATH}/delete/${productId}`);

export const deleteCommentFromProduct = (productId: string, commentId: string) => api.delete(`${PRODUCTS_PATH}/comment/delete/${productId}/${commentId}`);

export const uploadImages = (formData: any) => api.post<UploadResponse>('/upload/', formData);
