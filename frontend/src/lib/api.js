/**
 * @file api.js
 * @description Axios instance for centralized API requests
 * - Sets base URL from environment variable `NEXT_PUBLIC_API_URL`
 * - Automatically attaches JWT token from localStorage (if present)
 *   to the Authorization header of every request
   */

import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default api;
