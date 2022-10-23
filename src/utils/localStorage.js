export const getLocalUserToken = () => {
  return localStorage.getItem("user_token")
}

export const setUserLocalToken = (token) => {
  return localStorage.setItem("user_token", token)
}

export const setLocalUserName = (userName) => {
  return localStorage.setItem("user_name", userName)
}

export const getLocalUserName = () => {
  return localStorage.getItem("user_name")
}
