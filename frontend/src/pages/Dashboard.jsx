import { useState } from 'react';
import { Heart, Plus, MessageCircle } from 'lucide-react';

export const Dashboard = () => {
  const [milestones, setMilestones] = useState([
    {
      id: 1,
      title: "Heard the Heartbeat",
      week: 16,
      date: "2024-02-20",
      notes: "Most beautiful sound ever heard!"
    }
  ]);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Personalized Recommendations */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">BabySteps</h1>
          <div className="space-y-3">
            <p className="font-medium">Personalized for Week 24</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Take glucose screening test</li>
              <li>Consider taking childbirth classes</li>
            </ul>
          </div>
        </div>

        {/* Milestones Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your Milestones</h2>
          
          {milestones.map(milestone => (
            <div key={milestone.id} className="mb-6 pb-6 border-b border-gray-100 last:border-0">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-800">{milestone.title}</h3>
                  <p className="text-sm text-pink-500">Week {milestone.week}</p>
                </div>
                <span className="text-sm text-gray-400">
                  {new Date(milestone.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              
              {milestone.notes && (
                <p className="mt-2 text-gray-600">{milestone.notes}</p>
              )}
              
              <button className="mt-3 flex items-center text-pink-500 hover:text-pink-600 text-sm font-medium">
                <MessageCircle className="h-4 w-4 mr-2" />
                View Community Tips
              </button>
            </div>
          ))}

          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center justify-center w-full py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-colors text-pink-500"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Milestone
          </button>
        </div>
      </div>

      {/* Milestone Form Modal */}
      {showForm && (
        <MilestoneForm 
          onClose={() => setShowForm(false)}
          onAdd={(newMilestone) => setMilestones([...milestones, newMilestone])}
        />
      )}
    </div>
  );
};