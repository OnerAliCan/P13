import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../redux/authSlice'
import { useState } from 'react'
import { updateUserProfile } from '../thunks/updateUserProfile'

function Edit({ setIsEditing }) {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)
  const user = useSelector((state) => state.auth.user)
  const [firstName, setFirstName] = useState(user?.firstName || '')
  const [lastName, setLastName] = useState(user?.lastName || '')

  const handleSave = async () => {
    try {
      const resultAction = await dispatch(
        updateUserProfile({ firstName, lastName, token }),
      )

      if (updateUserProfile.fulfilled.match(resultAction)) {
        dispatch(updateProfile({ firstName, lastName }))
        setIsEditing(false)
      } else {
        // gérer erreur si besoin
        console.error('Erreur mise à jour profil')
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error)
    }
  }

  return (
    <div className="edit-section">
      <div className="edit-inputs">
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="edit-buttons">
        <button onClick={handleSave}>Save</button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
      </div>
    </div>
  )
}

export default Edit
