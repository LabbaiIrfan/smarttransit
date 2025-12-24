import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { 
  Bus, 
  BarChart3, 
  Shield, 
  Users, 
  ArrowRight, 
  Cloud, 
  Calendar, 
  MapPin,
  Zap,
  Clock,
  TrendingUp,
  CheckCircle,
  Globe,
  Smartphone,
  Cpu,
  Target,
  LineChart,
  MessageSquare,
  ChevronRight,
  Star,
  PlayCircle,
  Award,
  Sparkles,
  Rocket,
  Heart
} from 'lucide-react'
import CrowdIndicator from '../components/indicators/CrowdIndicator'
import FeatureCard from '../components/common/FeatureCard'
import TestimonialCard from '../components/common/TestimonialCard'
import StatCounter from '../components/common/StatCounter'

const LandingPage = () => {
  const { user } = useSelector((state) => state.auth)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const heroOpacity = Math.max(0.8, 1 - scrollY / 1000)

  const features = [
    {
      icon: <Cpu className="w-10 h-10" />,
      title: 'AI-Powered Predictions',
      description: 'Advanced machine learning models predict crowd levels with 92% accuracy',
      color: 'text-purple-400',
      gradient: 'from-purple-500 to-pink-500',
      delay: '100'
    },
    {
      icon: <Globe className="w-10 h-10" />,
      title: 'Real-time Analytics',
      description: 'Live data processing across entire transport network',
      color: 'text-blue-400',
      gradient: 'from-blue-500 to-cyan-500',
      delay: '200'
    },
    {
      icon: <Smartphone className="w-10 h-10" />,
      title: 'Mobile First',
      description: 'Seamless experience across all devices',
      color: 'text-green-400',
      gradient: 'from-green-500 to-emerald-500',
      delay: '300'
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and data protection',
      color: 'text-red-400',
      gradient: 'from-red-500 to-orange-500',
      delay: '400'
    }
  ]

  const stats = [
    { label: 'Predictions Made', value: '50K+', icon: <BarChart3 className="w-5 h-5" /> },
    { label: 'Accuracy Rate', value: '92%', icon: <Target className="w-5 h-5" /> },
    { label: 'Active Users', value: '10K+', icon: <Users className="w-5 h-5" /> },
    { label: 'Cities Covered', value: '25+', icon: <MapPin className="w-5 h-5" /> }
  ]

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Daily Commuter',
      content: 'Saved me 30 minutes every day! The predictions are incredibly accurate.',
      rating: 5,
      avatar: 'SC'
    },
    {
      name: 'Raj Patel',
      role: 'Transport Analyst',
      content: 'Revolutionary platform for smart city planning. Data is gold.',
      rating: 5,
      avatar: 'RP'
    },
    {
      name: 'Maria Gonzalez',
      role: 'City Planner',
      content: 'Transformed how we analyze and manage public transport flows.',
      rating: 4,
      avatar: 'MG'
    }
  ]

  const howItWorks = [
    {
      step: '01',
      title: 'Select Route & Time',
      description: 'Choose your transport route and preferred travel time',
      icon: <MapPin className="w-8 h-8" />
    },
    {
      step: '02',
      title: 'AI Analysis',
      description: 'Our algorithms analyze historical and real-time data',
      icon: <Cpu className="w-8 h-8" />
    },
    {
      step: '03',
      title: 'Get Prediction',
      description: 'Receive accurate crowd level prediction',
      icon: <Target className="w-8 h-8" />
    },
    {
      step: '04',
      title: 'Plan Smart',
      description: 'Make informed decisions and save time',
      icon: <CheckCircle className="w-8 h-8" />
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/20 via-transparent to-transparent"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600">
                <Bus className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
                SmartTransit
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
              <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Testimonials</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
            </div>

            <div className="flex items-center gap-4">
              {user ? (
                <Link to="/dashboard" className="btn-primary flex items-center gap-2">
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <>
                  <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                    Sign In
                  </Link>
                  <Link to="/register" className="btn-primary flex items-center gap-2">
                    Get Started Free
                    <Sparkles className="w-4 h-4" />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/20 to-purple-500/20 border border-primary-500/30 mb-8 animate-pulse">
              <Rocket className="w-4 h-4 text-primary-400" />
              <span className="text-sm font-medium text-primary-300">Next Generation Transport Intelligence</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Smarter Commutes,{' '}
              <span className="bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Happier Cities
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-10 max-w-3xl">
              AI-powered predictions for public transport crowd levels. 
              Plan your commute smarter with real-time analytics and historical insights 
              that save time and reduce stress.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              {user ? (
                <Link
                  to="/dashboard"
                  className="group relative px-8 py-4 bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700 rounded-xl text-lg font-semibold text-white flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/30"
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500 to-purple-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></div>
                  <span className="relative">Launch Dashboard</span>
                  <ArrowRight className="w-5 h-5 relative" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="group relative px-8 py-4 bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700 rounded-xl text-lg font-semibold text-white flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/30"
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500 to-purple-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></div>
                    <span className="relative">Start Free Trial</span>
                    <Sparkles className="w-5 h-5 relative" />
                  </Link>
                  <Link
                    to="/login"
                    className="px-8 py-4 border-2 border-gray-700 hover:border-primary-500 rounded-xl text-lg font-semibold text-white hover:text-primary-400 flex items-center justify-center gap-3 transition-all duration-300"
                  >
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </>
              )}
              
              <button className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group">
                <div className="p-3 rounded-full bg-gray-800 group-hover:bg-primary-500/20 transition-colors">
                  <PlayCircle className="w-6 h-6" />
                </div>
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
              {stats.map((stat, index) => (
                <div key={index} className="glass-card p-6 card-hover">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-primary-500/20">
                      {stat.icon}
                    </div>
                  </div>
                  <StatCounter endValue={stat.value} />
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              See It In <span className="text-gradient">Action</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Real-time crowd predictions for Navi Mumbai transport network
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="glass-card p-8 rounded-2xl border border-gray-800/50 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold">Live Crowd Dashboard</h3>
                  <p className="text-gray-400">Navi Mumbai Transport Network</p>
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span>Live Data</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <CrowdIndicator level="high" label="Metro Line 1" time="08:00 AM" size="lg" />
                <CrowdIndicator level="medium" label="Bus Route 101" time="09:30 AM" size="lg" />
                <CrowdIndicator level="low" label="Train Station A" time="10:00 AM" size="lg" />
              </div>

              {/* Interactive Map Visualization */}
              <div className="relative h-64 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border border-gray-700 mb-8">
                <div className="absolute inset-0 p-6">
                  {/* Animated route lines */}
                  <div className="absolute top-1/4 left-1/4 w-1/2 h-1 bg-red-500 transform -rotate-45 animate-pulse"></div>
                  <div className="absolute top-1/2 left-1/4 w-1/2 h-1 bg-green-500 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute top-3/4 left-1/4 w-1/2 h-1 bg-blue-500 transform rotate-45 animate-pulse" style={{ animationDelay: '1s' }}></div>
                  
                  {/* Animated station dots */}
                  {[1, 2, 3, 4, 5].map((station) => (
                    <div
                      key={station}
                      className="absolute w-4 h-4 rounded-full border-2 border-white bg-primary-500 animate-bounce"
                      style={{
                        left: `${20 + station * 15}%`,
                        top: `${30 + station * 10}%`,
                        animationDelay: `${station * 0.2}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="text-gradient">SmartTransit</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Cutting-edge technology meets user-friendly design for the ultimate commuting experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative"
                data-aos="fade-up"
                data-aos-delay={feature.delay}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative glass-card p-8 rounded-2xl h-full card-hover">
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${feature.gradient} w-fit mb-6`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                  <div className="mt-6 pt-6 border-t border-gray-800">
                    <button className="flex items-center gap-2 text-primary-400 hover:text-primary-300 text-sm">
                      Learn More
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Advanced Features */}
          <div className="glass-card p-8 rounded-2xl border border-gray-800/50">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6">
                  Advanced <span className="text-gradient">Analytics Suite</span>
                </h3>
                <ul className="space-y-4">
                  {[
                    'Predictive modeling with 92% accuracy',
                    'Real-time weather integration',
                    'Historical trend analysis',
                    'Peak hour identification',
                    'Route optimization suggestions',
                    'Mobile app with push notifications'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="relative h-80 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border border-gray-700">
                  {/* Animated chart visualization */}
                  <div className="absolute inset-0 p-6">
                    <div className="flex items-end h-full gap-2">
                      {[40, 65, 85, 60, 45, 70, 90].map((height, index) => (
                        <div
                          key={index}
                          className="flex-1 bg-gradient-to-t from-primary-500 to-purple-500 rounded-t-lg animate-pulse"
                          style={{
                            height: `${height}%`,
                            animationDelay: `${index * 0.1}s`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-gradient-to-b from-transparent to-gray-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Simple 4-step process to transform your daily commute
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div
                key={index}
                className="relative group"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-1 bg-gradient-to-r from-primary-500 to-transparent z-0"></div>
                )}
                <div className="relative glass-card p-8 rounded-2xl text-center card-hover">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 text-2xl font-bold mb-6">
                    {step.step}
                  </div>
                  <div className="p-3 rounded-xl bg-gray-800/50 inline-block mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Loved by <span className="text-gradient">Commuters</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              See what our users are saying about their transformed commute experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>

          {/* Trusted By */}
          <div className="glass-card p-8 rounded-2xl text-center">
            <h3 className="text-2xl font-bold mb-8">Trusted by Smart Cities Worldwide</h3>
            <div className="flex flex-wrap justify-center gap-8 items-center opacity-70">
              <div className="text-3xl font-bold text-gray-400">Mumbai</div>
              <div className="text-3xl font-bold text-gray-400">Delhi</div>
              <div className="text-3xl font-bold text-gray-400">Bangalore</div>
              <div className="text-3xl font-bold text-gray-400">Singapore</div>
              <div className="text-3xl font-bold text-gray-400">Dubai</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass-card p-12 rounded-3xl border border-gray-800/50 bg-gradient-to-br from-gray-900 to-gray-950 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full translate-y-32 -translate-x-32"></div>
              
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to Transform Your <span className="text-gradient">Commute?</span>
                </h2>
                <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
                  Join thousands of smart commuters who save time, reduce stress, 
                  and make better travel decisions every day.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {user ? (
                    <Link
                      to="/dashboard"
                      className="group relative px-8 py-4 bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700 rounded-xl text-lg font-semibold text-white flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105"
                    >
                      <span>Continue to Dashboard</span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  ) : (
                    <>
                      <Link
                        to="/register"
                        className="group relative px-8 py-4 bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700 rounded-xl text-lg font-semibold text-white flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105"
                      >
                        <span>Start Free Trial</span>
                        <Rocket className="w-5 h-5" />
                      </Link>
                      <Link
                        to="/login"
                        className="px-8 py-4 border-2 border-gray-700 hover:border-primary-500 rounded-xl text-lg font-semibold text-white hover:text-primary-400 flex items-center justify-center gap-3 transition-all duration-300"
                      >
                        <span>Sign In</span>
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </>
                  )}
                </div>
                
                <p className="text-gray-400 text-sm mt-6">
                  No credit card required • 14-day free trial • Cancel anytime
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-800 bg-gray-950">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600">
                  <Bus className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">SmartTransit</span>
              </div>
              <p className="text-gray-400 mb-6">
                AI-powered transport intelligence for smarter cities and happier commuters.
              </p>
              <div className="flex gap-4">
                <a href="#" className="p-2 rounded-lg bg-gray-800 hover:bg-primary-500/20 transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 rounded-lg bg-gray-800 hover:bg-primary-500/20 transition-colors">
                  <Users className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 rounded-lg bg-gray-800 hover:bg-primary-500/20 transition-colors">
                  <Globe className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">GDPR</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} SmartTransit. All rights reserved.
              </p>
              <div className="flex items-center gap-6 mt-4 md:mt-0">
                <span className="flex items-center gap-2 text-sm text-gray-400">
                  <Heart className="w-4 h-4 text-red-400" />
                  Made for Smart Cities
                </span>
                <span className="text-sm text-gray-400">
                  Version 2.0 • Built with React & AI
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage