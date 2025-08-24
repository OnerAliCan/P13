import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, setUser } from '../redux/authSlice'

export default function Layout() {
  const dispatch = useDispatch()
  //Récupérer l'utilisateur et son état d'authentification depuis Redux
  const user = useSelector((state) => state.auth.user)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  useEffect(() => {
    const localToken = localStorage.getItem('token')
    const localUser = localStorage.getItem('user')
    if (!localToken) return

    // Mettre à jour Redux pour dire que l'utilisateur est connecté
    dispatch(login({ token: localToken }))

    // Si un utilisateur est stocké, on le parse et on met à jour Redux
    if (localUser) {
      try {
        const parsedUser = JSON.parse(localUser)
        dispatch(setUser(parsedUser))
      } catch (error) {
        console.error('Erreur parsing user localStorage:', error)
        localStorage.removeItem('user')
      }
    }

    // synchroniser avec l’API et récupérer les données à jour
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

        // Mise à jour Redux et stockage local avec les données récupérées
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
