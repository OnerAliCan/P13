import '../styles/profile.scss'
import '../styles/main.scss'
import EditNameButton from '../components/EditNameButton'
import TransactionCard from '../components/TransactionCard'

function Profile() {
  const firstName = 'Tony'
  const lastName = 'Jarvis'

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
