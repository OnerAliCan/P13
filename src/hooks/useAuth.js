import { useSelector } from 'react-redux'

// Hook personnalisé pour récupérer les infos d'authentification
function useAuth() {
  const token = useSelector((state) => state.auth.token)
  const user = useSelector((state) => state.auth.user)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  return { token, user, isAuthenticated }
}

export default useAuth
