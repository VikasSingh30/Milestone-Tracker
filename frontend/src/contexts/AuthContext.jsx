import { createContext, useState, useEffect } from 'react'
import api from '../api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.getCurrentUser()
        setUser(response.data.user)
      } catch (error) {
        localStorage.removeItem('token')
      } finally {
        setIsLoading(false)
      }
    }
    
    const token = localStorage.getItem('token')
    if (token) checkAuth()
    else setIsLoading(false)
  }, [])

  const login = async (email, password) => {
    const response = await api.login({ email, password })
    localStorage.setItem('token', response.data.token)
    setUser(response.data.user)
    return response
  }

  const register = async (userData) => {
    const response = await api.register(userData)
    localStorage.setItem('token', response.data.token)
    setUser(response.data.user)
    return response
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}