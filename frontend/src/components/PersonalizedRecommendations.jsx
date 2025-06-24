import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

export const PersonalizedRecommendations = ({ user }) => {
  const getWeeklyRecommendations = (week) => {
    const recommendations = {
      1: [
        "Start taking 400-800 mcg of folic acid daily",
        "Schedule your first prenatal appointment with an OB-GYN",
        "Begin tracking your pregnancy symptoms and questions",
      ],
      4: [
        "Research prenatal vitamin options",
        "Start reducing caffeine intake (limit to 200mg/day)",
        "Avoid alcohol and smoking completely",
      ],
      8: [
        "Consider genetic screening tests",
        "Begin gentle pregnancy-safe exercises",
        "Start a pregnancy journal or app",
      ],
      12: [
        "Announce your pregnancy to close family",
        "Begin researching baby names",
        "Start budgeting for baby expenses",
      ],
      16: [
        "Schedule your mid-pregnancy ultrasound",
        "Start sleeping on your side",
        "Begin prenatal massage if desired",
      ],
      20: [
        "Register for childbirth classes",
        "Start planning your nursery setup",
        "Begin Kegel exercises",
      ],
      24: ["Take glucose screening test", "Consider taking childbirth classes"],
      28: [
        "Begin counting fetal movements daily",
        "Start preparing your birth plan",
        "Take hospital tour if available",
      ],
      32: [
        "Pack your hospital bag with essentials",
        "Finalize maternity leave paperwork",
        "Install and learn how to use car seat",
      ],
      36: [
        "Confirm birth plan with your provider",
        "Prepare freezer meals for postpartum",
        "Install baby gear at home",
      ],
      40: [
        "Practice relaxation techniques",
        "Finalize childcare arrangements",
        "Rest as much as possible",
      ],
    };

    const weekKey = Math.floor(week / 4) * 4;
    return (
      recommendations[weekKey] || [
        "Continue maintaining healthy pregnancy habits",
        "Stay hydrated and get plenty of rest",
        "Keep all prenatal appointments",
      ]
    );
  };

  const availableWeeks = [1, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40];
  const [defaultWeek, setDefaultWeek] = useState(availableWeeks[0]);

  useEffect(() => {
    if (user) return;
    const interval = setInterval(() => {
      setDefaultWeek((prev) => {
        const idx = availableWeeks.indexOf(prev);
        return availableWeeks[(idx + 1) % availableWeeks.length];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [user]);

  const currentWeek = user?.pregnancyWeek || defaultWeek;
  const recommendations = getWeeklyRecommendations(currentWeek);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 mb-6 ">
        <div className="flex items-center space-x-2 mb-4">
          {/* <Sparkles className="h-5 w-5 text-purple-500" /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-sparkles h-5 w-5 text-purple-500"
          >
            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
            <path d="M20 3v4"></path>
            <path d="M22 5h-4"></path>
            <path d="M4 17v2"></path>
            <path d="M5 18H3"></path>
          </svg>
          <h2 className="text-lg font-semibold text-gray-800">
            Personalized for Week {currentWeek}
          </h2>
        </div>
        <div className="space-y-2">
          {recommendations.map((rec, index) => (
            <div
              key={`week-${currentWeek}-rec-${index}`}
              className="flex items-start space-x-2"
            >
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
              <p className="text-gray-700">{rec}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// PersonalizedRecommendations.propTypes = {
//   user: PropTypes.shape({
//     name: PropTypes.string,
//     email: PropTypes.string,
//     pregnancyWeek: PropTypes.number
//   })
// };
