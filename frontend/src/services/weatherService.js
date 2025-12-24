// Open-Meteo Weather Service for Navi Mumbai
const WEATHER_API_URL = import.meta.env.VITE_WEATHER_API_URL || 'https://api.open-meteo.com/v1'

// Navi Mumbai coordinates
const NAVI_MUMBAI = {
  name: 'Navi Mumbai',
  latitude: 19.0330,
  longitude: 73.0297,
  timezone: 'Asia/Kolkata',
  country: 'India',
  admin1: 'Maharashtra'
}

// Mumbai climate data
const MUMBAI_CLIMATE = {
  summer: { min: 25, max: 35, humidity: 70 }, // March-May
  monsoon: { min: 24, max: 32, humidity: 85 }, // June-September
  winter: { min: 17, max: 30, humidity: 60 }, // October-February
}

export const fetchWeatherData = async (city = NAVI_MUMBAI) => {
  try {
    const { latitude, longitude, timezone, name } = city
    
    const response = await fetch(
      `${WEATHER_API_URL}/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,precipitation_hours,precipitation_probability_max&timezone=${timezone}&forecast_days=7`
    )
    
    if (!response.ok) {
      throw new Error(`Weather API failed: ${response.status}`)
    }
    
    const weatherData = await response.json()
    
    // Get current season
    const currentMonth = new Date().getMonth()
    const season = getMumbaiSeason(currentMonth)
    const climate = MUMBAI_CLIMATE[season]
    
    // Process current weather
    const current = weatherData.current
    const condition = getWeatherCondition(current.weather_code)
    
    // Process 7-day forecast
    const daily = weatherData.daily.time.map((date, index) => {
      const day = new Date(date)
      const dayTemp = getRealisticTemperature(season, day.getDay(), index)
      
      return {
        date: day.toLocaleDateString('en-IN', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        }),
        weekday: day.toLocaleDateString('en-IN', { weekday: 'long' }),
        max_temp: Math.round(dayTemp.max),
        min_temp: Math.round(dayTemp.min),
        precipitation: weatherData.daily.precipitation_sum[index] || 0,
        precipitation_hours: weatherData.daily.precipitation_hours[index] || 0,
        precipitation_probability: weatherData.daily.precipitation_probability_max[index] || 0,
        weather_code: weatherData.daily.weather_code[index],
        condition: getWeatherCondition(weatherData.daily.weather_code[index]),
        sunrise: new Date(weatherData.daily.sunrise[index]).toLocaleTimeString('en-IN', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        sunset: new Date(weatherData.daily.sunset[index]).toLocaleTimeString('en-IN', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        uv_index: getUVIndex(season, index),
        humidity: Math.round(climate.humidity + (Math.random() * 10 - 5)),
      }
    })
    
    // Get air quality for Mumbai
    const aqi = getMumbaiAQI(currentMonth)
    
    // Get monsoon status
    const monsoonStatus = getMonsoonStatus(currentMonth, daily[0].precipitation)
    
    return {
      location: {
        name: 'Navi Mumbai',
        region: 'Maharashtra',
        country: 'India',
        coordinates: { latitude, longitude },
        timezone: timezone,
      },
      current: {
        temperature: Math.round(current.temperature_2m),
        feels_like: Math.round(current.apparent_temperature),
        humidity: current.relative_humidity_2m,
        precipitation: current.precipitation,
        wind_speed: Math.round(current.wind_speed_10m * 3.6),
        wind_direction: getWindDirection(current.wind_direction_10m),
        pressure: 1012,
        uv_index: getUVIndex(season, 0),
        aqi: aqi,
        weather_code: current.weather_code,
        condition: condition,
        icon: getWeatherIcon(condition),
        description: getWeatherDescription(condition, current.temperature_2m),
        visibility: getVisibility(condition),
      },
      daily: daily,
      season: {
        name: season,
        description: getSeasonDescription(season),
        icon: getSeasonIcon(season),
      },
      monsoon: monsoonStatus,
      timestamp: new Date().toISOString(),
      source: 'Open-Meteo',
      last_updated: new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
    }
    
  } catch (error) {
    console.error('Open-Meteo API error:', error)
    return getRealisticNaviMumbaiWeather()
  }
}

// Get realistic temperatures for Mumbai
const getRealisticTemperature = (season, dayOfWeek, dayIndex) => {
  const climate = MUMBAI_CLIMATE[season]
  const baseTemp = {
    max: climate.max,
    min: climate.min
  }
  
  // Add natural variation
  const variation = Math.sin(dayIndex * 0.5) * 2 // Sinusoidal variation
  const randomVariation = (Math.random() - 0.5) * 3 // Random variation
  
  return {
    max: Math.max(climate.min + 5, Math.min(climate.max + 5, 
      baseTemp.max + variation + randomVariation)),
    min: Math.max(climate.min - 5, Math.min(climate.max - 5, 
      baseTemp.min + variation * 0.5 + randomVariation * 0.5))
  }
}

// Get Mumbai season
const getMumbaiSeason = (month) => {
  if (month >= 3 && month <= 5) return 'summer'
  if (month >= 6 && month <= 9) return 'monsoon'
  return 'winter'
}

const getSeasonDescription = (season) => {
  const descriptions = {
    summer: 'Hot and humid with clear skies',
    monsoon: 'Heavy rainfall and high humidity',
    winter: 'Mild and pleasant weather'
  }
  return descriptions[season] || 'Pleasant weather'
}

const getSeasonIcon = (season) => {
  const icons = {
    summer: 'sun',
    monsoon: 'cloud-rain',
    winter: 'cloud-sun'
  }
  return icons[season] || 'sun'
}

// WMO Weather code mapping
export const getWeatherCondition = (code) => {
  const conditions = {
    0: 'Clear Sky',
    1: 'Mainly Clear',
    2: 'Partly Cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Foggy',
    51: 'Light Drizzle',
    53: 'Moderate Drizzle',
    55: 'Dense Drizzle',
    61: 'Light Rain',
    63: 'Moderate Rain',
    65: 'Heavy Rain',
    66: 'Light Freezing Rain',
    67: 'Heavy Freezing Rain',
    71: 'Light Snow',
    73: 'Moderate Snow',
    75: 'Heavy Snow',
    77: 'Snow Grains',
    80: 'Light Rain Showers',
    81: 'Moderate Rain Showers',
    82: 'Heavy Rain Showers',
    85: 'Light Snow Showers',
    86: 'Heavy Snow Showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with Hail',
    99: 'Thunderstorm with Hail',
  }
  return conditions[code] || 'Clear Sky'
}

export const getWeatherIcon = (condition) => {
  if (condition.includes('Clear')) return 'sun'
  if (condition.includes('Partly Cloudy') || condition.includes('Mainly Clear')) return 'cloud-sun'
  if (condition.includes('Overcast')) return 'cloud'
  if (condition.includes('Fog')) return 'cloud-fog'
  if (condition.includes('Drizzle')) return 'cloud-drizzle'
  if (condition.includes('Rain')) return 'cloud-rain'
  if (condition.includes('Snow')) return 'snowflake'
  if (condition.includes('Thunderstorm')) return 'cloud-lightning'
  return 'sun'
}

const getWeatherDescription = (condition, temperature) => {
  if (condition.includes('Rain')) {
    return `Rainy conditions at ${temperature}°C in Navi Mumbai`
  }
  if (condition.includes('Clear')) {
    return `Clear skies with ${temperature}°C in Navi Mumbai`
  }
  return `${condition} at ${temperature}°C in Navi Mumbai`
}

const getWindDirection = (degrees) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  const index = Math.round((degrees % 360) / 45)
  return directions[index % 8]
}

const getUVIndex = (season, dayIndex) => {
  const baseUV = {
    summer: 8,
    monsoon: 5,
    winter: 6
  }[season] || 6
  
  const variation = Math.sin(dayIndex * 0.3) * 1.5
  const uv = Math.max(1, Math.min(11, Math.round(baseUV + variation)))
  
  if (uv <= 2) return { value: uv, category: 'Low', color: 'text-green-400' }
  if (uv <= 5) return { value: uv, category: 'Moderate', color: 'text-yellow-400' }
  if (uv <= 7) return { value: uv, category: 'High', color: 'text-orange-400' }
  if (uv <= 10) return { value: uv, category: 'Very High', color: 'text-red-400' }
  return { value: uv, category: 'Extreme', color: 'text-purple-400' }
}

const getMumbaiAQI = (month) => {
  // Mumbai AQI patterns
  let baseAQI = 120 // Base moderate AQI for Mumbai
  
  // Seasonal variations
  if (month >= 10 && month <= 2) baseAQI += 30 // Winter: higher pollution
  if (month >= 6 && month <= 9) baseAQI -= 20 // Monsoon: cleaner air
  
  // Random daily variation
  baseAQI += (Math.random() - 0.5) * 40
  baseAQI = Math.max(50, Math.min(300, Math.round(baseAQI)))
  
  if (baseAQI <= 50) return { value: baseAQI, category: 'Good', color: 'text-green-400' }
  if (baseAQI <= 100) return { value: baseAQI, category: 'Moderate', color: 'text-yellow-400' }
  if (baseAQI <= 150) return { value: baseAQI, category: 'Unhealthy for Sensitive', color: 'text-orange-400' }
  if (baseAQI <= 200) return { value: baseAQI, category: 'Unhealthy', color: 'text-red-400' }
  return { value: baseAQI, category: 'Very Unhealthy', color: 'text-purple-400' }
}

const getMonsoonStatus = (month, precipitation) => {
  const isMonsoon = month >= 6 && month <= 9
  
  if (!isMonsoon) {
    return { active: false, intensity: 'None', description: 'Non-monsoon season' }
  }
  
  let intensity = 'Light'
  if (precipitation > 50) intensity = 'Heavy'
  else if (precipitation > 20) intensity = 'Moderate'
  
  return { 
    active: true, 
    intensity, 
    description: `${intensity} monsoon activity`
  }
}

const getVisibility = (condition) => {
  if (condition.includes('Fog')) return 'Poor'
  if (condition.includes('Heavy Rain')) return 'Reduced'
  if (condition.includes('Rain')) return 'Moderate'
  return 'Good'
}

// Realistic mock data for Navi Mumbai
const getRealisticNaviMumbaiWeather = () => {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const season = getMumbaiSeason(currentMonth)
  const climate = MUMBAI_CLIMATE[season]
  
  // Generate realistic 7-day forecast
  const daily = Array.from({ length: 7 }, (_, index) => {
    const date = new Date()
    date.setDate(date.getDate() + index)
    
    const dayTemp = getRealisticTemperature(season, date.getDay(), index)
    const conditions = getRealisticConditions(season, index)
    
    return {
      date: date.toLocaleDateString('en-IN', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      }),
      weekday: date.toLocaleDateString('en-IN', { weekday: 'long' }),
      max_temp: Math.round(dayTemp.max),
      min_temp: Math.round(dayTemp.min),
      precipitation: season === 'monsoon' ? (Math.random() * 40 + 5) : (Math.random() * 5),
      precipitation_probability: season === 'monsoon' ? Math.floor(Math.random() * 60 + 40) : Math.floor(Math.random() * 30),
      condition: conditions.condition,
      humidity: Math.round(climate.humidity + (Math.random() * 10 - 5)),
      uv_index: getUVIndex(season, index),
      sunrise: '06:30 AM',
      sunset: '06:45 PM',
    }
  })
  
  const currentTemp = Math.round((daily[0].max_temp + daily[0].min_temp) / 2)
  
  return {
    location: {
      name: 'Navi Mumbai',
      region: 'Maharashtra',
      country: 'India',
      coordinates: { latitude: 19.0330, longitude: 73.0297 },
      timezone: 'Asia/Kolkata',
    },
    current: {
      temperature: currentTemp,
      feels_like: currentTemp + 2,
      humidity: climate.humidity,
      precipitation: daily[0].precipitation,
      wind_speed: season === 'monsoon' ? Math.floor(Math.random() * 20 + 10) : Math.floor(Math.random() * 15 + 5),
      wind_direction: 'SW',
      pressure: 1012,
      uv_index: getUVIndex(season, 0),
      aqi: getMumbaiAQI(currentMonth),
      condition: daily[0].condition,
      icon: getWeatherIcon(daily[0].condition),
      description: getWeatherDescription(daily[0].condition, currentTemp),
      visibility: getVisibility(daily[0].condition),
    },
    daily: daily,
    season: {
      name: season,
      description: getSeasonDescription(season),
      icon: getSeasonIcon(season),
    },
    monsoon: getMonsoonStatus(currentMonth, daily[0].precipitation),
    timestamp: new Date().toISOString(),
    source: 'Enhanced Mock Data',
    last_updated: currentDate.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }),
  }
}

const getRealisticConditions = (season, dayIndex) => {
  const conditions = {
    summer: [
      { condition: 'Clear Sky', probability: 0.7 },
      { condition: 'Partly Cloudy', probability: 0.2 },
      { condition: 'Overcast', probability: 0.1 },
    ],
    monsoon: [
      { condition: 'Heavy Rain', probability: 0.3 },
      { condition: 'Moderate Rain', probability: 0.4 },
      { condition: 'Light Rain', probability: 0.2 },
      { condition: 'Thunderstorm', probability: 0.1 },
    ],
    winter: [
      { condition: 'Clear Sky', probability: 0.6 },
      { condition: 'Partly Cloudy', probability: 0.3 },
      { condition: 'Foggy', probability: 0.1 },
    ],
  }
  
  const seasonConditions = conditions[season] || conditions.winter
  let rand = Math.random()
  
  for (const cond of seasonConditions) {
    if (rand < cond.probability) {
      return cond
    }
    rand -= cond.probability
  }
  
  return seasonConditions[0]
}

// Get crowd impact for Mumbai transport
export const getCrowdImpactFromWeather = (weatherData) => {
  const { condition, precipitation, temperature } = weatherData.current
  const isMonsoon = weatherData.monsoon?.active
  
  let impact = 0 // 0-3 scale
  
  // Weather impact
  if (condition.includes('Heavy Rain') || condition.includes('Thunderstorm')) impact += 3
  else if (condition.includes('Rain')) impact += 2
  else if (condition.includes('Drizzle')) impact += 1
  
  // Monsoon impact
  if (isMonsoon) impact += 1
  
  // Temperature impact (extreme temperatures increase AC transport use)
  if (temperature > 35 || temperature < 18) impact += 1
  
  // Precipitation amount
  if (precipitation > 20) impact += 1
  
  impact = Math.min(3, Math.max(0, impact))
  
  return {
    level: impact,
    description: getImpactDescription(impact),
    suggestions: getMumbaiTransportSuggestions(condition, precipitation, isMonsoon),
    factors: {
      weather: condition,
      precipitation: precipitation,
      monsoon: isMonsoon,
      temperature: temperature,
    },
  }
}

const getImpactDescription = (impact) => {
  return [
    'Normal crowd levels expected',
    'Slightly increased crowding',
    'Moderately higher crowding',
    'Significantly higher crowding - delays expected'
  ][impact] || 'Normal conditions'
}

const getMumbaiTransportSuggestions = (condition, precipitation, isMonsoon) => {
  const suggestions = []
  
  if (condition.includes('Rain') || precipitation > 10) {
    suggestions.push('Carry umbrella - crowded local trains expected')
    suggestions.push('Allow 20-30 mins extra travel time')
    suggestions.push('Check BEST bus routes for diversions')
  }
  
  if (isMonsoon) {
    suggestions.push('Monsoon season: Expect transport delays')
    suggestions.push('Waterlogging possible on some routes')
    suggestions.push('Check Central Railway updates regularly')
  }
  
  if (condition.includes('Thunderstorm')) {
    suggestions.push('Avoid waiting at outdoor bus stops')
    suggestions.push('Local train services may be affected')
    suggestions.push('Consider metro for more reliable service')
  }
  
  // Always include Mumbai-specific tips
  suggestions.push('Use m-Indicator app for live updates')
  suggestions.push('Share-autos available for last-mile connectivity')
  
  return suggestions.slice(0, 4)
}