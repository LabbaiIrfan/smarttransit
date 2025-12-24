import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const PeakHoursChart = () => {
  const data = [
    { hour: '6 AM', crowd: 30 },
    { hour: '7 AM', crowd: 55 },
    { hour: '8 AM', crowd: 85 },
    { hour: '9 AM', crowd: 75 },
    { hour: '10 AM', crowd: 40 },
    { hour: '11 AM', crowd: 35 },
    { hour: '12 PM', crowd: 45 },
    { hour: '1 PM', crowd: 40 },
    { hour: '2 PM', crowd: 35 },
    { hour: '3 PM', crowd: 45 },
    { hour: '4 PM', crowd: 65 },
    { hour: '5 PM', crowd: 90 },
    { hour: '6 PM', crowd: 70 },
    { hour: '7 PM', crowd: 50 },
    { hour: '8 PM', crowd: 35 },
  ]

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const value = payload[0].value
      let level = 'Low'
      let color = '#10b981'
      
      if (value > 70) {
        level = 'High'
        color = '#ef4444'
      } else if (value > 50) {
        level = 'Medium'
        color = '#f59e0b'
      }

      return (
        <div className="glass-card p-3 border border-dark-800">
          <p className="font-bold">{label}</p>
          <p style={{ color }}>
            Crowd Level: {value}% ({level})
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
        <XAxis 
          dataKey="hour" 
          stroke="#94a3b8"
          tick={{ fill: '#94a3b8', fontSize: 12 }}
        />
        <YAxis 
          stroke="#94a3b8"
          tick={{ fill: '#94a3b8' }}
          domain={[0, 100]}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="crowd" radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => {
            let color = '#10b981'
            if (entry.crowd > 70) {
              color = '#ef4444'
            } else if (entry.crowd > 50) {
              color = '#f59e0b'
            }
            return <Cell key={index} fill={color} />
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default PeakHoursChart