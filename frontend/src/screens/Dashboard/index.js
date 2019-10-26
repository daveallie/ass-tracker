import React, {Fragment, useState} from "react";
import { connect } from "react-redux";
import {Loader, Dimmer, ButtonGroup, Button} from "semantic-ui-react";
import { getAssets } from "../../util/api";
import { populateAssets } from "../../store/actions";
import styles from "./styles.module.css";

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

const DashboardTable = ({ assets }) => (`Yo table here! -- ${Object.keys(assets).length} assets`);

const DashboardContent = ({ assets }) => {
  const [currentType, setCurrentType] = useState("car");

  return (
    <Fragment>
      <DashboardActions currentType={currentType} onTypeChange={(newType) => setCurrentType(newType)}/>
      <DashboardTable assets={currentType === "car" ? assets : {}}/>
    </Fragment>
  );
}

const Dashboard = ({ assets, populateAssets }) => {
  const [isFetching, setIsFetching] = useState(false);

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
