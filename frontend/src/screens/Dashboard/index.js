import React, { useState } from "react";
import { connect } from "react-redux";
import { Loader, Dimmer } from "semantic-ui-react";
import { getAssets } from "../../util/api";
import { populateAssets } from "../../store/actions";

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
    <DashboardContent assets={assets} populateAssets={populateAssets} />
  </div>
);

const mapStateToProps = ({ assets }) => ({
  assets,
});

export default connect(mapStateToProps, { populateAssets })(Dashboard);
