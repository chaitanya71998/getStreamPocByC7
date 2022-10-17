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
class App extends React.Component {
  getUserToken = () => {
    // console.log(this.props.match.params.user_id, usersData[this.props.match.params.user_id]?.token)
    return usersData[this.props.match.params.user_id]?.token
  }

  getUserName = () => {
    // console.log(this.props.match.params.user_id, usersData[this.props.match.params.user_id]?.id)
    return usersData[this.props.match.params.user_id]?.id
  }


  render() {
    const token = this.getUserToken() ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiQ2hhaXRhbnlhIn0.qQ9mi3MujuS0UpN8ipwsrujuZ3HQsJBTXufcKyOwJl8"
    const id = this.getUserName() ?? 'Chaitanya'
    return (
      <>
        <Title size={20}>I am {id}</Title>
        <StreamApp
          apiKey="5nr74n2ybm7z"
          appId="1215105"
          token={token}
        >
          <NotificationDropdown notify />
          <div>
            <StatusUpdateForm feedGroup="timeline" userId={id} />
            <div className="card">
              {/* <FontAwesomeIcon icon={faPhotoVideo} />
            <FontAwesomeIcon icon={faBloggerB} style={{ marginLeft: "10px" }} />
            <FontAwesomeIcon
              icon={faQuestionCircle}
              style={{ marginLeft: "10px" }}
            /> */}
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
      </>
    );
  }
}

export default withRouter(App);
