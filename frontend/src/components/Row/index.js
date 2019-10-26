import React from 'react'
import { Table } from 'semantic-ui-react'
import ProgressBar from '../ProgressBar/index'
import Status from '../Status/index'

const formatNum = num => `${(Math.round(num * 100) / 100).toLocaleString()}h`;

const RowContent = ({ asset }) => (
  <Table.Row>
    <Table.Cell>{asset.number_plate}</Table.Cell>
    <Table.Cell>{formatNum(asset.hours_since_last_service)} / {formatNum(asset.service_schedule_in_hours)}</Table.Cell>
    <Table.Cell><ProgressBar percent={asset.hours_since_last_service/asset.service_schedule_in_hours * 100}/></Table.Cell>
    <Table.Cell>{formatNum(asset.total_hours_of_use)}</Table.Cell>
      <Table.Cell><Status isOccupied={asset.car_in_use} pic={asset}/></Table.Cell>
  </Table.Row>
);

export default RowContent
