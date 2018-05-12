import React, { Component } from 'react';
// import { Table } from '@icedesign/base';
import EditableTable from './components/EditableTable';
import BookEditor from './components/BookEditor';

export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  render() {
    return (
      <div>
        <div className="home-page" />
        {/* <Table dataSource={this.state.data}>
          <Table.Column title="序号" dataIndex="id" />
          <Table.Column title="书名" dataIndex="name" />
          <Table.Column title="作者" dataIndex="writer" />
          <Table.Column title="出版社" dataIndex="publisher" />
          <Table.Column title="馆藏" dataIndex="total_number" />
          <Table.Column title="在馆" dataIndex="available_number" />
          <Table.Column title="录入日期" dataIndex="date" />
          <Table.Column title="价格" dataIndex="price" />
        </Table> */}
        <BookEditor />
        <EditableTable />
      </div>
    );
  }
}
