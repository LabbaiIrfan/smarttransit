import { Star } from 'lucide-react'

const TestimonialCard = ({ name, role, content, rating, avatar }) => {
  return (
    <div className="glass-card p-8 rounded-2xl card-hover h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-bold">
          {avatar}
        </div>
        <div>
          <h4 className="font-bold">{name}</h4>
          <p className="text-sm text-gray-400">{role}</p>
        </div>
      </div>
      
      <p className="text-gray-300 mb-6 italic">"{content}"</p>
      
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
          />
        ))}
      </div>
    </div>
  )
}

export default TestimonialCard