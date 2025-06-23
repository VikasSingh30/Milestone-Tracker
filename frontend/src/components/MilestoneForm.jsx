import { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

export const MilestoneForm = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    week: '',
    category: 'medical',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMilestone = {
      ...formData,
      id: Date.now(),
      date: formData.date || new Date().toISOString().split('T')[0]
    };
    onAdd(newMilestone);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>

        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Milestone Title</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="e.g., First Ultrasound"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pregnancy Week</label>
                <input
                  type="number"
                  value={formData.week}
                  onChange={(e) => setFormData({...formData, week: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="e.g., 12"
                  min="1"
                  max="42"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <div className="relative">
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full appearance-none px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="medical">Medical</option>
                  <option value="health">Health</option>
                  <option value="personal">Personal</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Add any additional notes..."
                rows="3"
              />
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 font-medium"
              >
                Add Milestone
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};