import React, {Component, PropTypes} from 'react'
// TODO props action change option as object not function
export default class Table extends Component {
  constructor (props) {
    super(props)

    this.state = {
      tableData: null,
      headers: null,
      toggleAll: false
    }
    
    this.mapDataToGrid = this.mapDataToGrid.bind(this)
    this.getHeaders = this.getHeaders.bind(this)
    this.renderHeaders = this.renderHeaders.bind(this)
    this.renderTable = this.renderTable.bind(this)
    this.sorting = this.sorting.bind(this)
    this.toggleAllChecked = this.toggleAllChecked.bind(this)
  }
  static propTypes = {
    data: PropTypes.array.isRequired
  }
  componentDidMount () {
    const data = this.props.data
    this.mapDataToGrid(data, this.getHeaders(data))
  }
  mapDataToGrid (data, headers) {
    const tableData = data.map((obj, index) => {
      const row = {data: {}, metadata: {}} 
      headers.forEach(header => row.data[header.name] = obj[header.name] || '' )
      row.metadata.index = index
      row.metadata.checked = false
      return row
    })
   
    this.setState({tableData})
  }
  getHeaders (data) {
    let headers = []
    const includesKey = key => !headers.includes(key)
    data.forEach(obj => Object.keys(obj)
      .filter(includesKey)
      .forEach(key => headers = [...headers, key]))
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
        <th><input type="checkbox" checked={this.state.toggleAll} onChange={this.toggleAllChecked} /> </th>
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
        <td> <input type="checkbox" checked={row.metadata.checked} onChange={() => this.toggleChecked(row)} /> </td>
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
          tableData.sort( (a,b) => a.data[field] > b.data[field] ? 1 : -1 )
          header = Object.assign({}, header, {sorted: 'descending'})
          break
        }
        case 'ascending': {
          tableData.sort( (a,b) => a.data[field] > b.data[field] ? 1 : -1 )
          header = Object.assign({}, header, {sorted: 'descending'})
          break
        } 
        case 'descending': {
          tableData.sort( (a,b) => a.data[field] > b.data[field] ? -1 : 1 )
          header = Object.assign({}, header, {sorted: 'ascending'})
          break
        }
        default: {
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
  toggleChecked (row) {
    const tableData = this.state.tableData
    const index = tableData.indexOf(row)
    row.metadata.checked = !row.metadata.checked
    tableData[index] = row
    this.setState({tableData, toggleAll: false})
  }
  toggleAllChecked () {
    this.state.toggleAll = !this.state.toggleAll
    const tableData = this.state.tableData.map(obj => {
     obj.metadata.checked = this.state.toggleAll
     return obj
    })
    this.setState({tableData})
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