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
                Footer={() => (
                  <div style={{ padding: "6px 8px" }}>
                    <LikeButton {...props} />
                    <CommentField
                      activity={props.activity}
                      onAddReaction={props.onAddReaction}
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
                )}
              />
            )
          }}
        />
      </StreamApp>
    </>
  )
}