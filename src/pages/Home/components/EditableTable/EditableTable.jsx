import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Table, Button, Overlay } from '@icedesign/base';
import QRCode from 'qrcodejs2';
import CellEditor from './CellEditor';
import './EditableTable.scss';

export default class EditableTable extends Component {
  static displayName = 'EditableTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  renderOperation = (value, index, item) => {
    console.log(value, index, item);
    return (
      <div>
        <Button onClick={this.props.deleteBooks.bind(this, item.id)} shape="text">
          删除
        </Button>
        <span>&nbsp;&nbsp;&nbsp;</span>
        <Button onClick={this.showQrcode.bind(this, item.id)} shape="text">
          二维码
        </Button>
      </div>
    );
  };

  showQrcode = (id) => {
    this.setState({
      visible: true,
    }, () => {
      setTimeout(() => {
        const qrcode = new QRCode(document.getElementById('qrcode'), {
          text: `http://library.iscode.cn/#/borrow?id=${id}`,
          width: 128,
          height: 128,
          colorDark: '#000000',
          colorLight: '#ffffff',
          // correctLevel: QRCode.CorrectLevel.H,
        });
      }, 1);
    });
  }

  renderEditor = (valueKey, value, index, record) => {
    return (
      <CellEditor
        valueKey={valueKey}
        id={record.id}
        value={record[valueKey]}
        onChange={this.props.editBooks}
        allowEdit={valueKey !== 'id'}
      />
    );
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div className="editable-table">
        <IceContainer>
          <Table dataSource={this.props.data} hasBorder={false}>
            <Table.Column
              width={100}
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
              width={100}
              title="馆藏"
              cell={this.renderEditor.bind(this, 'total_number')}
            />
            <Table.Column
              width={100}
              title="在馆"
              cell={this.renderEditor.bind(this, 'available_number')}
            />
            <Table.Column
              width={180}
              title="录入日期"
              cell={this.renderEditor.bind(this, 'date')}
            />
            <Table.Column
              width={100}
              title="价格"
              cell={this.renderEditor.bind(this, 'price')}
            />
            <Table.Column title="操作" width={180} cell={this.renderOperation} />
          </Table>
          {/* <div onClick={this.addNewItem} style={styles.addNewItem}>
            + 新增一行
          </div> */}
          <Overlay
            visible={this.state.visible}
            hasMask
            disableScroll
            align="cc cc"
            safeNode={() => this.refs.target}
            onRequestClose={this.onClose.bind(this)}
          >
            <div id="qrcode" />
          </Overlay>
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
