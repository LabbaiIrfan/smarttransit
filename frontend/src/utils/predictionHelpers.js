import { format } from 'date-fns'

export const calculateCrowdLevel = (factors) => {
  let score = 50 // Base score

  // Time factor (0-24 hours)
  const hour = factors.time ? parseInt(factors.time.split(':')[0]) : new Date().getHours()
  if (hour >= 7 && hour <= 9) score += 30 // Morning peak
  else if (hour >= 17 && hour <= 19) score += 25 // Evening peak
  else if (hour >= 10 && hour <= 16) score += 10 // Daytime
  else score -= 10 // Night/early morning

  // Weather factor
  if (factors.weather === 'rainy' || factors.weather === 'snowy') score += 20
  else if (factors.weather === 'cloudy') score += 5
  else if (factors.weather === 'clear') score -= 5

  // Holiday factor
  if (factors.holiday) score -= 25

  // Day of week factor
  const day = factors.date ? new Date(factors.date).getDay() : new Date().getDay()
  if (day >= 1 && day <= 5) score += 10 // Weekdays
  else score -= 15 // Weekends

  // Normalize score to 0-100
  score = Math.max(0, Math.min(100, score))

  // Determine level
  if (score >= 70) return { level: 'high', confidence: score }
  if (score >= 40) return { level: 'medium', confidence: score }
  return { level: 'low', confidence: 100 - score }
}

export const formatPredictionTime = (date, time) => {
  const dateObj = new Date(`${date}T${time}`)
  return {
    formatted: format(dateObj, 'PPP pp'),
    relative: getRelativeTime(dateObj),
    timestamp: dateObj.getTime(),
  }
}

export const getRelativeTime = (date) => {
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins} minutes ago`
  if (diffHours < 24) return `${diffHours} hours ago`
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  return format(date, 'PPP')
}

export const validatePredictionInput = (data) => {
  const errors = []

  if (!data.route) errors.push('Route is required')
  if (!data.date) errors.push('Date is required')
  if (!data.time) errors.push('Time is required')

  // Validate date is not in the past
  const selectedDate = new Date(`${data.date}T${data.time}`)
  if (selectedDate < new Date()) {
    errors.push('Selected date and time cannot be in the past')
  }

  // Validate date is within reasonable range (next 30 days)
  const maxDate = new Date()
  maxDate.setDate(maxDate.getDate() + 30)
  if (selectedDate > maxDate) {
    errors.push('Predictions are only available for the next 30 days')
  }

  return errors
}

export const generatePredictionId = () => {
  return `pred_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}