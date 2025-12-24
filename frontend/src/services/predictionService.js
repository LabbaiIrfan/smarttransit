import { predictionService } from './apiService'

// Mock prediction function for development
export const predictCrowding = async (data) => {
  // In development, return mock data
  if (!import.meta.env.VITE_API_BASE_URL) {
    return mockPrediction(data)
  }

  // In production, call actual API
  try {
    return await predictionService.getPrediction(data)
  } catch (error) {
    console.error('Prediction API error:', error)
    throw error
  }
}

const mockPrediction = (data) => {
  // Simple mock prediction logic
  const hour = parseInt(data.time.split(':')[0])
  let level = 'medium'
  let confidence = 75
  
  // Mock logic based on time
  if ((hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19)) {
    level = 'high'
    confidence = 85
  } else if (hour >= 10 && hour <= 16) {
    level = 'medium'
    confidence = 70
  } else {
    level = 'low'
    confidence = 90
  }

  // Adjust based on weather
  if (data.weather === 'rainy' || data.weather === 'snowy') {
    level = 'high'
    confidence = Math.min(95, confidence + 10)
  }

  // Adjust based on holiday
  if (data.holiday) {
    level = 'low'
    confidence = Math.min(95, confidence + 5)
  }

  return {
    id: `pred_${Date.now()}`,
    route: data.route,
    date: data.date,
    time: data.time,
    level,
    confidence,
    estimatedCrowd: `${Math.floor(Math.random() * 100) + 50} people`,
    historicalAccuracy: Math.floor(Math.random() * 15) + 80,
    suggestions: getSuggestions(level),
    timestamp: new Date().toISOString(),
  }
}

const getSuggestions = (level) => {
  const suggestions = {
    low: [
      'Ideal time to travel',
      'Consider walking or cycling',
      'Public transport will be comfortable',
    ],
    medium: [
      'Expect moderate crowding',
      'Consider alternative routes',
      'Allow extra travel time',
    ],
    high: [
      'Consider working remotely if possible',
      'Use alternative transport modes',
      'Travel during off-peak hours',
    ],
  }
  return suggestions[level] || []
}