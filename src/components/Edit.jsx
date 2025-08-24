import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../redux/authSlice'
import { useState } from 'react'
import { updateUserProfile } from '../thunks/updateUserProfile'

function Edit({ setIsEditing }) {
  const dispatch = useDispatch()
  const [error, setError] = useState(null)
  // récupère le token et l'utilisateur depuis Redux
  const token = useSelector((state) => state.auth.token)
  const user = useSelector((state) => state.auth.user)

  // états locaux pour firstname et lastname
  const [firstName, setFirstName] = useState(user?.firstName || '')
  const [lastName, setLastName] = useState(user?.lastName || '')

  // enregistrer les modifications et mise en place de la sécurité pour les noms
  const handleSave = async () => {
    const nameRegex = /^[A-Za-zÀ-ÿ-]{2,}$/
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      setError(
        'Le prénom et le nom doivent contenir au moins 2 lettres et aucun caractère spécial.',
      )
      return
    }

    try {
      const resultAction = await dispatch(
        updateUserProfile({ firstName, lastName, token }),
      )
      // si la requete réussit, on met à jour le state via redux
      if (updateUserProfile.fulfilled.match(resultAction)) {
        dispatch(updateProfile({ firstName, lastName }))
        const updatedUser = { ...user, firstName, lastName }
        sessionStorage.setItem('user', JSON.stringify(updatedUser))

        setIsEditing(false)
      } else {
        setError('Impossible de mettre à jour le profil')
      }
    } catch (err) {
      setError('Erreur lors de la mise à jour')
      console.error(err)
    }
  }

  return (
    <div className="edit-section">
      <div className="edit-inputs">
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Prénom"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Nom"
        />
      </div>
      {error && <p className="error">{error}</p>}
      <div className="edit-buttons">
        <button type="button" onClick={handleSave}>
          Save
        </button>
        <button type="button" onClick={() => setIsEditing(false)}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default Edit
