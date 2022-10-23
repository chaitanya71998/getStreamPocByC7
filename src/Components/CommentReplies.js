import React, { useRef, useState, useEffect } from "react"
import classNames from "classnames"
import {
  Button,
  Textarea,
  Avatar,
  useFeedContext,
  useTranslationContext,
} from "react-activity-feed"
import { inputValueFromEvent } from "react-activity-feed/dist/utils"

export const CommentRepliesTextArea = ({
  activity,
  emojiData,
  onSuccess,
  image,
  placeholder,
  trigger,
  targetFeeds,
  className,
  style,
  onSubmitReply,
}) => {
  const feed = useFeedContext()
  const { t } = useTranslationContext()
  const textareaReference = useRef()
  const [text, setText] = useState()

  const handleFormSubmit = async (event) => {
    event.preventDefault()

    if (!text) return
    if (onSubmitReply) {
      onSubmitReply({ text, setText, onSuccess })
    } else {
      try {
        await feed.onAddReaction("comment", activity, { text }, { targetFeeds })
        setText("")
        onSuccess()
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (!textareaReference.current) return

    const handleFormSubmitKey = (event) => {
      const { current: textarea } = textareaReference
      if (event.key === "Enter" && textarea?.nextSibling === null) {
        handleFormSubmit(event)
      }
    }

    textareaReference.current.addEventListener("keydown", handleFormSubmitKey)

    return () =>
      textareaReference.current?.removeEventListener(
        "keydown",
        handleFormSubmitKey
      )
  }, [])

  return (
    <form
      onSubmit={handleFormSubmit}
      className={classNames("raf-comment-field", className)}
      style={style}
    >
      {image && <Avatar image={image} circle size={39} />}
      <div className="raf-comment-field__group">
        <Textarea
          rows={1}
          value={text}
          placeholder={placeholder ?? t("Start Typing...")}
          onChange={(event) =>
            setText((pv) => inputValueFromEvent(event, true) ?? pv)
          }
          emojiData={emojiData}
          trigger={trigger}
          maxLength={280}
          innerRef={(element) => (textareaReference.current = element)}
        />
        <Button buttonStyle="primary" disabled={!text} type="submit">
          {"Reply"}
        </Button>
      </div>
    </form>
  )
}
