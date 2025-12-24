import { useState } from 'react'
import { Calendar, Filter, Download, TrendingUp, TrendingDown } from 'lucide-react'
import CrowdTrendChart from '../components/charts/CrowdTrendChart'
import PeakHoursChart from '../components/charts/PeakHoursChart'
import RouteComparisonChart from '../components/charts/RouteComparisonChart'
import DataTable from '../components/common/DataTable'

const TrendsPage = () => {
  const [timeRange, setTimeRange] = useState('7d')
  const [selectedRoute, setSelectedRoute] = useState('all')

  const routes = [
    { id: 'metro-1', name: 'Metro Line 1', color: '#3B82F6' },
    { id: 'bus-101', name: 'Bus Route 101', color: '#10B981' },
    { id: 'train-a', name: 'Train Station A', color: '#8B5CF6' },
    { id: 'bus-202', name: 'Bus Route 202', color: '#F59E0B' },
  ]

  const trendData = {
    '7d': { trend: '+2.3%', direction: 'up' },
    '30d': { trend: '+5.1%', direction: 'up' },
    '90d': { trend: '-1.2%', direction: 'down' },
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Trends & Analytics</h1>
          <p className="text-dark-400">
            Analyze crowd patterns and historical data
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="glass-card p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold">Crowding Trends</h2>
            <p className="text-dark-400 text-sm">Select time range to analyze</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-dark-800 rounded-lg p-1">
              {['7d', '30d', '90d'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    timeRange === range
                      ? 'bg-primary-600 text-white'
                      : 'text-dark-400 hover:text-white'
                  }`}
                >
                  {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-dark-800 rounded-lg">
              {trendData[timeRange].direction === 'up' ? (
                <TrendingUp className="w-4 h-4 text-green-400" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-400" />
              )}
              <span className="text-sm">{trendData[timeRange].trend}</span>
            </div>
          </div>
        </div>

        <CrowdTrendChart timeRange={timeRange} />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Peak Hours Distribution</h3>
            <Filter className="w-4 h-4 text-dark-400" />
          </div>
          <PeakHoursChart />
        </div>

        <div className="glass-card p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Route Comparison</h3>
            <select
              value={selectedRoute}
              onChange={(e) => setSelectedRoute(e.target.value)}
              className="bg-dark-800 border border-dark-700 rounded-lg px-3 py-1 text-sm"
            >
              <option value="all">All Routes</option>
              {routes.map((route) => (
                <option key={route.id} value={route.id}>
                  {route.name}
                </option>
              ))}
            </select>
          </div>
          <RouteComparisonChart routes={routes} />
        </div>
      </div>

      {/* Data Table */}
      <div className="glass-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Historical Data</h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-dark-400">
              <Calendar className="w-4 h-4" />
              <span>Jan 1 - Jan 31, 2024</span>
            </div>
          </div>
        </div>
        <DataTable />
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6">
          <h3 className="font-bold mb-3">Top Insight</h3>
          <p className="text-sm text-dark-300">
            Monday mornings show 40% higher crowding compared to other weekdays
          </p>
        </div>
        <div className="glass-card p-6">
          <h3 className="font-bold mb-3">Recommendation</h3>
          <p className="text-sm text-dark-300">
            Consider adding more frequent services between 8-9 AM on Metro Line 1
          </p>
        </div>
        <div className="glass-card p-6">
          <h3 className="font-bold mb-3">Accuracy</h3>
          <p className="text-sm text-dark-300">
            Prediction accuracy for this route: 92.3% (±3.1%)
          </p>
        </div>
      </div>
    </div>
  )
}

export default TrendsPage