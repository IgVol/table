import React, {Component} from 'react'

const sampleData = [
  {
    'name': 'John',
    'age': '17',
  },
  {
    'name': 'Viek',
    'age': '19',
    'family': 'KIA'
  },
  {
    'name': 'Agel',
    'age': '21',
    'family': 'Father'
  },
  {
    'name': 'asdf',
    'asdf': 'asdfsadf'
  }
]

export default class Table extends Component {
  constructor (props) {
    super(props)

    this.state = {
      tableData: null,
      headers: null
    }
    
    this.mapDataToGrid = this.mapDataToGrid.bind(this)
    this.getHeaders = this.getHeaders.bind(this)
    this.renderHeaders = this.renderHeaders.bind(this)
    this.renderTable = this.renderTable.bind(this)
    this.sorting = this.sorting.bind(this)
  }
  componentDidMount () {
    this.mapDataToGrid(sampleData, this.getHeaders(sampleData))
  }
  mapDataToGrid (data, headers) {
    const tableData = data.map((obj, index) => {
      const row = {data: {}, metadata: {}} 
      headers.forEach(header => row.data[header.name] = obj[header.name] || '' )
      row.metadata.index = index
      return row
    })
    this.setState({tableData})
  }
  getHeaders (data) {
    let headers = []
    data.forEach(obj => Object.keys(obj).forEach(key => {
      if (!headers.includes(key)) headers.push(key)
    }))
    headers = headers.map(header => ({
      name: header,
      sorted: 'none'
    }))
    this.setState({headers})
    return headers
  }
  renderHeaders () {
    const headers = this.state.headers
    if (headers) return (
      <tr>
        {(() => headers.map((header, index) =>
          <th key={`header-${index}`} onClick={() => this.sorting(header.name)}> {header.name} </th>)
        )()}
      </tr>)
    return null
  }
  renderTable () {
    const tableData = this.state.tableData
    if (tableData) return tableData.map((row, index) => 
      (<tr key={`tr-${index}`}>
        {Object.keys(row.data).map(key => (
          <td key={`td-${key}`}> {row.data[key]}</td>
        ))}
      </tr>))
    return null
  }
  sorting (field) {
    let headers = this.state.headers
    let header = headers && headers.find(obj => obj.name === field)
    
    let tableData = this.state.tableData
    if (header && tableData) {
      let headerIndex = headers.indexOf(header)
      switch (header.sorted) {
        case 'none': {
          console.log('none')
          tableData.sort( (a,b) => a.data[field] > b.data[field] ? 1 : -1 )
          header = Object.assign({}, header, {sorted: 'descending'})
          break
        }
        case 'ascending': {
          console.log('ascending')
          tableData.sort( (a,b) => a.data[field] > b.data[field] ? 1 : -1 )
          header = Object.assign({}, header, {sorted: 'descending'})
          break
        } 
        case 'descending': {
          console.log('descending')
          tableData.sort( (a,b) => a.data[field] > b.data[field] ? -1 : 1 )
          header = Object.assign({}, header, {sorted: 'ascending'})
          break
        }
        default: {
          console.log('default')
          break
        }
      }
      headers = headers.map((obj, index) => {
        if (index === headerIndex) { 
          return header
        }
        return Object.assign({}, obj, {sorted: 'none'})
      })
      this.setState(Object.assign({}, this.state, {tableData}, {headers}))
    }
  }
  render () {
    return (
      <table>
        <tbody>
          {this.renderHeaders()}
          {this.renderTable()}
        </tbody>
      </table>
    )
  }
}