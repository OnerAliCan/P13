import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login, setUser } from '../redux/authSlice' // adapte le chemin si besoin
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!response.ok) throw new Error('Login failed')
      const data = await response.json()
      console.log("ici c'est la data", data.body)
      const token = data.body.token
      localStorage.setItem('token', token)
      dispatch(login({ token }))

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

      dispatch(setUser(user))
      localStorage.setItem('user', JSON.stringify(user))

      console.log('profile response il est la', profileResponse)

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
            />{' '}
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />{' '}
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button">Sign In</button>
        </form>
      </section>
    </main>
  )
}

export default Login
