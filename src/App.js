import React from "react";
import {
  StreamApp,
  NotificationDropdown,
  FlatFeed,
  Activity,
  LikeButton,
  CommentField,
  CommentList,
  StatusUpdateForm, Title
} from "react-activity-feed";
import "react-activity-feed/dist/index.css";
import "./styles.css";
import { withRouter } from 'react-router-dom'
import usersData from './users.json'
import { observer } from "mobx-react";
import { observable } from "mobx";
import { addHashTagsAndMentionsFeeds } from "./utils/textUtils";
import { StreamClient } from "getstream";

const API_KEY = "5nr74n2ybm7z"
const APP_ID = "1215105"

class App extends React.Component {
  client

  componentDidMount() {
    this.client = new StreamClient(API_KEY, this.getUserToken(), APP_ID)
  }


  getUserToken = () => {
    // console.log(this.props.match.params.user_id, usersData[this.props.match.params.user_id]?.token)
    return usersData[this.props.match.params.user_id]?.token
  }

  getUserName = () => {
    // console.log(this.props.match.params.user_id, usersData[this.props.match.params.user_id]?.id)
    return usersData[this.props.match.params.user_id]?.id
  }


  onClickHashtag = (word) => {

    // createAndNavigateToHashtag(this.props.history, word)
  }

  onModifyActivityData = (props) => {
    console.log(props, 'onModifyActivityData')
  }

  onSuccessUpdateStatus = (props) => {
    addHashTagsAndMentionsFeeds(this.client, props)
    console.log(props, "onSuccessUpdateStatus")
  }

  onTrigger = (props) => {
    console.log(props, "onTrigger")
  }

  onClickMention = (word) => {
    console.log(word, "mention")
  }
  onClickHashtag = (word) => {
    console.log(word, "hashtag")

  }
  render() {
    const token = this.getUserToken() ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiQ2hhaXRhbnlhIn0.qQ9mi3MujuS0UpN8ipwsrujuZ3HQsJBTXufcKyOwJl8"
    const id = this.getUserName() ?? 'Chaitanya'
    return (
      <>
        <Title size={20}>I am {id}</Title>
        <StreamApp
          apiKey={API_KEY}
          appId={APP_ID}
          token={token}
        >
          <NotificationDropdown notify />
          <div>
            <StatusUpdateForm feedGroup="timeline" userId={id} onSuccess={this.onSuccessUpdateStatus} trigger={this.onTrigger} />
          </div>
          <FlatFeed
            notify
            Activity={(props) => {
              console.log(props)
              return (<Activity
                {...props}
                onClickHashtag={this.onClickHashtag}
                onClickMention={this.onClickMention}
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
              />)
            }
            }
          />
        </StreamApp>
      </>
    );
  }
}

export default withRouter(App);
