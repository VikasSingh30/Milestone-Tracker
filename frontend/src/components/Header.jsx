import React from 'react';
import { Heart, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';  
import { useNavigate } from 'react-router-dom';     
import { showToast } from '../utils/toast';         

export const Header = () => {
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    showToast.success('Logged out successfully');
    navigate('/login');
  };

  if (isLoading) {
    return (
      <header className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-pink-500" />
              <span className="text-2xl font-bold text-gray-800">BabySteps</span>
            </div>
            <div className="animate-pulse h-8 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow-sm border-b border-pink-100">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-pink-500" />
            <span className="text-2xl font-bold text-gray-800">BabySteps</span>
          </div>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">{user?.name || 'User'}</p>
                <p className="text-xs text-pink-600">Week {user?.pregnancyWeek ?? '--'}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
                aria-label="Logout"
              >
                <User className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div className="h-8"></div> 
          )}
        </div>
      </div>
    </header>
  );
}