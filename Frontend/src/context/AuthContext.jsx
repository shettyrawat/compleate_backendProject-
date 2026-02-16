import { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser); // Set initial user from storage

                try {
                    // Try to fetch fresh user data from server to sync profile/PP
                    const { data } = await api.get('/auth/profile');
                    // Merge fresh data with existing token
                    const updatedUser = { ...parsedUser, ...data };
                    setUser(updatedUser);
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                } catch (error) {
                    console.error('Failed to sync user profile:', error);
                    // If 401, maybe logout but let's be safe for now
                }
            }
            setLoading(false);
        };
        fetchUser();
    }, []);

    const login = async (identifier, password) => {
        try {
            const { data } = await api.post('/auth/login', { identifier, password });
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            return data;
        } catch (error) {
            throw error;
        }
    };

    const verifyLogin = async (email, otp) => {
        try {
            const { data } = await api.post('/auth/verify-login', { email, otp });
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            return data;
        } catch (error) {
            throw error;
        }
    };

    const register = async (username, email, password) => {
        try {
            const { data } = await api.post('/auth/register', { username, email, password });
            return data;
        } catch (error) {
            throw error;
        }
    };

    const resendOTP = async (email) => {
        try {
            const { data } = await api.post('/auth/resend-otp', { email });
            return data;
        } catch (error) {
            throw error;
        }
    };

    const verifyEmail = async (email, otp) => {
        try {
            const { data } = await api.post('/auth/verify-email', { email, otp });
            // Do NOT set user here, force them to login or wait for login-otp
            return data;
        } catch (error) {
            throw error;
        }
    };

    const googleLogin = async (credential) => {
        try {
            const { data } = await api.post('/auth/google', { credential });
            if (!data.requiresOTP) {
                setUser(data);
                localStorage.setItem('user', JSON.stringify(data));
            }
            return data;
        } catch (error) {
            throw error;
        }
    };

    const updateProfile = async (username, password = null) => {
        try {
            const body = { username };
            if (password) body.password = password;
            const { data } = await api.put('/auth/profile', body);
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            return data;
        } catch (error) {
            throw error;
        }
    };

    const requestOTP = async (email) => {
        try {
            const { data } = await api.post('/auth/request-otp', { email });
            return data;
        } catch (error) {
            throw error;
        }
    };

    const requestLoginOTP = async (identifier) => {
        try {
            const { data } = await api.post('/auth/request-login-otp', { identifier });
            return data;
        } catch (error) {
            throw error;
        }
    };

    const resetPassword = async (email, otp, newPassword) => {
        try {
            const { data } = await api.put('/auth/reset-password', { email, otp, newPassword });
            return data;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, verifyLogin, register, verifyEmail, resendOTP, googleLogin, updateProfile, requestOTP, requestLoginOTP, resetPassword, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
