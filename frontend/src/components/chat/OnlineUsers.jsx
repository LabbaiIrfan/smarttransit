import { Users, MessageCircle, Shield } from 'lucide-react'
import { useState } from 'react'

const OnlineUsers = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Alex C.', status: 'active', route: 'Metro 1', lastSeen: '2 min ago' },
    { id: 2, name: 'Priya S.', status: 'active', route: 'Bus 101', lastSeen: '5 min ago' },
    { id: 3, name: 'Rahul M.', status: 'away', route: 'Train A', lastSeen: '12 min ago' },
    { id: 4, name: 'Lisa T.', status: 'active', route: 'Metro 2', lastSeen: '3 min ago' },
    { id: 5, name: 'David K.', status: 'active', route: 'Bus 202', lastSeen: '1 min ago' },
    { id: 6, name: 'Emma W.', status: 'active', route: 'Metro 1', lastSeen: '4 min ago' },
    { id: 7, name: 'Sam P.', status: 'away', route: 'Train A', lastSeen: '15 min ago' },
    { id: 8, name: 'Maria G.', status: 'active', route: 'Bus 101', lastSeen: '7 min ago' },
  ])

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-400'
      case 'away': return 'bg-yellow-400'
      case 'busy': return 'bg-red-400'
      default: return 'bg-gray-400'
    }
  }

  return (
    <div className="glass-card p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold flex items-center gap-2">
          <Users className="w-5 h-5" />
          Online Commuters
        </h3>
        <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
          42 online
        </span>
      </div>

      {/* Search Users */}
      <div className="mb-4">
        <input
          type="search"
          placeholder="Search commuters..."
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* Users List */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {users.map((user) => (
          <div 
            key={user.id} 
            className="flex items-center justify-between p-3 hover:bg-gray-800/50 rounded-lg transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center font-bold group-hover:bg-gray-600 transition-colors">
                  {user.name.charAt(0)}
                </div>
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-900 ${getStatusColor(user.status)}`}></div>
              </div>
              <div>
                <div className="font-medium">{user.name}</div>
                <div className="text-xs text-gray-400">
                  <span>{user.route}</span>
                  <span className="mx-1">•</span>
                  <span>{user.lastSeen}</span>
                </div>
              </div>
            </div>
            
            <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-gray-700 rounded-lg">
              <MessageCircle className="w-4 h-4 text-primary-400" />
            </button>
          </div>
        ))}
      </div>

      {/* Verified Community */}
      <div className="mt-6 pt-4 border-t border-gray-800">
        <div className="flex items-center gap-2 p-3 bg-blue-500/10 rounded-lg">
          <Shield className="w-4 h-4 text-blue-400" />
          <div>
            <div className="text-sm font-medium">Verified Community</div>
            <div className="text-xs text-gray-400">All users are verified commuters</div>
          </div>
        </div>
      </div>

      {/* Create Group */}
      <div className="mt-4">
        <button className="w-full py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors">
          Create Group Chat
        </button>
      </div>
    </div>
  )
}

export default OnlineUsers