import { CheckCircle, AlertTriangle, Clock, Users, BarChart3 } from 'lucide-react'
import CrowdIndicator from '../indicators/CrowdIndicator'

const PredictionResult = ({ prediction }) => {
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

  return (
    <div className="glass-card p-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">Prediction Result</h3>
        <p className="text-dark-400">Generated based on your parameters</p>
      </div>

      {/* Crowd Level */}
      <div className="text-center mb-8">
        <div className="mb-4">
          <CrowdIndicator level={prediction.level} size="lg" />
        </div>
        <p className="text-4xl font-bold mb-2">{prediction.confidence}%</p>
        <p className="text-dark-400">Confidence Level</p>
      </div>

      {/* Details */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between p-3 bg-dark-800/50 rounded-lg">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-dark-400" />
            <span>Prediction Time</span>
          </div>
          <span className="font-medium">{prediction.time}</span>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-dark-800/50 rounded-lg">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-dark-400" />
            <span>Estimated Crowd</span>
          </div>
          <span className="font-medium">{prediction.estimatedCrowd}</span>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-dark-800/50 rounded-lg">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-dark-400" />
            <span>Historical Accuracy</span>
          </div>
          <span className="font-medium text-green-400">{prediction.historicalAccuracy}%</span>
        </div>
      </div>

      {/* Suggestions */}
      <div className="border-t border-dark-800 pt-6">
        <h4 className="font-bold mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          Travel Suggestions
        </h4>
        <ul className="space-y-2">
          {suggestions[prediction.level].map((suggestion, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
              <span>{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 pt-6 border-t border-dark-800">
        <button className="w-full btn-primary">
          Save Prediction
        </button>
      </div>
    </div>
  )
}

export default PredictionResult