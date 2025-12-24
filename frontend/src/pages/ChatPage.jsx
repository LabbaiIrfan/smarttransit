import { useState } from 'react'
import { useSelector } from 'react-redux'
import { 
  MessageSquare, 
  Users, 
  Shield, 
  Pin, 
  Send, 
  Smile, 
  Paperclip, 
  Mic, 
  MoreVertical, 
  ThumbsUp,
  Check,
  CheckCheck,
  Search,
  Filter,
  ChevronLeft
} from 'lucide-react'
import { Link } from 'react-router-dom'
import ChatMessage from '../components/chat/ChatMessage'
import OnlineUsers from '../components/chat/OnlineUsers'
import ChatHeader from '../components/chat/ChatHeader'
import ChatInput from '../components/chat/ChatInput'

const ChatPage = () => {
  const { user } = useSelector((state) => state.auth)
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      user: 'John D.', 
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
      user: 'Sarah M.', 
      avatar: 'SM', 
      message: 'Any alternative routes you\'d recommend?', 
      time: '10:35 AM', 
      likes: 2,
      isUser: false,
      status: 'read'
    },
    { 
      id: 4, 
      user: 'Mike R.', 
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
    { 
      id: 6, 
      user: 'Alex C.', 
      avatar: 'AC', 
      message: 'Thanks for the tip Mike! Just saved me 20 minutes.', 
      time: '10:42 AM', 
      likes: 4,
      isUser: false,
      status: 'read'
    },
    { 
      id: 7, 
      user: 'You', 
      avatar: 'ME', 
      message: 'Is the metro frequency increased during peak hours?', 
      time: '10:45 AM', 
      likes: 1,
      isUser: true,
      status: 'read'
    },
  ])

  const [newMessage, setNewMessage] = useState('')
  const [onlineUsers] = useState(42)

  const handleSendMessage = (message) => {
    if (!message.trim()) return

    const newMsg = {
      id: messages.length + 1,
      user: 'You',
      avatar: 'ME',
      message: message,
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
        "The metro frequency is every 5 minutes during peak hours.",
        "There's also a dedicated women's coach if that helps.",
        "Check the m-Indicator app for exact timings.",
        "The crowd usually thins out after 10 AM."
      ]
      
      const randomReply = replies[Math.floor(Math.random() * replies.length)]
      const randomUsers = ['John D.', 'Sarah M.', 'Mike R.', 'Alex C.']
      const randomAvatars = ['JD', 'SM', 'MR', 'AC']
      const randomIndex = Math.floor(Math.random() * randomUsers.length)
      
      const replyMsg = {
        id: messages.length + 2,
        user: randomUsers[randomIndex],
        avatar: randomAvatars[randomIndex],
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

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Link to="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white">
            <ChevronLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Community Chat</h1>
            <p className="text-gray-400">Connect with commuters and share live transport updates</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-green-400">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span>{onlineUsers} commuters online</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" />
              <span className="text-sm">Verified Community</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Messages - 3/4 width */}
        <div className="lg:col-span-3">
          <div className="glass-card h-[calc(100vh-200px)] flex flex-col">
            {/* Chat Header */}
            <ChatHeader />

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  message={msg}
                  onLike={() => handleLikeMessage(msg.id)}
                />
              ))}
            </div>

            {/* Input Area */}
            <ChatInput onSend={handleSendMessage} />
          </div>
        </div>

        {/* Online Users Sidebar - 1/4 width */}
        <div className="lg:col-span-1">
          <OnlineUsers />
        </div>
      </div>

      {/* Chat Guidelines */}
      <div className="mt-6">
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-bold">Community Guidelines</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 bg-gray-800/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="font-medium">Be Respectful</span>
              </div>
              <p className="text-sm text-gray-300">
                Treat all commuters with respect and kindness
              </p>
            </div>
            
            <div className="p-4 bg-gray-800/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span className="font-medium">Share Accurate Info</span>
              </div>
              <p className="text-sm text-gray-300">
                Provide verified and helpful transport updates
              </p>
            </div>
            
            <div className="p-4 bg-gray-800/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <span className="font-medium">Stay On Topic</span>
              </div>
              <p className="text-sm text-gray-300">
                Keep discussions relevant to transport and commuting
              </p>
            </div>
            
            <div className="p-4 bg-gray-800/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                <span className="font-medium">Report Issues</span>
              </div>
              <p className="text-sm text-gray-300">
                Report inappropriate behavior or misinformation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage