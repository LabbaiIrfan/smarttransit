import { Mail, Shield, User, Calendar, MoreVertical } from 'lucide-react'
import { useState } from 'react'

const UserManagementTable = () => {
  const [selectedUsers, setSelectedUsers] = useState([])

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', joined: '2024-01-15', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', joined: '2024-01-10', status: 'active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'analyst', joined: '2024-01-05', status: 'inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'user', joined: '2024-01-01', status: 'active' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'user', joined: '2023-12-28', status: 'active' },
  ]

  const toggleUserSelection = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const toggleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(users.map(user => user.id))
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-dark-800">
            <th className="py-3 px-4 text-left">
              <input
                type="checkbox"
                checked={selectedUsers.length === users.length && users.length > 0}
                onChange={toggleSelectAll}
                className="rounded bg-dark-800 border-dark-600"
              />
            </th>
            <th className="py-3 px-4 text-sm font-medium text-dark-400 text-left">User</th>
            <th className="py-3 px-4 text-sm font-medium text-dark-400 text-left">Role</th>
            <th className="py-3 px-4 text-sm font-medium text-dark-400 text-left">Status</th>
            <th className="py-3 px-4 text-sm font-medium text-dark-400 text-left">Joined</th>
            <th className="py-3 px-4 text-sm font-medium text-dark-400 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-dark-800/50 hover:bg-dark-800/30">
              <td className="py-3 px-4">
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => toggleUserSelection(user.id)}
                  className="rounded bg-dark-800 border-dark-600"
                />
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-dark-400 flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {user.email}
                    </div>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-dark-400" />
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.role === 'admin' 
                      ? 'bg-purple-500/20 text-purple-400' 
                      : user.role === 'analyst'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-green-500/20 text-green-400'
                  }`}>
                    {user.role}
                  </span>
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    user.status === 'active' ? 'bg-green-400' : 'bg-red-400'
                  }`}></div>
                  <span className="capitalize">{user.status}</span>
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2 text-sm text-dark-400">
                  <Calendar className="w-4 h-4" />
                  {user.joined}
                </div>
              </td>
              <td className="py-3 px-4">
                <button className="p-1 hover:bg-dark-800 rounded">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserManagementTable