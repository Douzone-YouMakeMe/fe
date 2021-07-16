import { BrowserRouter as Router, Route } from 'react-router-dom';
import NoHeader from './NoHeader';
import WithSidebar from './WithSidebar';
import WithHeader from './WithHeader';
import { Layout } from 'antd';
import HeaderB from '../page/layout/HeaderB';
import ProjectListA from '../page/project/ProjectListA';
import Logo from '../test_img/ymm_logo.png';
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
                <ProjectListA {...props} />
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
                <ProjectListA {...props} />
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
