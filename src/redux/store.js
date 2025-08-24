import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'

// "Auth" = la partie du state gérée par authReducer
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})
