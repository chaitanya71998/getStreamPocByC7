import React from "react"
import {
  StreamApp,
  NotificationDropdown,
  FlatFeed,
  Activity,
  LikeButton,
  CommentField,
  CommentList,
  StatusUpdateForm,
  Title,
} from "react-activity-feed"
import "react-activity-feed/dist/index.css"
import "./styles.css"
import { withRouter } from "react-router-dom"
import usersData from "./users.json"
import { observer } from "mobx-react"
import { observable } from "mobx"
import { getActivitiesToBeUpdatedList } from "./utils/textUtils"
import { StreamClient } from "getstream"
import { API_KEY, APP_ID } from "./Constants/envVariables"
import { FlexDiv } from "./Components/styledComponents"
import { FollowersAndFollowings } from "./Components/FollowersAndFollowings"

@observer
class App extends React.Component {
  client
  remoteClient
  token
  id
  @observable followers
  @observable followings
  componentDidMount() {
    this.client = new StreamClient(API_KEY, this.getUserToken(), APP_ID)
  }

  getUserToken = () => {
    return usersData[this.props.match.params.user_id]?.token
  }

  getUserName = () => {
    return usersData[this.props.match.params.user_id]?.id
  }

  onClickMention = (word) => {
    this.props.history.push(`/${word}`)
  }

  onClickHashtag = (word) => {
    this.props.history.push(`/hashtag/${word}`)
  }

  renderTimelineFeed = () => {
    const token =
      this.getUserToken() ??
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiQ2hhaXRhbnlhIn0.qQ9mi3MujuS0UpN8ipwsrujuZ3HQsJBTXufcKyOwJl8"
    return (
      <>
        <Title>{this.getUserName() ?? "Chaitanya"} Timeline</Title>
        <br />
        <StreamApp apiKey={API_KEY} appId={APP_ID} token={token}>
          <FlatFeed
            notify
            feedGroup={"timeline"}
            Activity={(props) => {
              return (
                <Activity
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
                />
              )
            }}
          />
        </StreamApp>
      </>
    )
  }

  renderAggregatedFeed = () => {
    const token =
      this.getUserToken() ??
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiQ2hhaXRhbnlhIn0.qQ9mi3MujuS0UpN8ipwsrujuZ3HQsJBTXufcKyOwJl8"
    return (
      <>
        <Title>{this.getUserName() ?? "Chaitanya"} Aggregated Feed</Title>
        <br />
        <StreamApp apiKey={API_KEY} appId={APP_ID} token={token}>
          <FlatFeed
            notify
            feedGroup={"hashtags"}
            userId={"chaitanya"}
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
  renderFeeds = () => {
    return (
      <>
        {/* {this.renderAggregatedFeed()} */}
        {this.renderTimelineFeed()}
      </>
    )
  }

  renderFollowers = () => {}

  renderFollowings = () => {}

  renderOtherUsers = () => {}

  render() {
    const token =
      this.getUserToken() ??
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiQ2hhaXRhbnlhIn0.qQ9mi3MujuS0UpN8ipwsrujuZ3HQsJBTXufcKyOwJl8"
    const id = this.getUserName() ?? "Chaitanya"
    return (
      <>
        <Title size={20}>I am {id}</Title>
        <br />
        <StreamApp apiKey={API_KEY} appId={APP_ID} token={token}>
          <NotificationDropdown notify />
          <br />
          <FollowersAndFollowings
            history={this.props.history}
            userToken={token}
            username={id}
          />
          <FlexDiv>
            <StatusUpdateForm
              Header={<Title>Want to Post you activity</Title>}
              feedGroup="timeline"
              userId={id}
              onSuccess={this.onSuccessUpdateStatus}
              trigger={this.onTrigger}
              modifyActivityData={(activity) => {
                let additionalFeedTargets = [
                  "notification:Issac",
                  "notification:Chaitanya",
                ]
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
            {this.renderOtherUsers()}
          </FlexDiv>
        </StreamApp>
        <br />
        {this.renderFeeds()}
      </>
    )
  }
}

export default withRouter(App)
