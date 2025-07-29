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

    updateProfile: (state, action) => {
      const { firstName, lastName } = action.payload
      if (state.user) {
        state.user.firstName = firstName
        state.user.lastName = lastName
      }
    },
  },
})

export const { login, logout, setUser, updateProfile } = authSlice.actions

export default authSlice.reducer
