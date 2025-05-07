const jwt = require('jsonwebtoken')

// Regex para validar formato de email
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Middleware para verificar que se envien las credenciales
const checkCredentials = (req, res, next) => {
  const { email, password } = req.body
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email y password son requeridos' })
  }
  
  // Validar formato de email
  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: 'Formato de email inválido' })
  }
  
  // Si es una solicitud de registro, verificar que todos los campos estén presentes
  if (req.path === '/usuarios') {
    const { rol, lenguage } = req.body
    if (!rol || !lenguage) {
      return res.status(400).json({ error: 'Todos los campos son requeridos (email, password, rol, lenguage)' })
    }
  }
  
  next()
}

// Middleware para validar el token
const validateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({ error: 'Token no proporcionado' })
    }
    
    // Extraer token si viene en formato Bearer
    const token = authHeader.split(' ')[1] || authHeader
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = decoded
      next()
    } catch (jwtError) {
      // Error específico para token inválido o expirado
      return res.status(401).json({ 
        error: jwtError.name === 'TokenExpiredError' 
          ? 'Token expirado' 
          : 'Token inválido' 
      })
    }
  } catch (error) {
    console.error('Error en validación de token:', error.message)
    return res.status(401).json({ error: 'Error en la autenticación' })
  }
}

// Middleware para registrar consultas
const logRequests = (req, res, next) => {
  const timestamp = new Date().toISOString()
  const { method, url, ip } = req
  console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`)
  next()
}

module.exports = {
  checkCredentials,
  validateToken,
  logRequests
} 
