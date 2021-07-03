import { Route } from 'react-router-dom';
import LoginPresenter from '../components/Login/Login';
import SignUp from '../components/SignUp/SignUp';
import { Layout, Row, Col } from 'antd';

const { Header, Content, Footer } = Layout;
const NoHeader = () => {
  return (
    <Layout>
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
      <Footer style={{ background: 'white' }}></Footer>
    </Layout>
  );
};
export default NoHeader;
