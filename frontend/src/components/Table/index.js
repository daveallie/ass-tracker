import React from 'react'
import {Table } from 'semantic-ui-react'
import Row from '../Row/index'

const TableContent = ({assets}) => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Number Plate</Table.HeaderCell>
        <Table.HeaderCell>Service Schedule in Hours</Table.HeaderCell>
        <Table.HeaderCell>Hours Since Last Schedule</Table.HeaderCell>
        <Table.HeaderCell>Life Cycle</Table.HeaderCell>
        <Table.HeaderCell>Total Hours Used</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
        {Object.values(assets).map(asset => (
            <Row asset={asset} key={asset.id} />
        ))}
    </Table.Body>
    </Table>

)

export default TableContent