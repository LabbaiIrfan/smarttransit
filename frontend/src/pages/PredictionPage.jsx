import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { 
  Search, 
  Clock, 
  Calendar, 
  MapPin, 
  Cloud, 
  Thermometer,
  Users,
  AlertCircle
} from 'lucide-react'
import RouteSelector from '../components/sections/RouteSelector'
import CrowdIndicator from '../components/indicators/CrowdIndicator'
import PredictionResult from '../components/sections/PredictionResult'
import { predictCrowding } from '../services/predictionService'

const PredictionPage = () => {
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      time: '08:00',
      weather: 'clear',
      holiday: false
    }
  })

  const onSubmit = async (data) => {
    setLoading(true)
    setError('')
    
    try {
      // In a real app, this would call an ML backend
      const result = await predictCrowding(data)
      setPrediction(result)
    } catch (err) {
      setError('Failed to generate prediction. Please try again.')
      console.error('Prediction error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Crowd Prediction</h1>
        <p className="text-dark-400">
          Get accurate crowd level predictions for any route and time
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Prediction Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold mb-6">Configure Prediction Parameters</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Route Selection */}
              <div>
                <label className="block text-sm font-medium mb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4" />
                    <span>Select Route</span>
                  </div>
                </label>
                <RouteSelector register={register} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date & Time */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Date</span>
                    </div>
                  </label>
                  <input
                    type="date"
                    {...register('date', { required: 'Date is required' })}
                    className="input-field"
                  />
                  {errors.date && (
                    <p className="mt-1 text-sm text-red-400">{errors.date.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Time</span>
                    </div>
                  </label>
                  <input
                    type="time"
                    {...register('time', { required: 'Time is required' })}
                    className="input-field"
                  />
                  {errors.time && (
                    <p className="mt-1 text-sm text-red-400">{errors.time.message}</p>
                  )}
                </div>
              </div>

              {/* Weather Conditions */}
              <div>
                <label className="block text-sm font-medium mb-3">
                  <div className="flex items-center gap-2">
                    <Cloud className="w-4 h-4" />
                    <span>Weather Conditions</span>
                  </div>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['clear', 'rainy', 'cloudy', 'snowy'].map((condition) => (
                    <label
                      key={condition}
                      className={`flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-colors ${
                        watch('weather') === condition
                          ? 'bg-primary-500/20 border-primary-500'
                          : 'bg-dark-800 border-dark-700 hover:bg-dark-700'
                      }`}
                    >
                      <input
                        type="radio"
                        {...register('weather')}
                        value={condition}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <Thermometer className="w-5 h-5 mx-auto mb-1" />
                        <span className="text-sm capitalize">{condition}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Holiday Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="holiday"
                  {...register('holiday')}
                  className="w-4 h-4 rounded bg-dark-800 border-dark-600 focus:ring-primary-500"
                />
                <label htmlFor="holiday" className="ml-2 text-sm">
                  Is it a public holiday?
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Predicting...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Generate Prediction
                  </>
                )}
              </button>

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
            </form>
          </div>

          {/* Historical Data */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold mb-4">Historical Patterns</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-dark-400" />
                  <span>Similar conditions (last month)</span>
                </div>
                <CrowdIndicator level="medium" size="sm" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-dark-400" />
                  <span>Average crowding at this time</span>
                </div>
                <CrowdIndicator level="high" size="sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          {prediction ? (
            <PredictionResult prediction={prediction} />
          ) : (
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold mb-4">Prediction Results</h2>
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-dark-800 flex items-center justify-center">
                  <Search className="w-8 h-8 text-dark-500" />
                </div>
                <p className="text-dark-400">
                  Configure parameters and generate a prediction to see results here
                </p>
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold mb-4">Prediction Tips</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-primary-500 mt-1.5"></div>
                <span>Predictions are more accurate during weekdays</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-primary-500 mt-1.5"></div>
                <span>Weather significantly impacts crowd levels</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-primary-500 mt-1.5"></div>
                <span>Consider alternative routes during peak hours</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PredictionPage