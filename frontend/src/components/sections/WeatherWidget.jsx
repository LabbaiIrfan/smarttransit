import { Cloud, Thermometer, Wind, Droplets, Sun } from 'lucide-react'
import { useState, useEffect } from 'react'
import { fetchWeatherData } from '../../services/weatherService'

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const data = await fetchWeatherData()
        setWeather(data)
      } catch (error) {
        console.error('Failed to fetch weather:', error)
        // Fallback data
        setWeather({
          temperature: 22,
          condition: 'Partly Cloudy',
          humidity: 65,
          windSpeed: 12,
          icon: 'cloud',
        })
      } finally {
        setLoading(false)
      }
    }

    loadWeather()
    // Refresh weather every 5 minutes
    const interval = setInterval(loadWeather, 300000)
    return () => clearInterval(interval)
  }, [])

  const getWeatherIcon = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'clear': return <Sun className="w-8 h-8 text-yellow-400" />
      case 'cloudy': return <Cloud className="w-8 h-8 text-gray-400" />
      case 'rainy': return <Droplets className="w-8 h-8 text-blue-400" />
      default: return <Cloud className="w-8 h-8 text-gray-400" />
    }
  }

  if (loading) {
    return (
      <div className="glass-card p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-dark-800 rounded mb-4"></div>
          <div className="h-8 bg-dark-800 rounded mb-6"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-10 bg-dark-800 rounded"></div>
            <div className="h-10 bg-dark-800 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold">Current Weather</h3>
          <p className="text-sm text-dark-400">Smart City Central</p>
        </div>
        {getWeatherIcon(weather?.condition)}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Thermometer className="w-5 h-5 text-red-400" />
            <span className="text-sm">Temperature</span>
          </div>
          <span className="font-bold">{weather?.temperature}°C</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplets className="w-5 h-5 text-blue-400" />
            <span className="text-sm">Humidity</span>
          </div>
          <span className="font-bold">{weather?.humidity}%</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wind className="w-5 h-5 text-gray-400" />
            <span className="text-sm">Wind Speed</span>
          </div>
          <span className="font-bold">{weather?.windSpeed} km/h</span>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-dark-800">
        <p className="text-sm text-dark-400">
          {weather?.condition === 'Rainy' || weather?.condition === 'Snowy' 
            ? 'Expect higher crowding due to weather conditions'
            : 'Normal weather conditions expected'}
        </p>
      </div>
    </div>
  )
}

export default WeatherWidget