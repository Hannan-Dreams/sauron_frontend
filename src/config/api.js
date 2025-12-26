// API Configuration
// This file centralizes all API endpoint configurations

// Base API URL - change this based on environment
const API_BASE_URL = 'https://api.sauron.digital';

// API Endpoints
export const API_ENDPOINTS = {
    // Auth endpoints
    AUTH: {
        SIGNUP: `${API_BASE_URL}/api/auth/signup`,
        LOGIN: `${API_BASE_URL}/api/auth/login`,
        LOGOUT: `${API_BASE_URL}/api/auth/logout`,
        REFRESH: `${API_BASE_URL}/api/auth/refresh`,
        ME: `${API_BASE_URL}/api/auth/me`,
        PROFILE: `${API_BASE_URL}/api/auth/profile`,
        CHANGE_PASSWORD: `${API_BASE_URL}/api/auth/change-password`,
        CREATE_ADMIN: `${API_BASE_URL}/api/auth/create-admin`,
    },
    // DSA endpoints
    DSA: {
        GET_ALL: `${API_BASE_URL}/api/dsa`,
        GET_BY_LEVEL: (level) => `${API_BASE_URL}/api/dsa/level/${level}`,
        GET_BY_ID: (id) => `${API_BASE_URL}/api/dsa/${id}`,
        CREATE: `${API_BASE_URL}/api/dsa`,
        UPDATE: (id) => `${API_BASE_URL}/api/dsa/${id}`,
        DELETE: (id) => `${API_BASE_URL}/api/dsa/${id}`,
    },
    // Progress endpoints
    PROGRESS: {
        GET: `${API_BASE_URL}/api/progress`,
        STATS: `${API_BASE_URL}/api/progress/stats`,
        LEADERBOARD: `${API_BASE_URL}/api/progress/leaderboard`,
        SOLVE: `${API_BASE_URL}/api/progress/solve`,
        UNSOLVE: `${API_BASE_URL}/api/progress/unsolve`,
    },
    // Tech Products endpoints
    TECH_PRODUCTS: {
        GET_ALL: `${API_BASE_URL}/api/tech-products`,
        GET_BY_ID: (id) => `${API_BASE_URL}/api/tech-products/${id}`,
        GET_BY_CATEGORY: (category) => `${API_BASE_URL}/api/tech-products/category/${category}`,
        CREATE: `${API_BASE_URL}/api/tech-products`,
        UPDATE: (id) => `${API_BASE_URL}/api/tech-products/${id}`,
        DELETE: (id) => `${API_BASE_URL}/api/tech-products/${id}`,
    },
    // Health check
    HEALTH: `${API_BASE_URL}/health`,
};

// Export base URL for custom endpoints
export const API_URL = API_BASE_URL;

export default API_ENDPOINTS;
