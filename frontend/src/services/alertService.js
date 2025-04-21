import Swal from 'sweetalert2'

// Alerta de éxito
export const showSuccessAlert = (title, text) => {
  return Swal.fire({
    title,
    text,
    icon: 'success',
    confirmButtonText: 'OK',
    confirmButtonColor: '#3c6e71'
  })
}

// Alerta de error
export const showErrorAlert = (title, text) => {
  return Swal.fire({
    title,
    text,
    icon: 'error',
    confirmButtonText: 'OK',
    confirmButtonColor: '#3c6e71'
  })
}

// Alerta de información
export const showInfoAlert = (title, text) => {
  return Swal.fire({
    title,
    text,
    icon: 'info',
    confirmButtonText: 'OK',
    confirmButtonColor: '#3c6e71'
  })
}

// Alerta de advertencia
export const showWarningAlert = (title, text) => {
  return Swal.fire({
    title,
    text,
    icon: 'warning',
    confirmButtonText: 'OK',
    confirmButtonColor: '#3c6e71'
  })
}

// Alerta de confirmación
export const showConfirmAlert = (title, text, confirmButtonText = 'Sí', cancelButtonText = 'No') => {
  return Swal.fire({
    title,
    text,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    confirmButtonColor: '#3c6e71',
    cancelButtonColor: '#d33'
  })
} 