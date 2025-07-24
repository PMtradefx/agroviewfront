import apiClient from './ApiClient';
import type { Camera, Image } from '../lib/types';
import axios from 'axios';

interface LoginResponse {
    message: string;
    access_token: string;
    token_type: string;
    name: string;
    rol: string;
    id: string;
}

export interface UpdateCameraResponse {
    statusCode: number;
    data?: Camera;
    errors?: { [key: string]: string };
    message?: string;
}

export const loginUser = async (credentials: any): Promise<LoginResponse> => {
    const baseURL = import.meta.env.VITE_API_URL.replace('/api', '');
    await axios.get(`${baseURL}/sanctum/csrf-cookie`, { withCredentials: true });

    // Ahora, procedemos con la petición de login usando el apiClient
    const response = await apiClient.post<LoginResponse>('/login', credentials);
    return response.data;
};

export const getCameras = async (clientId?: number): Promise<Camera[]> => {
    try {
        const params = clientId ? { client_id: clientId } : {};
        const response = await apiClient.get<Camera[]>('/cameras', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching cameras:', error);
        throw error;
    }
};

export const getLatestImages = async (clientId?: number): Promise<Camera[]> => {
    try {
        const params = clientId ? { client_id: clientId } : {};
        const response = await apiClient.get<Camera[]>('/latest-images', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching latest images:', error);
        throw error;
    }
};

export const getImages = async (page: number = 1, cameraId?: number): Promise<{data: Image[], total: number}> => {
    const params: { page: number; camera_id?: number } = { page };
    if (cameraId) {
        params.camera_id = cameraId;
    }
    const response = await apiClient.get<{data: Image[], total: number}>('/images', { params });
    return response.data;
};

export const getCamera = async (id: number): Promise<Camera> => {
    const response = await apiClient.get<Camera>(`/api-cameras/${id}`);
    return response.data;
};

export const updateCamera = async (id: number, data: Partial<Camera>): Promise<UpdateCameraResponse> => {
    const response = await apiClient.put<UpdateCameraResponse>(`/api-cameras/${id}`, data);
    return response.data;
};

export const getAllImages = async (clientId?: number, page: number = 1, perPage: number = 5): Promise<{data: any[], total: number}> => {
    try {
        const params: { client_id?: number; page: number; per_page: number } = { page, per_page: perPage };
        if (clientId) {
            params.client_id = clientId;
        }
        const response = await apiClient.get<{data: any[], total: number}>('/images', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching all images:', error);
        throw error;
    }
};

export const deleteCamera = async (id: number): Promise<{ statusCode: number; data: any }> => {
    const response = await apiClient.delete(`/api-cameras/${id}`);
    return response.data;
};

export const createCamera = async (data: Partial<Camera>): Promise<{ statusCode: number; data?: Camera; errors?: { [key: string]: string }; message?: string }> => {
    const response = await apiClient.post('/api-cameras', data);
    return {
        statusCode: response.status,
        ...response.data
    };
};
