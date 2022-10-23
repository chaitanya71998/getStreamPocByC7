import React from "react"
import ReactDOM from "react-dom"
import "bulma/css/bulma.css"
import App from "./App"
import { BrowserRouter as Router, Switch } from "react-router-dom"
import { Route } from "react-router"

import { createBrowserHistory } from "history"
import Home from "./Home"
import HashTagFeed from "./HashTagFeed"
import ProtectedRoute from "./Components/ProtectedRoute"
import { PersonalizedFeed } from "./Components/PersonalizedFeed"
const history = createBrowserHistory()

const rootElement = document.getElementById("root")

const RenderRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route path={"/personalizedFeed"} component={PersonalizedFeed} />
        <Route path={"/getStreamPocByC7"} component={Home} />
        <Route path={"/hashtag/:hash_tag"} component={HashTagFeed} />
        <Route path={"/timeline"} component={App} />
        <Route path={"/"} component={Home} />
      </Switch>
    </Router>
  )
}
ReactDOM.render(
  <React.StrictMode>
    <ProtectedRoute component={RenderRoutes} />
  </React.StrictMode>,
  rootElement
)
