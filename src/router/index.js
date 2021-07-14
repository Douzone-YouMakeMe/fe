import { BrowserRouter as Router, Route } from 'react-router-dom';
import NoHeader from './NoHeader';
import WithSidebar from './WithSidebar';
import WithHeader from './WithHeader';
import { Layout } from 'antd';
import HeaderB from '../page/layout/HeaderB';
import ProjectListA from '../page/project/ProjectListA';
const { Footer, Content } = Layout;
const CRouter = (props) => {
  return (
    <Router>
      <Route
        exact
        path="/"
        render={(props) => {
          return (
            <Layout Top-Bottom Layout style={{ backgroundColor: '#FFFF' }}>
              <HeaderB {...props} />
              <Content
                style={{
                  marginLeft: '10%',
                  marginRight: '10%',
                  marginTop: '1%',
                  background: 'white',
                  height: 'auto',
                }}
              >
                <ProjectListA {...props} />;
              </Content>
              <Footer>Footer</Footer>
            </Layout>
          );
        }}
      ></Route>
      <Route
        path="/main"
        render={(props) => {
          return (
            <Layout Top-Bottom Layout style={{ backgroundColor: '#FFFF' }}>
              <HeaderB {...props} />
              <Content
                style={{
                  marginLeft: '10%',
                  marginRight: '10%',
                  marginTop: '1%',
                  background: 'white',
                  height: 'auto',
                }}
              >
                <ProjectListA {...props} />;
              </Content>
              <Footer>Footer</Footer>
            </Layout>
          );
        }}
      ></Route>

      <Route
        path="/user"
        render={(props) => {
          return <NoHeader {...props}></NoHeader>;
        }}
      ></Route>
      <Route
        path="/app"
        render={(props) => {
          return <WithHeader {...props}></WithHeader>;
        }}
      ></Route>
      <Route path="/member">member</Route>
      <Route
        path="/project/:id"
        render={(props) => {
          return <WithSidebar {...props}></WithSidebar>;
        }}
      ></Route>
    </Router>
  );
};
export default CRouter;
