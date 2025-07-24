export interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
}

export interface Camera {
    id: number;
    name: string;
    location: string;
    identifier: string;
    created_at: string;
    updated_at: string;
    images?: Image[];
}

export interface Image {
    id: number;
    camera_id: number;
    file_path: string; 
    plague_detected: boolean;
    plague_type: string | null;
    created_at: string;
    updated_at: string;
    camera?: Camera; 
}