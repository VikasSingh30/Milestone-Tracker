import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import api from '../api'
import Header from '../components/Header'
// import Timeline from '../components/Timeline'
import MilestoneCard from '../components/MilestoneCard'
import { Plus } from 'lucide-react'

const Dashboard = () => {
  const { user } = useAuth()
  const [milestones, setMilestones] = useState([])
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const response = await api.getMilestones()
        setMilestones(response.data)
      } catch (error) {
        console.error('Error fetching milestones:', error)
      }
    }
    
    if (user) fetchMilestones()
  }, [user])

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <section className="card p-8 mb-8 bg-gradient-to-r from-purple-50 to-pink-50">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {user?.name.split(' ')[0]}!
          </h1>
          <p className="text-gray-600">
            {user?.pregnancyWeek 
              ? `You're now at week ${user.pregnancyWeek} of your pregnancy journey`
              : 'Start tracking your pregnancy milestones'}
          </p>
        </section>
        
        {/* Timeline Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Pregnancy Journey</h2>
          <Timeline currentWeek={user?.pregnancyWeek || 1} />
        </section>
        
        {/* Milestones Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Your Milestones</h2>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center space-x-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Add Milestone</span>
            </button>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {milestones.map(milestone => (
              <MilestoneCard key={milestone._id} milestone={milestone} />
            ))}
          </div>
        </section>
      </main>
      
      {/* Floating Add Button (mobile) */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-6 right-6 md:hidden flex items-center justify-center w-14 h-14 rounded-full bg-pink-500 text-white shadow-lg hover:bg-pink-600 transition-colors"
      >
        <Plus className="h-6 w-6" />
      </button>
    </div>
  )
}

export default Dashboard