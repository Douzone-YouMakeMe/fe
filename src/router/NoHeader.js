import { Route } from 'react-router-dom';
import LoginPresenter from '../components/Login/Login';
import SignUp from '../components/SignUp/SignUp';
import { Layout, Row, Col } from 'antd';
import Logo from '../test_img/ymm_logo.png';
const { Header, Content, Footer } = Layout;
const NoHeader = (props) => {
  return (
    <Layout style={{ backgroundColor: 'white' }}>
      <Content
        style={{ backgroundColor: 'white', width: '100vw%', height: '100vh' }}
      >
        <Route
          path="/user/login"
          render={(props) => {
            return <LoginPresenter {...props}></LoginPresenter>;
          }}
        ></Route>
        <Route
          path="/user/signup"
          render={(props) => {
            return <SignUp {...props}></SignUp>;
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
  );
};
export default NoHeader;
