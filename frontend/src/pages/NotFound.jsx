import { Link } from 'react-router-dom'
import { Bus, Home, ArrowLeft } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 p-4">
      <div className="text-center">
        <div className="mb-8">
          <div className="relative">
            <div className="text-9xl font-bold text-primary-500/20">404</div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Bus className="w-24 h-24 text-primary-500" />
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Route Not Found</h1>
        <p className="text-dark-400 text-lg mb-8 max-w-md mx-auto">
          Looks like you've taken a wrong turn. The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-secondary inline-flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-dark-800">
          <p className="text-dark-500 text-sm">
            Need help?{' '}
            <Link to="/contact" className="text-primary-400 hover:text-primary-300">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotFound