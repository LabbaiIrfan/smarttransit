import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import predictionReducer from './slices/predictionSlice'
import routeReducer from './slices/routeSlice'
import uiReducer from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    prediction: predictionReducer,
    route: routeReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/setUser'],
        ignoredPaths: ['auth.user'],
      },
    }),
})

export default store