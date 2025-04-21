export const URLBASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

export const ENDPOINT = {
  login: `${URLBASE}/login`,
  users: `${URLBASE}/usuarios`
}
