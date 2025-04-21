import { useState, useEffect } from 'react'
import { getToken } from '../utils/authUtils'
import { getUserProfile } from '../services/userService'

/**
 * Hook para gestionar el estado del usuario autenticado
 * @returns {Object} { developer, setDeveloper, isLoading }
 */
const useDeveloper = () => {
  const [developer, setDeveloperState] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Método para actualizar el estado del usuario
  const setDeveloper = (userData) => {
    if (userData === undefined) {
      // Si no se proporciona userData, limpia el estado
      setDeveloperState(null)
      return
    }

    // Asegura que siempre se guarde como objeto
    setDeveloperState(userData || null)
  }

  // Cargar datos del usuario al iniciar si hay un token
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = getToken()
        if (!token) {
          setIsLoading(false)
          return
        }

        const { data } = await getUserProfile(token)
        if (data) {
          setDeveloper(data)
        }
      } catch (error) {
        console.error('Error al cargar datos del usuario:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUserData()
  }, [])

  return { 
    developer,         // Datos del usuario
    setDeveloper,      // Función para actualizar los datos
    isLoading          // Indicador de carga inicial
  }
}

export default useDeveloper
