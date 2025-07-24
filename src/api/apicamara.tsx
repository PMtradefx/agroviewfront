export class ApiCamara {
    static baseUrl = import.meta.env.VITE_API_BASE_URL ;

    static async get(url: string, options: RequestInit = {}): Promise<any> {
        const response = await fetch(ApiCamara.baseUrl + url, {
            method: "GET",
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {}),
            },
        });
            if (!response.ok) {
                await response.text();
                throw new Error("API GET request failed with status " + response.status);
            }
        const dataResponse = await response.json();
        return {
            statusCode: response.status,
            data: dataResponse,
        };
    }

    static async post(url: string, data: any, options: RequestInit = {}): Promise<any> {
        const response = await fetch(ApiCamara.baseUrl + url, {
            method: "POST",
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {}),
            },
            body: JSON.stringify(data),
        });
            if (!response.ok) {
                await response.text();
                throw new Error("API POST request failed with status " + response.status);
            }
        const dataResponse = await response.json();
        return {
            statusCode: response.status,
            data: dataResponse,
        };
    }

    static async put(url: string, data: any, options: RequestInit = {}): Promise<any> {
        const response = await fetch(ApiCamara.baseUrl + url, {
            method: "PUT",
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {}),
            },
            body: JSON.stringify(data),
        });
            if (!response.ok) {
                await response.text();
                throw new Error("API PUT request failed with status " + response.status);
            }
        const dataResponse = await response.json();
        return {
            statusCode: response.status,
            data: dataResponse,
        };
    }

    static async patch(url: string, data: any, options: RequestInit = {}): Promise<any> {
        const response = await fetch(ApiCamara.baseUrl + url, {
            method: "PATCH",
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {}),
            },
            body: JSON.stringify(data),
        });
            if (!response.ok) {
                await response.text();
                throw new Error("API PATCH request failed with status " + response.status);
            }
        const dataResponse = await response.json();
        return {
            statusCode: response.status,
            data: dataResponse,
        };
    }

    static async delete(url: string, options: RequestInit = {}): Promise<any> {
        const response = await fetch(ApiCamara.baseUrl + url, {
            method: "DELETE",
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {}),
            },
        });
            if (!response.ok) {
                await response.text();
                throw new Error("API DELETE request failed with status " + response.status);
            }
        const dataResponse = await response.json();
        return {
            statusCode: response.status,
            data: dataResponse,
        };
    }
}
