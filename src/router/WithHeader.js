/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { Layout } from 'antd';
import HeaderB from '../page/layout/HeaderB';
import ProjectListA from '../page/project/ProjectListA';
import ProjectDetail from '../page/project/ProjectDetail';
import ProjectApply from '../page/project/ProjectApply';
import ProjectCreate from '../page/project/ProjectCreate';
import UserInfo from '../page/user/UserInfo';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Setting from '../components/Setting/Setting';
import MyProject from '../components/MyProject/MyProject';
import ProjectUpdate from '../page/project/ProjectUpdate';
import Logo from '../test_img/ymm_logo.png';
const { Footer, Content } = Layout;
const WithHeader = (props) => {
  return (
    <div>
      <Layout
        style={{ backgroundColor: 'white', width: '100%' }}
        Top-Bottom
        Layout
      >
        <HeaderB {...props} />
        <Content
          style={{
            marginLeft: '15%',
            marginRight: '15%',
            marginTop: '1%',
            background: '#F0F8FF',
            height: '80vh',
            overflowY: 'scroll',
            overflowX: 'hidden',
            minWidth: 'auto',
          }}
        >
          <Route
            path="/app/apply/:id"
            render={(props) => {
              return <ProjectApply {...props} />;
            }}
          ></Route>
          <Route
            path="/app/info/user/:id"
            render={(props) => {
              return <UserInfo {...props} />;
            }}
          ></Route>
          <Route
            path="/app/detail/:id"
            render={(props) => {
              return <ProjectDetail {...props} />;
            }}
          ></Route>
          <Route
            path="/app/main"
            render={(props) => {
              return <ProjectListA {...props} />;
            }}
          ></Route>
          <Route
            path="/app/myproject"
            render={(props) => {
              return <MyProject {...props}></MyProject>;
            }}
          ></Route>
          <Route
            path="/app/projectCreate"
            render={(props) => {
              return <ProjectCreate {...props} />;
            }}
          ></Route>
          <Route
            path="/app/projectUpdate/:id"
            render={(props) => {
              return <ProjectUpdate {...props} />;
            }}
          ></Route>
          <Route
            path="/app/setting/:id"
            render={(props) => {
              return <Setting {...props}></Setting>;
            }}
          ></Route>
        </Content>
        <Footer
          style={{
            textAlign: 'left',
            fontSize: '20px',
            marginTop: '1px',
            display: 'flex',
            flexDirection: 'orientation',
          }}
        >
          <div style={{ width: '15%' }}>
            <img
              onClick={() => {
                props.history.push('/');
              }}
              src={Logo}
              alt="서비스 로고"
              style={{ height: '8vh', objectFit: 'cover' }}
            />
          </div>
          <div style={{ width: '40%' }}>
            <div>
              <h6>Tel: 02-6233-6000</h6>
            </div>
            <div>
              <h6>주소: 서울특별시 중구 을지로1가 을지로 29</h6>
            </div>
            <div>
              <h6>메일: rbsghks01@gmail.com</h6>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            COPYRIGHT ⓒ 2021 YOU MAKE ME ALL RIGHTS RESERVED.
          </div>
        </Footer>
      </Layout>
    </div>
  );
};
export default WithHeader;
