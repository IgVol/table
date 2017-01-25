import React, {Component} from 'react'
import Table from './table'

export default class TableWrapper extends Component {
  constructor (props) {
    super(props)
    this.sampleData = [
        {
    'columnName': 'name',
    'order': 9,
    'locked': false,
    'visible': true,
    'displayName': 'Employee Name'
  },
  {
    'columnName': 'city',
    'order': 8,
    'locked': false,
    'visible': true
  },
  {
    'columnName': 'state',
    'order': 7,
    'locked': false,
    'visible': true
  },
  {
    'columnName': 'country',
    'order': 6,
    'locked': false,
    'visible': true
  },
  {
    'columnName': 'company',
    'order': 5,
    'locked': false,
    'visible': true
  },
  {
    'columnName': 'favoriteNumber',
    'order':  4,
    'locked': false,
    'visible': true,
    'displayName': 'Favorite Number',
    'sortable': false
  }
    ]
  }

  render () {
    return (
      <Table data={this.sampleData} />
    )
  }
}