import { Link } from 'react-router-dom'
import { Bus, BarChart3, Shield, Users, ArrowRight, Cloud, Calendar, MapPin } from 'lucide-react'
import { useSelector } from 'react-redux'
import HeroSection from '../components/sections/HeroSection'
import FeatureCard from '../components/common/FeatureCard'
import CrowdIndicator from '../components/indicators/CrowdIndicator'

const LandingPage = () => {
  const { user } = useSelector((state) => state.auth)

  const features = [
    {
      icon: <Bus className="w-8 h-8" />,
      title: 'Real-time Predictions',
      description: 'Get accurate crowd level predictions for any route and time',
      color: 'text-primary-400',
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Data Analytics',
      description: 'Comprehensive trends and historical data analysis',
      color: 'text-crowd-low',
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: 'Weather Integration',
      description: 'Weather-aware predictions for better accuracy',
      color: 'text-blue-400',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Smart City Security',
      description: 'Enterprise-grade security and data protection',
      color: 'text-purple-400',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Smart Features for Smarter Commutes</h2>
          <p className="text-dark-400 text-lg max-w-2xl mx-auto">
            Leverage AI and real-time data to make informed travel decisions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* Crowd Indicator Demo */}
        <div className="glass-card p-8 mb-16">
          <h3 className="text-2xl font-bold mb-6">Live Crowd Indicator</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CrowdIndicator level="low" label="Metro Line 1" time="08:00 AM" />
            <CrowdIndicator level="medium" label="Bus Route 101" time="09:30 AM" />
            <CrowdIndicator level="high" label="Train Station A" time="05:00 PM" />
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center glass-card p-12">
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Commute?</h3>
          <p className="text-dark-300 mb-8 max-w-2xl mx-auto">
            Join thousands of smart commuters who save time and avoid crowded transport
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link to="/dashboard" className="btn-primary inline-flex items-center gap-2">
                Go to Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn-primary inline-flex items-center gap-2">
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/login" className="btn-secondary">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-800 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Bus className="w-8 h-8 text-primary-500" />
              <span className="text-xl font-bold">SmartTransit</span>
            </div>
            <p className="text-dark-400 text-sm">
              © {new Date().getFullYear()} Smart City Transport Analytics. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage