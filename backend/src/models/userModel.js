const bcrypt = require('bcrypt')
const pool = require('../../config/db')

const registerUser = async (email, password, rol, lenguaje) => {
  try {
    // Validar que todos los campos estén presentes
    if (!email || !password || !rol || !lenguaje) {
      throw new Error('Todos los campos son obligatorios')
    }

    // Verificar si ya existe un usuario con ese email
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      throw new Error('Ya existe un usuario con ese email')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const query = 'INSERT INTO usuarios (email, password, rol, lenguaje) VALUES ($1, $2, $3, $4) RETURNING *'
    const values = [email, hashedPassword, rol, lenguaje]
    const { rows } = await pool.query(query, values)
    return rows[0]
  } catch (error) {
    console.error('Error al registrar usuario:', error.message)
    throw error
  }
}

const getUserByEmail = async (email) => {
  try {
    const query = 'SELECT * FROM usuarios WHERE email = $1'
    const values = [email]
    const { rows } = await pool.query(query, values)
    return rows[0]
  } catch (error) {
    console.error('Error al obtener usuario por email:', error.message)
    throw error
  }
}

const verifyCredentials = async (email, password) => {
  try {
    const user = await getUserByEmail(email)
    if (!user) {
      throw new Error('Credenciales inválidas')
    }
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      throw new Error('Credenciales inválidas')
    }
    return user
  } catch (error) {
    console.error('Error al verificar credenciales:', error.message)
    throw error
  }
}

module.exports = {
  registerUser,
  getUserByEmail,
  verifyCredentials
} 
