import mainLogo from '../assets/argentBankLogo.png'
import { Link, useLocation } from 'react-router-dom'
import SignInSignOut from './SignInSignOut'

export default function Header({ firstName, isAuthenticated }) {
  const location = useLocation()
  const isOnProfilePage = location.pathname === '/profile'
  const isOnHomePage = location.pathname === '/'
  return (
    <header>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={mainLogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          {(isOnProfilePage || isOnHomePage) && isAuthenticated && (
            <Link className="main-nav-item" to="/profile">
              <i className="fa fa-user-circle"></i>
              {firstName}
            </Link>
          )}
          <SignInSignOut />
        </div>
      </nav>
    </header>
  )
}
