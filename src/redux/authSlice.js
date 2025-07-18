import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true
      state.token = action.payload.token
      if (action.payload.user) {
        state.user = action.payload.user
      }
    },

    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.token = null
    },

    setUser: (state, action) => {
      state.user = action.payload
    },
  },
})

export const { login, logout, setUser } = authSlice.actions

export default authSlice.reducer
