import React, { useState } from "react"
import { CommentRepliesTextArea } from "./CommentReplies"

export const CustomCommentItem = (props) => {
  let prevReplies = []
  if (props.comment.latest_children.replies) {
    prevReplies = props.comment.latest_children.replies.map(
      (val) => val.data.text
    )
  }
  const [replies, setReplies] = useState(prevReplies)
  const onSubmitReply = async ({ text, setText, onSuccess }) => {
    await props.client.reactions
      .addChild("replies", props.comment.id, { text })
      .then((response) => {
        setText("")
        setReplies((oldArray) => [...oldArray, text])
        if (typeof onSuccess === "function") {
          onSuccess()
        }
      })
      .catch((e) => {
        console.log(e, "error at adding reply")
      })
  }

  return (
    <>
      <div>{props.comment.data.text}</div>
      {replies?.map((val) => (
        <li>
          {val}
          <br />
        </li>
      ))}
      <CommentRepliesTextArea
        placeholder={"add reply"}
        activity={props.activity}
        onSubmitReply={onSubmitReply}
      />
    </>
  )
}
