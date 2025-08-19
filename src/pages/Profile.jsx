import '../styles/profile.scss'
import '../styles/main.scss'
import EditNameButton from '../components/EditNameButton'
import TransactionCard from '../components/TransactionCard'
import useAuth from '../hooks/useAuth'
import Edit from '../components/Edit'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Welcome from '../components/Welcome'

function Profile() {
  const { user, isAuthenticated } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  const firstName = user?.firstName || ''
  const lastName = user?.lastName || ''
  return (
    <>
      <main className="profile-main">
        <div className="banner">
          <Welcome
            isEditing={isEditing}
            firstName={firstName}
            lastName={lastName}
          />

          {isEditing ? (
            <Edit setIsEditing={setIsEditing} />
          ) : (
            <EditNameButton setIsEditing={setIsEditing} />
          )}
        </div>
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
      </main>
    </>
  )
}

export default Profile
