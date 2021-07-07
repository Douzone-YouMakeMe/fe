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
  const [current, setCurrent] = useState({ key: 'waited', value: '대기중' });
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
    console.log(props.count.current);
    props.handleSubmit({
      id: props.count.current,
      startDate: start.format('YYYY-MM-DD'),
      endDate: end.format('YYYY-MM-DD'),
      description,
      name,
      hashtag: tag,
      status: current.key,
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
          key={'등록'}
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
            key={`${current.value}`}
            overlay={
              <Menu selectedKeys={[current.key]} name="state">
                <Menu.Item
                  key="wating"
                  onClick={() => {
                    setCurrent({ key: 'waited', value: '대기중' });
                  }}
                >
                  대기중
                </Menu.Item>
                <Menu.Item
                  key="proceed"
                  onClick={() => {
                    setCurrent({ key: 'proceed', value: '진행중' });
                  }}
                >
                  진행중
                </Menu.Item>
                <Menu.Item
                  key="finished"
                  onClick={() => {
                    setCurrent({ key: 'finished', value: '완료' });
                  }}
                >
                  완료
                </Menu.Item>
              </Menu>
            }
          >
            <div key={`${current.value}${current.key}`}>{current.value}</div>
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

export default DModal;
