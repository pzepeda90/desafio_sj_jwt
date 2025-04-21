const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')

const register = async (req, res) => {
  try {
    const { email, password, rol, lenguaje } = req.body
    const newUser = await userModel.registerUser(email, password, rol, lenguaje)

    // Eliminamos la contraseña del objeto respuesta por seguridad
    delete newUser.password

    res.status(201).json(newUser)
  } catch (error) {
    console.error('Error en registro:', error.message)
    if (error.message === 'Ya existe un usuario con ese email') {
      return res.status(409).json({ error: error.message })
    }
    if (error.message === 'Todos los campos son obligatorios') {
      return res.status(400).json({ error: error.message })
    }
    res.status(500).json({ error: error.message || 'Error al registrar el usuario' })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userModel.verifyCredentials(email, password)

    // Crear token JWT con el email del usuario
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' })

    res.json({ token })
  } catch (error) {
    console.error('Error en login:', error.message)
    res.status(401).json({ error: error.message || 'Credenciales inválidas' })
  }
}

const getProfile = async (req, res) => {
  try {
    console.log('Obteniendo perfil para:', req.user)
    const { email } = req.user
    console.log('Email del usuario:', email)
    
    const user = await userModel.getUserByEmail(email)
    console.log('Datos del usuario encontrado en DB:', user ? { ...user, password: '[ELIMINADO]' } : null)

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    // Eliminamos la contraseña del objeto respuesta por seguridad
    delete user.password

    console.log('Enviando respuesta al cliente:', user)
    res.json(user)
  } catch (error) {
    console.error('Error al obtener perfil:', error.message)
    res.status(500).json({ error: error.message || 'Error al obtener el perfil del usuario' })
  }
}

module.exports = {
  register,
  login,
  getProfile
}
