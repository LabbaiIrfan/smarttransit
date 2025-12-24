import { Server, Database, Cpu, Network, HardDrive, Activity } from 'lucide-react'

const SystemMetrics = () => {
  const metrics = [
    {
      name: 'CPU Usage',
      value: '45%',
      icon: <Cpu className="w-5 h-5" />,
      color: 'text-blue-400',
      status: 'normal',
    },
    {
      name: 'Memory',
      value: '68%',
      icon: <Server className="w-5 h-5" />,
      color: 'text-green-400',
      status: 'normal',
    },
    {
      name: 'Database',
      value: '32%',
      icon: <Database className="w-5 h-5" />,
      color: 'text-purple-400',
      status: 'normal',
    },
    {
      name: 'Network',
      value: '24%',
      icon: <Network className="w-5 h-5" />,
      color: 'text-yellow-400',
      status: 'normal',
    },
    {
      name: 'Storage',
      value: '78%',
      icon: <HardDrive className="w-5 h-5" />,
      color: 'text-red-400',
      status: 'warning',
    },
    {
      name: 'API Health',
      value: '100%',
      icon: <Activity className="w-5 h-5" />,
      color: 'text-cyan-400',
      status: 'excellent',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="p-4 bg-dark-800/50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded ${metric.color} bg-opacity-20`}>
                  {metric.icon}
                </div>
                <span className="text-sm font-medium">{metric.name}</span>
              </div>
              <div className={`text-sm font-bold ${
                metric.status === 'warning' ? 'text-yellow-400' :
                metric.status === 'excellent' ? 'text-green-400' :
                'text-white'
              }`}>
                {metric.value}
              </div>
            </div>
            <div className="w-full bg-dark-800 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  metric.status === 'warning' ? 'bg-yellow-400' :
                  metric.status === 'excellent' ? 'bg-green-400' :
                  'bg-blue-400'
                }`}
                style={{ 
                  width: metric.value 
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-dark-800">
        <h4 className="font-bold mb-3">Recent Incidents</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between p-2 hover:bg-dark-800/50 rounded">
            <span>Database connection timeout</span>
            <span className="text-dark-400">2 days ago</span>
          </div>
          <div className="flex items-center justify-between p-2 hover:bg-dark-800/50 rounded">
            <span>API rate limit exceeded</span>
            <span className="text-dark-400">1 week ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SystemMetrics