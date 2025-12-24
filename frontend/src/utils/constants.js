export const CROWD_LEVELS = {
  LOW: {
    value: 'low',
    label: 'Low Crowding',
    color: '#10b981',
    threshold: 0.3,
    description: 'Comfortable travel with plenty of space'
  },
  MEDIUM: {
    value: 'medium',
    label: 'Medium Crowding',
    color: '#f59e0b',
    threshold: 0.7,
    description: 'Moderate crowding, some standing room'
  },
  HIGH: {
    value: 'high',
    label: 'High Crowding',
    color: '#ef4444',
    threshold: 1.0,
    description: 'Very crowded, limited standing room'
  }
}

export const TRANSPORT_TYPES = {
  METRO: {
    value: 'metro',
    label: 'Metro',
    icon: 'train',
    color: '#3b82f6'
  },
  BUS: {
    value: 'bus',
    label: 'Bus',
    icon: 'bus',
    color: '#10b981'
  },
  TRAIN: {
    value: 'train',
    label: 'Train',
    icon: 'train',
    color: '#8b5cf6'
  },
  TRAM: {
    value: 'tram',
    label: 'Tram',
    icon: 'tram',
    color: '#f59e0b'
  }
}

export const WEATHER_CONDITIONS = {
  CLEAR: {
    value: 'clear',
    label: 'Clear',
    icon: 'sun',
    impact: -0.1
  },
  CLOUDY: {
    value: 'cloudy',
    label: 'Cloudy',
    icon: 'cloud',
    impact: 0
  },
  RAINY: {
    value: 'rainy',
    label: 'Rainy',
    icon: 'cloud-rain',
    impact: 0.2
  },
  SNOWY: {
    value: 'snowy',
    label: 'Snowy',
    icon: 'cloud-snow',
    impact: 0.3
  }
}

export const TIME_RANGES = {
  '7d': {
    label: 'Last 7 days',
    days: 7
  },
  '30d': {
    label: 'Last 30 days',
    days: 30
  },
  '90d': {
    label: 'Last 90 days',
    days: 90
  },
  '1y': {
    label: 'Last year',
    days: 365
  }
}

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  ANALYST: 'analyst',
  VIEWER: 'viewer'
}

export const PREDICTION_CONFIDENCE = {
  HIGH: 0.8,
  MEDIUM: 0.6,
  LOW: 0.4
}

export const ROUTE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  MAINTENANCE: 'maintenance',
  DISRUPTED: 'disrupted'
}

export const API_ENDPOINTS = {
  PREDICT: '/api/predict',
  FEEDBACK: '/api/feedback',
  ROUTES: '/api/routes',
  ANALYTICS: '/api/analytics',
  ADMIN: '/api/admin'
}

export const LOCAL_STORAGE_KEYS = {
  USER: 'smart_transit_user',
  THEME: 'smart_transit_theme',
  FAVORITES: 'smart_transit_favorites',
  RECENT_SEARCHES: 'smart_transit_recent_searches'
}