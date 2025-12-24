import { Activity, Bell, Zap, AlertTriangle, CheckCircle } from 'lucide-react'
import { useState } from 'react'

const LiveUpdates = () => {
  const [updates, setUpdates] = useState([
    { 
      id: 1, 
      type: 'crowd', 
      message: 'Metro Line 1: Crowd level decreasing from 85% to 72%', 
      time: '2 min ago', 
      icon: <Activity className="w-4 h-4" />,
      color: 'text-green-400'
    },
    { 
      id: 2, 
      type: 'delay', 
      message: 'Bus Route 101: Delays expected due to road construction', 
      time: '5 min ago', 
      icon: <AlertTriangle className="w-4 h-4" />,
      color: 'text-yellow-400'
    },
    { 
      id: 3, 
      type: 'system', 
      message: 'New prediction model deployed - accuracy improved by 2.3%', 
      time: '10 min ago', 
      icon: <Zap className="w-4 h-4" />,
      color: 'text-blue-400'
    },
    { 
      id: 4, 
      type: 'weather', 
      message: 'Weather alert: Heavy rain expected in next 30 minutes', 
      time: '15 min ago', 
      icon: <Bell className="w-4 h-4" />,
      color: 'text-red-400'
    },
    { 
      id: 5, 
      type: 'maintenance', 
      message: 'Metro Line 2: Maintenance completed ahead of schedule', 
      time: '25 min ago', 
      icon: <CheckCircle className="w-4 h-4" />,
      color: 'text-purple-400'
    },
  ])

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary-400" />
          Live Updates
        </h2>
        <Bell className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {updates.map((update) => (
          <div 
            key={update.id} 
            className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
          >
            <div className={`p-2 rounded-lg ${update.color} bg-opacity-20`}>
              {update.icon}
            </div>
            <div className="flex-1">
              <p className="text-sm mb-1">{update.message}</p>
              <div className="text-xs text-gray-400">{update.time}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-800">
        <button className="w-full py-2 text-center text-primary-400 hover:text-primary-300 text-sm">
          Load More Updates
        </button>
      </div>
    </div>
  )
}

export default LiveUpdates