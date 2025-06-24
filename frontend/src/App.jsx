import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { HeartSpinner } from './components/HeartSpinner';
import { Toast } from './components/Toast';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <HeartSpinner />;

  return (
    <AuthProvider>
      <Toast />
      <Routes>
        {/* Protected routes */}
        {/* <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
        </Route> */}
        <Route path="/" element={<Dashboard />} />
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;