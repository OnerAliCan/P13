import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  const firstName = 'Tony'

  return (
    <>
      <div className="content">
        <Header firstName={firstName} isAuthenticated={true} />
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
