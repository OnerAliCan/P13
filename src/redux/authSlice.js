import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  user: null,
}

const authSlice = createSlice({
  name: 'auth', // Nom de la slice, utilisé dans Redux pour l’identifier
  initialState, // Etat initial défini ci-dessus

  reducers: {
    // - marque l'utilisateur comme connecté
    // - stocke les données utilisateur passées dans action.payload
    login: (state, action) => {
      state.isAuthenticated = true
      state.user = action.payload
    },

    // Reducer "logout" :
    // - remet l’état à la base (déconnecté, sans infos utilisateur)
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
    },

    setUser: (state, action) => {
      state.user = action.payload
    },
  },
})

// exporte les actions "login" et "logout" pour pouvoir les utiliser ailleurs
export const { login, logout, setUser } = authSlice.actions

// exporte le reducer qui sera utilisé dans le store Redux
export default authSlice.reducer
