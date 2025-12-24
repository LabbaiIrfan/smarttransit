import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { 
  TrendingUp, 
  Users, 
  Clock, 
  AlertTriangle,
  Bus,
  Calendar,
  Cloud
} from 'lucide-react'
import StatCard from '../components/common/StatCard'
import RouteSelector from '../components/sections/RouteSelector'
import CrowdPredictionChart from '../components/charts/CrowdPredictionChart'
import RecentPredictions from '../components/sections/RecentPredictions'
import WeatherWidget from '../components/sections/WeatherWidget'
import QuickPrediction from '../components/sections/QuickPrediction'

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth)
  const [stats, setStats] = useState({
    totalPredictions: 0,
    accuracyRate: 0,
    avgCrowdLevel: 0,
    peakHours: 0,
  })

  useEffect(() => {
    // In a real app, fetch stats from API
    setStats({
      totalPredictions: 1247,
      accuracyRate: 89,
      avgCrowdLevel: 2.3,
      peakHours: 17,
    })
  }, [])

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-dark-400">
            Welcome back, {user?.name}! Here's your transport overview.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4" />
          <span>{new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<TrendingUp className="w-6 h-6" />}
          title="Total Predictions"
          value={stats.totalPredictions.toLocaleString()}
          change="+12% this month"
          color="text-primary-400"
        />
        <StatCard
          icon={<Bus className="w-6 h-6" />}
          title="Avg. Crowd Level"
          value={stats.avgCrowdLevel.toFixed(1)}
          change="Medium"
          color="text-crowd-medium"
        />
        <StatCard
          icon={<Users className="w-6 h-6" />}
          title="Prediction Accuracy"
          value={`${stats.accuracyRate}%`}
          change="+2.3% from last month"
          color="text-green-400"
        />
        <StatCard
          icon={<Clock className="w-6 h-6" />}
          title="Peak Hours Identified"
          value={stats.peakHours}
          change="Most crowded: 8-9 AM"
          color="text-purple-400"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Route Selector */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold mb-4">Quick Prediction</h2>
            <RouteSelector />
          </div>

          {/* Chart */}
          <div className="glass-card p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Crowd Trends (Last 7 Days)</h2>
              <select className="bg-dark-800 border border-dark-700 rounded-lg px-3 py-1 text-sm">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last quarter</option>
              </select>
            </div>
            <CrowdPredictionChart />
          </div>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Weather Widget */}
          <WeatherWidget />

          {/* Quick Prediction */}
          <QuickPrediction />

          {/* Recent Predictions */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold mb-4">Recent Predictions</h2>
            <RecentPredictions />
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-crowd-high" />
          <h2 className="text-xl font-bold">Today's Alerts</h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-crowd-high/10 border border-crowd-high/30 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-crowd-high"></div>
              <span className="font-medium">Metro Line 1</span>
            </div>
            <span className="text-sm">High crowding until 10 AM</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-crowd-medium/10 border border-crowd-medium/30 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-crowd-medium"></div>
              <span className="font-medium">Bus Route 101</span>
            </div>
            <span className="text-sm">Moderate crowding expected</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard