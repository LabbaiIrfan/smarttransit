import { Menu, Bell, Search, User, MessageSquare } from 'lucide-react' // Add MessageSquare import
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useAuthActions } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const { signOut } = useAuthActions()
  const navigate = useNavigate()

  const notifications = [
    { id: 1, text: 'High crowding predicted for Metro Line 1', time: '5 min ago', read: false },
    { id: 2, text: 'New message in Community Chat', time: '10 min ago', read: true },
    { id: 3, text: 'Your feedback improved accuracy by 2%', time: '1 hour ago', read: true },
    { id: 4, text: 'System maintenance scheduled for tonight', time: '2 hours ago', read: true },
  ]

  const unreadMessages = 3 // Mock unread messages count

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800 z-50">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <button className="lg:hidden text-gray-400 hover:text-white">
            <Menu className="w-6 h-6" />
          </button>
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="search"
              placeholder="Search routes, predictions..."
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Chat Link */}
          <button
            onClick={() => navigate('/chat')}
            className="relative p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
          >
            <MessageSquare className="w-5 h-5" />
            {unreadMessages > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadMessages}
              </span>
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 glass-card border border-gray-800 rounded-lg shadow-xl">
                <div className="p-4 border-b border-gray-800">
                  <h3 className="font-bold">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-800 hover:bg-gray-800/50 cursor-pointer ${
                        !notification.read ? 'bg-primary-500/10' : ''
                      }`}
                    >
                      <p className="text-sm">{notification.text}</p>
                      <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t border-gray-800">
                  <button className="text-sm text-primary-400 hover:text-primary-300">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-gray-400">{user?.role}</p>
              </div>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 glass-card border border-gray-800 rounded-lg shadow-xl">
                <div className="p-3 border-b border-gray-800">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
                <div className="p-2">
                  <button
                    onClick={() => navigate('/settings')}
                    className="w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-800"
                  >
                    Settings
                  </button>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-800"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => navigate('/chat')}
                    className="w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-800"
                  >
                    Community Chat
                  </button>
                  {user?.role === 'admin' && (
                    <button
                      onClick={() => navigate('/admin')}
                      className="w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-800"
                    >
                      Admin Panel
                    </button>
                  )}
                </div>
                <div className="p-2 border-t border-gray-800">
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-3 py-2 text-sm text-red-400 rounded hover:bg-red-500/10"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header