import { Baby, Activity, Heart, Users } from 'lucide-react'

const Timeline = ({ currentWeek = 24 }) => {
  const weeks = Array.from({ length: 40 }, (_, i) => i + 1)
  
  const getMilestoneIcon = (week) => {
    if (week === 12) return <Activity className="h-5 w-5 text-blue-500" />
    if (week === 20) return <Baby className="h-5 w-5 text-pink-500" />
    if (week === 28) return <Heart className="h-5 w-5 text-red-500" />
    if (week === 36) return <Users className="h-5 w-5 text-purple-500" />
    return null
  }

  return (
    <div className="relative py-8">
      <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-200 to-purple-200" />
      
      {weeks.map((week) => (
        <div 
          key={week}
          className="relative pl-16 mb-8"
        >
          <div className={`absolute left-0 flex items-center justify-center w-8 h-8 rounded-full ${
            week === currentWeek 
              ? 'bg-pink-500 shadow-lg shadow-pink-200 animate-pulse'
              : week < currentWeek 
                ? 'bg-purple-500'
                : 'bg-gray-200'
          }`}>
            {week === currentWeek && (
              <span className="text-white text-xs font-bold">{week}</span>
            )}
          </div>
          
          {week % 4 === 0 && (
            <div className="card p-6">
              <div className="flex items-center space-x-3 mb-3">
                {getMilestoneIcon(week)}
                <h3 className="font-semibold text-lg">
                  {week === 12 && 'First Trimester Screening'}
                  {week === 20 && 'Anatomy Scan'}
                  {week === 28 && 'Third Trimester Begins'}
                  {week === 36 && 'Full Term'}
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                {week === 12 && 'Important tests to check baby\'s development'}
                {week === 20 && 'Detailed scan of baby\'s organs and growth'}
                {week === 28 && 'Start counting kicks and movements'}
                {week === 36 && 'Baby could arrive any time now!'}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Timeline