import React from "react"
import { Link } from "react-router-dom"
import { getLocalUserName } from "./utils/localStorage"

class Home extends React.Component {
  render() {
    return (
      <>
        <Link to={`/timeline`} exact={true}>
          got to{getLocalUserName()} timeline?
        </Link>
        <br />
        <Link to={`/personalizedFeed`} exact={true}>
          got to{getLocalUserName()} personalized?
        </Link>
      </>
    )
  }
}

export default Home
