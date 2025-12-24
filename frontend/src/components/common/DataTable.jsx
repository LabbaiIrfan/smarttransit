import { ChevronRight, TrendingUp, TrendingDown } from 'lucide-react'
import CrowdIndicator from '../indicators/CrowdIndicator'

const DataTable = () => {
  const data = [
    { date: '2024-01-15', route: 'Metro Line 1', predicted: 'medium', actual: 'medium', accuracy: '95%', trend: 'up' },
    { date: '2024-01-14', route: 'Bus Route 101', predicted: 'high', actual: 'medium', accuracy: '78%', trend: 'down' },
    { date: '2024-01-13', route: 'Train Station A', predicted: 'low', actual: 'low', accuracy: '98%', trend: 'up' },
    { date: '2024-01-12', route: 'Bus Route 202', predicted: 'medium', actual: 'high', accuracy: '65%', trend: 'down' },
    { date: '2024-01-11', route: 'Metro Line 1', predicted: 'high', actual: 'high', accuracy: '92%', trend: 'up' },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-dark-800">
            <th className="text-left py-3 px-4 text-sm font-medium text-dark-400">Date</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-dark-400">Route</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-dark-400">Predicted</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-dark-400">Actual</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-dark-400">Accuracy</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-dark-400">Trend</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-dark-400"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-b border-dark-800/50 hover:bg-dark-800/30">
              <td className="py-3 px-4">
                <div className="text-sm">{row.date}</div>
              </td>
              <td className="py-3 px-4">
                <div className="font-medium">{row.route}</div>
              </td>
              <td className="py-3 px-4">
                <CrowdIndicator level={row.predicted} size="sm" />
              </td>
              <td className="py-3 px-4">
                <CrowdIndicator level={row.actual} size="sm" />
              </td>
              <td className="py-3 px-4">
                <div className={`text-sm font-medium ${parseInt(row.accuracy) > 90 ? 'text-green-400' : parseInt(row.accuracy) > 75 ? 'text-yellow-400' : 'text-red-400'}`}>
                  {row.accuracy}
                </div>
              </td>
              <td className="py-3 px-4">
                {row.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-green-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-400" />
                )}
              </td>
              <td className="py-3 px-4">
                <button className="text-dark-400 hover:text-white">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable