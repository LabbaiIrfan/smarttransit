import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const CrowdTrendChart = ({ timeRange }) => {
  const data = {
    '7d': [
      { day: 'Mon', crowd: 65 },
      { day: 'Tue', crowd: 70 },
      { day: 'Wed', crowd: 68 },
      { day: 'Thu', crowd: 72 },
      { day: 'Fri', crowd: 85 },
      { day: 'Sat', crowd: 40 },
      { day: 'Sun', crowd: 35 },
    ],
    '30d': [
      { day: 'Week 1', crowd: 60 },
      { day: 'Week 2', crowd: 65 },
      { day: 'Week 3', crowd: 70 },
      { day: 'Week 4', crowd: 68 },
    ],
    '90d': [
      { day: 'Month 1', crowd: 55 },
      { day: 'Month 2', crowd: 62 },
      { day: 'Month 3', crowd: 58 },
    ],
  }

  const chartData = data[timeRange]

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const value = payload[0].value
      let level = 'low'
      let color = '#10b981'
      
      if (value > 70) {
        level = 'high'
        color = '#ef4444'
      } else if (value > 50) {
        level = 'medium'
        color = '#f59e0b'
      }

      return (
        <div className="glass-card p-3 border border-dark-800">
          <p className="font-bold">{label}</p>
          <p style={{ color }}>
            Average Crowding: {value}% ({level})
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis 
          dataKey="day" 
          stroke="#94a3b8"
          tick={{ fill: '#94a3b8' }}
        />
        <YAxis 
          stroke="#94a3b8"
          tick={{ fill: '#94a3b8' }}
          domain={[0, 100]}
          label={{ 
            value: 'Crowd Level (%)', 
            angle: -90, 
            position: 'insideLeft',
            fill: '#94a3b8'
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <defs>
          <linearGradient id="colorCrowd" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="crowd"
          stroke="#3b82f6"
          strokeWidth={2}
          fill="url(#colorCrowd)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default CrowdTrendChart