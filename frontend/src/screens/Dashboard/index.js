import React, {Fragment, useState, useEffect} from "react";
import { connect } from "react-redux";
import {Loader, Dimmer, ButtonGroup, Button} from "semantic-ui-react";
import Pusher from "pusher-js";
import { getAssets } from "../../util/api";
import { populateAssets } from "../../store/actions";
import styles from "./styles.module.css";
import TableContent from "../../components/Table";

const AssetTypeToggler = ({ current, onClick }) => {
  return (
    <ButtonGroup>
      <Button active={current === "car"} onClick={() => onClick("car")}>Cars</Button>
      <Button active={current === "ipad"} onClick={() => onClick("ipad")}>iPads</Button>
      <Button active={current === "laptop"} onClick={() => onClick("laptop")}>Laptops</Button>
    </ButtonGroup>
  );
};


const DashboardActions = ({ currentType, onTypeChange }) => (
  <div className={styles.actionsContainer}>
    <AssetTypeToggler current={currentType} onClick={onTypeChange} />
    <Button size="large" primary>Create Asset</Button>
  </div>
);

const DashboardTable = ({ assets }) => <TableContent assets={assets}/>

const DashboardContent = ({ assets }) => {
  const [currentType, setCurrentType] = useState("car");

  return (
    <Fragment>
      <DashboardActions currentType={currentType} onTypeChange={(newType) => setCurrentType(newType)}/>
      <DashboardTable assets={currentType === "car" ? assets : {}}/>
    </Fragment>
  );
};

const Dashboard = ({ assets, populateAssets }) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const pusher = new Pusher('6d9a170dbcbf1cbc739a', {
      cluster: 'ap4',
      forceTLS: true
    });

    const channel = pusher.subscribe('frontend');
    channel.bind('reload', () => {
      console.log("RELOADING PAGE BASED ON UPDATE!");
      getAssets().then(data => populateAssets(data)).then(() => console.log("DONE!"))
    });
  }, []);

  if (isFetching || !assets || Object.keys(assets).length < 1) {
    if (!isFetching) {
      setIsFetching(true);
      getAssets().then(data => populateAssets(data)).then(() => setIsFetching(false));
    }
    return (<Dimmer active><Loader size='massive'>Loading</Loader></Dimmer>);
  }

  return (
    <div className={styles.dashboardContainer}>
      <DashboardContent assets={assets} populateAssets={populateAssets} />
    </div>
  );
};

const mapStateToProps = ({ assets }) => ({
  assets,
});

export default connect(mapStateToProps, { populateAssets })(Dashboard);
