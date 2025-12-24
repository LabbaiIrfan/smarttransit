import axios from 'axios'

const WEATHER_API_URL = import.meta.env.VITE_WEATHER_API_URL
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY

export const fetchWeatherData = async () => {
  // If no API key, return mock data for development
  if (!WEATHER_API_KEY) {
    return getMockWeatherData()
  }

  try {
    const response = await axios.get(
      `${WEATHER_API_URL}/weather?q=SmartCity&appid=${WEATHER_API_KEY}&units=metric`
    )
    
    const data = response.data
    return {
      temperature: Math.round(data.main.temp),
      condition: getCondition(data.weather[0].main),
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      icon: getWeatherIcon(data.weather[0].main),
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    console.error('Weather API error:', error)
    return getMockWeatherData()
  }
}

const getMockWeatherData = () => {
  const conditions = ['Clear', 'Cloudy', 'Rainy', 'Partly Cloudy']
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)]
  
  return {
    temperature: Math.floor(Math.random() * 15) + 15, // 15-30°C
    condition: randomCondition,
    humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
    windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
    icon: getWeatherIcon(randomCondition),
    timestamp: new Date().toISOString(),
  }
}

const getCondition = (weather) => {
  const map = {
    'Clear': 'Clear',
    'Clouds': 'Cloudy',
    'Rain': 'Rainy',
    'Snow': 'Snowy',
    'Thunderstorm': 'Stormy',
    'Drizzle': 'Rainy',
    'Mist': 'Foggy',
    'Smoke': 'Foggy',
    'Haze': 'Foggy',
    'Dust': 'Foggy',
    'Fog': 'Foggy',
    'Sand': 'Foggy',
    'Ash': 'Foggy',
    'Squall': 'Stormy',
    'Tornado': 'Stormy',
  }
  return map[weather] || 'Cloudy'
}

const getWeatherIcon = (condition) => {
  const map = {
    'Clear': 'sun',
    'Cloudy': 'cloud',
    'Rainy': 'cloud-rain',
    'Snowy': 'cloud-snow',
    'Stormy': 'cloud-lightning',
    'Foggy': 'cloud-fog',
    'Partly Cloudy': 'cloud-sun',
  }
  return map[condition] || 'cloud'
}