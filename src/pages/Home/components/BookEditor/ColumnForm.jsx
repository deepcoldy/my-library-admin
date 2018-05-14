import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { Input, Button, Grid } from '@icedesign/base';

const { Row, Col } = Grid;

export default class ColumnForm extends Component {
  static displayName = 'ColumnForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        name: '',
        writer: '',
        publisher: '',
        totalNumber: '',
        price: '',
      },
    };
  }

  onFormChange = (value) => {
    this.setState({
      value,
    });
  };

  reset = () => {
    this.setState({
      value: {
        name: '',
        writer: '',
        publisher: '',
        totalNumber: '',
        price: '',
      },
    });
  };

  submit = () => {
    this.formRef.validateAll((error, data) => {
      if (error) {
        // 处理表单报错
        return;
      }
      this.props.addBook(data).then(() => {
        this.reset();
      });
      // 提交当前填写的数据
    });
  };

  render() {
    return (
      <div className="column-form">
        <IceContainer title="书籍" style={styles.container}>
          <IceFormBinderWrapper
            ref={(formRef) => {
              this.formRef = formRef;
            }}
            value={this.state.value}
            onChange={this.onFormChange}
          >
            <div>
              <Row wrap>
                <Col xxs="24" s="12" l="12">
                  <Row style={styles.formItem}>
                    <Col xxs="8" s="6" l="4" style={styles.formLabel}>
                      书名：
                    </Col>

                    <Col s="12" l="12">
                      <IceFormBinder
                        name="name"
                        required
                        message="书名必须填写"
                      >
                        <Input style={{ width: '100%' }} />
                      </IceFormBinder>
                      <IceFormError name="name" />
                    </Col>
                  </Row>

                  <Row style={styles.formItem}>
                    <Col xxs="8" s="6" l="4" style={styles.formLabel}>
                      作者：
                    </Col>
                    <Col s="12" l="12">
                      <IceFormBinder
                        name="writer"
                        required
                        message="作者必须填写"
                      >
                        <Input style={{ width: '100%' }} />
                      </IceFormBinder>
                      <IceFormError name="writer" />
                    </Col>
                  </Row>

                  <Row style={styles.formItem}>
                    <Col xxs="8" s="6" l="4" style={styles.formLabel}>
                      出版社：
                    </Col>
                    <Col s="12" l="12">
                      <IceFormBinder
                        name="publisher"
                        required
                        message="出版社必须填写"
                      >
                        <Input style={{ width: '100%' }} />
                      </IceFormBinder>
                      <IceFormError name="publisher" />
                    </Col>
                  </Row>
                </Col>

                <Col xxs="24" s="12" l="12">
                  <Row style={styles.formItem}>
                    <Col xxs="8" s="6" l="4" style={styles.formLabel}>
                      馆藏总数：
                    </Col>

                    <Col s="12" l="12">
                      <IceFormBinder
                        name="totalNumber"
                        required
                        message="请正确填写馆藏数量"
                      >
                        <Input style={{ width: '100%' }} />
                      </IceFormBinder>
                      <IceFormError name="totalNumber" />
                    </Col>
                  </Row>
                  <Row style={styles.formItem}>
                    <Col xxs="8" s="6" l="4" style={styles.formLabel}>
                      价格：
                    </Col>

                    <Col s="12" l="12">
                      <IceFormBinder
                        name="price"
                        required
                        message="请正确填写价格"
                      >
                        <Input style={{ width: '100%' }} />
                      </IceFormBinder>
                      <IceFormError name="price" />
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row style={styles.btns}>
                <Col xxs="8" s="2" l="2" style={styles.formLabel}>
                  {' '}
                </Col>
                <Col s="12" l="10">
                  <Button type="primary" onClick={this.submit}>
                    添加书籍
                  </Button>
                  <Button style={styles.resetBtn} onClick={this.reset}>
                    重置
                  </Button>
                </Col>
              </Row>
            </div>
          </IceFormBinderWrapper>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  container: {
    paddingBottom: 0,
  },
  formItem: {
    height: '28px',
    lineHeight: '28px',
    marginBottom: '30px',
  },
  formLabel: {
    textAlign: 'right',
  },
  btns: {
    margin: '25px 0',
  },
  resetBtn: {
    marginLeft: '20px',
  },
};
