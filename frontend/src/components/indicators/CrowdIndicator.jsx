import clsx from 'clsx'
import { Users } from 'lucide-react'

const CrowdIndicator = ({ level, label, time, size = 'md' }) => {
  const config = {
    low: {
      color: 'crowd-low',
      icon: <Users className="w-4 h-4" />,
      text: 'Low',
    },
    medium: {
      color: 'crowd-medium',
      icon: <Users className="w-4 h-4" />,
      text: 'Medium',
    },
    high: {
      color: 'crowd-high',
      icon: <Users className="w-4 h-4" />,
      text: 'High',
    },
  }

  const { color, icon, text } = config[level]

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  }

  return (
    <div className={clsx(
      'inline-flex items-center gap-2 rounded-full',
      `bg-${color}/20 text-${color}`,
      `border border-${color}/30`,
      sizes[size]
    )}>
      {icon}
      <span className="font-medium">{label ? `${text}${label ? ` • ${label}` : ''}` : text}</span>
      {time && <span className="text-xs opacity-75">{time}</span>}
    </div>
  )
}

export default CrowdIndicator