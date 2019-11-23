import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.0.0";
import "assets/demo/demo.css";

import Main from "views/Main.jsx";
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/main" render={props => <Main {...props} />} />
      <Redirect from="/" to="/main" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
