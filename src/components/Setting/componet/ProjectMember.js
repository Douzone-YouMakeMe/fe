import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProjectApplyModify from './ProjectApplyModify';
import { projectAction } from '../../../redux/module/project/projectAction';
import moment from 'moment';
import {
  Collapse,
  Row,
  Col,
  Typography,
  Input,
  Button,
  Dropdown,
  Menu,
  Table,
  Modal,
} from 'antd';
import UserInfo from '../../../page/user/UserInfo';
import { memberAPI } from '../../../api';
const { Panel } = Collapse;

const ProjectMember = (props) => {
  const user = useSelector((state) => state.user);
  const project = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const [temp, setTemp] = useState(null);
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState(null);
  const [current, setCurrent] = useState({ key: 'all', value: '모두' });
  useEffect(() => {
    checkProject();
  }, [project.currentProject]);
  useEffect(() => {
    checkProject();
  }, [project.memberList]);
  const checkProject = () => {
    if (project.currentProject !== null && project.memberList !== null) {
      if (project.currentProject.userId !== user.userInfo.id) {
        alert('권한이 없습니다.');
        props.history.push(`/app/setting/${props.match.params.id}/user`);
      } else {
        setTemp(project.memberList);
      }
    }
  };
  const handleOk = async () => {
    const res = await dispatch(
      projectAction.approvedMember({
        id: record.id,
        projectId: record.projectId,
        status: 'approved',
      }),
    );
    alert(res.data);
    setVisible(false);
    setRecord(null);
    dispatch(projectAction.getProjectMemberAll(props.match.params.id));
    dispatch(projectAction.getCurrentProject(props.match.params.id));
  };
  const handleReject = async () => {
    const res = await dispatch(
      projectAction.approvedMember({
        id: record.id,
        projectId: record.projectId,
        status: 'rejected',
      }),
    );
    alert(res.data);
    setVisible(false);
    setRecord(null);
    dispatch(projectAction.getProjectMemberAll(props.match.params.id));
    dispatch(projectAction.getCurrentProject(props.match.params.id));
  };

  const handleDrop = async (record) => {
    const result = await memberAPI.dropMember(record.id);
    if (result.status !== 200) {
      alert('실패 햇습니다.');
    } else {
      dispatch(projectAction.getProjectMemberAll(props.match.params.id));
    }
  };
  const applyList = [
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
        return <div>{moment(record.createTime).fromNow()}</div>;
      },
    },
    {
      title: '지원서',
      dataIndex: 'applyModify',
      key: 'applyModify',
      render: (text, record, index) => {
        return (
          <Button
            type="primary"
            onClick={() => {
              setRecord(record);
              setVisible(true);
            }}
          >
            보기
          </Button>
        );
      },
    },
    {
      title: '추방시키기',
      dataIndex: 'applyModify',
      key: 'applyDrop',
      render: (text, record, index) => {
        return (
          <Button danger type="primary" onClick={() => handleDrop(record)}>
            추방
          </Button>
        );
      },
    },
  ];
  useEffect(() => {
    handleInit();
  }, []);
  useEffect(() => {
    filterList();
  }, []);
  const filterList = () => {};
  const handleInit = async () => {
    dispatch(projectAction.getProjectMemberAll(props.match.params.id));
    dispatch(projectAction.getCurrentProject(props.match.params.id));
  };
  const onSelected = (e) => {
    console.log(e);
    if (e.key === 'all') {
      setCurrent({ key: 'all', value: '모두' });
    } else if (e.key === 'pending') {
      setCurrent({ key: 'pending', value: '대기중' });
    } else {
      setCurrent({ key: 'approved', value: '승인' });
    }
  };
  useEffect(() => {
    hadleFilter();
  }, [current]);
  const hadleFilter = () => {
    if (current.key === 'all') {
      setTemp(project.memberList);
    } else {
      let filter = temp.filter((value) => {
        return value.status === current.key;
      });
      setTemp(filter);
    }
  };
  return (
    <div>
      <Col xs={6} sm={10} md={10} lg={2}>
        <Dropdown
          overlay={() => {
            return (
              <Menu onClick={onSelected} selectedKeys={[current.key]}>
                <Menu.Item key="all">모두</Menu.Item>
                <Menu.Item key="pending">대기중</Menu.Item>
                <Menu.Item key="approved">승인중</Menu.Item>
              </Menu>
            );
          }}
          placement="bottomLeft"
          arrow
        >
          <Button>{current.value}</Button>
        </Dropdown>
      </Col>
      {temp !== null && (
        <Table
          // style={{ border: 'solid #00BFFF', background: '#00BFFF' }}
          rowClassName={(record, index) => (index % 2 === 0 ? 'red' : 'yellow')}
          columns={applyList}
          dataSource={temp.map((value, key) => {
            return { ...value, key: key };
          })}
        />
      )}
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
          handleReject={handleReject}
          handleOk={handleOk}
          record={record}
          {...props}
        />
      </Modal>
    </div>
  );
};

export default ProjectMember;
