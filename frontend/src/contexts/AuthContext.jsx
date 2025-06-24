import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/index';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await api.getCurrentUser();
          setUser({
            id: response.user._id,
            name: response.user.name,
            email: response.user.email,
            pregnancyWeek: response.user.pregnancyWeek,
            
          });
        } catch (error) {
          localStorage.removeItem('token');
          console.error('Authentication check failed:', error);
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.login({ email, password });
      localStorage.setItem('token', response.token);
      setUser({
        id: response.user._id,
        name: response.user.name,
        email: response.user.email,
        pregnancyWeek: response.user.pregnancyWeek
      });
      toast.success('Logged in successfully!');
      navigate('/');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isLoading,
      setUser // well this is optional if we need to update user data elsewhere
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};