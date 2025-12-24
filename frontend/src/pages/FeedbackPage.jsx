import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare,
  Send,
  Clock,
  Route,
  AlertCircle
} from 'lucide-react'
import { submitFeedback } from '../services/feedbackService'
import { useSelector } from 'react-redux'

const FeedbackPage = () => {
  const { user } = useSelector((state) => state.auth)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    
    try {
      await submitFeedback({
        ...data,
        userId: user.id,
        timestamp: new Date().toISOString(),
      })
      
      setSubmitted(true)
      reset()
      setTimeout(() => setSubmitted(false), 3000)
    } catch (error) {
      console.error('Feedback submission error:', error)
    } finally {
      setLoading(false)
    }
  }

  const recentFeedbacks = [
    { id: 1, route: 'Metro Line 1', rating: 5, comment: 'Very accurate prediction!', time: '2 hours ago' },
    { id: 2, route: 'Bus 101', rating: 4, comment: 'Slightly crowded but manageable', time: '1 day ago' },
    { id: 3, route: 'Train A', rating: 3, comment: 'Could be better', time: '2 days ago' },
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Feedback & Accuracy</h1>
        <p className="text-dark-400">
          Help us improve predictions by sharing your experience
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Feedback Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold mb-6">Submit Feedback</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Route Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  <div className="flex items-center gap-2">
                    <Route className="w-4 h-4" />
                    <span>Which route did you use?</span>
                  </div>
                </label>
                <select
                  {...register('route', { required: 'Please select a route' })}
                  className="input-field"
                >
                  <option value="">Select a route...</option>
                  <option value="metro-1">Metro Line 1</option>
                  <option value="bus-101">Bus Route 101</option>
                  <option value="train-a">Train Station A</option>
                  <option value="bus-202">Bus Route 202</option>
                </select>
                {errors.route && (
                  <p className="mt-1 text-sm text-red-400">{errors.route.message}</p>
                )}
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Travel Date & Time</span>
                    </div>
                  </label>
                  <input
                    type="datetime-local"
                    {...register('travelTime', { required: 'Travel time is required' })}
                    className="input-field"
                  />
                  {errors.travelTime && (
                    <p className="mt-1 text-sm text-red-400">{errors.travelTime.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <span>Actual Crowd Level</span>
                  </label>
                  <div className="flex gap-2">
                    {['low', 'medium', 'high'].map((level) => (
                      <label
                        key={level}
                        className={`flex-1 flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-colors capitalize ${
                          watch('actualLevel') === level
                            ? level === 'low'
                              ? 'bg-crowd-low/20 border-crowd-low'
                              : level === 'medium'
                              ? 'bg-crowd-medium/20 border-crowd-medium'
                              : 'bg-crowd-high/20 border-crowd-high'
                            : 'bg-dark-800 border-dark-700 hover:bg-dark-700'
                        }`}
                      >
                        <input
                          type="radio"
                          {...register('actualLevel', { required: 'Please select actual crowd level' })}
                          value={level}
                          className="sr-only"
                        />
                        {level}
                      </label>
                    ))}
                  </div>
                  {errors.actualLevel && (
                    <p className="mt-1 text-sm text-red-400">{errors.actualLevel.message}</p>
                  )}
                </div>
              </div>

              {/* Accuracy Rating */}
              <div>
                <label className="block text-sm font-medium mb-3">
                  <span>How accurate was our prediction?</span>
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <label key={star} className="cursor-pointer">
                      <input
                        type="radio"
                        {...register('accuracyRating', { required: 'Please rate accuracy' })}
                        value={star}
                        className="sr-only"
                      />
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          star <= (watch('accuracyRating') || 0)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-dark-500'
                        }`}
                      />
                    </label>
                  ))}
                </div>
                {errors.accuracyRating && (
                  <p className="mt-1 text-sm text-red-400">{errors.accuracyRating.message}</p>
                )}
              </div>

              {/* Additional Feedback */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>Additional Comments</span>
                  </div>
                </label>
                <textarea
                  {...register('comments')}
                  rows={4}
                  className="input-field"
                  placeholder="Any additional feedback or suggestions..."
                />
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
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Feedback
                  </>
                )}
              </button>

              {submitted && (
                <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-2 text-green-400">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">Thank you for your feedback!</span>
                </div>
              )}
            </form>
          </div>

          {/* Why Feedback Matters */}
          <div className="glass-card p-6">
            <h3 className="font-bold mb-3">Why Your Feedback Matters</h3>
            <ul className="space-y-2 text-sm text-dark-300">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-primary-500 mt-1.5"></div>
                <span>Improves prediction accuracy for everyone</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-primary-500 mt-1.5"></div>
                <span>Helps city planners optimize transport schedules</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-primary-500 mt-1.5"></div>
                <span>Contributes to smarter city infrastructure</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Recent Feedbacks & Stats */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="glass-card p-6">
            <h3 className="font-bold mb-4">Feedback Stats</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Overall Accuracy Rating</span>
                  <span className="font-bold">4.2/5</span>
                </div>
                <div className="w-full bg-dark-800 rounded-full h-2">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '84%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Response Rate</span>
                  <span className="font-bold">68%</span>
                </div>
                <div className="w-full bg-dark-800 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Feedbacks */}
          <div className="glass-card p-6">
            <h3 className="font-bold mb-4">Recent Feedback</h3>
            <div className="space-y-4">
              {recentFeedbacks.map((feedback) => (
                <div key={feedback.id} className="p-3 bg-dark-800/50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-sm">{feedback.route}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < feedback.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-dark-500'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-dark-300 mb-2">{feedback.comment}</p>
                  <div className="flex items-center gap-1 text-xs text-dark-500">
                    <Clock className="w-3 h-3" />
                    {feedback.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="glass-card p-6">
            <h3 className="font-bold mb-3">Feedback Tips</h3>
            <ul className="space-y-2 text-sm text-dark-300">
              <li className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-primary-500 mt-0.5" />
                <span>Be specific about time and location</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-primary-500 mt-0.5" />
                <span>Mention any unusual circumstances</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-primary-500 mt-0.5" />
                <span>Rate accuracy honestly</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedbackPage