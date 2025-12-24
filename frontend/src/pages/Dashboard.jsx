import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { 
  TrendingUp, 
  Users, 
  Clock, 
  AlertTriangle,
  Bus,
  Calendar,
  Zap,
  BarChart3,
  MessageSquare,
  Bell,
  MapPin,
  TrendingDown,
  RefreshCw,
  Eye,
  Cloud,
  Shield,
  Activity,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  Navigation,
  Target,
  Database
} from 'lucide-react'
import { Link } from 'react-router-dom'
import StatCard from '../components/common/StatCard'
import RouteSelector from '../components/sections/RouteSelector'
import CrowdPredictionChart from '../components/charts/CrowdPredictionChart'
import WeatherWidget from '../components/sections/WeatherWidget'
import QuickPrediction from '../components/sections/QuickPrediction'
import LiveAlerts from '../components/sections/LiveAlerts'
import TransportMap from '../components/sections/TransportMap'
import PeakHours from '../components/sections/PeakHours'
import TopRoutes from '../components/sections/TopRoutes'

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth)
  const [stats, setStats] = useState({
    totalPredictions: 0,
    accuracyRate: 0,
    avgCrowdLevel: 0,
    peakHours: 0,
    activeUsers: 0,
    responseTime: 0,
    dataAccuracy: 0,
    routesMonitored: 0,
  })

  useEffect(() => {
    // Simulate API call for stats
    setTimeout(() => {
      setStats({
        totalPredictions: 1247,
        accuracyRate: 89,
        avgCrowdLevel: 2.3,
        peakHours: 17,
        activeUsers: 342,
        responseTime: 145,
        dataAccuracy: 92,
        routesMonitored: 24,
      })
    }, 1000)
  }, [])

  const handleRefresh = () => {
    // Simulate refresh
    setStats(prev => ({ ...prev }))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Smart Transit Dashboard</h1>
          <p className="text-gray-400">
            Welcome back, {user?.name}! Real-time transport analytics and predictions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          <button 
            onClick={handleRefresh}
            className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm">Refresh</span>
          </button>
        </div>
      </div>

      {/* Stats Grid - Enhanced */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<BarChart3 className="w-6 h-6" />}
          title="Total Predictions"
          value={stats.totalPredictions.toLocaleString()}
          change="+12% this month"
          color="text-primary-400"
          trend="up"
        />
        <StatCard
          icon={<Bus className="w-6 h-6" />}
          title="Avg. Crowd Level"
          value={stats.avgCrowdLevel.toFixed(1)}
          change="Medium"
          color="text-yellow-400"
          trend="neutral"
        />
        <StatCard
          icon={<Users className="w-6 h-6" />}
          title="Prediction Accuracy"
          value={`${stats.accuracyRate}%`}
          change="+2.3% from last month"
          color="text-green-400"
          trend="up"
        />
        <StatCard
          icon={<Database className="w-6 h-6" />}
          title="Routes Monitored"
          value={stats.routesMonitored}
          change="+3 new routes"
          color="text-purple-400"
          trend="up"
        />
      </div>

      {/* Second Row Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Activity className="w-6 h-6" />}
          title="Active Users"
          value={stats.activeUsers.toLocaleString()}
          change="+8% today"
          color="text-cyan-400"
          trend="up"
        />
        <StatCard
          icon={<Clock className="w-6 h-6" />}
          title="Response Time"
          value={`${stats.responseTime}ms`}
          change="-15ms improved"
          color="text-blue-400"
          trend="down"
        />
        <StatCard
          icon={<Eye className="w-6 h-6" />}
          title="Data Accuracy"
          value={`${stats.dataAccuracy}%`}
          change="+1.2% this week"
          color="text-green-400"
          trend="up"
        />
        <StatCard
          icon={<Target className="w-6 h-6" />}
          title="Peak Hours"
          value={stats.peakHours}
          change="Most crowded: 8-9 AM"
          color="text-orange-400"
          trend="neutral"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Route Selector & Quick Prediction */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Quick Route Analysis
              </h2>
              <RouteSelector />
            </div>
            
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold mb-4">Instant Prediction</h2>
              <QuickPrediction />
            </div>
          </div>

          {/* Chart Section */}
          <div className="glass-card p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold">Crowd Trends Analytics</h2>
                <p className="text-gray-400">Last 7 days performance across routes</p>
              </div>
              <div className="flex items-center gap-3">
                <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last quarter</option>
                </select>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-primary-600 hover:bg-primary-700 rounded-lg text-sm">
                  <BarChart3 className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
            <CrowdPredictionChart />
          </div>

          {/* Transport Map */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Live Transport Network</h2>
              <button className="flex items-center gap-2 text-sm text-primary-400 hover:text-primary-300">
                <Navigation className="w-4 h-4" />
                Full Map
              </button>
            </div>
            <TransportMap />
          </div>

          {/* Peak Hours Analysis */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold mb-4">Peak Hours Analysis</h2>
            <PeakHours />
          </div>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Weather Widget */}
          <WeatherWidget />

          {/* Live Alerts */}
          <LiveAlerts />

          {/* Top Routes */}
          <TopRoutes />


          {/* Quick Actions Card */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link to="/chat" className="block">
                <button className="w-full flex items-center justify-between p-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-500/20 rounded-lg group-hover:bg-primary-500/30">
                      <MessageSquare className="w-5 h-5 text-primary-400" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Community Chat</div>
                      <div className="text-sm text-gray-400">Connect with commuters</div>
                    </div>
                  </div>
                  <div className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                    24 online
                  </div>
                </button>
              </Link>

              <button className="w-full flex items-center justify-between p-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Report Issue</div>
                    <div className="text-sm text-gray-400">Submit transport feedback</div>
                  </div>
                </div>
                <div className="text-gray-400">→</div>
              </button>

              <button className="w-full flex items-center justify-between p-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Generate Report</div>
                    <div className="text-sm text-gray-400">Weekly analytics report</div>
                  </div>
                </div>
                <div className="text-gray-400">→</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            Performance Insights
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Weekday Accuracy</span>
                <span className="font-medium">94%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-green-400 h-2 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Weekend Accuracy</span>
                <span className="font-medium">82%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">User Satisfaction</span>
                <span className="font-medium">4.7/5</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-primary-400 h-2 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Cloud className="w-5 h-5 text-blue-400" />
            Weather Impact
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 hover:bg-gray-800/50 rounded">
              <span className="text-sm">Rainy days increase crowding by</span>
              <span className="font-medium text-blue-400">35%</span>
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-gray-800/50 rounded">
              <span className="text-sm">Temperature above 35°C increases</span>
              <span className="font-medium text-orange-400">22%</span>
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-gray-800/50 rounded">
              <span className="text-sm">Monsoon season accuracy drop</span>
              <span className="font-medium text-red-400">-8%</span>
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-gray-800/50 rounded">
              <span className="text-sm">Clear weather prediction accuracy</span>
              <span className="font-medium text-green-400">96%</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary-400" />
            System Health
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-sm">Prediction API</span>
              </div>
              <span className="text-sm text-gray-400">145ms</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-sm">Weather Service</span>
              </div>
              <span className="text-sm text-gray-400">320ms</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-sm">Database</span>
              </div>
              <span className="text-sm text-gray-400">85ms</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <span className="text-sm">External APIs</span>
              </div>
              <span className="text-sm text-gray-400">420ms</span>
            </div>
            <div className="pt-3 border-t border-gray-800">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Overall Health</span>
                <span className="font-medium text-green-400">98%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard