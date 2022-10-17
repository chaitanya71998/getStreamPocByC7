import React from "react";
import ReactDOM from "react-dom";
import "bulma/css/bulma.css";
import App from "./App";
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { Route } from 'react-router'

import { createBrowserHistory } from 'history'
import Home from "./Home";
const history = createBrowserHistory()


const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path={'/getStreamPocByC7'} component={Home} />
        <Route path={'/:user_id'} component={App} />
        <Route path={'/'} component={Home} />
      </Switch>
    </Router>
  </React.StrictMode>,
  rootElement
);
