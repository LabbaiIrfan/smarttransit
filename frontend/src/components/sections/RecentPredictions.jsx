import { Clock, MapPin, TrendingUp, TrendingDown } from 'lucide-react'
import CrowdIndicator from '../indicators/CrowdIndicator'

const RecentPredictions = () => {
  const predictions = [
    { id: 1, route: 'Metro Line 1', level: 'high', time: '08:30 AM', accuracy: 92, trend: 'up' },
    { id: 2, route: 'Bus Route 101', level: 'medium', time: '09:15 AM', accuracy: 87, trend: 'down' },
    { id: 3, route: 'Train Station A', level: 'low', time: '10:00 AM', accuracy: 95, trend: 'up' },
    { id: 4, route: 'Bus Route 202', level: 'high', time: '05:30 PM', accuracy: 78, trend: 'up' },
  ]

  return (
    <div className="space-y-4">
      {predictions.map((prediction) => (
        <div
          key={prediction.id}
          className="p-4 bg-dark-800/50 rounded-lg hover:bg-dark-800 transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-dark-400" />
              <span className="font-medium">{prediction.route}</span>
            </div>
            <CrowdIndicator level={prediction.level} size="sm" />
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span className="text-dark-400">{prediction.time}</span>
              </div>
              <div className={`flex items-center gap-1 ${
                prediction.accuracy > 90 ? 'text-green-400' : 
                prediction.accuracy > 80 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {prediction.trend === 'up' ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span>{prediction.accuracy}% accuracy</span>
              </div>
            </div>
            <button className="text-primary-400 hover:text-primary-300 text-sm">
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RecentPredictions