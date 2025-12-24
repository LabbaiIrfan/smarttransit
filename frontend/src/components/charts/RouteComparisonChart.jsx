    import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts'

const RouteComparisonChart = ({ routes }) => {
  const data = [
    { time: '6 AM', 'Metro Line 1': 30, 'Bus Route 101': 25, 'Train Station A': 35, 'Bus Route 202': 20 },
    { time: '8 AM', 'Metro Line 1': 85, 'Bus Route 101': 70, 'Train Station A': 80, 'Bus Route 202': 65 },
    { time: '10 AM', 'Metro Line 1': 40, 'Bus Route 101': 35, 'Train Station A': 45, 'Bus Route 202': 30 },
    { time: '12 PM', 'Metro Line 1': 45, 'Bus Route 101': 40, 'Train Station A': 50, 'Bus Route 202': 35 },
    { time: '5 PM', 'Metro Line 1': 90, 'Bus Route 101': 75, 'Train Station A': 85, 'Bus Route 202': 70 },
    { time: '7 PM', 'Metro Line 1': 50, 'Bus Route 101': 45, 'Train Station A': 55, 'Bus Route 202': 40 },
  ]

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 border border-dark-800">
          <p className="font-bold mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value}%
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const colors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B']

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
        <XAxis 
          dataKey="time" 
          stroke="#94a3b8"
          tick={{ fill: '#94a3b8', fontSize: 12 }}
        />
        <YAxis 
          stroke="#94a3b8"
          tick={{ fill: '#94a3b8' }}
          domain={[0, 100]}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="Metro Line 1" fill={colors[0]} radius={[4, 4, 0, 0]} />
        <Bar dataKey="Bus Route 101" fill={colors[1]} radius={[4, 4, 0, 0]} />
        <Bar dataKey="Train Station A" fill={colors[2]} radius={[4, 4, 0, 0]} />
        <Bar dataKey="Bus Route 202" fill={colors[3]} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default RouteComparisonChart