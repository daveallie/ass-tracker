import React from "react";
import { Button } from "semantic-ui-react";
import { logout } from "../../util/api";

const handleLogout = () => logout()
  .then(() => window.location.reload());

const Dashboard = () => (
  <div>
    <h1>DASHBOARD</h1>
    <Button onClick={handleLogout}>Logout</Button>
  </div>
)

export default Dashboard;
