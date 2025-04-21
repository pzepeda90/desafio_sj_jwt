// Regex para validar formato de email
export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

// Validar email
export const isValidEmail = (email) => {
  return EMAIL_REGEX.test(email)
}

// Validar que todos los campos obligatorios estén presentes
export const areRequiredFieldsPresent = (fields, requiredFields) => {
  return requiredFields.every(field => {
    const value = fields[field]
    return value !== undefined && value !== null && value.trim && value.trim() !== ''
  })
} 