/*
접근 경로 
헤더 프로필 드롭 다운 -> 프로필 설정

사용자 정보 화면 모달에 들어갈 components


*/

import React, { useState } from 'react'
import {
  Collapse,
  Row,
  Col,
  Typography,
  Input,
  Button,
  Select,
  Table,
  Modal,
} from 'antd'
import { useForm, useFormState } from 'react-hook-form'
import { DeleteOutlined } from '@ant-design/icons'
import ProfilePicAvater from '../../test_img/u_profile.jpg'
import ProjectApplyModify from '../project/ProjectApplyModify'
const { Panel } = Collapse

const { Title, Paragraph, Text } = Typography

const { Option } = Select

const profileImage = (
  <div>
    <img className="profile" src={ProfilePicAvater} alt="user pic" />
  </div>
)

function handleChange(value) {
  console.log(`selected ${value}`)
}

function callback(key) {
  console.log(key)
}

const del_msg =
  '계정을 삭제하면 더 이상 저장소에 남겨진 메시지 또는 파일에 접근할 수 없지만, 현재 팀 멤버들은 사용자님이 남긴 메시지 또는 파일에 계속해서 접근할 수 있습니다'

const applyListD = [
  {
    key: 1,
    name: '위하고',
    position: '프론트앤드',
    approval: 'F',
    date: '2021.05.21',
    description: '죄송합니다 우리 프로젝트에 부합하지 않습니다.',
  },
  {
    key: 2,
    name: '헬스케어',
    position: '백앤드',
    approval: 'P',
    date: '2021.05.21',
    description: '우리 프로젝트에 함께 하실수 있으십니다.',
  },
  {
    key: 3,
    name: '스마트 A',
    position: '백앤드',
    approval: 'C',
    date: '2021.05.21',
    description: '프로젝트 관리자 확인 중 입니다',
  },
]

function UserInfo() {
  const [visible, setVisible] = useState(false)
  const applyListC = [
    { title: '프로젝트명', dataIndex: 'name', key: 'name' },
    { title: '포지션', dataIndex: 'position', key: 'position' },
    { title: '승인여부', dataIndex: 'approval', key: 'approval' },
    { title: '신청일', dataIndex: 'date', key: 'date' },
    {
      title: '지원수정',
      dataIndex: 'applyModify',
      key: 'applyModify',
      render: () => (
        <Button type="primary" onClick={() => setVisible(true)}>
          수정
        </Button>
      ),
    },
  ]
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
        <Title level={2}>프로필 설정</Title>
      </Row>
      <hr />
      <br />
      <Row gutter={[50]}>
        <Col>
          <Title level={4}>프로필 사진</Title>
        </Col>
        <Col>{profileImage}</Col>
      </Row>
      <hr></hr>
      <Row gutter={[100, 0]}>
        <Col>
          <Title level={4}>이름</Title>
        </Col>
        <Col>
          <Input placeholder="UeserName" />
        </Col>
        <Row gutter={[20, 0]}>
          <Col>
            <Button>확인</Button>
          </Col>
          <Col>
            <Button>취소</Button>
          </Col>
        </Row>
      </Row>
      <hr></hr>
      <Collapse defaultActiveKey={['4']} onChange={callback}>
        <Panel header="이메일" key="1">
          <Row justify="center">
            <Col>
              <Title level={5}> 기본 이메일 주소</Title>
              <Select
                defaultValue="mmmm@mmmm.com"
                style={{ width: 250 }}
                onChange={handleChange}
              >
                <Option value="">kkkkk@mmmm.com</Option>
                <Option value="">mmmm@mmmm.com</Option>
              </Select>
            </Col>
          </Row>
          <br></br>
          <Row justify="center">
            <Col>
              <Title level={5}> 다른 이메일 주소</Title>
              <Input defaultValue="이메일 값" style={{ width: 220 }} />
              <Button icon={<DeleteOutlined />}></Button>
            </Col>
          </Row>
          <Row justify="center">
            <Col>
              <Input
                style={{ width: 250 }}
                placeholder="새 이메일 입력 해주세요"
              />
              <Col>
                <Button style={{ width: 250 }}>이메일 추가하기</Button>
              </Col>
            </Col>
          </Row>
          <br></br>
          <Row gutter={[10]} justify="center">
            <Col>
              <Button>확인</Button>
            </Col>
            <Col>
              <Button>취소</Button>
            </Col>
          </Row>
        </Panel>
        <Panel header="비밀번호 변경하기" key="2">
          <Row justify="center">
            <Col style={{ width: 250 }}>
              <Title level={5}>현재 비밀번호</Title>
              <Input placeholder="현재 비밀번호를 입력해주세요"></Input>
              <Title level={5}>새 비밀번호</Title>
              <Input placeholder="새로운 비밀번호를 입력해주세요"></Input>
            </Col>
          </Row>
          <br></br>
          <Row gutter={[10]} justify="center">
            <Col>
              <Button>확인</Button>
            </Col>
            <Col>
              <Button>취소</Button>
            </Col>
          </Row>
        </Panel>
        <Panel header="희망 직무" key="3">
          <Row justify="center">
            <Col>
              <Title level={5}>희망 직무 선택</Title>
              <Select
                style={{ width: 250 }}
                defaultValue=""
                onChange={handleChange}
              >
                <Option value="">백엔드</Option>
                <Option value="">프론트엔드</Option>
                <Option value="">PM</Option>
              </Select>
            </Col>
          </Row>
          <br></br>
          <Row gutter={[10]} justify="center">
            <Col>
              <Button>확인</Button>
            </Col>
            <Col>
              <Button>취소</Button>
            </Col>
          </Row>
        </Panel>

        <Panel header="내 지원 리스트" key="4">
          <Table
            columns={applyListC}
            expandable={{
              expandedRowRender: (record) => (
                <p style={{ margin: 0 }}>{record.description}</p>
              ),
              rowExpandable: (record) => record.name !== 'Not Expandable',
            }}
            dataSource={applyListD}
          />
        </Panel>
        <Panel header="계정 삭제" key="5">
          <Paragraph>
            <pre>{del_msg}</pre>
          </Paragraph>
          <Row justify="center">
            <Button>확인</Button>
            <Button>취소</Button>
          </Row>
        </Panel>
      </Collapse>
      <Modal
        title="지원 프로젝트 수정"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
      >
        <ProjectApplyModify />
      </Modal>
    </div>
  )
}

export default UserInfo

// <Collapsible trigger="Start here">
//             <p>
//                 This is the collapsible content. It can be any element or React
//                 component you like.
//             </p>
//             <p>
//                 It can even be another Collapsible component. Check out the next
//                 section!
//             </p>
// </Collapsible>
