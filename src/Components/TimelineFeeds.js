import React, { useState, useEffect } from "react"

import { API_KEY, APP_ID } from "../Constants/envVariables"
import {
  StreamApp,
  NotificationDropdown,
  FlatFeed,
  Activity,
  LikeButton,
  CommentField,
  CommentList,
  StatusUpdateForm,
  Title,
} from "react-activity-feed"
export const TimeLineFeeds = ({
  history,
  username,
  userToken,
  onClickHashtag,
  onClickMention,
}) => {
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
