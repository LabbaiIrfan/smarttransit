import { useState, useEffect, useRef } from 'react'
import { 
  Send, 
  Smile, 
  Paperclip, 
  Mic, 
  Users, 
  Shield, 
  Pin,
  MoreVertical,
  ThumbsUp,
  MessageCircle,
  Clock,
  Check,
  CheckCheck
} from 'lucide-react'

const CrowdChat = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      user: 'Amrut P.', 
      avatar: 'JD', 
      message: 'Metro Line 1 is unusually crowded today! Anyone else noticing this?', 
      time: '10:30 AM', 
      likes: 5,
      isUser: false,
      status: 'read'
    },
    { 
      id: 2, 
      user: 'You', 
      avatar: 'ME', 
      message: 'Yes, I experienced the same. The 8 AM train was packed.', 
      time: '10:32 AM', 
      likes: 3,
      isUser: true,
      status: 'read'
    },
    { 
      id: 3, 
      user: 'Sana K.', 
      avatar: 'SM', 
      message: 'Any alternative routes you\'d recommend?', 
      time: '10:35 AM', 
      likes: 2,
      isUser: false,
      status: 'read'
    },
    { 
      id: 4, 
      user: 'Talha S.', 
      avatar: 'MR', 
      message: 'Bus Route 101 is a good alternative, less crowded right now.', 
      time: '10:38 AM', 
      likes: 7,
      isUser: false,
      status: 'read'
    },
    { 
      id: 5, 
      user: 'System', 
      avatar: 'AI', 
      message: '⚠️ Weather Alert: Heavy rain expected in 30 minutes. Consider earlier travel.', 
      time: '10:40 AM', 
      likes: 0,
      isUser: false,
      isSystem: true,
      status: 'read'
    },
  ])

  const [newMessage, setNewMessage] = useState('')
  const [onlineUsers, setOnlineUsers] = useState(24)
  const chatContainerRef = useRef(null)

  const onlineCommuters = [
    { id: 1, name: 'Irfan S.', status: 'active', route: 'Metro 1' },
    { id: 2, name: 'Sana S.', status: 'active', route: 'Bus 101' },
    { id: 3, name: 'Rahul M.', status: 'away', route: 'Train A' },
    { id: 4, name: 'Renuka C.', status: 'active', route: 'Metro 2' },
    { id: 5, name: 'Tabrez K.', status: 'active', route: 'Bus 202' },
  ]

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const newMsg = {
      id: messages.length + 1,
      user: 'You',
      avatar: 'ME',
      message: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      likes: 0,
      isUser: true,
      status: 'sent'
    }

    setMessages([...messages, newMsg])
    setNewMessage('')

    // Simulate reply after 2 seconds
    setTimeout(() => {
      const replies = [
        "Thanks for the update!",
        "I'll check that route too.",
        "Anyone else traveling now?",
        "How's the crowd at your station?"
      ]
      
      const randomReply = replies[Math.floor(Math.random() * replies.length)]
      
      const replyMsg = {
        id: messages.length + 2,
        user: ['John D.', 'Sarah M.', 'Mike R.'][Math.floor(Math.random() * 3)],
        avatar: ['JD', 'SM', 'MR'][Math.floor(Math.random() * 3)],
        message: randomReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        likes: 0,
        isUser: false,
        status: 'read'
      }

      setMessages(prev => [...prev, replyMsg])
    }, 2000)
  }

  const handleLikeMessage = (messageId) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, likes: msg.likes + 1 } : msg
    ))
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-400'
      case 'away': return 'bg-yellow-400'
      case 'busy': return 'bg-red-400'
      default: return 'bg-gray-400'
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'sent': return <Check className="w-3 h-3 text-gray-400" />
      case 'read': return <CheckCheck className="w-3 h-3 text-blue-400" />
      default: return <Clock className="w-3 h-3 text-gray-400" />
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Chat Messages */}
      <div className="lg:w-2/3">
        {/* Chat Header */}
        <div className="flex items-center justify-between mb-6 p-4 bg-gray-800/30 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-500/20 rounded-lg">
              <MessageCircle className="w-5 h-5 text-primary-400" />
            </div>
            <div>
              <h3 className="font-bold">Live Commuter Chat</h3>
              <p className="text-sm text-gray-400">Real-time updates from fellow travelers</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-green-400" />
              <span className="text-sm">{onlineUsers} online</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-sm">Verified</span>
            </div>
          </div>
        </div>

        {/* Chat Messages Container */}
        <div 
          ref={chatContainerRef}
          className="h-96 overflow-y-auto mb-4 p-4 bg-gray-800/20 rounded-lg space-y-4"
        >
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} ${msg.isSystem ? 'justify-center' : ''}`}
            >
              {msg.isSystem ? (
                <div className="w-full max-w-2xl">
                  <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Pin className="w-4 h-4 text-yellow-400" />
                      <span className="font-medium text-yellow-400">System Alert</span>
                    </div>
                    <p className="text-sm">{msg.message}</p>
                    <div className="text-xs text-gray-400 mt-2">{msg.time}</div>
                  </div>
                </div>
              ) : (
                <div className={`flex gap-3 max-w-2xl ${msg.isUser ? 'flex-row-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    msg.isUser 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-gray-700 text-gray-300'
                  }`}>
                    {msg.avatar}
                  </div>

                  {/* Message Bubble */}
                  <div className={`flex-1 ${msg.isUser ? 'text-right' : ''}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{msg.user}</span>
                      <span className="text-xs text-gray-400">{msg.time}</span>
                    </div>
                    
                    <div className={`relative inline-block rounded-2xl px-4 py-2 ${
                      msg.isUser
                        ? 'bg-primary-500 text-white rounded-br-none'
                        : 'bg-gray-800 text-gray-100 rounded-bl-none'
                    }`}>
                      <p className="text-sm">{msg.message}</p>
                      
                      {/* Message Actions */}
                      <div className={`flex items-center gap-3 mt-2 ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                        {!msg.isUser && (
                          <button 
                            onClick={() => handleLikeMessage(msg.id)}
                            className="flex items-center gap-1 text-xs hover:text-yellow-400"
                          >
                            <ThumbsUp className="w-3 h-3" />
                            {msg.likes > 0 && <span>{msg.likes}</span>}
                          </button>
                        )}
                        
                        {msg.isUser && (
                          <div className="flex items-center gap-1">
                            {getStatusIcon(msg.status)}
                            <span className="text-xs text-gray-300">
                              {msg.status === 'sent' ? 'Sent' : 'Read'}
                            </span>
                          </div>
                        )}
                        
                        <button className="text-gray-400 hover:text-white">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="space-y-3">
          <div className="flex items-center gap-2 p-3 bg-gray-800/50 rounded-lg">
            <button type="button" className="p-2 hover:bg-gray-700 rounded">
              <Smile className="w-5 h-5 text-gray-400" />
            </button>
            <button type="button" className="p-2 hover:bg-gray-700 rounded">
              <Paperclip className="w-5 h-5 text-gray-400" />
            </button>
            
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500"
            />
            
            <button type="button" className="p-2 hover:bg-gray-700 rounded">
              <Mic className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-400">
              Press Enter to send • Shift+Enter for new line
            </div>
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </div>
        </form>
      </div>

      {/* Online Commuters Sidebar */}
      <div className="lg:w-1/3">
        <div className="glass-card p-6 h-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold flex items-center gap-2">
              <Users className="w-5 h-5" />
              Online Commuters
            </h3>
            <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
              {onlineCommuters.filter(c => c.status === 'active').length} Active
            </span>
          </div>

          {/* Online Users List */}
          <div className="space-y-3 mb-6">
            {onlineCommuters.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 hover:bg-gray-800/50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-900 ${getStatusColor(user.status)}`}></div>
                  </div>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-gray-400">{user.route}</div>
                  </div>
                </div>
                <button className="text-primary-400 hover:text-primary-300 text-sm">
                  Message
                </button>
              </div>
            ))}
          </div>

          {/* Chat Guidelines */}
          <div className="p-4 bg-gray-800/30 rounded-lg">
            <h4 className="font-bold mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Community Guidelines
            </h4>
            <ul className="text-xs text-gray-300 space-y-2">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1"></div>
                <span>Be respectful to fellow commuters</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1"></div>
                <span>Share accurate and helpful information</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1"></div>
                <span>Report any suspicious activity</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1"></div>
                <span>Keep conversations relevant to transport</span>
              </li>
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="grid grid-cols-2 gap-3">
              <button className="py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors">
                Mute Chat
              </button>
              <button className="py-2 bg-primary-600 hover:bg-primary-700 rounded-lg text-sm transition-colors">
                Create Group
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CrowdChat