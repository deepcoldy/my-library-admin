import React, { Component } from 'react';
// import { Table } from '@icedesign/base';
import axios from 'axios';
import EditableTable from './components/EditableTable';
import BookEditor from './components/BookEditor';

export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.getAllBooks();
  }

  getAllBooks = () => {
    axios.get('/api/books').then((resp) => {
      console.log(resp);
      this.setState({
        data: resp.data,
      });
    });
  }

  addBook = ({
    name,
    writer,
    publisher,
    totalNumber,
    price,
  }) => {
    return axios.post('/api/books/add', {
      name,
      writer,
      publisher,
      total_number: totalNumber,
      price,
    }).then((resp) => {
      console.log(resp);
      this.setState({
        data: [
          resp.data[0],
          ...this.state.data,
        ],
      });
    });
  }

  editBook = (id, valueKey, value) => {
    axios.post('/api/books/edit', {
      id, valueKey, value,
    }).then((resp) => {
      console.log(resp);
      this.setState({
        data: this.state.data.map((item) => {
          if (item.id === id) item[valueKey] = value;
          return item;
        }),
      });
    });
  }

  deleteBook = (id) => {
    axios.get('/api/books/delete', {
      params: { id },
    }).then(() => {
      const result = [];
      this.state.data.map((item) => {
        if (item.id !== id) result.push(item);
        return false;
      });
      this.setState({
        data: result,
      });
    });
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
        <BookEditor
          addBook={this.addBook}
        />
        <EditableTable
          data={this.state.data}
          deleteBook={this.deleteBook}
          editBook={this.editBook}
        />
      </div>
    );
  }
}
