/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import { Layout } from 'antd'
import HeaderB from '../page/layout/HeaderB'
import ProjectListA from '../page/project/ProjectListA'
import ProjectDetail from '../page/project/ProjectDetail'
import ProjectApply from '../page/project/ProjectApply'
import UserInfo from '../page/user/UserInfo'
import { Route, BrowserRouter as Router } from 'react-router-dom'
const { Header, Footer, Content } = Layout
const WithHeader = () => {
  return (
    <div>
      <Route path="/user_info/:id">
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
                return <UserInfo {...props} />
              }}
            ></Route>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Route>

      <Route path="/apply/:id">
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
                return <ProjectApply {...props} />
              }}
            ></Route>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Route>

      <Route path="/detail">
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
                return <ProjectDetail {...props} />
              }}
            ></Route>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Route>

      <Route path="/main">
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
                return <ProjectListA {...props} />
              }}
            ></Route>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Route>
    </div>
  )
}
export default WithHeader
