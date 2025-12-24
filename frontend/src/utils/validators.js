export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validatePassword = (password) => {
  const errors = []
  
  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long')
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  return errors
}

export const validateRouteInput = (data) => {
  const errors = {}
  
  if (!data.routeId) {
    errors.routeId = 'Route selection is required'
  }
  
  if (!data.date) {
    errors.date = 'Date is required'
  } else if (new Date(data.date) < new Date()) {
    errors.date = 'Date cannot be in the past'
  }
  
  if (!data.time) {
    errors.time = 'Time is required'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export const validateFeedback = (data) => {
  const errors = {}
  
  if (!data.routeId) {
    errors.routeId = 'Please select a route'
  }
  
  if (!data.actualLevel) {
    errors.actualLevel = 'Please select actual crowd level'
  }
  
  if (!data.accuracyRating || data.accuracyRating < 1 || data.accuracyRating > 5) {
    errors.accuracyRating = 'Please rate accuracy from 1 to 5 stars'
  }
  
  if (data.comments && data.comments.length > 500) {
    errors.comments = 'Comments cannot exceed 500 characters'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input
  
  // Remove script tags and other dangerous content
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/g, '')
    .replace(/javascript:/gi, '')
    .trim()
}