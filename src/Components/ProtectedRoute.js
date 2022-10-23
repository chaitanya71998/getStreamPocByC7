import React from "react"
import { useState } from "react"
import {
  getLocalUserToken,
  setUserLocalToken,
  setLocalUserName,
} from "../utils/localStorage"
import { asyncFetch } from "../services/APIUtils"
import { GET_TOKEN_PREFIX } from "../Constants/fetchURLs"

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const localToken = getLocalUserToken()
  const [token, setToken] = useState(localToken)

  const onSubmit = async (e) => {
    console.log(e)
    e.stopPropagation()
    e.preventDefault()
    const input = document.getElementById("uname")
    await asyncFetch(`${GET_TOKEN_PREFIX}${input.value}/`)
      .then((response) => response.json())
      .then((data) => {
        setLocalUserName(input.value)
        setUserLocalToken(data.user_token)
        input.value = ""
        setToken(data.user_token)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  const renderSignIn = () => {
    return (
      <form onSubmit={onSubmit}>
        <div>
          <label for="uname">Choose a username: </label>
          <input
            type="text"
            id="uname"
            name="name"
            pattern="[A-Za-z]{0,50}"
            required=""
            required
          />
          <span class="validity"></span>
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    )
  }
  const onClickLogout = () => {
    localStorage.clear()
    setToken("")
  }

  return !!token ? (
    <>
      <button onClick={onClickLogout}>Logout</button>
      <br />
      <Component />
    </>
  ) : (
    renderSignIn()
  )
}

export default ProtectedRoute
