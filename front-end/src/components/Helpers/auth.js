export const getTokenFromLocalStorage = () => {
  return window.localStorage.getItem('token')
}

export const getPayLoad = () => {
  const token = getTokenFromLocalStorage()
  if (!token) return
  const splitToken = token.split('.')
  if (splitToken.length < 3) return
  const payLoadString = splitToken[1]
  return JSON.parse(atob(payLoadString))
}