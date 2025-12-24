import { NavLink } from 'react-router-dom'
import { 
  Home, 
  TrendingUp, 
  BarChart3, 
  MessageSquare,
  Settings,
  Shield,
  Bus,
  LogOut
} from 'lucide-react'
import { useSelector } from 'react-redux'
import { useAuthActions } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth)
  const { signOut } = useAuthActions()
  const navigate = useNavigate()

  const navItems = [
    { path: '/dashboard', icon: <Home className="w-5 h-5" />, label: 'Dashboard' },
    { path: '/predict', icon: <TrendingUp className="w-5 h-5" />, label: 'Predict' },
    { path: '/trends', icon: <BarChart3 className="w-5 h-5" />, label: 'Trends' },
    { path: '/feedback', icon: <MessageSquare className="w-5 h-5" />, label: 'Feedback' },
    { path: '/settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
  ]

  if (user?.role === 'admin') {
    navItems.splice(4, 0, { 
      path: '/admin', 
      icon: <Shield className="w-5 h-5" />, 
      label: 'Admin' 
    })
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-dark-900/80 backdrop-blur-lg border-r border-dark-800 hidden lg:block">
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <Bus className="w-8 h-8 text-primary-500" />
          <span className="text-xl font-bold">SmartTransit</span>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-500/20 text-primary-400 border-l-4 border-primary-500'
                    : 'text-dark-400 hover:text-white hover:bg-dark-800/50'
                }`
              }
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User Info */}
        <div className="mt-8 pt-8 border-t border-dark-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center">
              <span className="font-bold">{user?.name?.charAt(0) || 'U'}</span>
            </div>
            <div>
              <p className="font-medium">{user?.name}</p>
              <p className="text-xs text-dark-400">{user?.role}</p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-dark-400 hover:text-white hover:bg-dark-800/50"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar