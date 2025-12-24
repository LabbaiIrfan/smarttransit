import { useState } from 'react'
import { Clock, MapPin, Calendar, Search } from 'lucide-react'
import CrowdIndicator from '../indicators/CrowdIndicator'

const QuickPrediction = () => {
  const [selectedRoute, setSelectedRoute] = useState('metro-1')
  const [selectedTime, setSelectedTime] = useState('08:00')

  const routes = [
    { id: 'metro-1', name: 'Metro Line 1' },
    { id: 'bus-101', name: 'Bus Route 101' },
    { id: 'train-a', name: 'Train Station A' },
  ]

  const times = [
    '07:00', '08:00', '09:00', '10:00', 
    '17:00', '18:00', '19:00', '20:00'
  ]

  const getPrediction = () => {
    const hour = parseInt(selectedTime.split(':')[0])
    if ((hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19)) {
      return 'high'
    } else if (hour >= 10 && hour <= 16) {
      return 'medium'
    }
    return 'low'
  }

  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-bold mb-4">Quick Prediction</h2>
      
      <div className="space-y-4">
        {/* Route Selector */}
        <div>
          <label className="block text-sm font-medium mb-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Route</span>
            </div>
          </label>
          <div className="flex flex-wrap gap-2">
            {routes.map((route) => (
              <button
                key={route.id}
                onClick={() => setSelectedRoute(route.id)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  selectedRoute === route.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-dark-800 text-dark-400 hover:text-white'
                }`}
              >
                {route.name}
              </button>
            ))}
          </div>
        </div>

        {/* Time Selector */}
        <div>
          <label className="block text-sm font-medium mb-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Time</span>
            </div>
          </label>
          <div className="grid grid-cols-4 gap-2">
            {times.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-2 rounded-lg text-sm transition-colors ${
                  selectedTime === time
                    ? 'bg-primary-600 text-white'
                    : 'bg-dark-800 text-dark-400 hover:text-white'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Date Selector */}
        <div>
          <label className="block text-sm font-medium mb-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Date</span>
            </div>
          </label>
          <select className="w-full input-field">
            <option>Today</option>
            <option>Tomorrow</option>
            <option>Next Monday</option>
          </select>
        </div>

        {/* Prediction Result */}
        <div className="pt-4 border-t border-dark-800">
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium">Predicted Crowding:</span>
            <CrowdIndicator level={getPrediction()} size="sm" />
          </div>
          
          <button className="w-full btn-primary flex items-center justify-center gap-2">
            <Search className="w-4 h-4" />
            Get Detailed Prediction
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuickPrediction