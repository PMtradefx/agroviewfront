import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Usa la URL desde .env
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true, // Esto es importante para Sanctum
});

// Interceptor para añadir el token de autenticación a cada petición
apiClient.interceptors.request.use(config => {
    // Obtenemos el token de Sanctum del almacenamiento local
    const token = localStorage.getItem('sanctum_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;
