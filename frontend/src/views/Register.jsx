import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { showSuccessAlert, showErrorAlert, showWarningAlert } from '../services/alertService'
import { registerUser } from '../services/userService'
import { isValidEmail, areRequiredFieldsPresent } from '../utils/validation'
import { isAuthenticated } from '../utils/authUtils'

const initialForm = {
  email: 'docente@desafiolatam.com',
  password: '123456',
  rol: 'Seleccione un rol',
  lenguage: 'Seleccione un lenguage'
}

// Lista de campos requeridos
const requiredFields = ['email', 'password']

const Register = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(initialForm)

  const handleUser = (event) => setUser({ ...user, [event.target.name]: event.target.value })

  const handleForm = async (event) => {
    event.preventDefault()

    // Validar campos básicos (email y password)
    if (!areRequiredFieldsPresent(user, requiredFields)) {
      return showWarningAlert('Campos incompletos', 'Email y password son obligatorios.')
    }

    // Validar campos de selección
    if (user.rol === 'Seleccione un rol' || user.lenguage === 'Seleccione un lenguage') {
      return showWarningAlert('Campos incompletos', 'Debes seleccionar un rol y un lenguage.')
    }

    if (!isValidEmail(user.email)) {
      return showWarningAlert('Formato inválido', 'El formato del email no es correcto!')
    }

    try {
      await registerUser(user)
      await showSuccessAlert('Registro exitoso', 'Usuario registrado con éxito 😀.')
      navigate('/login')
    } catch (error) {
      console.error('Error de registro:', error.response?.data)
      showErrorAlert('Error', (error.response?.data?.error) || 'Ha ocurrido un error al registrar el usuario.')
    }
  }

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/perfil')
    }
  }, [navigate])

  return (
    <form onSubmit={handleForm} className='col-10 col-sm-6 col-md-3 m-auto mt-5'>
      <h1>Registrar nuevo usuario</h1>
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
      <div className='form-group mt-1 '>
        <label>Rol</label>
        <select
          defaultValue={user.rol}
          onChange={handleUser}
          name='rol'
          className='form-select'
        >
          <option disabled>Seleccione un rol</option>
          <option value='Full Stack Developer'>Full Stack Developer</option>
          <option value='Frontend Developer'>Frontend Developer</option>
          <option value='Backend Developer'>Backend Developer</option>
        </select>
      </div>
      <div className='form-group mt-1'>
        <label>Lenguage</label>
        <select
          defaultValue={user.lenguage}
          onChange={handleUser}
          name='lenguage'
          className='form-select'
        >
          <option disabled>Seleccione un lenguage</option>
          <option value='JavaScript'>JavaScript</option>
          <option value='Python'>Python</option>
          <option value='Ruby'>Ruby</option>
        </select>
      </div>
      <button type='submit' className='btn btn-light mt-3'>Registrarme</button>
    </form>
  )
}

export default Register
