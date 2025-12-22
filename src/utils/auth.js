// Authentication utility functions for frontend

import { API_ENDPOINTS } from '../config/api.js';

/**
 * Get the stored access token
 */
export const getAccessToken = () => {
    return sessionStorage.getItem('accessToken');
};

/**
 * Get the stored refresh token
 */
export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
};

/**
 * Get the stored user data
 */
export const getUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
    return !!getAccessToken() || !!getRefreshToken();
};

/**
 * Store authentication tokens and user data
 */
export const setAuthData = (accessToken, refreshToken, user) => {
    sessionStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(user));
};

/**
 * Clear authentication data
 */
export const clearAuthData = () => {
    sessionStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
};

/**
 * Decode JWT token to get expiration time
 */
const decodeToken = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (error) {
        return null;
    }
};

/**
 * Check if token is about to expire (within 5 minutes)
 */
const isTokenExpiringSoon = (token) => {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return true;

    const expirationTime = decoded.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();
    const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds

    return (expirationTime - currentTime) < fiveMinutes;
};

/**
 * Refresh access token using refresh token
 */
export const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
        throw new Error('No refresh token available');
    }

    try {
        const response = await fetch(API_ENDPOINTS.AUTH.REFRESH, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
        });

        const data = await response.json();

        if (response.ok) {
            // Store new tokens
            sessionStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            return data.accessToken;
        }

        // Refresh token expired or invalid
        throw new Error(data.message || 'Failed to refresh token');
    } catch (error) {
        console.error('Token refresh error:', error);
        // Clear auth data and redirect to login
        clearAuthData();
        window.location.href = '/auth';
        throw error;
    }
};

/**
 * Start automatic token refresh interval
 * Checks every minute if token needs refresh
 */
let refreshInterval = null;

export const startTokenRefreshInterval = () => {
    // Clear any existing interval
    if (refreshInterval) {
        clearInterval(refreshInterval);
    }

    // Check and refresh token every minute
    refreshInterval = setInterval(async () => {
        const accessToken = getAccessToken();
        const refreshToken = getRefreshToken();

        // Only proceed if we have both tokens
        if (!accessToken || !refreshToken) {
            return;
        }

        // Check if token is expiring soon
        if (isTokenExpiringSoon(accessToken)) {
            try {
                console.log('Access token expiring soon, refreshing...');
                await refreshAccessToken();
                console.log('Access token refreshed successfully');
            } catch (error) {
                console.error('Failed to refresh token:', error);
                clearInterval(refreshInterval);
            }
        }
    }, 60000); // Check every minute
};

/**
 * Stop automatic token refresh interval
 */
export const stopTokenRefreshInterval = () => {
    if (refreshInterval) {
        clearInterval(refreshInterval);
        refreshInterval = null;
    }
};

/**
 * Logout user (clear local storage and call logout endpoint)
 */
export const logout = async () => {
    const accessToken = getAccessToken();

    // Stop token refresh interval
    stopTokenRefreshInterval();

    // Call logout endpoint if token exists
    if (accessToken) {
        try {
            await fetch(API_ENDPOINTS.AUTH.LOGOUT, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
        } catch (error) {
            console.error('Logout API error:', error);
        }
    }

    // Clear all auth data
    clearAuthData();
};

/**
 * Make authenticated API request with auto-refresh
 */
export const authenticatedFetch = async (url, options = {}) => {
    let accessToken = getAccessToken();

    if (!accessToken) {
        // Try to refresh if we have a refresh token
        const refreshToken = getRefreshToken();
        if (refreshToken) {
            try {
                accessToken = await refreshAccessToken();
            } catch (error) {
                throw new Error('No authentication token found');
            }
        } else {
            throw new Error('No authentication token found');
        }
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        ...options.headers,
    };

    let response = await fetch(url, {
        ...options,
        headers,
    });

    // If access token expired, try to refresh and retry
    if (response.status === 401) {
        try {
            accessToken = await refreshAccessToken();

            // Retry the request with new access token
            headers['Authorization'] = `Bearer ${accessToken}`;
            response = await fetch(url, {
                ...options,
                headers,
            });
        } catch (error) {
            // Refresh failed, redirect to login
            await logout();
            window.location.href = '/auth';
            throw new Error('Session expired. Please login again.');
        }
    }

    // If still unauthorized or forbidden after refresh
    if (response.status === 401 || response.status === 403) {
        await logout();
        window.location.href = '/auth';
        throw new Error('Session expired. Please login again.');
    }

    return response;
};

/**
 * Get current user from API
 */
export const getCurrentUser = async () => {
    try {
        const response = await authenticatedFetch(API_ENDPOINTS.AUTH.ME);
        const data = await response.json();

        if (response.ok) {
            // Update stored user data
            localStorage.setItem('user', JSON.stringify(data.user));
            return data.user;
        }

        throw new Error(data.message || 'Failed to get user data');
    } catch (error) {
        console.error('Get current user error:', error);
        throw error;
    }
};

/**
 * Update user profile
 */
export const updateProfile = async (name) => {
    try {
        const response = await authenticatedFetch(API_ENDPOINTS.AUTH.PROFILE, {
            method: 'PUT',
            body: JSON.stringify({ name }),
        });

        const data = await response.json();

        if (response.ok) {
            // Update stored user data
            localStorage.setItem('user', JSON.stringify(data.user));
            return data;
        }

        throw new Error(data.message || 'Failed to update profile');
    } catch (error) {
        console.error('Update profile error:', error);
        throw error;
    }
};

/**
 * Change password
 */
export const changePassword = async (currentPassword, newPassword) => {
    try {
        const response = await authenticatedFetch(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, {
            method: 'PUT',
            body: JSON.stringify({ currentPassword, newPassword }),
        });

        const data = await response.json();

        if (response.ok) {
            return data;
        }

        throw new Error(data.message || 'Failed to change password');
    } catch (error) {
        console.error('Change password error:', error);
        throw error;
    }
};

/**
 * Protected Route Component Helper
 * Use this to check if user should access a route
 */
export const requireAuth = () => {
    if (!isAuthenticated()) {
        window.location.href = '/auth';
        return false;
    }
    return true;
};

// Backward compatibility - keep old function names
export const getToken = getAccessToken;
