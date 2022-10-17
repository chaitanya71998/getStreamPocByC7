import React from "react";
import ReactDOM from "react-dom";
import "bulma/css/bulma.css";
import App from "./App";
import { BrowserRouter as Router, Switch } from 'react-router-dom'



const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Switch>
      <Route path={'/:user_id'} component={App} />
      <Route path={'/'} component={<>Home</>} />

    </Switch>

  </React.StrictMode>,
  rootElement
);
