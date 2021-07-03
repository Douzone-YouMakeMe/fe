import React, { useState, useEffect } from 'react'
import ReactHtmlParser from 'react-html-parser'
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
} from 'antd'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons'
import moment from 'moment'
const { Option } = Select
const { TextArea } = Input
const { Title, Text } = Typography

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
]

function handleChange(value) {
  console.log(`selected ${value}`)
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
  // usestate 는 배열 객체 안에 첫 번째 값이 변수의 이름 / 변수의 값을 변경해 주길 위한 함수 / usestate 안에 괄호는 초기 값
  const [value, setValue] = useState(1)

  const [date, setDate] = useState(moment())
  const onChange = (e) => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
  }

  // 첫번째 값은 수정된 객체 모먼트 객체 , 두번째 변경된 값이 string 타입으로 넘어 온다  /
  // 핸들러 함수
  const handleDate = (e1, e2) => {
    console.log(e2)
    if (e2 !== '') {
      setDate(moment(e2))
    } else {
      setDate(null)
    }
  }

  const positionState = [
    { id: 1, value: '백앤드' },
    { id: 2, value: '프로트엔드' },
  ]
  const [stateOptions, setStateValues] = useState(positionState)

  console.log(positionState.length)

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
        <Title level={3}>프로젝트 수정</Title>
      </Row>
      <hr></hr>
      <form>
        <Row gutter={[]}>
          <Col span={8}>
            <Title level={5}>이름</Title>
          </Col>
          <Col span={16}>
            <Input style={{ width: 280 }} value="조성규" />
          </Col>
        </Row>
        <br></br>
        <Row gutter={[]}>
          <Col span={8}>
            <Title level={5}>프로젝트 참여가능일</Title>
          </Col>
          <Col span={16}>
            <Text>{}</Text>
            <DatePicker value={date} onChange={handleDate} />
          </Col>
        </Row>
        <br></br>
        <Row gutter={[]}>
          <Col span={8}>
            <Title level={5}>지원 직무</Title>
          </Col>
          <Col span={16}>
            <Select
              defaultValue="지원직무"
              style={{ width: 150 }}
              onChange={handleChange}
            >
              <Option value="백앤드">백앤드</Option>
              <Option value="프론트">프론트앤드</Option>
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
        <Row gutter={[80]} justify="center">
          <Col>
            <Button type="primary">수정</Button>
          </Col>
          <Col>
            <Button type="primary" danger>
              취소
            </Button>
          </Col>
        </Row>
      </form>
    </div>
  )
}
export default ProjectApply
