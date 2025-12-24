import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  routes: [],
  selectedRoute: null,
  loading: false,
  error: null,
  favorites: [],
}

const routeSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {
    setRoutes: (state, action) => {
      state.routes = action.payload
    },
    setSelectedRoute: (state, action) => {
      state.selectedRoute = action.payload
    },
    addFavorite: (state, action) => {
      if (!state.favorites.find(fav => fav.id === action.payload.id)) {
        state.favorites.push(action.payload)
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(fav => fav.id !== action.payload)
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const {
  setRoutes,
  setSelectedRoute,
  addFavorite,
  removeFavorite,
  setLoading,
  setError,
} = routeSlice.actions

export default routeSlice.reducer