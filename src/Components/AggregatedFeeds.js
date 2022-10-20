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
export const AggregatedFeeds = ({
  username,
  userToken,
  onClickHashtag,
  onClickMention,
}) => {
  return (
    <>
      <Title>{username ?? "Chaitanya"} Aggregated</Title>
      <StreamApp apiKey={API_KEY} appId={APP_ID} token={userToken}>
        <FlatFeed
          notify
          feedGroup={"user_activities"}
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
