import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { api } from '../api/index';

export const CommunityTipsModal = ({ milestone, onClose }) => {
  const [tips, setTips] = useState([]);
  const [newTip, setNewTip] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (milestone?.id) {
      loadTips();
    }
  }, [milestone?.id]);

  const loadTips = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const tipsData = await api.getTips(milestone.id);
      setTips(tipsData);
    } catch (error) {
      console.error('Error loading tips:', error);
      setError('Failed to load tips. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitTip = async (e) => {
    e.preventDefault();
    if (!newTip.trim()) return;

    setIsSubmitting(true);
    try {
      const tip = await api.addTip(milestone.id, {
        content: newTip,
        author: 'You'
      });
      setTips([tip, ...tips]); // Newest first
      setNewTip('');
    } catch (error) {
      console.error('Error adding tip:', error);
      setError('Failed to add tip. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!milestone) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            Community Tips: {milestone.title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <div className="flex-1 overflow-y-auto mb-6 space-y-4">
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading tips...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-3 rounded-md">
              {error}
            </div>
          ) : tips.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
              No tips yet. Be the first to share!
            </div>
          ) : (
            tips.map((tip) => (
              <div key={tip.id} className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-800 mb-2">{tip.content}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>by {tip.author}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>{tip.likes || 0}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleSubmitTip} className="space-y-4">
          <div>
            <label htmlFor="tip-input" className="block text-sm font-medium text-gray-700 mb-2">
              Share Your Tip
            </label>
            <textarea
              id="tip-input"
              value={newTip}
              onChange={(e) => setNewTip(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Share your experience or advice..."
              rows="3"
              maxLength={500}
            />
          </div>
          {error && (
            <div className="text-sm text-red-600">{error}</div>
          )}
          <button
            type="submit"
            disabled={isSubmitting || !newTip.trim()}
            className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Sharing...' : 'Share Tip'}
          </button>
        </form>
      </div>
    </div>
  );
};