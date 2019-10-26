import React from 'react'
import { Table } from 'semantic-ui-react'
import ProgressBar from '../ProgressBar/index'
import Status from '../Status/index'

const RowContent = ({ asset }) =>

            <Table.Row>
                <Table.Cell>{asset.id}</Table.Cell>
                <Table.Cell>{asset.service_schedule_in_hours}</Table.Cell>
                <Table.Cell>{asset.hours_since_last_service}</Table.Cell>
                <Table.Cell><ProgressBar percent={asset.service_schedule_in_hours/asset.hours_since_last_service}/></Table.Cell>
                <Table.Cell>{asset.total_hours_of_use}</Table.Cell>
                <Table.Cell><Status isOccupied={asset.car_in_use} pic={asset}/></Table.Cell>
            </Table.Row>

export default RowContent