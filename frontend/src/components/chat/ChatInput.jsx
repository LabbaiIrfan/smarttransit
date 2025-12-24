import { useState } from 'react'
import { Send, Smile, Paperclip, Mic } from 'lucide-react'

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      onSend(message)
      setMessage('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
      <div className="flex items-center gap-2 mb-3">
        <button type="button" className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
          <Smile className="w-5 h-5 text-gray-400" />
        </button>
        <button type="button" className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
          <Paperclip className="w-5 h-5 text-gray-400" />
        </button>
        
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        
        <button type="button" className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
          <Mic className="w-5 h-5 text-gray-400" />
        </button>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-400">
          Press Enter to send • Shift+Enter for new line
        </div>
        <button
          type="submit"
          disabled={!message.trim()}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
        >
          <Send className="w-4 h-4" />
          Send Message
        </button>
      </div>
    </form>
  )
}

export default ChatInput