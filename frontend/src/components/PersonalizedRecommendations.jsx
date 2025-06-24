import React from 'react';
import { Sparkles } from 'lucide-react';

export const PersonalizedRecommendations = ({ user }) => {
 
  const getWeeklyRecommendations = (week) => {
    const recommendations = {
      1: [
        'Start taking 400-800 mcg of folic acid daily',
        'Schedule your first prenatal appointment with an OB-GYN',
        'Begin tracking your pregnancy symptoms and questions'
      ],
      4: [
        'Research prenatal vitamin options',
        'Start reducing caffeine intake (limit to 200mg/day)',
        'Avoid alcohol and smoking completely'
      ],
      8: [
        'Consider genetic screening tests',
        'Begin gentle pregnancy-safe exercises',
        'Start a pregnancy journal or app'
      ],
      12: [
        'Announce your pregnancy to close family',
        'Begin researching baby names',
        'Start budgeting for baby expenses'
      ],
      16: [
        'Schedule your mid-pregnancy ultrasound',
        'Start sleeping on your side',
        'Begin prenatal massage if desired'
      ],
      20: [
        'Register for childbirth classes',
        'Start planning your nursery setup',
        'Begin Kegel exercises'
      ],
      24: [
        'Complete glucose screening test',
        'Start moisturizing your belly to prevent stretch marks',
        'Research pediatricians in your area'
      ],
      28: [
        'Begin counting fetal movements daily',
        'Start preparing your birth plan',
        'Take hospital tour if available'
      ],
      32: [
        'Pack your hospital bag with essentials',
        'Finalize maternity leave paperwork',
        'Install and learn how to use car seat'
      ],
      36: [
        'Confirm birth plan with your provider',
        'Prepare freezer meals for postpartum',
        'Install baby gear at home'
      ],
      40: [
        'Practice relaxation techniques',
        'Finalize childcare arrangements',
        'Rest as much as possible'
      ]
    };

    
    const weekKey = Math.floor(week / 4) * 4;
    return recommendations[weekKey] || [
      'Continue maintaining healthy pregnancy habits',
      'Stay hydrated and get plenty of rest',
      'Keep all prenatal appointments'
    ];
  };

 
  const currentWeek = user?.pregnancyWeek || 1;
  const recommendations = getWeeklyRecommendations(currentWeek);

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles className="h-5 w-5 text-purple-500" />
        <h2 className="text-lg font-semibold text-gray-800">
          Personalized for Week {currentWeek}
        </h2>
      </div>
      
      <div className="space-y-2">
        {recommendations.map((rec, index) => (
          <div key={`week-${currentWeek}-rec-${index}`} className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
            <p className="text-gray-700">{rec}</p>
          </div>
        ))}
      </div>
    </div>
  );
};