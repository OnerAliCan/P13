import '../styles/profile.scss'
import '../styles/main.scss'
import EditNameButton from '../components/EditNameButton'
import TransactionCard from '../components/TransactionCard'
import useAuth from '../hooks/useAuth'
import Edit from '../components/Edit'
import { useState } from 'react'

function Profile() {
  const { user, isAuthenticated } = useAuth()
  const [isEditing, setIsEditing] = useState(false)

  if (!isAuthenticated) {
    return <p>Vous devez être connecté pour voir cette page.</p>
  }

  const firstName = user?.firstName || ''
  const lastName = user?.lastName || ''
  return (
    <>
      <main className="profile-main">
        <div className="banner">
          <h1>
            Welcome back <br />
            {!isEditing && (
              <>
                {firstName} {lastName}!
              </>
            )}
          </h1>

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
