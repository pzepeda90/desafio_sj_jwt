// Obtener token de sesión
export const getToken = () => {
  return window.sessionStorage.getItem('token')
}

// Guardar token en sesión
export const saveToken = (token) => {
  window.sessionStorage.setItem('token', token)
}

// Eliminar token y limpiar sesión
export const clearSession = () => {
  window.sessionStorage.removeItem('token')
}

// Verificar si el usuario está autenticado
export const isAuthenticated = () => {
  return !!getToken()
} 