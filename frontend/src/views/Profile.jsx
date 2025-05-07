import Context from '../contexts/Context'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { showErrorAlert } from '../services/alertService'
import { getUserProfile } from '../services/userService'
import { getToken, clearSession } from '../utils/authUtils'

const Profile = () => {
  const navigate = useNavigate()
  const { developer, setDeveloper, isLoading } = useContext(Context)

  useEffect(() => {
    // Si no está cargando y no hay usuario, redirigir al inicio
    if (!isLoading && !developer) {
      navigate('/')
    }
  }, [developer, isLoading, navigate])

  // Mostrar indicador de carga mientras se obtienen los datos
  if (isLoading) {
    return <div className="py-5 text-center">Cargando perfil...</div>
  }

  // Si no hay datos de usuario y no está cargando, no deberíamos mostrar esta página
  if (!developer) return null

  return (
    <div className='py-5'>
      <div className='profile-container col-10 col-sm-6 col-md-6 m-auto p-4'>
        <h1 className='text-center mb-4'>Bienvenido</h1>
        <div className='profile-info'>
          <h2 className='text-center email-display'>
            {developer.email}
          </h2>
          <h3 className='text-center role-display'>
            {developer.rol} en {developer.lenguage}
          </h3>
        </div>
      </div>
    </div>
  )
}

export default Profile
