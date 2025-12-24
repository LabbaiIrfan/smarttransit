import { useState } from 'react'
import { MapPin, Bus, Train, Navigation } from 'lucide-react'

const RouteSelector = ({ register }) => {
  const [selectedRoute, setSelectedRoute] = useState(null)

  const routes = [
    { id: 'metro-1', name: 'Metro Line 1', type: 'metro', stations: 12, color: '#3B82F6' },
    { id: 'bus-101', name: 'Bus Route 101', type: 'bus', stations: 8, color: '#10B981' },
    { id: 'train-a', name: 'Train Station A', type: 'train', stations: 15, color: '#8B5CF6' },
    { id: 'bus-202', name: 'Bus Route 202', type: 'bus', stations: 6, color: '#F59E0B' },
    { id: 'metro-2', name: 'Metro Line 2', type: 'metro', stations: 10, color: '#EF4444' },
  ]

  const getIcon = (type) => {
    switch (type) {
      case 'metro': return <Train className="w-4 h-4" />
      case 'train': return <Train className="w-4 h-4" />
      case 'bus': return <Bus className="w-4 h-4" />
      default: return <Navigation className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-500" />
        <select
          {...register ? register('route', { required: true }) : {}}
          value={selectedRoute || ''}
          onChange={(e) => setSelectedRoute(e.target.value)}
          className="input-field pl-10"
        >
          <option value="">Select a route...</option>
          {routes.map((route) => (
            <option key={route.id} value={route.id}>
              {route.name}
            </option>
          ))}
        </select>
      </div>

      {selectedRoute && (
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              {getIcon(routes.find(r => r.id === selectedRoute)?.type)}
              <span className="font-medium">
                {routes.find(r => r.id === selectedRoute)?.name}
              </span>
            </div>
            <div className="text-sm text-dark-400">
              {routes.find(r => r.id === selectedRoute)?.stations} stations
            </div>
          </div>
          <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full"
              style={{ 
                width: '60%',
                backgroundColor: routes.find(r => r.id === selectedRoute)?.color 
              }}
            ></div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {routes.map((route) => (
          <button
            key={route.id}
            onClick={() => setSelectedRoute(route.id)}
            className={`p-3 rounded-lg border text-center transition-colors ${
              selectedRoute === route.id
                ? `bg-[${route.color}]/20 border-[${route.color}]`
                : 'bg-dark-800 border-dark-700 hover:bg-dark-700'
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <div className={`p-2 rounded-full`} style={{ backgroundColor: `${route.color}20` }}>
                {getIcon(route.type)}
              </div>
              <span className="text-xs font-medium">{route.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default RouteSelector