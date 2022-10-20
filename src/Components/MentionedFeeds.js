import React, { useState, useEffect } from "react"

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

export const MentionedFeeds = ({
  history,
  username,
  userToken,
  onClickHashtag,
  onClickMention,
}) => {
  return (
    <>
      <Title>{username} mentions</Title>
      <StreamApp apiKey={API_KEY} appId={APP_ID} token={userToken}>
        <FlatFeed
          notify
          feedGroup={"mentions"}
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
                      <CommentList activityId={props.activity.id} />
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
