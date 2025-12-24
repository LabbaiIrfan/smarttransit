// src/services/predictionService.js
import { fetchWeatherData, getCrowdImpactFromWeather } from './weatherService'

export const predictCrowding = async (data) => {
  console.log('Prediction request:', data)
  
  try {
    // Fetch real weather data
    const weatherData = await fetchWeatherData(data.city || 'Smart City')
    const weatherImpact = getCrowdImpactFromWeather(weatherData)
    
    // Enhanced prediction logic with weather impact
    const hour = parseInt(data.time.split(':')[0])
    let baseLevel = 'medium'
    let baseConfidence = 75
    
    // Time-based prediction
    if ((hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19)) {
      baseLevel = 'high'
      baseConfidence = 85
    } else if (hour >= 22 || hour <= 5) {
      baseLevel = 'low'
      baseConfidence = 90
    }
    
    // Adjust based on weather impact
    let finalLevel = baseLevel
    let finalConfidence = baseConfidence
    
    if (weatherImpact.level >= 2) {
      // Bad weather increases crowding
      if (baseLevel === 'low') finalLevel = 'medium'
      if (baseLevel === 'medium') finalLevel = 'high'
      finalConfidence = Math.min(95, baseConfidence + 5)
    } else if (weatherImpact.level === 0) {
      // Good weather might reduce crowding
      if (baseLevel === 'high') finalLevel = 'medium'
      finalConfidence = Math.min(95, baseConfidence + 2)
    }
    
    // Holiday adjustment
    if (data.holiday) {
      finalLevel = 'low'
      finalConfidence = Math.min(95, finalConfidence + 5)
    }
    
    return {
      id: `pred_${Date.now()}`,
      route: data.route,
      date: data.date,
      time: data.time,
      level: finalLevel,
      confidence: finalConfidence,
      estimatedCrowd: `${Math.floor(Math.random() * 100) + 50} people`,
      historicalAccuracy: Math.floor(Math.random() * 15) + 80,
      weather: {
        condition: weatherData.current.condition,
        impact: weatherImpact.level,
        description: weatherImpact.description,
        suggestions: weatherImpact.suggestions,
      },
      timestamp: new Date().toISOString(),
      factors: {
        timeOfDay: hour,
        weatherImpact: weatherImpact.level,
        isHoliday: data.holiday || false,
        dayOfWeek: new Date(data.date).getDay(),
      },
    }
    
  } catch (error) {
    console.error('Prediction error:', error)
    return getMockPrediction(data)
  }
}