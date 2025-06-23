import { Heart, User } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Header = () => {
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-pink-100">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Heart className="h-7 w-7 text-pink-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              BabySteps
            </span>
          </div>
          
          {user && (
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">{user.name}</p>
                <p className="text-xs bg-pink-500 text-white px-2 py-1 rounded-full">
                  Week {user.pregnancyWeek}
                </p>
              </div>
              <button
                onClick={logout}
                className="p-2 rounded-full bg-pink-50 text-pink-500 hover:bg-pink-100"
              >
                <User className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header