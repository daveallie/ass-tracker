import React, {Fragment} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route, Redirect
} from "react-router-dom";
import Cookie from "js-cookie";

function Login() {
  return (
    <h1>LOGIN</h1>
  )
}

function Dashboard() {
  return (
    <h1>DASHBOARD</h1>
  )
}

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
