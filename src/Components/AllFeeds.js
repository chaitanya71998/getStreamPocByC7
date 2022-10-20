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
import { MentionedFeeds } from "./MentionedFeeds"
import { StatusForm } from "./StatusForm"
import { TimeLineFeeds } from "./TimelineFeeds"

export const AllFeeds = ({
  history,
  username,
  userToken,
  onClickHashtag,
  onClickMention,
  shouldShowMentions,
}) => {
  const [showMentionedFeeds, setShouldShowMentions] =
    useState(shouldShowMentions)

  const renderFeedMentionedActivities = () => {
    return (
      <MentionedFeeds
        history={history}
        userToken={userToken}
        username={username}
        onClickHashtag={onClickHashtag}
        onClickMention={onClickMention}
      />
    )
  }

  const renderTimelineFeeds = () => {
    return (
      <>
        <TimeLineFeeds
          history={history}
          userToken={userToken}
          username={username}
          onClickHashtag={onClickHashtag}
          onClickMention={onClickMention}
        />
      </>
    )
  }

  const renderFeedActivities = () => {
    return (
      <>
        <StatusForm />
        <br />
        {renderTimelineFeeds()}
      </>
    )
  }

  const onClickMentionFeeds = () => {
    setShouldShowMentions(true)
  }

  const onClickTimelineFeeds = () => {
    setShouldShowMentions(false)
  }

  return (
    <>
      <br />
      <button onClick={onClickTimelineFeeds}>Feeds</button>
      <button onClick={onClickMentionFeeds}>mentions</button>
      {showMentionedFeeds
        ? renderFeedMentionedActivities()
        : renderFeedActivities()}
    </>
  )
}
