import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, setUser } from '../redux/authSlice' // adapte le chemin si besoin
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [rememberMe, setRememberMe] = useState(false)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  //verifie si on a déjà un token stocké
  useEffect(() => {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token')

    const user = localStorage.getItem('user') || sessionStorage.getItem('user')

    if (token || user) {
      dispatch(login({ token }))
      dispatch(setUser(JSON.parse(user)))
      navigate('/profile')
    }
    if (isAuthenticated) {
      navigate('/profile')
    }
  }, [dispatch, isAuthenticated, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Login
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!response.ok) throw new Error('Login failed')
      const data = await response.json()
      const token = data.body.token

      // Récupération du profil
      const profileResponse = await fetch(
        'http://localhost:3001/api/v1/user/profile',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        },
      )
      const profileData = await profileResponse.json()
      const user = profileData.body

      // Stockage avec remember me

      if (rememberMe) {
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
      } else {
        sessionStorage.setItem('token', token)
        sessionStorage.setItem('user', JSON.stringify(user))
      }

      // Mise à jour Redux
      dispatch(login({ token }))
      dispatch(setUser(user))

      // Navigation
      navigate('/profile')
    } catch (error) {
      console.error('Erreur login :', error.message)
    }
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <button className="sign-in-button">Sign In</button>
        </form>
      </section>
    </main>
  )
}
