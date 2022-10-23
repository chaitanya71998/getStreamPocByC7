import React, { useEffect } from "react"

import { API_KEY, APP_ID } from "../Constants/envVariables"
import { StreamApp, Title } from "react-activity-feed"
import { getLocalUserToken, getLocalUserName } from "../utils/localStorage"
import { StreamClient } from "getstream"

export const PersonalizedFeed = ({
  username = getLocalUserName(),
  userToken = getLocalUserToken(),
}) => {
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const client = new StreamClient(API_KEY, userToken, APP_ID)
    const params = {
      user_id: username,
      source_feed_slug: "timeline",
      target_feed_slug: "user",
    }

    client.personalization.get("discovery_feed", params).then(
      (resolution) => console.log(resolution["response"]["data"]),
      (rejection) => console.log(rejection)
    )
  }
  return (
    <>
      <Title>{username} PersonalizedFeed</Title>
      <StreamApp apiKey={API_KEY} appId={APP_ID} token={userToken}></StreamApp>
    </>
  )
}
