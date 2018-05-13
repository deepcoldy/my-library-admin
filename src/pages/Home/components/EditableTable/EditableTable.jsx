import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Table, Button } from '@icedesign/base';
import CellEditor from './CellEditor';
import './EditableTable.scss';

const generatorData = () => {
  return Array.from({ length: 5 }).map((item, index) => {
    return {
      todo: `待办事项 ${index}`,
      memo: `备注说明文案 ${index}`,
      validity: '2017-12-12',
    };
  });
};

export default class EditableTable extends Component {
  static displayName = 'EditableTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      dataSource: generatorData(),
    };
    console.log(this.state.dataSource);
  }

  renderOrder = (value, index) => {
    return <span>{index}</span>;
  };

  deleteItem = (index) => {
    this.state.dataSource.splice(index, 1);
    this.setState({
      dataSource: this.state.dataSource,
    });
  };

  renderOperation = (value, index) => {
    return (
      <Button onClick={this.deleteItem.bind(this, index)} shape="text">
        删除
      </Button>
    );
  };

  changeDataSource = (index, valueKey, value) => {
    this.props.data[index][valueKey] = value;
    this.setState({
      dataSource: this.state.dataSource,
    });
  };

  renderEditor = (valueKey, value, index, record) => {
    console.log(valueKey, value, index, record);
    return (
      <CellEditor
        valueKey={valueKey}
        index={index}
        value={record[valueKey]}
        onChange={this.changeDataSource}
      />
    );
  };

  // addNewItem = () => {
  //   this.state.dataSource.push({
  //     todo: '暂无',
  //     memo: '暂无',
  //     validity: '暂无',
  //   });
  //   this.setState({
  //     dataSource: this.state.dataSource,
  //   });
  // };

  render() {
    console.log('test', this.props.data);
    return (
      <div className="editable-table">
        <IceContainer>
          <Table dataSource={this.props.data} hasBorder={false}>
            {/* <Table.Column width={80} title="顺序" cell={this.renderOrder} /> */}
            <Table.Column
              width={80}
              title="序号"
              cell={this.renderEditor.bind(this, 'id')}
            />
            <Table.Column
              width={240}
              title="书名"
              cell={this.renderEditor.bind(this, 'name')}
            />
            <Table.Column
              width={180}
              title="作者"
              cell={this.renderEditor.bind(this, 'writer')}
            />
            <Table.Column
              width={180}
              title="出版社"
              cell={this.renderEditor.bind(this, 'publisher')}
            />
            <Table.Column
              width={80}
              title="馆藏"
              cell={this.renderEditor.bind(this, 'total_number')}
            />
            <Table.Column
              width={80}
              title="在馆"
              cell={this.renderEditor.bind(this, 'available_number')}
            />
            <Table.Column
              width={180}
              title="录入日期"
              cell={this.renderEditor.bind(this, 'date')}
            />
            <Table.Column
              width={80}
              title="价格"
              cell={this.renderEditor.bind(this, 'price')}
            />
            <Table.Column title="操作" width={80} cell={this.renderOperation} />
          </Table>
          {/* <div onClick={this.addNewItem} style={styles.addNewItem}>
            + 新增一行
          </div> */}
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  addNewItem: {
    background: '#F5F5F5',
    height: 32,
    lineHeight: '32px',
    marginTop: 20,
    cursor: 'pointer',
    textAlign: 'center',
  },
};
