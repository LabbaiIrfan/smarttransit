import { Link } from 'react-router-dom'
import { Bus, ArrowRight, BarChart3, Cloud, Shield } from 'lucide-react'
import { useSelector } from 'react-redux'

const HeroSection = () => {
  const { user } = useSelector((state) => state.auth)

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-purple-500/10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-500 shadow-xl">
              <Bus className="w-16 h-16 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Smart City
            <span className="text-gradient"> Transport Crowding</span>
          </h1>
          
          <p className="text-xl text-dark-300 mb-8 max-w-3xl mx-auto">
            AI-powered predictions for public transport crowd levels. 
            Plan your commute smarter with real-time analytics and historical insights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {user ? (
              <Link
                to="/dashboard"
                className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 text-lg"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 text-lg"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/login"
                  className="btn-secondary px-8 py-4 text-lg"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="glass-card p-6 text-center">
              <BarChart3 className="w-10 h-10 text-primary-400 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Real-time Analytics</h3>
              <p className="text-dark-400 text-sm">Live crowd predictions using AI models</p>
            </div>
            <div className="glass-card p-6 text-center">
              <Cloud className="w-10 h-10 text-blue-400 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Weather Integration</h3>
              <p className="text-dark-400 text-sm">Weather-aware crowd predictions</p>
            </div>
            <div className="glass-card p-6 text-center">
              <Shield className="w-10 h-10 text-green-400 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Smart City Ready</h3>
              <p className="text-dark-400 text-sm">Enterprise security & scalability</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection