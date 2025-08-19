import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../redux/authSlice'
import SignIn from './SignIn'
import SignOut from './SignOut'

export default function SignInSignOut() {
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    dispatch(logout())
    navigate('/login')
  }

  return <>{user ? <SignOut handleLogout={handleLogout} /> : <SignIn />}</>
}
