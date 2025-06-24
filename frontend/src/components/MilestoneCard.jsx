import React from 'react';
import { Activity, Shield, Baby, MessageCircle, ChevronRight } from 'lucide-react';

export const MilestoneCard = ({ milestone = {}, onViewTips = () => {} }) => {
  // Safely get date in required format
  const displayDate = milestone.date 
    ? new Date(milestone.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : '';

  // Get appropriate icon for category
  const getCategoryIcon = () => {
    const iconProps = { className: 'h-5 w-5' };
    switch (milestone.category) {
      case 'medical': return <Activity {...iconProps} className={`${iconProps.className} text-blue-500`} />;
      case 'health': return <Shield {...iconProps} className={`${iconProps.className} text-green-500`} />;
      default: return <Baby {...iconProps} className={`${iconProps.className} text-pink-500`} />;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {getCategoryIcon()}
          <div>
            <h3 className="font-semibold text-gray-800">{milestone.title || 'Milestone'}</h3>
            {milestone.week && <p className="text-sm text-gray-500">Week {milestone.week}</p>}
          </div>
        </div>
        {displayDate && <span className="text-sm text-gray-400">{displayDate}</span>}
      </div>
      
      {milestone.notes && (
        <p className="text-gray-600 mb-4">{milestone.notes}</p>
      )}
      
      <button
        onClick={() => onViewTips(milestone)}
        className="flex items-center space-x-2 text-pink-600 hover:text-pink-700 text-sm font-medium"
      >
        <MessageCircle className="h-4 w-4" />
        <span>View Community Tips</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};