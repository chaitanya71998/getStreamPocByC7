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
import { CustomCommentItem } from "./CustomCommentItem"

import { StreamClient } from "getstream"

export const TimeLineFeeds = ({
  username,
  userToken,
  onClickHashtag,
  onClickMention,
}) => {
  const client = new StreamClient(API_KEY, userToken, APP_ID)

  const onClickLike = (props) => {}
  return (
    <>
      <Title>{username ?? "Chaitanya"} Timeline</Title>
      <StreamApp apiKey={API_KEY} appId={APP_ID} token={userToken}>
        <FlatFeed
          notify
          feedGroup={"timeline"}
          id={username}
          Activity={(props) => {
            return (
              <Activity
                {...props}
                onClickHashtag={onClickHashtag}
                onClickMention={onClickMention}
                Footer={() => {
                  return (
                    <div style={{ padding: "6px 8px" }}>
                      <div
                        onClick={() => {
                          onClickLike(props)
                        }}
                      >
                        <LikeButton {...props} />
                      </div>
                      <CommentField
                        activity={props.activity}
                        onAddReaction={props.onAddReaction}
                        targetFeeds={[`user_activities:${username}`]}
                      />
                      <div style={{ padding: "6px 8px" }}>
                        <CommentList
                          activityId={props.activity.id}
                          CommentItem={(props) => {
                            return (
                              <CustomCommentItem client={client} {...props} />
                            )
                          }}
                        />
                      </div>
                    </div>
                  )
                }}
              />
            )
          }}
        />
      </StreamApp>
    </>
  )
}
