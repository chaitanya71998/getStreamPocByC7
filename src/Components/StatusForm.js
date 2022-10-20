import React from "react"

import { StatusUpdateForm, Title } from "react-activity-feed"
import { getActivitiesToBeUpdatedList } from "../utils/textUtils"

export const StatusForm = ({ userName }) => {
  return (
    <>
      <StatusUpdateForm
        Header={<Title>Want to Post you activity</Title>}
        feedGroup="timeline"
        userId={userName}
        modifyActivityData={(activity) => {
          let additionalFeedTargets = []
          let targetFields = getActivitiesToBeUpdatedList(activity)
          if (targetFields.length) {
            additionalFeedTargets.push(...targetFields)
          }
          return {
            ...activity,
            to: additionalFeedTargets,
          }
        }}
      />
    </>
  )
}
