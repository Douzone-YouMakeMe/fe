/*
작성자 : 조성규 
작성일 :2021.07.13
기능   : 프로젝트 맴버 관리 , 프로젝트 삭제 , 프로젝트 탈퇴(개인)
fornt  : 
*/
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { projectAction } from '../../redux/module/project/projectAction';
import ProjectDelete from './componet/ProjectDelete';
import { Route } from 'react-router';
import { Row, Col, Card, Typography, Button } from 'antd';
import { Tab, Tabs } from 'react-bootstrap';
import ProjectDrop from './componet/ProjectDrop';
import ProjectMember from './componet/ProjectMember';
import Constant from '../../redux/actionType';
import { SettingOutlined, DownOutlined } from '@ant-design/icons';
import Title from 'antd/lib/skeleton/Title';
const Setting = (props) => {
  const [key, setKey] = useState('memberM');
  const user = useSelector((state) => state.user);
  const project = useSelector((state) => state.project);
  const dispatch = useDispatch();
  useEffect(() => {
    handleInit();
  }, []);

  const handleInit = () => {
    let path = props.history.location.pathname.split('/');
    if (path[path.length - 1] === 'member') {
      setKey('memberM');
    } else if (path[path.length - 1] === 'user') {
      setKey('pSecession');
    } else {
      setKey('projectDel');
    }
  };
  const { TabPane } = Tabs;
  const { Title } = Typography;

  const handleSelect = (key) => {
    if (key === 'memberM') {
      setKey(key);
      props.history.push(`/app/setting/${props.match.params.id}/member`);
    } else if (key === 'projectDel') {
      setKey(key);
      props.history.push(`/app/setting/${props.match.params.id}/project`);
    } else {
      setKey(key);
      props.history.push(`/app/setting/${props.match.params.id}/user`);
    }
  };
  return (
    <div
      style={{
        marginLeft: '15%',
        marginRight: '15%',
        marginTop: '4%',
        marginBottom: 50,
      }}
    >
      <Row>
        <Col>
          <SettingOutlined
            style={{
              fontSize: '40px',
              marginRight: '10px',
            }}
          />
        </Col>
        <Col>
          <Title level={2}>Team Management</Title>
        </Col>
        <Col>
          <Link to="/app/myproject">
            <Button
              style={{
                marginTop: '8px',
                marginLeft: '15px',
                border: '1px soid',
                borderColor: 'black',
                backgroundColor: ' rgba(0, 191, 255, .8)',
                color: '#ffff',
                fontSize: '15px',
                fontWeight: 'bold',
              }}
            >
              My Project List
            </Button>
          </Link>
        </Col>
      </Row>

      {/* ////////////////////////////////////////////////// */}
      <Tabs activeKey={key} id="controlled-tab-example" onSelect={handleSelect}>
        <Tab eventKey="memberM" title="맴버관리"></Tab>
        <Tab eventKey="projectDel" title="프로젝트 삭제"></Tab>
        <Tab eventKey="pSecession" title="팀 탈퇴"></Tab>
      </Tabs>

      <Route
        path="/app/setting/:id/member"
        render={(props) => {
          return <ProjectMember {...props}></ProjectMember>;
        }}
      ></Route>
      <Route
        path="/app/setting/:id/project"
        render={(props) => {
          return <ProjectDelete {...props}></ProjectDelete>;
        }}
      ></Route>
      <Route
        path="/app/setting/:id/user"
        render={(props) => {
          return <ProjectDrop {...props}></ProjectDrop>;
        }}
      ></Route>
    </div>
  );
};
export default Setting;

/*


*/
