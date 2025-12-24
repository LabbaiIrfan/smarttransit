import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts'

const PredictionAccuracyChart = () => {
  const data = [
    { subject: 'Weekdays', A: 92, fullMark: 100 },
    { subject: 'Weekends', A: 85, fullMark: 100 },
    { subject: 'Peak Hours', A: 78, fullMark: 100 },
    { subject: 'Off-Peak', A: 94, fullMark: 100 },
    { subject: 'Holidays', A: 82, fullMark: 100 },
    { subject: 'Events', A: 70, fullMark: 100 },
  ]

  return (
    <ResponsiveContainer width="100%" height={250}>
      <RadarChart data={data}>
        <PolarGrid stroke="#334155" />
        <PolarAngleAxis 
          dataKey="subject" 
          stroke="#94a3b8"
          tick={{ fill: '#94a3b8' }}
        />
        <PolarRadiusAxis 
          angle={30} 
          domain={[0, 100]}
          stroke="#94a3b8"
        />
        <Radar
          name="Accuracy"
          dataKey="A"
          stroke="#3b82f6"
          fill="#3b82f6"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}

export default PredictionAccuracyChart