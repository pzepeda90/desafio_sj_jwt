import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Context from '../contexts/Context'
import { showSuccessAlert, showErrorAlert, showWarningAlert } from '../services/alertService'
import { loginUser, getUserProfile } from '../services/userService'
import { isValidEmail } from '../utils/validation'
import { saveToken, getToken, isAuthenticated } from '../utils/authUtils'

const initialForm = { email: 'docente@desafiolatam.com', password: '123456' }

const Login = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(initialForm)
  const { setDeveloper } = useContext(Context)

  // Verificar si ya está autenticado al cargar
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/perfil')
    }
  }, [navigate])

  const handleUser = (event) => setUser({ ...user, [event.target.name]: event.target.value })

  const handleForm = async (event) => {
    event.preventDefault()

    if (!user.email.trim() || !user.password.trim()) {
      return showWarningAlert('Campos incompletos', 'Email y password son obligatorios.')
    }

    if (!isValidEmail(user.email)) {
      return showWarningAlert('Formato inválido', 'El formato del email no es correcto!')
    }

    try {
      const { data } = await loginUser(user)
      saveToken(data.token)

      // Cargar explícitamente los datos del usuario
      try {
        const token = getToken()
        const userResponse = await getUserProfile(token)
        console.log('Datos de usuario cargados:', userResponse.data)
        
        if (userResponse.data) {
          setDeveloper(userResponse.data)
        }
      } catch (profileError) {
        console.error('Error al cargar el perfil:', profileError)
      }

      await showSuccessAlert('Inicio de sesión exitoso', 'Usuario identificado con éxito 😀.')
      
      // Navegar a la página de perfil
      navigate('/perfil')
    } catch (error) {
      console.error('Error de inicio de sesión:', error.response?.data)
      showErrorAlert('Error', (error.response?.data?.error) || 'Credenciales inválidas.')
    }
  }

  return (
    <form onSubmit={handleForm} className='col-10 col-sm-6 col-md-3 m-auto mt-5'>
      <h1>Iniciar Sesión</h1>
      <hr />
      <div className='form-group mt-1 '>
        <label>Email address</label>
        <input
          value={user.email}
          onChange={handleUser}
          type='email'
          name='email'
          className='form-control'
          placeholder='Enter email'
        />
      </div>
      <div className='form-group mt-1 '>
        <label>Password</label>
        <input
          value={user.password}
          onChange={handleUser}
          type='password'
          name='password'
          className='form-control'
          placeholder='Password'
        />
      </div>
      <button type='submit' className='btn btn-light mt-3'>Iniciar Sesión</button>
    </form>
  )
}

export default Login
