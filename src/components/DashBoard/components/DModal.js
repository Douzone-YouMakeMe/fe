import React, { useState } from 'react';
import {
  Modal,
  Button,
  Row,
  Col,
  Input,
  DatePicker,
  Menu,
  Dropdown,
} from 'antd';
import { generatorColor } from '../../../util/GeneratorColor';
const DModal = (props) => {
  const [current, setCurrent] = useState('WAITING');
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const handleClose = () => {
    props.handleClose();
  };
  const handleSubmit = () => {
    // console.log(start.format("YYYY-MM-DD"));
    props.handleSubmit({
      id: props.count.current,
      startDate: start.format('YYYY-MM-DD'),
      endDate: end.format('YYYY-MM-DD'),
      description,
      name,
      tag,
      state: current,
    });
    handleClose();
  };

  const handleStart = (m, s) => {
    setStart(m);
  };
  const handleEnd = (m, s) => {
    setEnd(m);
  };
  const handleName = ({ target }) => {
    setName(target.value);
  };
  const handleDescription = ({ target }) => {
    setDescription(target.value);
  };
  const handleTag = ({ target }) => {
    setTag(target.value);
  };
  return (
    <Modal
      width={800}
      height={700}
      visible={props.visible}
      onCancel={() => {
        handleClose();
      }}
      footer={[
        <Button
          onClick={handleSubmit}
          style={{ width: '100px', background: '#69c0ff', color: 'white' }}
        >
          등록
        </Button>,
      ]}
    >
      <Row>
        <Col>
          <h2>TeamName</h2>
        </Col>
      </Row>
      <Row style={{ height: '80%', marginBottom: '10px' }}>
        <Col span={4}>
          <div
            style={{
              width: '80%',
              height: '80%',
              border: '0.1px solid lightgray',
              backgroundColor: generatorColor(),
              marginRight: '10px',
            }}
          ></div>
        </Col>
        <Col sm={6} lg={6}>
          <h5>WorkName</h5>
        </Col>
        <Col sm={12} lg={14}>
          <Input
            name="name"
            value={name}
            onChange={handleName}
            placeholder="작업명을 적으세요"
          />
        </Col>
      </Row>
      <Row style={{ height: '80%', marginBottom: '10px' }} align="middle">
        <Col sm={4}></Col>
        <Col sm={6} lg={6}>
          <h5>Description</h5>
        </Col>
        <Col sm={12}>
          <Input
            value={description}
            onChange={handleDescription}
            name="description"
            placeholder="작업설명 적으세요"
          ></Input>
        </Col>
      </Row>
      <Row style={{ height: '80%', marginBottom: '10px' }} align="middle">
        <Col sm={4}></Col>
        <Col sm={6} lg={6}>
          <h5>state</h5>
        </Col>
        <Col sm={12}>
          <Dropdown
            overlay={
              <Menu selectedKeys={[current]} name="state">
                <Menu.Item
                  key="wating"
                  onClick={() => {
                    setCurrent('WAITING');
                  }}
                >
                  waiting
                </Menu.Item>
                <Menu.Item
                  key="do"
                  onClick={() => {
                    setCurrent('DO');
                  }}
                >
                  do
                </Menu.Item>
                <Menu.Item
                  key="done"
                  onClick={() => {
                    setCurrent('DONE');
                  }}
                >
                  done
                </Menu.Item>
              </Menu>
            }
          >
            <div>{current}</div>
          </Dropdown>
        </Col>
      </Row>
      <Row style={{ height: '80%', marginBottom: '10px' }} align="middle">
        <Col sm={4}></Col>
        <Col sm={6} lg={6}>
          <h5>startDate</h5>
        </Col>
        <Col sm={12}>
          <DatePicker
            value={start}
            onChange={handleStart}
            name="startDate"
          ></DatePicker>
        </Col>
      </Row>
      <Row style={{ height: '80%', marginBottom: '10px' }} align="middle">
        <Col sm={4}></Col>
        <Col sm={6} lg={6}>
          <h5>endDate</h5>
        </Col>
        <Col sm={12}>
          <DatePicker
            value={end}
            onChange={handleEnd}
            name="endDate"
          ></DatePicker>
        </Col>
      </Row>
      <Row style={{ height: '80%', marginBottom: '10px' }} align="middle">
        <Col sm={4}></Col>
        <Col sm={6} lg={6}>
          <h5>#Tag</h5>
        </Col>
        <Col sm={12}>
          <Input name="tag" value={tag} onChange={handleTag}></Input>
        </Col>
      </Row>
    </Modal>
  );
};
const menus = ({ current, setCurrent }) => (
  <Menu selectedKeys={[current]}>
    <Menu.Item
      key="wating"
      onClick={() => {
        setCurrent('waiting');
      }}
    >
      대기중
    </Menu.Item>
    <Menu.Item
      key="do"
      onClick={() => {
        setCurrent('do');
      }}
    >
      할일
    </Menu.Item>
    <Menu.Item
      key="done"
      onClick={() => {
        setCurrent('done');
      }}
    >
      완료
    </Menu.Item>
  </Menu>
);
export default DModal;
