import React from "react"
import { StreamApp, NotificationDropdown, Title } from "react-activity-feed"
import "react-activity-feed/dist/index.css"
import "./styles.css"
import { withRouter } from "react-router-dom"
import { observer } from "mobx-react"
import { StreamClient } from "getstream"
import { API_KEY, APP_ID } from "./Constants/envVariables"
import { FollowersAndFollowings } from "./Components/FollowersAndFollowings"
import { AggregatedFeeds } from "./Components/AggregatedFeeds"
import { AllFeeds } from "./Components/AllFeeds"
import { getLocalUserName, getLocalUserToken } from "./utils/localStorage"

@observer
class App extends React.Component {
  client

  componentDidMount() {
    this.client = new StreamClient(API_KEY, this.getUserToken(), APP_ID)
  }

  getUserToken = () => {
    return getLocalUserToken()
  }

  getUserName = () => {
    return getLocalUserName()
  }

  onClickMention = (word) => {
    this.props.history.push(`/${word.toLowerCase()}?mentions=true`)
  }

  onClickHashtag = (word) => {
    this.props.history.push(`/hashtag/${word}`)
  }

  renderAggregatedFeed = () => {
    const token =
      this.getUserToken() ??
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiQ2hhaXRhbnlhIn0.qQ9mi3MujuS0UpN8ipwsrujuZ3HQsJBTXufcKyOwJl8"
    return (
      <>
        <AggregatedFeeds
          history={this.props.history}
          userToken={token}
          username={this.getUserName()}
          onClickHashtag={this.onClickHashtag}
          onClickMention={this.onClickMention}
        />
      </>
    )
  }

  render() {
    const token =
      this.getUserToken() ??
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiQ2hhaXRhbnlhIn0.qQ9mi3MujuS0UpN8ipwsrujuZ3HQsJBTXufcKyOwJl8"
    const id = this.getUserName() ?? "Chaitanya"
    const searchParams = new URLSearchParams(this.props.location.search)
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

          <AllFeeds
            history={this.props.history}
            userToken={token}
            username={this.getUserName()}
            onClickHashtag={this.onClickHashtag}
            onClickMention={this.onClickMention}
            shouldShowMentions={searchParams.get("mentions") === "true"}
          />
        </StreamApp>
      </>
    )
  }
}

export default withRouter(App)
