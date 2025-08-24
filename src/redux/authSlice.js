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
    // Action pour connecter un utilisateur
    login: (state, action) => {
      state.isAuthenticated = true
      state.token = action.payload.token
      if (action.payload.user) {
        state.user = action.payload.user
      }
    },
    // Action pour déconnecter un utilisateur
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.token = null
    },
    // Mettre à jour les informations de l'utilisateur dans le state
    setUser: (state, action) => {
      state.user = action.payload
    },
    // Mettre à jour le prénom et le nom de l'utilisateur
    updateProfile: (state, action) => {
      const { firstName, lastName } = action.payload
      if (state.user) {
        state.user.firstName = firstName
        state.user.lastName = lastName
      }
    },
  },
  // Gérer les actions asynchrones
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
