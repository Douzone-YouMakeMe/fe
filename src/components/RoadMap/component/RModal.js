import React from 'react';
import { Modal, Button, Layout, Row, Col, DatePicker, Input } from 'antd';
import moment from 'moment';
const { Header } = Layout;
const RModal = (props) => {
  const { item } = props;
  const { start, end, name, title } = item;
  const handleColose = () => {
    if (props.handleClose != null) {
      props.handleClose();
    }
  };
  const handleModify = () => {};
  const handleDelete = () => {};
  return (
    <Modal
      maskClosable={false}
      visible={props.visible}
      onCancel={handleColose}
      width={800}
      hieght={800}
      footer={[
        <Button onClick={handleModify}>수정</Button>,
        <Button onClick={handleDelete}>삭제</Button>,
      ]}
    >
      <Layout style={{ marginTop: '5%' }}>
        <Header style={{ background: 'blue', align: 'center' }}>
          <h3 style={{ textAlign: 'center' }}>{title}</h3>
        </Header>
        <Row align="middle" justify="center" style={{ background: 'white' }}>
          <Col span={6}>
            <h4>name</h4>
          </Col>
          <Col span={6}>
            <Input
              value={name}
              style={{ minWidth: '130px', textAlign: 'center' }}
            ></Input>
          </Col>
        </Row>
        <Row align="middle" justify="center" style={{ background: 'white' }}>
          <Col span={6}>
            <h4>start</h4>
          </Col>
          <Col span={6}>
            <DatePicker
              style={{ minWidth: '130px', textAlign: 'center' }}
              value={moment(start)}
            ></DatePicker>
          </Col>
        </Row>

        <Row align="middle" justify="center" style={{ background: 'white' }}>
          <Col span={6}>
            <h4>end</h4>
          </Col>
          <Col span={6}>
            <DatePicker
              style={{ minWidth: '130px', textAlign: 'center' }}
              value={moment(end)}
            ></DatePicker>
          </Col>
        </Row>

        <Row
          align="middle"
          justify="center"
          style={{ background: 'white' }}
        ></Row>
      </Layout>
    </Modal>
  );
};
export default RModal;
