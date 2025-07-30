import { createSlice } from '@reduxjs/toolkit'
import { updateUserProfile } from '../thunks/updateUserProfile'

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null,
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
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { login, logout, setUser, updateProfile } = authSlice.actions

export default authSlice.reducer

// const response = await fetch('http://localhost:3001/api/v1/user/profile', {
//   method: 'PUT',
//   headers: {
//     Authorization: `Bearer ${token}`,
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({ firstName, lastName }),
// })

//  if (!response.ok) {
//     throw new Error('Erreur')
//   } else {
//     const data = await response.json()
// }

// return data.body
