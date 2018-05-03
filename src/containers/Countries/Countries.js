import React, { Component } from 'react';
import { Table } from 'antd';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

// const test = (id, context) => {
//   console.log('id', id);
//   console.log('context', context);
// };

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    render: id => (<NavLink to={'/countries/' + id}>{id}</NavLink>)
    // render: text => (<a href="#" onClick={() => test(text, this)}>{text}</a>)
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Iso Code Two',
    dataIndex: 'isoCodeTwo',
    key: 'isoCodeTwo'
  },
  {
    title: 'Iso Code Three',
    dataIndex: 'isoCodeThree',
    key: 'isoCodeThree'
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description'
}];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

class Countries extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    axios.get('/proxy/countries').then(response => {
      console.log('response', response);
      this.setState({data: response.data.content});
      console.log('state', this.state);
    })
  }

  render() {
    return (
      <Table dataSource={this.state.data} columns={columns} rowSelection={rowSelection} bordered/>
    )
  }
}

export default Countries;
