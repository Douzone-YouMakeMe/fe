/*
접근 경로 
헤더 프로필 드롭 다운 -> 프로필 설정

사용자 정보 화면 모달에 들어갈 components

*/

import React, { useState, useEffect } from 'react';
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
  Pagination,
} from 'antd';
import { useForm, useFormState } from 'react-hook-form';
import { DeleteOutlined } from '@ant-design/icons';
import ProjectApplyModify from '../project/ProjectApplyModify';
import { projectAction } from '../../redux/module/project/projectAction';
import { useSelector, useDispatch } from 'react-redux';
import { projectAPI, userAPI } from '../../api';
import moment from 'moment';

const { Panel } = Collapse;

const { Title, Paragraph, Text } = Typography;

const { Option } = Select;

// 내용 접히는 부분
function callback(key) {
  console.log(key);
}

const del_msg =
  '계정을 삭제하면 더 이상 저장소에 남겨진 메시지 또는 파일에 접근할 수 없지만, 현재 팀 멤버들은 사용자님이 남긴 메시지 또는 파일에 계속해서 접근할 수 있습니다';

function UserInfo(props) {
  const [Plist, setPlist] = useState([]);
  const handInit = async () => {
    const data = await projectAPI.getMainProject();
    setPlist(data.data);
    await console.log(data.data);
  };
  const user = useSelector((state) => {
    return state.user;
  });

  const list = useSelector((state) => {
    return state.project;
  });
  ///
  // const getProjectName = () => {
  //   let temp;
  //   if (list.memberList !== null) {
  //     temp = list.memberList.find((element) => element.userId === Plist.userId);
  //     setProjectName(temp);
  //   }
  // };

  console.log(list.memberList);

  const myApplyList = list.memberList;

  const dispatch = useDispatch();
  useEffect(() => {
    initInfoUser();
    handInit();
    return () => {};
  }, []);
  //console.log(Plist);

  const initInfoUser = async () => {
    await dispatch(projectAction.getProjectOne(props.match.params.id));
    await dispatch(projectAction.getProjectMembers(props.match.params.id));
    await dispatch(projectAction.getAppplyListMe(props.match.params.id));
  };
  // 모달
  const [visible, setVisible] = useState(false);

  const applyListC = [
    {
      title: '프로젝트명',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        return <div>{record.name}</div>;
      },
    },
    {
      title: '포지션',
      dataIndex: 'position',
      key: 'position',
      render: (text, record) => {
        return <div>{record.appliedPosition}</div>;
      },
    },
    {
      title: '승인여부',
      dataIndex: 'approval',
      key: 'approval',
      render: (text, record) => {
        return <div>{record.status}</div>;
      },
    },
    {
      title: '신청일',
      dataIndex: 'date',
      key: 'date',
      render: (text, record) => {
        return <div>{record.createTime}</div>;
      },
    },
    {
      title: '지원수정',
      dataIndex: 'applyModify',
      key: 'applyModify',
      render: (text, record, index) => {
        console.log(record);
        return (
          <Button type="primary" onClick={() => setVisible(true)}>
            수정
          </Button>
        );
      },
    },
  ];
  if (list.currentProject && list.memberList !== null) {
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
        <br />
        <hr></hr>
        <Row gutter={[100, 0]}>
          <Col>
            <Title level={4}>이름</Title>
          </Col>
          <Col>
            <Input defaultValue={user.userInfo.name} />
          </Col>
          <Row gutter={[20, 0]}>
            <Col>
              <Button>수정</Button>
            </Col>
            <Col>
              <Button>취소</Button>
            </Col>
          </Row>
        </Row>
        <hr></hr>
        <Collapse defaultActiveKey={['4']} onChange={callback}>
          <Panel
            header="이메일"
            key="1"
            style={{
              border: '1px solid #00BFFF',
              background: '#00BFFF',
            }}
          >
            <Row justify="center"></Row>

            <Row justify="center">
              <Col>
                <Title level={5}> 내 이메일 주소</Title>
              </Col>
            </Row>
            <Row justify="center">
              <Col>
                <Input
                  style={{ width: 250 }}
                  defaultValue={user.userInfo.email}
                />
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
          <Panel
            header="비밀번호 변경하기"
            key="2"
            style={{
              border: 'solid #00BFFF',
              background: '#00BFFF',
            }}
          >
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
                <Title level={5}>희망 직무 변경</Title>
                <Input defaultValue={list.memberList.appliedPosition}></Input>
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
            {list.memberList !== null && (
              <Table
                style={{}}
                columns={applyListC}
                expandable={{
                  //+ 누르면 화면에 출력 되는 부분
                  expandedRowRender: (record) => (
                    <p style={{ margin: 0 }}> {record.comments}</p>
                  ),
                  rowExpandable: (record) => record.name !== 'Not Expandable',
                }}
                //list.memberList.length
                dataSource={list.memberList.map((value, key) => {
                  return { ...value, key: key };
                })}
              />
            )}
          </Panel>
          <Panel header="계정 삭제" key="5">
            <Paragraph>
              <pre>{del_msg}</pre>
            </Paragraph>
            <Row justify="center">
              <Button>계정 삭제</Button>
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
    );
  } else {
    return <></>;
  }
}

export default UserInfo;

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
