import { useState } from 'react'
import { 
  Users, 
  BarChart3, 
  Settings, 
  Shield, 
  Download,
  Filter,
  Search,
  TrendingUp,
  AlertTriangle
} from 'lucide-react'
import AdminStats from '../components/sections/AdminStats'
import UserManagementTable from '../components/sections/UserManagementTable'
import SystemMetrics from '../components/sections/SystemMetrics'
import PredictionAccuracyChart from '../components/charts/PredictionAccuracyChart'

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'users', label: 'User Management', icon: <Users className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'system', label: 'System', icon: <Settings className="w-4 h-4" /> },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <p className="text-dark-400">
            System administration and analytics dashboard
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-dark-500" />
            <input
              type="search"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-dark-900 border border-dark-700 rounded-lg w-64"
            />
          </div>
          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-dark-800">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-3 px-1 border-b-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-400'
                  : 'border-transparent text-dark-400 hover:text-white'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <AdminStats />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Prediction Accuracy</h3>
                <Filter className="w-4 h-4 text-dark-400" />
              </div>
              <PredictionAccuracyChart />
            </div>

            <div className="glass-card p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">System Health</h3>
                <div className="flex items-center gap-2 text-sm text-green-400">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  All Systems Operational
                </div>
              </div>
              <SystemMetrics />
            </div>
          </div>

          {/* Alerts */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-crowd-high" />
              <h3 className="text-lg font-bold">Recent Alerts</h3>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">High prediction error rate detected</span>
                  <span className="text-sm text-dark-400">2 hours ago</span>
                </div>
                <p className="text-sm text-dark-300 mt-1">
                  Route 101 predictions showing 30% higher error rate than usual
                </p>
              </div>
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">API response time increased</span>
                  <span className="text-sm text-dark-400">1 day ago</span>
                </div>
                <p className="text-sm text-dark-300 mt-1">
                  Average response time increased from 120ms to 250ms
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="glass-card p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">User Management</h3>
              <div className="flex items-center gap-3">
                <select className="bg-dark-800 border border-dark-700 rounded-lg px-3 py-1 text-sm">
                  <option>All Users</option>
                  <option>Admins</option>
                  <option>Regular Users</option>
                </select>
                <button className="btn-primary text-sm">Add User</button>
              </div>
            </div>
            <UserManagementTable />
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold mb-6">Usage Analytics</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Daily Active Users</span>
                    <span className="font-bold">1,247</span>
                  </div>
                  <div className="w-full bg-dark-800 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Monthly Growth</span>
                    <span className="font-bold text-green-400">+12.5%</span>
                  </div>
                  <div className="w-full bg-dark-800 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-lg font-bold mb-6">Feature Usage</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Prediction Tool</span>
                    <span className="font-bold">89%</span>
                  </div>
                  <div className="w-full bg-dark-800 rounded-full h-2">
                    <div className="bg-blue-400 h-2 rounded-full" style={{ width: '89%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Feedback System</span>
                    <span className="font-bold">42%</span>
                  </div>
                  <div className="w-full bg-dark-800 rounded-full h-2">
                    <div className="bg-purple-400 h-2 rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* System Tab */}
      {activeTab === 'system' && (
        <div className="space-y-6">
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-5 h-5 text-primary-500" />
              <h3 className="text-lg font-bold">System Configuration</h3>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-dark-800/50 rounded-lg">
                  <h4 className="font-medium mb-2">API Settings</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Weather API Status</span>
                      <span className="text-green-400">Connected</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Prediction Model</span>
                      <span className="text-green-400">Active</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-dark-800/50 rounded-lg">
                  <h4 className="font-medium mb-2">Database</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Connection Pool</span>
                      <span className="text-green-400">Healthy</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Storage Used</span>
                      <span>2.4GB / 10GB</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPanel