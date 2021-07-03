/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { Layout } from 'antd';
import HeaderB from '../page/layout/HeaderB';
import ProjectListA from '../page/project/ProjectListA';
import ProjectDetail from '../page/project/ProjectDetail';
import ProjectApply from '../page/project/ProjectApply';
import UserInfo from '../page/user/UserInfo';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import MyProject from '../components/MyProject/MyProject';
const { Footer, Content } = Layout;
const WithHeader = (props) => {
  return (
    <div>
      <Layout Top-Bottom Layout>
        <HeaderB {...props} />
        <Content
          style={{
            marginLeft: '7%',
            marginRight: '7%',
            background: 'white',
            height: 'auto',
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
