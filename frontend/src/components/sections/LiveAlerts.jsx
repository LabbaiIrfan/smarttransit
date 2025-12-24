import { AlertTriangle, Info, CheckCircle, XCircle, Bell } from 'lucide-react'
import { useState } from 'react'

const LiveAlerts = () => {
  const [alerts, setAlerts] = useState([
    { 
      id: 1, 
      type: 'warning', 
      title: 'High Crowding Alert', 
      message: 'Metro Line 1 experiencing 85% capacity', 
      time: '5 min ago',
      route: 'Metro Line 1',
      priority: 'high'
    },
    { 
      id: 2, 
      type: 'info', 
      title: 'Route Update', 
      message: 'Bus Route 101 diverted due to construction', 
      time: '15 min ago',
      route: 'Bus 101',
      priority: 'medium'
    },
    { 
      id: 3, 
      type: 'success', 
      title: 'System Update', 
      message: 'New prediction model deployed successfully', 
      time: '1 hour ago',
      route: 'System',
      priority: 'low'
    },
    { 
      id: 4, 
      type: 'error', 
      title: 'Weather Alert', 
      message: 'Heavy rain expected - transport delays likely', 
      time: '2 hours ago',
      route: 'Weather',
      priority: 'high'
    },
  ])

  const getAlertIcon = (type) => {
    switch(type) {
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-400" />
      case 'info': return <Info className="w-5 h-5 text-blue-400" />
      case 'success': return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'error': return <XCircle className="w-5 h-5 text-red-400" />
      default: return <Bell className="w-5 h-5 text-gray-400" />
    }
  }

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'border-red-500/30 bg-red-500/10'
      case 'medium': return 'border-yellow-500/30 bg-yellow-500/10'
      case 'low': return 'border-blue-500/30 bg-blue-500/10'
      default: return 'border-gray-500/30 bg-gray-500/10'
    }
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-400" />
          Live Alerts
        </h2>
        <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">
          {alerts.filter(a => a.priority === 'high').length} Critical
        </span>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div 
            key={alert.id} 
            className={`p-4 rounded-lg border ${getPriorityColor(alert.priority)}`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold">{alert.title}</h3>
                  <span className="text-xs text-gray-400">{alert.time}</span>
                </div>
                <p className="text-sm text-gray-300 mb-2">{alert.message}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2 py-1 bg-gray-800 rounded">
                    {alert.route}
                  </span>
                  <button className="text-xs text-primary-400 hover:text-primary-300">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-800">
        <button className="w-full py-2 text-center text-primary-400 hover:text-primary-300 text-sm">
          View All Alerts
        </button>
      </div>
    </div>
  )
}

export default LiveAlerts