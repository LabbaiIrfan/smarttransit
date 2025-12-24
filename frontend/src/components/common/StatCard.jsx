import { ArrowUp, ArrowDown, Minus } from 'lucide-react'

const StatCard = ({ icon, title, value, change, color, trend = 'neutral' }) => {
  const isPositive = change?.startsWith('+')
  const isNegative = change?.startsWith('-')
  
  const getTrendIcon = () => {
    switch(trend) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-400" />
      case 'down': return <ArrowDown className="w-4 h-4 text-red-400" />
      default: return <Minus className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <div className="glass-card p-6 card-hover">
      <div className="flex items-start justify-between">
        <div>
          <div className={`p-3 rounded-xl ${color} bg-opacity-20 w-fit mb-4`}>
            {icon}
          </div>
          <h3 className="text-sm font-medium text-gray-400 mb-1">{title}</h3>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
        <div className="flex items-center gap-1">
          {getTrendIcon()}
          <span className={`text-sm ${
            isPositive ? 'text-green-400' : 
            isNegative ? 'text-red-400' : 'text-gray-300'
          }`}>
            {change}
          </span>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mt-4 pt-4 border-t border-gray-800">
        <div className="w-full bg-gray-800 rounded-full h-1.5">
          <div 
            className={`h-1.5 rounded-full ${color}`}
            style={{ 
              width: typeof value === 'string' && value.includes('%') 
                ? value 
                : '75%' 
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default StatCard