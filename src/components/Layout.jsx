import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  return (
    <div>
      <div className="content">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}
