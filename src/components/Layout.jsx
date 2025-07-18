import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, setUser } from '../redux/authSlice'

export default function Layout() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  // const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const localToken = localStorage.getItem('token')
    const localUser = localStorage.getItem('user')
    console.log('localuser il est la ', localUser)
    if (!localToken) return

    dispatch(login({ token: localToken }))

    if (localUser) {
      try {
        const parsedUser = JSON.parse(localUser)
        dispatch(setUser(parsedUser))
      } catch (error) {
        console.error('Erreur parsing user localStorage:', error)
        localStorage.removeItem('user')
      }
    }

    // On synchronise avec l’API
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          'http://localhost:3001/api/v1/user/profile',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${localToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
          },
        )

        if (!response.ok) throw new Error('Erreur récupération profil')

        const data = await response.json()

        dispatch(setUser(data.body))
        localStorage.setItem('user', JSON.stringify(data.body))
      } catch (error) {
        console.error(error)
      }
    }

    fetchUserProfile()
  }, [dispatch])

  // Empêche l'affichage tant que les données ne sont pas prêtes

  return (
    <>
      <div className="content">
        <Header firstName={user?.firstName} isAuthenticated={isAuthenticated} />
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
