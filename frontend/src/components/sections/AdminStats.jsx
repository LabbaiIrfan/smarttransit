import { Users, BarChart3, TrendingUp, Shield, Clock, Database } from 'lucide-react'

const AdminStats = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12%',
      icon: <Users className="w-6 h-6" />,
      color: 'text-blue-400',
      trend: 'up',
    },
    {
      title: 'Daily Predictions',
      value: '1,243',
      change: '+8%',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'text-green-400',
      trend: 'up',
    },
    {
      title: 'Avg. Accuracy',
      value: '89.2%',
      change: '+2.3%',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'text-purple-400',
      trend: 'up',
    },
    {
      title: 'System Uptime',
      value: '99.8%',
      change: '0.1%',
      icon: <Shield className="w-6 h-6" />,
      color: 'text-yellow-400',
      trend: 'stable',
    },
    {
      title: 'Avg. Response',
      value: '145ms',
      change: '-15ms',
      icon: <Clock className="w-6 h-6" />,
      color: 'text-red-400',
      trend: 'down',
    },
    {
      title: 'Data Processed',
      value: '2.4TB',
      change: '+340GB',
      icon: <Database className="w-6 h-6" />,
      color: 'text-cyan-400',
      trend: 'up',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="glass-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className={`p-2 rounded-lg ${stat.color} bg-opacity-20 w-fit mb-4`}>
                {stat.icon}
              </div>
              <h3 className="text-sm font-medium text-dark-400 mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            <div className={`text-sm ${
              stat.trend === 'up' ? 'text-green-400' : 
              stat.trend === 'down' ? 'text-red-400' : 'text-yellow-400'
            }`}>
              {stat.change}
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-dark-800">
            <div className="w-full bg-dark-800 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  stat.trend === 'up' ? 'bg-green-400' : 
                  stat.trend === 'down' ? 'bg-red-400' : 'bg-yellow-400'
                }`}
                style={{ 
                  width: stat.title === 'System Uptime' ? '99.8%' :
                         stat.title === 'Avg. Accuracy' ? '89.2%' :
                         stat.title === 'Avg. Response' ? '85%' : '75%' 
                }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AdminStats