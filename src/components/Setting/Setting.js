import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { projectAction } from '../../redux/module/project/projectAction';
import ProjectDelete from './componet/ProjectDelete';
import { Route } from 'react-router';
import { Row } from 'antd';
import { Col } from 'react-bootstrap';
import ProjectDrop from './componet/ProjectDrop';
const Setting = (props) => {
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
  return (
    <div>
      <Row align="middle">
        <Col span={4}>사용자</Col>
        <Col
          span={4}
          onClick={() => {
            props.history.push(`/app/setting/${props.match.params.id}/project`);
          }}
        >
          프로젝트
        </Col>
        <Col
          span={4}
          onClick={() =>
            props.history.push(`/app/setting/${props.match.params.id}/user`)
          }
        >
          개인관리
        </Col>
      </Row>
      <Route path="/app/setting/:id/member" render={(props) => {}}></Route>
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
