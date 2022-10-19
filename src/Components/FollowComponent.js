import React from "react"
export const FollowComponent = ({ userName, isUserFollowing, userFeed }) => {
  onClickFollowOrUnFollow = () => {
    //need to call userFeed follow or unfollow api
  }
  return (
    <>
      <span>{userName}</span>{" "}
      <button>{isUserFollowing ? "unFollow" : "Follow"}</button>
    </>
  )
}
