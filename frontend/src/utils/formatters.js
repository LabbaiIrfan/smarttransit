import { format, formatDistance, formatRelative } from 'date-fns'

export const formatDate = (dateString, formatStr = 'PPP') => {
  try {
    const date = new Date(dateString)
    return format(date, formatStr)
  } catch (error) {
    return 'Invalid date'
  }
}

export const formatTime = (timeString) => {
  try {
    const [hours, minutes] = timeString.split(':')
    const hour = parseInt(hours)
    const suffix = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${suffix}`
  } catch (error) {
    return timeString
  }
}

export const formatNumber = (num, options = {}) => {
  const {
    decimals = 0,
    compact = false,
    prefix = '',
    suffix = '',
  } = options

  if (isNaN(num)) return 'N/A'

  let formatted = num.toFixed(decimals)

  if (compact && num >= 1000) {
    const units = ['', 'K', 'M', 'B']
    const order = Math.floor(Math.log10(num) / 3)
    if (order >= units.length) return `${prefix}∞${suffix}`
    const divisor = Math.pow(10, order * 3)
    formatted = (num / divisor).toFixed(1)
    return `${prefix}${formatted}${units[order]}${suffix}`
  }

  // Add commas for thousands
  formatted = formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return `${prefix}${formatted}${suffix}`
}

export const formatDuration = (minutes) => {
  if (minutes < 60) {
    return `${minutes} min`
  }
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  if (remainingMinutes === 0) {
    return `${hours} hr`
  }
  return `${hours} hr ${remainingMinutes} min`
}

export const formatPercentage = (value, decimals = 1) => {
  if (isNaN(value)) return 'N/A'
  return `${value.toFixed(decimals)}%`
}

export const formatCrowdLevel = (level) => {
  const levels = {
    low: { text: 'Low', color: '#10b981', emoji: '🟢' },
    medium: { text: 'Medium', color: '#f59e0b', emoji: '🟡' },
    high: { text: 'High', color: '#ef4444', emoji: '🔴' },
  }
  return levels[level] || { text: 'Unknown', color: '#94a3b8', emoji: '⚫' }
}

export const capitalize = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}