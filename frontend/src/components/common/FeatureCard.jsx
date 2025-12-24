
const FeatureCard = ({ icon, title, description, color }) => {
  return (
    <div className="glass-card p-6 card-hover">
      <div className={`p-3 rounded-lg ${color} bg-opacity-20 w-fit mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-dark-400">{description}</p>
    </div>
  )
}

export default FeatureCard