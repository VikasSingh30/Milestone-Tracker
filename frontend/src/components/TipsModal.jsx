import { useState, useEffect } from 'react'
import { 
  X, 
  MessageCircle, 
  Heart, 
  User, 
  Send,
  ChevronDown
} from 'lucide-react'
import api from '../api'
import { toast } from 'react-toastify'

const TipsModal = ({ milestone, onClose }) => {
  const [tips, setTips] = useState([])
  const [newTip, setNewTip] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sortBy, setSortBy] = useState('recent')

  useEffect(() => {
    if (milestone) {
      fetchTips()
    }
  }, [milestone, sortBy])

  const fetchTips = async () => {
    setIsLoading(true)
    try {
      const response = await api.getTips(milestone._id)
      const sortedTips = [...response.data].sort((a, b) => {
        if (sortBy === 'recent') {
          return new Date(b.createdAt) - new Date(a.createdAt)
        } else {
          return b.likes - a.likes
        }
      })
      setTips(sortedTips)
    } catch (error) {
      toast.error('Failed to load tips')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddTip = async (e) => {
    e.preventDefault()
    if (!newTip.trim()) return

    setIsLoading(true)
    try {
      const response = await api.addTip(milestone._id, { content: newTip })
      setTips([response.data, ...tips])
      setNewTip('')
      toast.success('Tip shared successfully!')
    } catch (error) {
      toast.error('Failed to share tip')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLikeTip = async (tipId) => {
    try {
      await api.likeTip(tipId)
      setTips(tips.map(tip => 
        tip._id === tipId ? { ...tip, likes: tip.likes + 1 } : tip
      ))
    } catch (error) {
      toast.error('Failed to like tip')
    }
  }

  if (!milestone) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl relative max-h-[90vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>

        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Community Tips for {milestone.title}
          </h2>
          <p className="text-sm text-gray-500">
            Week {milestone.week} • {new Date(milestone.date).toLocaleDateString()}
          </p>
        </div>

        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-gray-700">
              {tips.length} {tips.length === 1 ? 'Tip' : 'Tips'}
            </h3>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {isLoading && tips.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading tips...</p>
            </div>
          ) : tips.length === 0 ? (
            <div className="text-center py-8">
              <MessageCircle className="h-10 w-10 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-500">No tips yet</h3>
              <p className="text-gray-400">Be the first to share your experience!</p>
            </div>
          ) : (
            tips.map((tip) => (
              <div key={tip._id} className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-800 mb-3">{tip.content}</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <User className="h-4 w-4" />
                    <span>{tip.author?.name || 'Community Member'}</span>
                  </div>
                  <button
                    onClick={() => handleLikeTip(tip._id)}
                    className="flex items-center space-x-1 text-pink-500 hover:text-pink-600"
                  >
                    <Heart className="h-4 w-4" />
                    <span>{tip.likes || 0}</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleAddTip} className="p-4 border-t border-gray-200">
          <div className="flex space-x-3">
            <input
              type="text"
              value={newTip}
              onChange={(e) => setNewTip(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Share your tip or experience..."
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !newTip.trim()}
              className="p-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TipsModal