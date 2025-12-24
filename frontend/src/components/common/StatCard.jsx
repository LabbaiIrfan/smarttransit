const StatCard = ({ icon, title, value, change, color }) => {
  return (
    <div className="glass-card p-6 card-hover">
      <div className="flex items-start justify-between">
        <div>
          <div className={`p-2 rounded-lg ${color} bg-opacity-20 w-fit mb-4`}>
            {icon}
          </div>
          <h3 className="text-sm font-medium text-dark-400 mb-1">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className={`text-sm ${change.startsWith('+') ? 'text-green-400' : change.startsWith('-') ? 'text-red-400' : 'text-dark-300'}`}>
          {change}
        </div>
      </div>
    </div>
  )
}

export default StatCard