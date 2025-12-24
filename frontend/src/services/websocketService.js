class WebSocketService {
  constructor() {
    this.ws = null
    this.subscribers = new Map()
    this.reconnectAttempts = 0
    this.maxReconnectAttempts = 5
  }

  connect() {
    const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:5000'
    
    this.ws = new WebSocket(wsUrl)

    this.ws.onopen = () => {
      console.log('WebSocket connected')
      this.reconnectAttempts = 0
      
      // Subscribe to default channels
      this.send({
        type: 'subscribe',
        channels: ['crowd-updates', 'system-alerts']
      })
    }

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        this.notifySubscribers(data)
      } catch (error) {
        console.error('WebSocket message error:', error)
      }
    }

    this.ws.onclose = () => {
      console.log('WebSocket disconnected')
      this.handleReconnect()
    }

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error)
    }
  }

  handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000)
      
      console.log(`Reconnecting in ${delay}ms...`)
      
      setTimeout(() => {
        this.connect()
      }, delay)
    }
  }

  subscribe(channel, callback) {
    if (!this.subscribers.has(channel)) {
      this.subscribers.set(channel, new Set())
    }
    this.subscribers.get(channel).add(callback)

    // Send subscription message
    this.send({
      type: 'subscribe',
      channel: channel
    })

    return () => this.unsubscribe(channel, callback)
  }

  unsubscribe(channel, callback) {
    if (this.subscribers.has(channel)) {
      this.subscribers.get(channel).delete(callback)
    }
  }

  notifySubscribers(data) {
    const { channel, ...message } = data
    
    if (channel && this.subscribers.has(channel)) {
      this.subscribers.get(channel).forEach(callback => {
        callback(message)
      })
    }
  }

  send(message) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message))
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
    this.subscribers.clear()
  }
}

// Singleton instance
export const websocketService = new WebSocketService()

// React hook for WebSocket
export const useWebSocket = (channel, callback) => {
  useEffect(() => {
    const unsubscribe = websocketService.subscribe(channel, callback)
    
    return () => {
      unsubscribe()
    }
  }, [channel, callback])
}