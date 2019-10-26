import React from 'react'
import { Progress } from 'semantic-ui-react'

const percentToColor = (percent) => {
  if (percent <= 50) {
    return "green";
  } else if (percent <= 80) {
    return "yellow";
  } else if (percent < 100) {
    return "red";
  } else {
    return "darkred";
  }
};

const ProgressBar = (props) => (
  <Progress percent={props.percent} color={percentToColor(props.percent)}/>
);

export default ProgressBar
