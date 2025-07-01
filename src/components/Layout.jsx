import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  const firstName = 'Tony'
  const lastName = 'Jarvis'
  return (
    <>
      <div className="content">
        <Header firstName={firstName} isAuthenticated={true} />
        <Outlet firstName={firstName} lastName={lastName} />
      </div>
      <Footer />
    </>
  )
}
