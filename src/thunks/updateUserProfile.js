import { createAsyncThunk } from '@reduxjs/toolkit'

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async ({ firstName, lastName, token }) => {
    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName }),
    })

    if (!response.ok) {
      throw new Error('Échec de la mise à jour du profil')
    } else {
      const data = await response.json()
      return data.body
    }
  },
)
