import React from 'react'
import { Progress } from 'semantic-ui-react'

const ProgressBar = (props) => <Progress percent={props.percent} color={(props.percent > 10) ? "red" : "green"}></Progress> 

export default ProgressBar