import React from "react"
import {
  StreamApp,
  FlatFeed,
  Activity,
  LikeButton,
  CommentField,
  CommentList,
  Title,
} from "react-activity-feed"
import "react-activity-feed/dist/index.css"
import "./styles.css"
import { withRouter } from "react-router-dom"
import { observer } from "mobx-react"
import { observable } from "mobx"
import { API_KEY, APP_ID } from "./Constants/envVariables"

@observer
class HashTagFeed extends React.Component {
  @observable hash

  getHash_tag = () => {
    return this.props.match.params.hash_tag
  }

  onClickMention = (word) => {
    this.props.history.push(`/${word}`)
  }

  onClickHashtag = (word) => {
    this.props.history.push(`/hashtag/${word}`)
  }

  onClickUser = () => {}

  render() {
    // token here can be the user logged in
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiQ2hhaXRhbnlhIn0.qQ9mi3MujuS0UpN8ipwsrujuZ3HQsJBTXufcKyOwJl8"
    const id = this.getHash_tag()
    return (
      <>
        <Title>Assuming User is Chaitanya viewing hashtags</Title>
        <br />
        <Title> #{id} feeds</Title>
        <br />
        <StreamApp apiKey={API_KEY} appId={APP_ID} token={token}>
          <FlatFeed
            notify
            feedGroup={"hashtags"}
            userId={id}
            Activity={(props) => {
              return (
                <Activity
                  {...props}
                  onClickHashtag={this.onClickHashtag}
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
}

export default withRouter(HashTagFeed)
