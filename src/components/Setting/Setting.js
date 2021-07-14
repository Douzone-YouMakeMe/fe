/*
작성자 : 조성규 
작성일 :2021.07.13
기능   : 프로젝트 맴버 관리 , 프로젝트 삭제 , 프로젝트 탈퇴(개인)
fornt  : 
*/
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { projectAction } from '../../redux/module/project/projectAction';
import ProjectDelete from './componet/ProjectDelete';
import { Route } from 'react-router';
import { Row, Col, Card } from 'antd';
import { Tab, Tabs } from 'react-bootstrap';
import ProjectDrop from './componet/ProjectDrop';
import ProjectMember from './componet/ProjectMember';
const Setting = (props) => {
  const [key, setKey] = useState('memberM');
  const user = useSelector((state) => state.user);
  const project = useSelector((state) => state.project);
  const dispatch = useDispatch();
  useEffect(() => {
    // handleInit();
  }, []);
  const handleInit = () => {
    dispatch(projectAction.getProjectMembers(props.match.params.id));
    dispatch(projectAction.getCurrentProject(props.match.params.id));
  };
  const { TabPane } = Tabs;

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
        marginTop: '10%',
        marginBottom: 50,
      }}
    >
      {/* ////////////////////////////////////////////////// */}
      <Tabs id="controlled-tab-example" onSelect={handleSelect} style={{}}>
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
