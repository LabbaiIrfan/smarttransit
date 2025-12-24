import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const CrowdPredictionChart = () => {
  const data = [
    { time: 'Mon', low: 40, medium: 35, high: 25 },
    { time: 'Tue', low: 30, medium: 40, high: 30 },
    { time: 'Wed', low: 35, medium: 38, high: 27 },
    { time: 'Thu', low: 25, medium: 45, high: 30 },
    { time: 'Fri', low: 20, medium: 35, high: 45 },
    { time: 'Sat', low: 60, medium: 25, high: 15 },
    { time: 'Sun', low: 70, medium: 20, high: 10 },
  ]

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 border border-dark-800">
          <p className="font-bold">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}%
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis 
          dataKey="time" 
          stroke="#94a3b8"
          tick={{ fill: '#94a3b8' }}
        />
        <YAxis 
          stroke="#94a3b8"
          tick={{ fill: '#94a3b8' }}
          label={{ 
            value: 'Percentage (%)', 
            angle: -90, 
            position: 'insideLeft',
            fill: '#94a3b8'
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          type="monotone"
          dataKey="low"
          stroke="#10b981"
          strokeWidth={2}
          dot={{ stroke: '#10b981', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6 }}
          name="Low Crowding"
        />
        <Line
          type="monotone"
          dataKey="medium"
          stroke="#f59e0b"
          strokeWidth={2}
          dot={{ stroke: '#f59e0b', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6 }}
          name="Medium Crowding"
        />
        <Line
          type="monotone"
          dataKey="high"
          stroke="#ef4444"
          strokeWidth={2}
          dot={{ stroke: '#ef4444', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6 }}
          name="High Crowding"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default CrowdPredictionChart