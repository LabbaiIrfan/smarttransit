import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  recentPredictions: [],
  currentPrediction: null,
  loading: false,
  error: null,
  history: [],
}

const predictionSlice = createSlice({
  name: 'prediction',
  initialState,
  reducers: {
    setRecentPredictions: (state, action) => {
      state.recentPredictions = action.payload
    },
    setCurrentPrediction: (state, action) => {
      state.currentPrediction = action.payload
    },
    addToHistory: (state, action) => {
      state.history.unshift(action.payload)
      if (state.history.length > 50) {
        state.history = state.history.slice(0, 50)
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    clearCurrentPrediction: (state) => {
      state.currentPrediction = null
    },
  },
})

export const {
  setRecentPredictions,
  setCurrentPrediction,
  addToHistory,
  setLoading,
  setError,
  clearCurrentPrediction,
} = predictionSlice.actions

export default predictionSlice.reducer