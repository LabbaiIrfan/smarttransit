import { feedbackService as apiFeedbackService } from './apiService'

export const submitFeedback = async (feedback) => {
  // In development, simulate API call
  if (!import.meta.env.VITE_API_BASE_URL) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Feedback submitted:', feedback)
        resolve({ success: true, id: `fb_${Date.now()}` })
      }, 500)
    })
  }

  // In production, call actual API
  try {
    return await apiFeedbackService.submitFeedback(feedback)
  } catch (error) {
    console.error('Feedback API error:', error)
    throw error
  }
}

export const getFeedbackStats = async () => {
  // Mock stats for development
  if (!import.meta.env.VITE_API_BASE_URL) {
    return {
      totalFeedback: 1247,
      averageRating: 4.2,
      accuracyImprovement: 2.3,
      responseRate: 68,
      recentFeedback: [
        { id: 1, rating: 5, comment: 'Very accurate!' },
        { id: 2, rating: 4, comment: 'Good prediction' },
        { id: 3, rating: 3, comment: 'Could be better' },
      ],
    }
  }

  try {
    return await apiFeedbackService.getFeedbackStats()
  } catch (error) {
    console.error('Feedback stats error:', error)
    throw error
  }
}