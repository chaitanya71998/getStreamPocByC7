import React from "react";
import { observer, } from 'mobx-react'
import { observable } from 'mobx'
import {
  StreamApp,
  NotificationDropdown,
  FlatFeed,
  Activity,
  LikeButton,
  CommentField,
  CommentList,
  StatusUpdateForm
} from "react-activity-feed";
import "react-activity-feed/dist/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhotoVideo,
  faQuestionCircle
} from "@fortawesome/free-solid-svg-icons";
import { faBloggerB } from "@fortawesome/free-brands-svg-icons";
import "./styles.css";
import { withRouter } from 'react-router-dom'

@observer
class App extends React.Component {

  render() {
    console.log(this.props.match.params.user_id)
    return (
      <StreamApp
        apiKey="5nr74n2ybm7z"
        appId="1215105"
        token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiQ2hhaXRhbnlhIn0.qQ9mi3MujuS0UpN8ipwsrujuZ3HQsJBTXufcKyOwJl8"
      >
        <NotificationDropdown notify />
        <div>
          <StatusUpdateForm feedGroup="timeline" userId="Chaitanya" />
          <div className="card">
            <FontAwesomeIcon icon={faPhotoVideo} />
            <FontAwesomeIcon icon={faBloggerB} style={{ marginLeft: "10px" }} />
            <FontAwesomeIcon
              icon={faQuestionCircle}
              style={{ marginLeft: "10px" }}
            />
          </div>
        </div>
        <FlatFeed
          notify
          Activity={(props) => (
            <Activity
              {...props}
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
          )}
        />
      </StreamApp>
    );
  }
}

export default withRouter(App);
