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
import MyProject from '../components/MyProject/MyProject';
import ProjectUpdate from '../page/project/ProjectUpdate';
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
            marginLeft: '10vw',
            marginRight: '10vw',
            marginTop: '1vh',
            background: '#F0F8FF',
            height: 'auto',
            minWidth: '500px',
          }}
        >
          <Route
            path="/app/apply/:id"
            render={(props) => {
              return <ProjectApply {...props} />;
            }}
          ></Route>
          <Route
            path="/app/user_info/:id"
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
          {/* 추가중 */}
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
          {/* 추가중 */}
        </Content>
        <Footer>Footer</Footer>
      </Layout>
      {/* <Route path="/user_info/:id">
        <Layout Top-Bottom Layout>
          <HeaderB />
          <Content
            style={{
              marginLeft: '7%',
              marginRight: '7%',
              background: 'white',
              height: 'auto',
            }}
          >
            <Route
              path="/user_info/:id"
              render={(props) => {
                return <UserInfo {...props} />;
              }}
            ></Route>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Route> */}

      {/* <Route path="/apply/:id">
        <Layout Top-Bottom Layout>
          <HeaderB />
          <Content
            style={{
              marginLeft: '7%',
              marginRight: '7%',
              background: 'white',
              height: 'auto',
            }}
          >
            <Route
              path="/apply/:id"
              render={(props) => {
                return <ProjectApply {...props} />;
              }}
            ></Route>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Route> */}

      {/* <Route path="/detail">
        <Layout Top-Bottom Layout>
          <HeaderB />
          <Content
            style={{
              marginLeft: '7%',
              marginRight: '7%',
              background: 'white',
              height: 'auto',
            }}
          >
            <Route
              path="/detail/:id"
              render={(props) => {
                return <ProjectDetail {...props} />;
              }}
            ></Route>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Route> */}

      {/* <Route path="/main">
        <Layout Top-Bottom Layout>
          <HeaderB />
          <Content
            style={{
              marginLeft: '7%',
              marginRight: '7%',
              background: 'white',
              height: 'auto',
            }}
          >
            <Route
              path="/main"
              render={(props) => {
                return <ProjectListA {...props} />;
              }}
            ></Route>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Route> */}
    </div>
  );
};
export default WithHeader;
