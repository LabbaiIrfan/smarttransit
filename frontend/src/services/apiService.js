import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('access_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const predictionService = {
  // Get crowd prediction
  getPrediction: async (data) => {
    const response = await api.post('/predict', data)
    return response.data
  },

  // Get prediction history
  getHistory: async (limit = 10) => {
    const response = await api.get(`/predictions/history?limit=${limit}`)
    return response.data
  },

  // Get trends data
  getTrends: async (timeRange = '7d') => {
    const response = await api.get(`/trends?range=${timeRange}`)
    return response.data
  },

  // Save prediction
  savePrediction: async (prediction) => {
    const response = await api.post('/predictions/save', prediction)
    return response.data
  },
}

export const feedbackService = {
  // Submit feedback
  submitFeedback: async (feedback) => {
    const response = await api.post('/feedback', feedback)
    return response.data
  },

  // Get feedback stats
  getFeedbackStats: async () => {
    const response = await api.get('/feedback/stats')
    return response.data
  },

  // Get user feedback
  getUserFeedback: async (userId) => {
    const response = await api.get(`/feedback/user/${userId}`)
    return response.data
  },
}

export const routeService = {
  // Get all routes
  getRoutes: async () => {
    const response = await api.get('/routes')
    return response.data
  },

  // Get route details
  getRouteDetails: async (routeId) => {
    const response = await api.get(`/routes/${routeId}`)
    return response.data
  },

  // Get route schedule
  getRouteSchedule: async (routeId) => {
    const response = await api.get(`/routes/${routeId}/schedule`)
    return response.data
  },
}

export const adminService = {
  // Get system stats
  getSystemStats: async () => {
    const response = await api.get('/admin/stats')
    return response.data
  },

  // Get user analytics
  getUserAnalytics: async () => {
    const response = await api.get('/admin/analytics/users')
    return response.data
  },

  // Get prediction accuracy report
  getAccuracyReport: async () => {
    const response = await api.get('/admin/reports/accuracy')
    return response.data
  },
}

export default api