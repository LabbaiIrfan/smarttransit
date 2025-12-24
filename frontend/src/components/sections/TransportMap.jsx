import { MapPin, Navigation, Train, Bus, Car, MoreHorizontal, X, Users, Clock, AlertCircle, Maximize2, Route } from 'lucide-react'
import { useState } from 'react'

// Import a mapping library component
import { MapContainer, TileLayer, Polyline, Marker, Popup, Circle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default markers in Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const TransportMap = () => {
  const [selectedRoute, setSelectedRoute] = useState('all')
  const [activeRoute, setActiveRoute] = useState(null)
  const [mapView, setMapView] = useState('standard')
  const [isMapFullscreen, setIsMapFullscreen] = useState(false)

  // Navi Mumbai Center Coordinates (CBD Belapur)
  const naviMumbaiCenter = [19.0233, 73.0396]

  // Navi Mumbai Metro Line 1 (Belapur - Pendhar) - Actual approximate coordinates
  const metroLine1 = [
    [19.0326, 73.0476], // CBD Belapur Station
    [19.0410, 73.0520], // Sector 34
    [19.0475, 73.0558], // Sector 18
    [19.0539, 73.0595], // Sector 11
    [19.0580, 73.0622], // Sector 14
    [19.0644, 73.0659], // Sector 9
    [19.0708, 73.0696], // Sector 10
    [19.0772, 73.0733], // Sector 8
    [19.0836, 73.0770], // Sector 6
    [19.0900, 73.0807], // Sector 5
    [19.0964, 73.0844], // Sector 3
    [19.1028, 73.0881], // Sector 1 (Kharghar)
    [19.1092, 73.0918], // Central Park
    [19.1156, 73.0955], // Sector 12 (Kharghar)
    [19.1220, 73.0992], // Sector 7
    [19.1284, 73.1029], // Sector 2
    [19.1348, 73.1066], // Sector 10 (Kharghar)
    [19.1412, 73.1103], // Sector 8
    [19.1476, 73.1140], // Sector 6
    [19.1540, 73.1177], // Sector 4
    [19.1604, 73.1214], // Pendhar
  ]

  // Proposed Metro Line 2 (MIDC - Taloja)
  const metroLine2 = [
    [19.0100, 73.0200], // MIDC
    [19.0150, 73.0250], // Digha
    [19.0200, 73.0300], // Airoli Junction
    [19.0250, 73.0350], // Rabale
    [19.0300, 73.0400], // Ghansoli
    [19.0350, 73.0450], // Koparkhairane
    [19.0400, 73.0500], // Turbhe
    [19.0450, 73.0550], // Sanpada
    [19.0500, 73.0600], // Vashi
    [19.0550, 73.0650], // Mankhurd
    [19.0600, 73.0700], // Vovale
    [19.0650, 73.0750], // Taloja
  ]

  // Major Bus Routes
  const busRoute101 = [
    [19.0260, 73.0410], // Belapur Bus Depot
    [19.0326, 73.0476], // CBD Belapur Station
    [19.0390, 73.0540], // Nerul
    [19.0454, 73.0604], // Vashi
    [19.0518, 73.0668], // Turbhe
    [19.0582, 73.0732], // Airoli
  ]

  const busRoute202 = [
    [19.1028, 73.0881], // Kharghar Station
    [19.0900, 73.0807], // Sector 5
    [19.0772, 73.0733], // Kalamboli
    [19.0644, 73.0659], // Panvel
  ]

  const routes = [
    { 
      id: 'metro-1', 
      name: 'Navi Mumbai Metro Line 1', 
      type: 'metro', 
      status: 'normal', 
      stations: 21,
      color: '#3B82F6',
      coordinates: metroLine1,
      stationsList: [
        { name: 'CBD Belapur', coords: [19.0326, 73.0476], passengers: 'High' },
        { name: 'Sector 34', coords: [19.0410, 73.0520], passengers: 'Medium' },
        { name: 'Sector 18', coords: [19.0475, 73.0558], passengers: 'Medium' },
        { name: 'Sector 11', coords: [19.0539, 73.0595], passengers: 'Low' },
        { name: 'Sector 14', coords: [19.0580, 73.0622], passengers: 'Medium' },
        { name: 'Sector 9', coords: [19.0644, 73.0659], passengers: 'High' },
        { name: 'Central Park', coords: [19.1092, 73.0918], passengers: 'High' },
        { name: 'Pendhar Terminal', coords: [19.1604, 73.1214], passengers: 'Medium' },
      ],
      description: 'Belapur to Pendhar via Kharghar',
      frequency: 'Every 15 minutes',
      operatingHours: '6:00 AM - 11:00 PM'
    },
    { 
      id: 'metro-2', 
      name: 'Proposed Metro Line 2', 
      type: 'metro', 
      status: 'planned', 
      stations: 12,
      color: '#8B5CF6',
      coordinates: metroLine2,
      stationsList: [
        { name: 'MIDC', coords: [19.0100, 73.0200], passengers: 'High' },
        { name: 'Airoli Junction', coords: [19.0200, 73.0300], passengers: 'High' },
        { name: 'Rabale', coords: [19.0250, 73.0350], passengers: 'Medium' },
        { name: 'Ghansoli', coords: [19.0300, 73.0400], passengers: 'High' },
        { name: 'Vashi', coords: [19.0500, 73.0600], passengers: 'Very High' },
        { name: 'Taloja', coords: [19.0650, 73.0750], passengers: 'Medium' },
      ],
      description: 'MIDC to Taloja via Airoli and Vashi',
      frequency: 'Planned',
      operatingHours: 'Under Construction'
    },
    { 
      id: 'bus-101', 
      name: 'Bus Route 101', 
      type: 'bus', 
      status: 'crowded', 
      stations: 6,
      color: '#F59E0B',
      coordinates: busRoute101,
      stationsList: [
        { name: 'Belapur Depot', coords: [19.0260, 73.0410], passengers: 'High' },
        { name: 'CBD Belapur Stn', coords: [19.0326, 73.0476], passengers: 'Very High' },
        { name: 'Nerul', coords: [19.0390, 73.0540], passengers: 'High' },
        { name: 'Vashi Plaza', coords: [19.0454, 73.0604], passengers: 'Very High' },
        { name: 'Airoli', coords: [19.0582, 73.0732], passengers: 'High' },
      ],
      description: 'Belapur to Airoli via Nerul and Vashi',
      frequency: 'Every 10 minutes',
      operatingHours: '5:30 AM - 12:00 AM'
    },
    { 
      id: 'bus-202', 
      name: 'Bus Route 202', 
      type: 'bus', 
      status: 'moderate', 
      stations: 4,
      color: '#10B981',
      coordinates: busRoute202,
      stationsList: [
        { name: 'Kharghar Stn', coords: [19.1028, 73.0881], passengers: 'High' },
        { name: 'Sector 5', coords: [19.0900, 73.0807], passengers: 'Medium' },
        { name: 'Kalamboli', coords: [19.0772, 73.0733], passengers: 'High' },
        { name: 'Panvel', coords: [19.0644, 73.0659], passengers: 'Very High' },
      ],
      description: 'Kharghar to Panvel via Kalamboli',
      frequency: 'Every 15 minutes',
      operatingHours: '6:00 AM - 11:30 PM'
    },
    { 
      id: 'train', 
      name: 'Harbour Line (Local)', 
      type: 'train', 
      status: 'crowded', 
      stations: 8,
      color: '#EF4444',
      coordinates: [
        [19.0100, 73.0200], // Panvel
        [19.0200, 73.0300], // Khandeshwar
        [19.0300, 73.0400], // Mansarovar
        [19.0400, 73.0500], // Kharghar
        [19.0500, 73.0600], // Belapur
        [19.0600, 73.0700], // Seawoods
        [19.0700, 73.0800], // Nerul
        [19.0800, 73.0900], // Vashi
      ],
      stationsList: [
        { name: 'Panvel Station', coords: [19.0100, 73.0200], passengers: 'Very High' },
        { name: 'Kharghar Station', coords: [19.0400, 73.0500], passengers: 'High' },
        { name: 'Belapur Station', coords: [19.0500, 73.0600], passengers: 'High' },
        { name: 'Vashi Station', coords: [19.0800, 73.0900], passengers: 'Very High' },
      ],
      description: 'Harbour Line local train route',
      frequency: 'Every 8-10 minutes',
      operatingHours: '4:00 AM - 1:00 AM'
    },
  ]

  const getStatusColor = (status) => {
    switch(status) {
      case 'crowded': return 'bg-red-500'
      case 'moderate': return 'bg-yellow-500'
      case 'normal': return 'bg-green-500'
      case 'planned': return 'bg-purple-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status) => {
    switch(status) {
      case 'crowded': return 'High Crowding'
      case 'moderate': return 'Moderate'
      case 'normal': return 'Normal'
      case 'planned': return 'Under Construction'
      default: return 'Unknown'
    }
  }

  const getTypeIcon = (type) => {
    switch(type) {
      case 'metro': return <Train className="w-4 h-4" />
      case 'bus': return <Bus className="w-4 h-4" />
      case 'train': return <Train className="w-4 h-4" />
      default: return <Car className="w-4 h-4" />
    }
  }

  const getTileLayer = () => {
    switch(mapView) {
      case 'satellite':
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      case 'dark':
        return 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      default:
        return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    }
  }

  const getAreaMarkers = () => {
    return [
      { name: 'Belapur CBD', coords: [19.0326, 73.0476], type: 'business' },
      { name: 'Vashi', coords: [19.0500, 73.0600], type: 'commercial' },
      { name: 'Nerul', coords: [19.0390, 73.0540], type: 'residential' },
      { name: 'Kharghar', coords: [19.1028, 73.0881], type: 'residential' },
      { name: 'Panvel', coords: [19.0644, 73.0659], type: 'commercial' },
      { name: 'Airoli', coords: [19.0200, 73.0300], type: 'industrial' },
    ]
  }

  return (
    <div className="space-y-6">
      {/* Map Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-600 rounded-lg">
            <Navigation className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-xl">Navi Mumbai Transport Network</h3>
            <p className="text-gray-400 text-sm">Live updates for metro, buses & local trains</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex gap-1 bg-gray-800 rounded-lg p-1">
            {['standard', 'satellite', 'dark'].map((view) => (
              <button
                key={view}
                onClick={() => setMapView(view)}
                className={`px-3 py-1 text-xs rounded-md transition-colors ${
                  mapView === view 
                    ? 'bg-primary-600 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </button>
            ))}
          </div>
          <select 
            value={selectedRoute}
            onChange={(e) => {
              setSelectedRoute(e.target.value)
              setActiveRoute(e.target.value === 'all' ? null : e.target.value)
            }}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm min-w-[180px] focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Transport Modes</option>
            {routes.map(route => (
              <option key={route.id} value={route.id}>{route.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Real Map Visualization */}
      <div className={`relative ${isMapFullscreen ? 'fixed inset-0 z-50' : 'h-[500px]'} bg-gray-900 rounded-xl overflow-hidden border border-gray-700 shadow-xl`}>
        <MapContainer
          center={naviMumbaiCenter}
          zoom={12}
          className="w-full h-full rounded-xl"
          scrollWheelZoom={true}
          minZoom={10}
          maxZoom={16}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={getTileLayer()}
          />
          
          {/* Area Circles for major hubs */}
          {getAreaMarkers().map((area, index) => (
            <Circle
              key={index}
              center={area.coords}
              radius={1000}
              pathOptions={{
                fillColor: area.type === 'business' ? '#3B82F6' : 
                          area.type === 'commercial' ? '#8B5CF6' : 
                          area.type === 'industrial' ? '#F59E0B' : '#10B981',
                color: 'transparent',
                fillOpacity: 0.1
              }}
            />
          ))}

          {/* Render routes */}
          {routes.map((route) => {
            if (selectedRoute !== 'all' && selectedRoute !== route.id) return null
            
            const isActive = activeRoute === route.id
            
            return (
              <Polyline
                key={route.id}
                pathOptions={{ 
                  color: route.color, 
                  weight: isActive ? 6 : 4,
                  opacity: isActive ? 1 : 0.7,
                  dashArray: route.status === 'planned' ? '10, 10' : undefined
                }}
                positions={route.coordinates}
                eventHandlers={{
                  click: () => setActiveRoute(route.id),
                }}
              />
            )
          })}

          {/* Major Station Markers */}
          {routes.map((route) => {
            if (selectedRoute !== 'all' && selectedRoute !== route.id) return null
            
            return route.stationsList.map((station, index) => (
              <Marker
                key={`${route.id}-${index}`}
                position={station.coords}
                icon={L.divIcon({
                  html: `
                    <div class="relative group">
                      <div class="w-7 h-7 rounded-full ${
                        route.type === 'metro' ? 'bg-blue-500' : 
                        route.type === 'bus' ? 'bg-orange-500' : 'bg-red-500'
                      } border-2 border-white shadow-lg flex items-center justify-center cursor-pointer transform transition-transform group-hover:scale-110">
                        <span class="text-xs font-bold text-white">${
                          route.type === 'bus' ? 'B' : 
                          route.type === 'metro' ? 'M' : 'T'
                        }</span>
                      </div>
                      <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        ${station.name}
                      </div>
                    </div>
                  `,
                  className: '',
                  iconSize: [28, 28],
                  iconAnchor: [14, 14]
                })}
              >
                <Popup>
                  <div className="p-2 min-w-[200px]">
                    <h4 className="font-bold text-lg mb-1">{station.name}</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(route.status)}`}></div>
                      <span className="text-sm font-medium">{route.name}</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span>Passengers: <strong>{station.passengers}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span>Next arrival: <strong>8 min</strong></span>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))
          })}
        </MapContainer>

        {/* Map Controls */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <button 
            onClick={() => setIsMapFullscreen(!isMapFullscreen)}
            className="p-3 bg-gray-900/90 backdrop-blur-sm rounded-lg hover:bg-gray-800 transition-colors shadow-lg"
            title={isMapFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isMapFullscreen ? <X className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-gray-900/90 backdrop-blur-sm rounded-xl p-4 shadow-lg max-w-xs">
          <h4 className="font-bold mb-3 flex items-center gap-2">
            <Route className="w-4 h-4" />
            Transport Legend
          </h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-4 h-1 bg-blue-500"></div>
              <span className="text-sm">Metro Line 1 (Active)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-1 bg-purple-500" style={{background: 'repeating-linear-gradient(90deg, #8B5CF6, #8B5CF6 5px, transparent 5px, transparent 10px)'}}></div>
              <span className="text-sm">Metro Line 2 (Planned)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-1 bg-orange-500"></div>
              <span className="text-sm">Bus Routes</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-1 bg-red-500"></div>
              <span className="text-sm">Local Train</span>
            </div>
            <div className="pt-3 border-t border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm">High Crowding</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm">Normal Service</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-sm">Under Construction</span>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Route Info */}
        {activeRoute && (
          <div className="absolute top-4 right-4 bg-gray-900/90 backdrop-blur-sm rounded-xl p-4 max-w-xs shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-lg">
                {routes.find(r => r.id === activeRoute)?.name}
              </h4>
              <button 
                onClick={() => setActiveRoute(null)}
                className="p-1 hover:bg-gray-700 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <p className="text-gray-300">{routes.find(r => r.id === activeRoute)?.description}</p>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>Frequency: {routes.find(r => r.id === activeRoute)?.frequency}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-400" />
                <span>Status: {getStatusText(routes.find(r => r.id === activeRoute)?.status)}</span>
              </div>
              <div className="pt-3 border-t border-gray-700">
                <p className="font-medium mb-2">Major Stations:</p>
                <div className="space-y-1">
                  {routes.find(r => r.id === activeRoute)?.stationsList.slice(0, 3).map((station, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-gray-400">
                      <div className="w-2 h-2 rounded-full bg-current"></div>
                      <span>{station.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Route Status Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {routes.map((route) => (
          <div 
            key={route.id}
            className={`p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-all cursor-pointer border-2 ${
              activeRoute === route.id 
                ? 'border-primary-500 bg-gray-800' 
                : 'border-gray-700'
            } hover:border-primary-500/50`}
            onClick={() => {
              setActiveRoute(route.id)
              setSelectedRoute(route.id)
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${getStatusColor(route.status)}`}>
                  {getTypeIcon(route.type)}
                </div>
                <div>
                  <h4 className="font-bold">{route.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(route.status)}`}></div>
                    <span className="text-sm text-gray-400">{getStatusText(route.status)}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{route.stations}</div>
                <div className="text-xs text-gray-400">stations</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <p className="text-sm text-gray-300">{route.description}</p>
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{route.frequency}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{route.operatingHours}</span>
                  </div>
                </div>
                <div 
                  className="w-6 h-1 rounded-full"
                  style={{ backgroundColor: route.color }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions & Live Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6 border-t border-gray-800">
        <div className="p-4 bg-gray-800/50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <AlertCircle className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Active Alerts</p>
              <p className="text-2xl font-bold">3</p>
              <p className="text-xs text-gray-500 mt-1">2 delays, 1 route change</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-gray-800/50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Train className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Metro Trains</p>
              <p className="text-2xl font-bold">42</p>
              <p className="text-xs text-gray-500 mt-1">Currently running</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-gray-800/50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <Bus className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Active Buses</p>
              <p className="text-2xl font-bold">156</p>
              <p className="text-xs text-gray-500 mt-1">On all routes</p>
            </div>
          </div>
        </div>
        
        <button className="p-4 bg-primary-600 hover:bg-primary-700 rounded-xl transition-colors flex flex-col items-center justify-center group">
          <div className="p-3 bg-white/20 rounded-lg mb-3 group-hover:scale-110 transition-transform">
            <Navigation className="w-8 h-8" />
          </div>
          <span className="font-bold text-lg">Plan Journey</span>
          <span className="text-sm text-gray-200">Find best route in Navi Mumbai</span>
        </button>
      </div>
    </div>
  )
}

export default TransportMap