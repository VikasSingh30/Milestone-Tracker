import { Activity, Heart, Baby, Book, CheckCircle } from 'lucide-react'

const MilestoneCard = ({ milestone }) => {
  const getIcon = () => {
    switch(milestone.category) {
      case 'medical': return <Activity className="h-5 w-5 text-blue-500" />
      case 'health': return <Heart className="h-5 w-5 text-red-500" />
      case 'preparation': return <Book className="h-5 w-5 text-purple-500" />
      default: return <Baby className="h-5 w-5 text-pink-500" />
    }
  }

  return (
    <div className="card p-6 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-pink-50">
            {getIcon()}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{milestone.title}</h3>
            <p className="text-xs text-pink-500 font-medium">
              Week {milestone.week}
            </p>
          </div>
        </div>
        <span className="text-xs text-gray-400">
          {new Date(milestone.date).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          })}
        </span>
      </div>
      
      {milestone.notes && (
        <p className="text-gray-600 text-sm mb-4">{milestone.notes}</p>
      )}
      
      <div className="flex items-center space-x-4 pt-3 border-t border-gray-100">
        <button className="flex items-center space-x-1 text-pink-500 hover:text-pink-600 text-sm font-medium">
          <MessageCircle className="h-4 w-4" />
          <span>Tips</span>
        </button>
        <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 text-sm font-medium">
          <CheckCircle className="h-4 w-4" />
          <span>Completed</span>
        </button>
      </div>
    </div>
  )
}

export default MilestoneCard