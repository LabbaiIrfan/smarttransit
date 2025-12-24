import { useEffect, useState } from 'react'
import { 
  Cloud, 
  Thermometer, 
  Wind, 
  Droplets, 
  Sun,
  CloudRain,
  MapPin,
  Umbrella,
  AlertTriangle,
  Sunrise,
  Sunset,
  Eye,
  ThermometerSun,
  Waves,
  Calendar,
  Droplet,
  Navigation,
  CloudSun,
  CloudLightning,
  Shield,
  Zap,
  BarChart3
} from 'lucide-react'
import { fetchWeatherData, getCrowdImpactFromWeather } from '../../services/weatherService'

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [crowdImpact, setCrowdImpact] = useState(null)

  useEffect(() => {
    loadWeather()
    const interval = setInterval(loadWeather, 15 * 60 * 1000) // 15 minutes
    return () => clearInterval(interval)
  }, [])

  const loadWeather = async () => {
    setLoading(true)
    try {
      const data = await fetchWeatherData()
      setWeather(data)
      setCrowdImpact(getCrowdImpactFromWeather(data))
    } catch (error) {
      console.error('Failed to load weather:', error)
    } finally {
      setLoading(false)
    }
  }

  const getWeatherIcon = (condition, size = 'md') => {
    const sizeClass = size === 'lg' ? 'w-8 h-8' : 'w-6 h-6'
    
    const iconMap = {
      'Clear Sky': <Sun className={`${sizeClass} text-yellow-400`} />,
      'Mainly Clear': <Sun className={`${sizeClass} text-yellow-300`} />,
      'Partly Cloudy': <CloudSun className={`${sizeClass} text-orange-300`} />,
      'Overcast': <Cloud className={`${sizeClass} text-gray-400`} />,
      'Foggy': <Cloud className={`${sizeClass} text-gray-300`} />,
      'Light Drizzle': <Droplets className={`${sizeClass} text-blue-300`} />,
      'Moderate Drizzle': <Droplets className={`${sizeClass} text-blue-400`} />,
      'Dense Drizzle': <Droplets className={`${sizeClass} text-blue-500`} />,
      'Light Rain': <CloudRain className={`${sizeClass} text-blue-400`} />,
      'Moderate Rain': <CloudRain className={`${sizeClass} text-blue-500`} />,
      'Heavy Rain': <CloudRain className={`${sizeClass} text-blue-600`} />,
      'Thunderstorm': <CloudLightning className={`${sizeClass} text-purple-400`} />,
      'Rain Showers': <CloudRain className={`${sizeClass} text-blue-400`} />,
    }
    
    return iconMap[condition] || <Sun className={`${sizeClass} text-yellow-400`} />
  }

  const getTemperatureColor = (temp) => {
    if (temp < 20) return 'text-blue-300'
    if (temp < 25) return 'text-blue-100'
    if (temp < 30) return 'text-green-300'
    if (temp < 35) return 'text-yellow-300'
    if (temp < 40) return 'text-orange-300'
    return 'text-red-400'
  }

  const getImpactColor = (level) => {
    switch(level) {
      case 0: return 'text-green-400 bg-green-400/10'
      case 1: return 'text-yellow-400 bg-yellow-400/10'
      case 2: return 'text-orange-400 bg-orange-400/10'
      case 3: return 'text-red-400 bg-red-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  const getImpactLabel = (level) => {
    return ['Low', 'Moderate', 'High', 'Severe'][level] || 'Unknown'
  }

  const getPrecipitationLevel = (mm) => {
    if (mm === 0) return { level: 'None', color: 'text-gray-400' }
    if (mm < 2.5) return { level: 'Light', color: 'text-blue-300' }
    if (mm < 7.5) return { level: 'Moderate', color: 'text-blue-400' }
    if (mm < 15) return { level: 'Heavy', color: 'text-blue-500' }
    return { level: 'Very Heavy', color: 'text-blue-600' }
  }

  if (loading || !weather) {
    return (
      <div className="glass-card p-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading Navi Mumbai weather...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-card p-6">
      {/* Header with Location and Current Weather */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-primary-400" />
            <div>
              <h3 className="text-xl font-bold">Navi Mumbai</h3>
              <p className="text-sm text-gray-400">Maharashtra, India</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mt-4">
            <div className="text-4xl font-bold">
              {weather.current.temperature}°C
            </div>
            <div>
              <div className="text-lg font-medium">{weather.current.condition}</div>
              <div className="text-sm text-gray-400">Feels like {weather.current.feels_like}°C</div>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="mb-2">
            {getWeatherIcon(weather.current.condition, 'lg')}
          </div>
          <div className="text-xs text-gray-500">
            Updated: {weather.last_updated}
          </div>
        </div>
      </div>

      {/* Current Weather Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="p-3 bg-gray-800/40 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Droplet className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-gray-400">Humidity</span>
          </div>
          <div className="text-lg font-bold">{weather.current.humidity}%</div>
        </div>
        
        <div className="p-3 bg-gray-800/40 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Wind className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-400">Wind</span>
          </div>
          <div className="text-lg font-bold">{weather.current.wind_speed} km/h</div>
          <div className="text-xs text-gray-400">{weather.current.wind_direction}</div>
        </div>
        
        <div className="p-3 bg-gray-800/40 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <CloudRain className="w-4 h-4 text-blue-300" />
            <span className="text-xs text-gray-400">Precip</span>
          </div>
          <div className="text-lg font-bold">{weather.current.precipitation.toFixed(1)} mm</div>
        </div>
        
        <div className="p-3 bg-gray-800/40 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Eye className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-400">Visibility</span>
          </div>
          <div className="text-lg font-bold">{weather.current.visibility}</div>
        </div>
        
        <div className="p-3 bg-gray-800/40 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-xs text-gray-400">UV Index</span>
          </div>
          <div className="text-lg font-bold">{weather.current.uv_index.value}</div>
          <div className={`text-xs ${weather.current.uv_index.color}`}>
            {weather.current.uv_index.category}
          </div>
        </div>
        
        <div className="p-3 bg-gray-800/40 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-xs text-gray-400">Air Quality</span>
          </div>
          <div className="text-lg font-bold">{weather.current.aqi.value}</div>
          <div className={`text-xs ${weather.current.aqi.color}`}>
            {weather.current.aqi.category}
          </div>
        </div>
      </div>

      {/* Season and Monsoon Status */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium">Season</span>
          </div>
          <div className="text-lg font-bold capitalize">{weather.season.name}</div>
          <div className="text-sm text-gray-300">{weather.season.description}</div>
        </div>
        
        {weather.monsoon.active && (
          <div className="flex-1 p-3 bg-blue-600/10 border border-blue-600/20 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Waves className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium">Monsoon</span>
            </div>
            <div className="text-lg font-bold capitalize">{weather.monsoon.intensity}</div>
            <div className="text-sm text-gray-300">{weather.monsoon.description}</div>
          </div>
        )}
      </div>

      {/* Crowd Impact Analysis */}
      {crowdImpact && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary-400" />
              <h4 className="font-bold">Transport Impact Analysis</h4>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getImpactColor(crowdImpact.level)}`}>
              {getImpactLabel(crowdImpact.level)} Impact
            </div>
          </div>
          
          <div className="p-4 bg-gray-800/30 rounded-lg">
            <p className="text-gray-300 mb-3">{crowdImpact.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h5 className="text-sm font-medium text-gray-400 mb-2">Affecting Factors:</h5>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    Weather: {crowdImpact.factors.weather}
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    Precipitation: {crowdImpact.factors.precipitation.toFixed(1)} mm
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                    Monsoon: {crowdImpact.factors.monsoon ? 'Active' : 'Inactive'}
                  </li>
                </ul>
              </div>
              
              <div>
                <h5 className="text-sm font-medium text-gray-400 mb-2">Travel Suggestions:</h5>
                <ul className="text-sm text-gray-300 space-y-1">
                  {crowdImpact.suggestions.slice(0, 3).map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5"></div>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7-Day Forecast */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary-400" />
            <h4 className="font-bold">7-Day Forecast</h4>
          </div>
          <div className="text-sm text-gray-400">
            Max/Min Temperatures
          </div>
        </div>
        
        <div className="space-y-2">
          {weather.daily.map((day, index) => {
            const precipLevel = getPrecipitationLevel(day.precipitation)
            
            return (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center gap-3 w-32">
                  <div className="text-center">
                    <div className="font-medium">
                      {index === 0 ? 'Today' : day.date.split(',')[0]}
                    </div>
                    <div className="text-xs text-gray-400">{day.date.split(',')[1]}</div>
                  </div>
                  <div>
                    {getWeatherIcon(day.condition)}
                  </div>
                </div>
                
                <div className="text-center flex-1">
                  <div className="text-sm text-gray-300">{day.condition}</div>
                  {day.precipitation > 0 && (
                    <div className={`text-xs ${precipLevel.color}`}>
                      {precipLevel.level} rain
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-4 w-32 justify-end">
                  <div className="text-right">
                    <div className={`font-bold ${getTemperatureColor(day.max_temp)}`}>
                      {day.max_temp}°
                    </div>
                    <div className="text-sm text-gray-400">{day.min_temp}°</div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium">{day.humidity}%</div>
                    <div className="text-xs text-gray-400">Humidity</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-6 pt-6 border-t border-gray-800">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 p-2">
            <Sunrise className="w-4 h-4 text-orange-400" />
            <div>
              <div className="text-sm text-gray-400">Sunrise</div>
              <div className="font-medium">{weather.daily[0].sunrise}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-2">
            <Sunset className="w-4 h-4 text-purple-400" />
            <div>
              <div className="text-sm text-gray-400">Sunset</div>
              <div className="font-medium">{weather.daily[0].sunset}</div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-800">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Cloud className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400">Data Source:</span>
              <span className="font-medium">{weather.source}</span>
            </div>
            <button 
              onClick={loadWeather}
              className="text-primary-400 hover:text-primary-300 text-sm"
            >
              Refresh Data
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherWidget