import { ThumbsUp, MoreVertical, Check, CheckCheck, Pin } from 'lucide-react'

const ChatMessage = ({ message, onLike }) => {
  const getStatusIcon = (status) => {
    switch(status) {
      case 'sent': return <Check className="w-3 h-3 text-gray-400" />
      case 'read': return <CheckCheck className="w-3 h-3 text-blue-400" />
      default: return null
    }
  }

  if (message.isSystem) {
    return (
      <div className="flex justify-center my-4">
        <div className="max-w-2xl w-full">
          <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Pin className="w-4 h-4 text-yellow-400" />
              <span className="font-medium text-yellow-400">System Alert</span>
            </div>
            <p className="text-sm">{message.message}</p>
            <div className="text-xs text-gray-400 mt-2">{message.time}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex gap-3 max-w-2xl ${message.isUser ? 'flex-row-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold ${
          message.isUser 
            ? 'bg-primary-500 text-white' 
            : 'bg-gray-700 text-gray-300'
        }`}>
          {message.avatar}
        </div>

        {/* Message Bubble */}
        <div className={`flex-1 ${message.isUser ? 'text-right' : ''}`}>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium">{message.user}</span>
            <span className="text-xs text-gray-400">{message.time}</span>
          </div>
          
          <div className={`relative inline-block rounded-2xl px-4 py-3 ${
            message.isUser
              ? 'bg-primary-500 text-white rounded-br-none'
              : 'bg-gray-800 text-gray-100 rounded-bl-none'
          }`}>
            <p className="text-sm">{message.message}</p>
            
            {/* Message Actions */}
            <div className={`flex items-center gap-3 mt-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}>
              {!message.isUser && (
                <button 
                  onClick={onLike}
                  className="flex items-center gap-1 text-xs hover:text-yellow-400 transition-colors"
                >
                  <ThumbsUp className="w-3 h-3" />
                  {message.likes > 0 && <span>{message.likes}</span>}
                </button>
              )}
              
              {message.isUser && (
                <div className="flex items-center gap-1 text-xs text-gray-300">
                  {getStatusIcon(message.status)}
                  <span>{message.status === 'sent' ? 'Sent' : 'Read'}</span>
                </div>
              )}
              
              <button className="text-gray-400 hover:text-white transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatMessage