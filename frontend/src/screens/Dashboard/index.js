import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Loader, Dimmer } from "semantic-ui-react";
import { getAssets, logout } from "../../util/api";
import { populateAssets } from "../../store/actions";

const handleLogout = () => logout()
  .then(() => window.location.reload());

const DashboardContent = ({ assets, populateAssets }) => {
  const [isFetching, setIsFetching] = useState(false);
  if (isFetching || !assets || Object.keys(assets).length < 1) {
    if (!isFetching) {
      setIsFetching(true);
      getAssets().then(data => populateAssets(data)).then(() => setIsFetching(false));
    }
    return (<Dimmer active><Loader size='massive'>Loading</Loader></Dimmer>);
  }

  return JSON.stringify(assets);
};

const Dashboard = ({ assets, populateAssets }) => (
  <div>
    <h1>DASHBOARD</h1>
    <DashboardContent assets={assets} populateAssets={populateAssets} />
    <Button onClick={handleLogout}>Logout</Button>
  </div>
);

const mapStateToProps = ({ assets }) => ({
  assets,
});

export default connect(mapStateToProps, { populateAssets })(Dashboard);
