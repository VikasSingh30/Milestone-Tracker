import React, { useState, useEffect } from 'react';
import { Plus, Baby } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import  api  from '../api';
import { Header } from '../components/Header';
import { PersonalizedRecommendations } from '../components/PersonalizedRecommendations';
import { MilestoneCard } from '../components/MilestoneCard';
import { AddMilestoneForm } from '../components/AddMilestoneForm';
import { CommunityTipsModal } from '../components/CommunityTipsModal';
import { Toast } from '../components/Toast';

export const Dashboard = () => {
  const { user } = useAuth();
  const [milestones, setMilestones] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const milestonesData = await api.getMilestones();
        setMilestones(sortMilestones(milestonesData));
      } catch (error) {
        console.error('Error loading milestones:', error);
        setToast({ 
          message: 'Failed to load milestones. Please try again.', 
          type: 'error' 
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const sortMilestones = (milestones) => {
    return [...milestones].sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const handleAddMilestone = (newMilestone) => {
    setMilestones(prev => sortMilestones([newMilestone, ...prev]));
    setToast({ 
      message: 'Milestone added successfully!', 
      type: 'success' 
    });
    setShowAddForm(false);
  };

  const handleViewTips = (milestone) => {
    setSelectedMilestone(milestone);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Personalized Recommendations */}
        {user?.pregnancyWeek && (
          <PersonalizedRecommendations user={user} />
        )}

        {/* Milestones Section */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Your Milestones</h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            aria-label="Add new milestone"
          >
            <Plus className="h-5 w-5" />
            <span>Add Milestone</span>
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={`skeleton-${i}`} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse h-40" />
            ))}
          </div>
        )}

        {/* Milestones Grid */}
        {!isLoading && milestones.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {milestones.map((milestone) => (
              <MilestoneCard
                key={milestone.id || milestone.id}
                milestone={milestone}
                onViewTips={handleViewTips}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && milestones.length === 0 && (
          <div className="text-center py-12">
            <Baby className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">
              No milestones yet
            </h3>
            <p className="text-gray-400 mb-4">
              Start tracking your pregnancy journey by adding your first milestone
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              Add Your First Milestone
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {showAddForm && (
        <AddMilestoneForm
          onClose={() => setShowAddForm(false)}
          onAdd={handleAddMilestone}
        />
      )}

      {selectedMilestone && (
        <CommunityTipsModal
          milestone={selectedMilestone}
          onClose={() => setSelectedMilestone(null)}
        />
      )}

      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};