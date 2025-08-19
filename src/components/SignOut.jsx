import { Link } from 'react-router-dom'

export default function SignOut({ handleLogout }) {
  return (
    <Link className="main-nav-item" to="/" onClick={handleLogout}>
      <i className="fa fa-sign-out"></i> Sign Out
    </Link>
  )
}
