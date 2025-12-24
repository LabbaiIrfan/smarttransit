import { Clock, TrendingUp, TrendingDown, BarChart3, Filter } from 'lucide-react'

const PeakHours = () => {
  const peakData = [
    { hour: '6 AM', crowding: 30, trend: 'down' },
    { hour: '7 AM', crowding: 55, trend: 'up' },
    { hour: '8 AM', crowding: 85, trend: 'up' },
    { hour: '9 AM', crowding: 75, trend: 'down' },
    { hour: '10 AM', crowding: 40, trend: 'down' },
    { hour: '11 AM', crowding: 35, trend: 'down' },
    { hour: '12 PM', crowding: 45, trend: 'up' },
    { hour: '1 PM', crowding: 40, trend: 'down' },
    { hour: '2 PM', crowding: 35, trend: 'down' },
    { hour: '3 PM', crowding: 45, trend: 'up' },
    { hour: '4 PM', crowding: 65, trend: 'up' },
    { hour: '5 PM', crowding: 90, trend: 'up' },
    { hour: '6 PM', crowding: 70, trend: 'down' },
    { hour: '7 PM', crowding: 50, trend: 'down' },
    { hour: '8 PM', crowding: 35, trend: 'down' },
  ]

  const peakPeriods = [
    { period: 'Morning Peak', time: '8-9 AM', crowding: 85, routes: ['Metro 1', 'Bus 101'] },
    { period: 'Evening Peak', time: '5-6 PM', crowding: 90, routes: ['Train A', 'Metro 2'] },
    { period: 'Lunch Hour', time: '12-1 PM', crowding: 45, routes: ['Bus 202'] },
  ]

  const getCrowdingColor = (level) => {
    if (level >= 70) return 'text-red-400'
    if (level >= 50) return 'text-yellow-400'
    return 'text-green-400'
  }

  const getCrowdingBg = (level) => {
    if (level >= 70) return 'bg-red-400'
    if (level >= 50) return 'bg-yellow-400'
    return 'bg-green-400'
  }

  return (
    <div className="space-y-6">
      {/* Peak Periods Summary */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Peak Hours Analysis
          </h3>
          <Filter className="w-4 h-4 text-gray-400" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {peakPeriods.map((period, index) => (
            <div key={index} className="p-4 bg-gray-800/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{period.period}</span>
                <span className={`text-sm font-bold ${getCrowdingColor(period.crowding)}`}>
                  {period.crowding}%
                </span>
              </div>
              <div className="text-sm text-gray-400 mb-3">{period.time}</div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getCrowdingBg(period.crowding)}`}
                  style={{ width: `${period.crowding}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-400 mt-2">
                Affected: {period.routes.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hourly Breakdown */}
      <div>
        <h4 className="font-bold mb-3">Hourly Crowding Distribution</h4>
        <div className="space-y-2">
          {peakData.map((hour, index) => (
            <div key={index} className="flex items-center">
              <div className="w-16 text-sm text-gray-400">{hour.hour}</div>
              <div className="flex-1 mx-4">
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getCrowdingBg(hour.crowding)}`}
                    style={{ width: `${hour.crowding}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-16 text-right">
                <div className={`text-sm font-medium ${getCrowdingColor(hour.crowding)}`}>
                  {hour.crowding}%
                </div>
              </div>
              <div className="w-8 text-center">
                {hour.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-red-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-green-400" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <h4 className="font-bold mb-2 flex items-center gap-2">
          <BarChart3 className="w-4 h-4" />
          Recommendations
        </h4>
        <ul className="text-sm text-gray-300 space-y-1">
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5"></div>
            <span>Avoid travel between 8-9 AM and 5-6 PM</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5"></div>
            <span>Consider Metro Line 2 during peak hours</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5"></div>
            <span>Use real-time alerts for last-minute changes</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default PeakHours