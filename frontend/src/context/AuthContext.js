/**
 * @file AuthContext.jsx
 * @description Global authentication context for managing login state
 * - Stores JWT token, user role, and user ID
 * - Handles login/logout flows and auto-redirects
 *
 * @provides useAuth hook for accessing:
 *   - token: JWT token from backend
 *   - role: either 'admin' or 'customer'
 *   - id: user/customer MongoDB ID
 *   - login(): saves auth data and navigates to dashboard
 *   - logout(): clears auth state and redirects to home
   */

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null);
    const [id, setId] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedRole = localStorage.getItem('role');
        const storedId = localStorage.getItem('id');
        if (storedToken && storedRole && storedId) {
            setToken(storedToken);
            setRole(storedRole);
            setId(storedId);
        }
    }, []);

    const login = (token, role, id) => {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('id', id);
        setToken(token);
        setRole(role);
        setId(id);
        router.push(`/dashboard/${role}`);
    };

    const logout = () => {
        localStorage.clear();
        setToken(null);
        setRole(null);
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ token, role, id, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
