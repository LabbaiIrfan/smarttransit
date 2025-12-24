import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  theme: 'dark',
  sidebarOpen: true,
  notifications: [],
  showFeedbackModal: false,
  showPredictionModal: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark'
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    addNotification: (state, action) => {
      state.notifications.unshift({
        id: Date.now(),
        ...action.payload,
      })
      if (state.notifications.length > 10) {
        state.notifications = state.notifications.slice(0, 10)
      }
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload
      )
    },
    setShowFeedbackModal: (state, action) => {
      state.showFeedbackModal = action.payload
    },
    setShowPredictionModal: (state, action) => {
      state.showPredictionModal = action.payload
    },
  },
})

export const {
  toggleTheme,
  toggleSidebar,
  addNotification,
  removeNotification,
  setShowFeedbackModal,
  setShowPredictionModal,
} = uiSlice.actions

export default uiSlice.reducer