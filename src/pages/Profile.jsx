import '../styles/profile.scss'
import '../styles/main.scss'
import EditNameButton from '../components/EditNameButton'
import TransactionCard from '../components/TransactionCard'
import useAuth from '../hooks/useAuth'

function Profile() {
  const { user, isAuthenticated } = useAuth()

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
            Welcome back <br /> {firstName} {lastName}!
          </h1>
          <EditNameButton />
        </div>
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
      </main>
    </>
  )
}

export default Profile
