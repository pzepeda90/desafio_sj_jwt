import axios from 'axios'
import { ENDPOINT } from '../config/constans'

// Obtener datos del perfil del usuario
export const getUserProfile = (token) => {
  return axios.get(ENDPOINT.users, { 
    headers: { Authorization: `Bearer ${token}` } 
  })
}

// Iniciar sesión
export const loginUser = (userData) => {
  return axios.post(ENDPOINT.login, userData)
}

// Registrar usuario
export const registerUser = (userData) => {
  return axios.post(ENDPOINT.users, userData)
} 