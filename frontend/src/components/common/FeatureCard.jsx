const FeatureCard = ({ icon, title, description, color, gradient, delay }) => {
  return (
    <div 
      className="glass-card p-8 rounded-2xl h-full card-hover"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className={`p-4 rounded-xl bg-gradient-to-br ${gradient} w-fit mb-6`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
      <div className="mt-6 pt-6 border-t border-gray-800">
        <button className="flex items-center gap-2 text-primary-400 hover:text-primary-300 text-sm">
          Learn More
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default FeatureCard