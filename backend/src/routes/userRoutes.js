const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { checkCredentials, validateToken } = require('../middlewares/authMiddleware')

// Registro de usuarios
router.post('/usuarios', checkCredentials, userController.register)

// Login de usuarios
router.post('/login', checkCredentials, userController.login)

// Obtener perfil de usuario (protegida con token)
router.get('/usuarios', validateToken, userController.getProfile)

module.exports = router 
