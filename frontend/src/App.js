import React, {Fragment} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route, Redirect
} from "react-router-dom";
import Cookie from "js-cookie";
import Dashboard from "./screens/Dashboard";
import Login from "./screens/Login";
import NavBar from "./components/NavBar";

export const paths = {
  root: "/",
  login: "/login",
  assets: "/assets",
  summary: "/summary",
  reports: "/reports",
  settings: "/settings",
  notifications: "/notifications"
};

const defaultPath = paths.assets;

const PlaceHolder = ({ text }) => (<h1>{text}</h1>);


function App() {
  return (
    <Router>
      <Switch>
        {Cookie.get("authCookie") ? (
          <Fragment>
            <NavBar />
            <Route path={paths.assets}>
              <Dashboard />
            </Route>
            <Route path={paths.summary}>
              <PlaceHolder text="Summary" />
            </Route>
            <Route path={paths.reports}>
              <PlaceHolder text="Reports" />
            </Route>
            <Route path={paths.settings}>
              <PlaceHolder text="Settings" />
            </Route>
            <Route path={paths.notifications}>
              <PlaceHolder text="Notifications" />
            </Route>
            <Route path={paths.root}>
              <Redirect to={defaultPath} />
            </Route>
          </Fragment>
        ) : (
          <Fragment>
            <Route path={paths.login}>
              <Login />
            </Route>
            <Route path={paths.root}>
              <Redirect to={paths.login} />
            </Route>
          </Fragment>
        )}
      </Switch>
    </Router>
  );
}

export default App;
