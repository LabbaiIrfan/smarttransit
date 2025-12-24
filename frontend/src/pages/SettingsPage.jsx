import { useState } from 'react'
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Moon,
  Sun,
  Save,
  Key
} from 'lucide-react'
import { useSelector } from 'react-redux'

const SettingsPage = () => {
  const { user } = useSelector((state) => state.auth)
  const [darkMode, setDarkMode] = useState(true)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    predictions: true,
    alerts: false,
  })

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-dark-400">
          Manage your account preferences and settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Navigation */}
        <div className="lg:col-span-1">
          <div className="glass-card p-6">
            <div className="space-y-1">
              <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-primary-500/10 text-primary-400">
                <User className="w-5 h-5" />
                <span className="font-medium">Profile</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-dark-800/50">
                <Bell className="w-5 h-5" />
                <span className="font-medium">Notifications</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-dark-800/50">
                <Shield className="w-5 h-5" />
                <span className="font-medium">Privacy & Security</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-dark-800/50">
                <Globe className="w-5 h-5" />
                <span className="font-medium">Preferences</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold mb-6">Profile Settings</h2>
            
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-2xl font-bold">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <button className="btn-secondary text-sm">Change Photo</button>
                  <p className="text-xs text-dark-400 mt-2">JPG, GIF or PNG. Max size 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue={user?.name}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea
                  rows={3}
                  className="input-field"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold mb-6">Notification Preferences</h2>
            
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <span className="font-medium capitalize">{key}</span>
                    <p className="text-sm text-dark-400">
                      {key === 'email' && 'Receive email notifications'}
                      {key === 'push' && 'Push notifications'}
                      {key === 'predictions' && 'Daily prediction updates'}
                      {key === 'alerts' && 'Crowd alert notifications'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange(key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? 'bg-primary-500' : 'bg-dark-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Preferences */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold mb-6">Preferences</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">Dark Mode</span>
                  <p className="text-sm text-dark-400">
                    Switch between dark and light theme
                  </p>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="flex items-center gap-3 p-2 rounded-lg bg-dark-800"
                >
                  {darkMode ? (
                    <>
                      <Moon className="w-5 h-5" />
                      <span>Dark</span>
                    </>
                  ) : (
                    <>
                      <Sun className="w-5 h-5" />
                      <span>Light</span>
                    </>
                  )}
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Time Zone</label>
                <select className="input-field">
                  <option>GMT (UTC+0)</option>
                  <option>EST (UTC-5)</option>
                  <option>CST (UTC-6)</option>
                  <option>PST (UTC-8)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Preferred Transport Type</label>
                <div className="flex flex-wrap gap-3">
                  {['Metro', 'Bus', 'Train', 'Tram'].map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded bg-dark-800 border-dark-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-6">
              <Key className="w-5 h-5" />
              <h2 className="text-xl font-bold">Security</h2>
            </div>
            
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 bg-dark-800/50 rounded-lg hover:bg-dark-800">
                <div>
                  <span className="font-medium">Change Password</span>
                  <p className="text-sm text-dark-400">Update your password regularly</p>
                </div>
                <div className="text-primary-400">→</div>
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-dark-800/50 rounded-lg hover:bg-dark-800">
                <div>
                  <span className="font-medium">Two-Factor Authentication</span>
                  <p className="text-sm text-dark-400">Add an extra layer of security</p>
                </div>
                <div className="text-primary-400">→</div>
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-dark-800/50 rounded-lg hover:bg-dark-800 text-red-400">
                <div>
                  <span className="font-medium">Delete Account</span>
                  <p className="text-sm">Permanently delete your account and data</p>
                </div>
                <div>→</div>
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button className="btn-primary flex items-center gap-2 px-6">
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage