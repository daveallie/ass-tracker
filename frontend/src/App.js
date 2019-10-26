import React, {Fragment} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route, Redirect
} from "react-router-dom";
import Cookie from "js-cookie";
import Dashboard from "./screens/Dashboard";
import Login from "./screens/Login";

function App() {
  return (
    <Router>
      <Switch>
        {Cookie.get("authCookie") ? (
          <Fragment>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/">
              <Redirect to={"/dashboard"} />
            </Route>
          </Fragment>
        ) : (
          <Fragment>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Redirect to={"/login"} />
            </Route>
          </Fragment>
        )}
      </Switch>
    </Router>
  );
}

export default App;
