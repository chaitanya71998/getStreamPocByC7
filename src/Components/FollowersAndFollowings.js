import React, { useState, useEffect } from "react"

import { StreamClient } from "getstream"
import { API_KEY, APP_ID } from "../Constants/envVariables"

export const FollowersAndFollowings = ({ history, username, userToken }) => {
  const client = new StreamClient(API_KEY, userToken, APP_ID)
  const [followers, setFollowers] = useState([])
  const [followings, setFollowings] = useState([])
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    let user1 = await client.feed("timeline", username)
    const response = await user1.followers()
    const response2 = await user1.following()
    setFollowers(response)
    setFollowings(response2)
  }
  return (
    <>
      <br />
      {followers.results && <span>Followers: {followers.results.length}</span>}
      <br />
      {followings.results && (
        <span>Followings: {followings.results.length}</span>
      )}
    </>
  )
}
