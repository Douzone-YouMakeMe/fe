import React, { Component, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Typography,
  Upload,
  Space,
} from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';

const { Option } = Select;
const { TextArea } = Input;
const { Title, Text } = Typography;

const data = [
  {
    projectName: '우리의 프로젝트 A',
    duty: [
      {
        dutyName: '프론트 앤드',
      },
      {
        dutyName: '백앤드',
      },
    ],
  },
];

function handleChange(value) {
  console.log(`selected ${value}`);
}
// const layout = {
//   labelCol: {
//     span: 10,
//   },
//   wrapperCol: {
//     span: 5,
//   },
// }

function ProjectApply(props) {
  const [value, setValue] = React.useState(1);
  const project = useSelector((state) => state.project);
  const disaptch = useDispatch();
  useEffect(() => {}, []);
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
    <div
      style={{
        alignItems: 'center',
        marginLeft: 40,
        marginRight: 40,
        marginTop: 50,
        marginBottom: 50,
      }}
    >
      <Row justify="center">
        <Title>$프로젝트이름 가져 오기</Title>
      </Row>
      <Row justify="center">
        <Title level={3}>프로젝트 지원하기</Title>
      </Row>
      <hr></hr>
      <form>
        <Row gutter={[]}>
          <Col span={8}>
            <Title level={5}>이름</Title>
          </Col>
          <Col span={16}>
            <Input style={{ width: 280 }} value="이름 값 당기기" />
          </Col>
        </Row>
        <br></br>
        <Row gutter={[]}>
          <Col span={8}>
            <Title level={5}>프로젝트 참여가능일</Title>
          </Col>
          <Col span={16}>
            <DatePicker />
          </Col>
        </Row>
        <br></br>
        <Row gutter={[]}>
          <Col span={8}>
            <Title level={5}>지원 직무</Title>
          </Col>
          <Col span={16}>
            <Select
              defaultValue="lucy"
              style={{ width: 120 }}
              onChange={handleChange}
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
            </Select>
          </Col>
        </Row>
        <br></br>
        <Row gutter={[]}>
          <Col span={8}>
            <Title level={5}>포트폴리오</Title>
          </Col>
          <Col span={16}>
            <Radio.Group onChange={onChange} value={value}>
              <Space direction="vertical">
                <Radio value={1}>
                  <Input
                    placeholder="url을 입력 해주세요 "
                    style={{ width: 250, marginLeft: 10 }}
                  />
                </Radio>
                <Radio value={2}>
                  <Upload {...props}>
                    <Button
                      style={{ width: 250, marginLeft: 10 }}
                      icon={<UploadOutlined />}
                    >
                      Click to Upload
                    </Button>
                  </Upload>
                </Radio>
              </Space>
            </Radio.Group>
          </Col>
        </Row>
        <br></br>
        <Row gutter={[]}>
          <Col span={8}>
            <Title level={5}>하고싶은말</Title>
          </Col>
          <Col span={16}>
            <TextArea rows={4} />
          </Col>
        </Row>
        <br></br>
        <br></br>
        <Row gutter={[10, 10]} justify="center">
          <Col>
            <Button type="primary">지원하기</Button>
          </Col>
          <Col>
            <Button type="primary" danger>
              취소
            </Button>
          </Col>
        </Row>
      </form>
    </div>
  );
}
export default ProjectApply;

// <Row gutter={[100, 0]} align="middle" justify="center">
//       <Col>
//         <Title level={5}>이름</Title>
//       </Col>
//       <Col>
//         <Input placeholder="Basic usage" />
//       </Col>
//     </Row>
//     <br></br>
//     <Row gutter={[100, 0]} justify="center">
//       <Col>
//         <Title level={5}>참여 가능일</Title>
//       </Col>
//       <Col>
//         <DatePicker onChange={onChange} />
//       </Col>
//     </Row>
//     <br></br>
//     <Row gutter={[100, 0]} justify="center">
//       <Col>
//         <Title level={5}>지원 포지션</Title>
//       </Col>
//       <Col>
//         <Select
//           defaultValue="fe"
//           style={{ width: 120 }}
//           onChange={handleChange}
//         >
//           {/* 프로젝트 생성자가 지원 포지션 설정 한 값나 나오기 */}
//           <Option value="fe">프론트엔드</Option>
//           <Option value="bk">백앤드</Option>
//         </Select>
//       </Col>
//     </Row>
//     <br></br>
//     <Row gutter={[100, 0]} justify="center">
//       <Col>
//         <Title level={5}>포트 폴리오</Title>
//       </Col>
//       <Col></Col>
//     </Row>

//  <Row justify="center">
//         <Col>
//           <Space direction="vertical">
//             <Title level={5}>이름:</Title>
//             <Title level={5}>프로젝트 참여 가능일:</Title>
//             <Title level={5}>지원 직무:</Title>
//             <Title level={5}>포토폴리오:</Title>
//             <Title level={5}>하고싶은말:</Title>
//           </Space>
//         </Col>
//         <Col>
//           <Space direction="vertical">
//             <Title level={5}>이름:</Title>
//             <Title level={5}>프로젝트 참여 가능일:</Title>
//             <Title level={5}>지원 직무:</Title>
//             <Title level={5}>포토폴리오:</Title>
//             <Title level={5}>하고싶은말:</Title>
//           </Space>
//         </Col>
//       </Row>
