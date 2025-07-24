export interface Cliente {
    id: number;
    name: string;
    email?: string;
    rol?: string;
}

export interface Camera {
    id: number;
    name: string;
    location: string;
    identifier: string;
    created_at: string;
    updated_at: string;
    cliente_id?: number | null;
    cliente?: Cliente | null;
    images?: Image[];
}

export interface Image {
    id: number;
    file_path: string;
    name:string;
    plague_detected: boolean;
    plague_type?: string;
    created_at: string;
    camera?: Camera;
}
