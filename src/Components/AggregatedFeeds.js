import React from "react"

import { API_KEY, APP_ID } from "../Constants/envVariables"
import {
  StreamApp,
  FlatFeed,
  Activity,
  LikeButton,
  CommentField,
  CommentList,
  Title,
} from "react-activity-feed"
import { getLocalUserName, getLocalUserToken } from "../utils/localStorage"
import { useEffect } from "react"
import { StreamClient } from "getstream"
export const AggregatedFeeds = ({}) => {
  const username = getLocalUserName()
  const userToken = getLocalUserToken()
  const onClickHashtag = () => {}
  const onClickMention = () => {}

  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = () => {
    const client = new StreamClient(API_KEY, userToken, APP_ID)
    const user = client.feed("user_activities", username)
    user.get({ limit: 10 }).then(function (response) {
      response.results.forEach(function (aggregatedActivity) {
        console.log(aggregatedActivity.group)
      })
    })
  }
  return (
    <>
      <Title>{username ?? "Chaitanya"} Aggregated</Title>
      <StreamApp apiKey={API_KEY} appId={APP_ID} token={userToken}>
        {/* <FlatFeed notify feedGroup={"user_activities"} id={username} /> */}
      </StreamApp>
    </>
  )
}
