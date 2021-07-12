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
} from 'antd';

import ProjectApplyModify from '../project/ProjectApplyModify';
import { projectAction } from '../../redux/module/project/projectAction';
import { useSelector, useDispatch } from 'react-redux';
import { projectAPI, userAPI } from '../../api';
import moment from 'moment';
import { userAction } from '../../redux/module/user/userAction';
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
  const [record, setRecord] = useState(null);
  const [name, setName] = useState('');
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [check, setCheck] = useState(true);
  const handleInit = async () => {
    if (user.userInfo !== null) {
      setName(user.userInfo.name);
      setPassword(user.userInfo.password);
      setJobTitle(user.userInfo.jobTitle);
    }
  };
  const user = useSelector((state) => {
    return state.user;
  });

  const list = useSelector((state) => {
    return state.project;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    initInfoUser();
    return () => {};
  }, []);
  useEffect(() => {
    handleInit();
  }, [user.userInfo]);

  const initInfoUser = async () => {
    if (user.userInfo == null) {
      props.history.push('/main');
    }
    await dispatch(projectAction.getProjectOne(props.match.params.id));
    await dispatch(projectAction.getAppplyListMe(user.userInfo.id));
  };
  // 모달
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };
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
        return <div>{record.JopTitle}</div>;
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
        return <div>{moment(record.createTime).fromNow()}</div>;
      },
    },
    {
      title: '지원수정',
      dataIndex: 'applyModify',
      key: 'applyModify',
      render: (text, record, index) => {
        console.log(record);
        return (
          <Button
            type="primary"
            onClick={() => {
              setRecord(record);
              setVisible(true);
            }}
          >
            수정
          </Button>
        );
      },
    },
  ];
  const handleSubmit = (e) => {
    const formData = new FormData();
    if (e === 'name') {
      formData.append('name', name);
      dispatch(userAction.modifyUser({ data: formData, id: user.userInfo.id }));
    } else if (e === 'password') {
      if (password !== newPassword) {
        alert('값이 다릅니다.');
      } else {
        formData.append('password', password);
        dispatch(
          userAction.modifyUser({ data: formData, id: user.userInfo.id }),
        );
      }
    } else {
      formData.append('jobTitle', jobTitle);
      dispatch(userAction.modifyUser({ data: formData, id: user.userInfo.id }));
    }
  };
  const handleJobTitle = (e) => {
    setJobTitle(e.target.value);
  };
  const handleDelete = async () => {
    const res = await userAPI.deleteUser({
      id: user.userInfo.id,
    });
    if (res.status !== 200) {
      alert('실패했습니다.');
    } else {
      localStorage.clear();
      alert(res.data);
      props.history('/main');
    }
  };
  const handleSetCheckPassword = (e) => {
    setCheckPassword(e.target.value);
  };
  const handleCheck = async () => {
    console.log(checkPassword);
    const res = await userAPI.login({
      email: user.userInfo.email,
      password: checkPassword,
    });
    if (res.status !== 200) {
      setCheck(true);
      alert('비밀번호가 다릅니다.');
    } else {
      setCheck(false);
    }
  };
  if (list.currentProject != null) {
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
            <Input value={name} onChange={handleName} />
          </Col>
          <Row gutter={[20, 0]}>
            <Col>
              <Button
                onClick={() => {
                  handleSubmit('name');
                }}
              >
                수정
              </Button>
            </Col>
            <Col>
              <Button>취소</Button>
            </Col>
          </Row>
        </Row>
        <hr></hr>
        <Collapse defaultActiveKey={['4']} onChange={callback}>
          <Panel header="비밀번호 변경하기" key="2">
            <Row justify="center">
              <Col style={{ width: 250 }}>
                <Title level={5}>새 비밀번호</Title>
                <Input
                  type="password"
                  value={password}
                  onChange={handlePassword}
                  placeholder="새 비밀번호를 입력해주세요"
                ></Input>
                <Title level={5}>비밀번호 확인</Title>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={handleNewPassword}
                  placeholder="새로운 비밀번호를 입력해주세요"
                ></Input>
              </Col>
            </Row>
            <br></br>
            <Row gutter={[10]} justify="center">
              <Col>
                <Button onClick={() => handleSubmit('password')}>확인</Button>
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
                <Input value={jobTitle} onChange={handleJobTitle}></Input>
              </Col>
            </Row>
            <br></br>
            <Row gutter={[10]} justify="center">
              <Col>
                <Button
                  onClick={() => {
                    handleSubmit('appliedPosition');
                  }}
                >
                  확인
                </Button>
              </Col>
              <Col>
                <Button>취소</Button>
              </Col>
            </Row>
          </Panel>

          <Panel header="내 지원 리스트" key="4">
            {list.memberList !== null && (
              <Table
                columns={applyListC}
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
              <Input
                value={checkPassword}
                onChange={handleSetCheckPassword}
              ></Input>
              <Button onClick={handleCheck}>비밀번호 확인</Button>
            </Paragraph>
            <Row justify="center">
              <Button
                disabled={check}
                onClick={() => {
                  handleDelete();
                }}
              >
                계정 삭제
              </Button>
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
          footer={[]}
        >
          <ProjectApplyModify
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            record={record}
            {...props}
          />
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
