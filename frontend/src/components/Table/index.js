import React from 'react'
import {Table } from 'semantic-ui-react'
import Row from '../Row/index'

const TableContent = ({assets}) => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Identifier</Table.HeaderCell>
        <Table.HeaderCell>Time Until Service</Table.HeaderCell>
        <Table.HeaderCell width={3}>Life Cycle</Table.HeaderCell>
        <Table.HeaderCell>Total Time Used</Table.HeaderCell>
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
