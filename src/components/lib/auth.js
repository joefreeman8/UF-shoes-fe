
const setToken = (token) => {
  localStorage.setItem('token', token)
}

const getToken = () => {
  return localStorage.getItem('token')
}

const logout = () => {
  return localStorage.removeItem('token')
}

const getPayload = () => {
  const token = getToken()
  if (!token) {
    return false
  }
  const parts = token.split('.')
  if (parts.length < 3) {
    return false
  }
  return JSON.parse(Buffer.from(parts[1], 'base64'))
}


const isOwner = (objectId) => {
  return objectId === getPayload().userId
}

export const AUTH = {
  setToken,
  getToken,
  getPayload,
  logout,
  isOwner
}

