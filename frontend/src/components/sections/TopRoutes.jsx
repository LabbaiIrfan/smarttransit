import { TrendingUp, TrendingDown, MoreHorizontal, Users, Clock } from 'lucide-react'
import { useState } from 'react'

const TopRoutes = () => {
  const [routes, setRoutes] = useState([
    { id: 1, name: 'Metro Line 1', crowding: 85, trend: 'up', delay: '5 min', passengers: 1200 },
    { id: 2, name: 'Bus Route 101', crowding: 72, trend: 'down', delay: '2 min', passengers: 850 },
    { id: 3, name: 'Train Station A', crowding: 65, trend: 'up', delay: '8 min', passengers: 2100 },
    { id: 4, name: 'Metro Line 2', crowding: 58, trend: 'down', delay: '0 min', passengers: 950 },
    { id: 5, name: 'Bus Route 202', crowding: 45, trend: 'stable', delay: '1 min', passengers: 620 },
  ])

  const getCrowdingColor = (level) => {
    if (level >= 70) return 'text-red-400'
    if (level >= 50) return 'text-yellow-400'
    return 'text-green-400'
  }

  const getCrowdingBg = (level) => {
    if (level >= 70) return 'bg-red-500'
    if (level >= 50) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getDelayColor = (delay) => {
    if (delay.includes('5') || delay.includes('8')) return 'text-red-400'
    if (delay.includes('2')) return 'text-yellow-400'
    return 'text-green-400'
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Top Routes</h2>
        <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1 text-sm">
          <option>By Crowding</option>
          <option>By Delay</option>
          <option>By Passengers</option>
        </select>
      </div>

      <div className="space-y-4">
        {routes.map((route) => (
          <div 
            key={route.id} 
            className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className={`w-3 h-3 rounded-full ${getCrowdingBg(route.crowding)}`}></div>
              </div>
              <div>
                <div className="font-medium">{route.name}</div>
                <div className="text-xs text-gray-400 flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {route.passengers.toLocaleString()}
                  </span>
                  <span>•</span>
                  <span className={`flex items-center gap-1 ${getDelayColor(route.delay)}`}>
                    <Clock className="w-3 h-3" />
                    {route.delay} delay
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className={`font-bold ${getCrowdingColor(route.crowding)}`}>
                  {route.crowding}%
                </div>
                <div className="text-xs text-gray-400 flex items-center gap-1">
                  {route.trend === 'up' ? (
                    <TrendingUp className="w-3 h-3 text-red-400" />
                  ) : route.trend === 'down' ? (
                    <TrendingDown className="w-3 h-3 text-green-400" />
                  ) : (
                    <div className="w-3 h-3"></div>
                  )}
                  {route.trend}
                </div>
              </div>
              <button className="text-gray-400 hover:text-white">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-800">
        <button className="w-full py-2 text-center text-primary-400 hover:text-primary-300 text-sm">
          View All Routes →
        </button>
      </div>
    </div>
  )
}

export default TopRoutes