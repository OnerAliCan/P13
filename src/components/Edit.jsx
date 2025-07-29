import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../redux/authSlice'
import { useState } from 'react'

function Edit({ setIsEditing }) {
  const dispatch = useDispatch()
  const handleSave = () => {
    dispatch(updateProfile({ firstName, lastName }))
    setIsEditing(false)
  }
  const user = useSelector((state) => state.auth.user)
  const [firstName, setFirstName] = useState(user?.firstName || '')
  const [lastName, setLastName] = useState(user?.lastName || '')
  return (
    <>
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
    </>
  )
}

export default Edit
