// // This is just a javascript file that holds some functions which can be exported to other places
export const getTokenFromLocalStorage = () => {
  return window.localStorage.getItem('token') // - use the key to get the token, key value pairs
}
export const getPayLoad = () => {
  const token = getTokenFromLocalStorage()
  // you want to do a check to see if there is a token on Local Storage
  if (!token) return
  // When you look at the token in the JWT decoder you need to split the token into those parts
  // You can use split to split the token at the .
  // Then you will have an array of three strings to access the parts indivdually
  const splitToken = token.split('.') // this splits the token into three strings inside an array
  // check to see if token is in the correct format
  if (splitToken.length < 3) return // this will check the length of the token to see if its the right one
  // payload will always be at access 1
  console.log('Split Token ->', splitToken)
  console.log('String at 1', splitToken[1]) // - this is where the token is stored
  const payLoadString = splitToken[1]
  // const decodedPayLoad = atob(payLoadString) // this function will decode the payload string
  // This returns a string but we need to convert it into a JS object using JSON.parse()
  const decodedPayLoad = JSON.parse(atob(payLoadString))
  console.log('DECODED ->', decodedPayLoad)
  return JSON.parse(atob(payLoadString))
}











