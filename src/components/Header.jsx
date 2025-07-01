import mainLogo from '../assets/argentBankLogo.png'
import { Link, useLocation } from 'react-router-dom'

export default function Header({ firstName, isAuthenticated }) {
  const location = useLocation()
  const isOnProfilePage = location.pathname === '/profile'

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
          {isOnProfilePage && isAuthenticated ? (
            <>
              <Link className="main-nav-item" to="/profile">
                <i className="fa fa-user-circle"></i>
                {firstName}
              </Link>
              <Link className="main-nav-item" to="/">
                <i className="fa fa-sign-out"></i>
                Sign Out
              </Link>
            </>
          ) : (
            <Link className="main-nav-item" to="/login">
              <i className="fa fa-user-circle"></i>
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}
