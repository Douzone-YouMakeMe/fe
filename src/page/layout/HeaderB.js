import React from 'react';

import { Button, Avatar } from 'antd';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import ProfilePicAvater from '../../test_img/u_profile.jpg';
import Logo from '../../test_img/logoHeader.png';
import {} from '../../css/Header.css';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators } from '../../redux/module/user/userAction';

const LogoImg = (props) => {
  return (
    <img
      onClick={() => {
        props.history.push('/');
      }}
      src={Logo}
      alt="서비스 로고"
      style={{ height: '15vh', objectFit: 'cover' }}
    />
  );
};

function HeaderB(props) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(actionCreators.logout());
    props.history.push('/main');
  };
  return (
    <>
      <Navbar
        expand="lg"
        variant="light"
        style={{ height: '18vh', zIndex: 999, backgroundColor: '#FFFFFF' }}
      >
        <Container>
          <div>
            <LogoImg {...props}></LogoImg>
          </div>
          {user.userInfo !== null && (
            <>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse
                className="justify-content-end"
                id="basic-navbar-nav"
              >
                <Nav className="me-auto">
                  {/* <Navbar.Text
                    style={{ fontSize: '32px', background: '#FFFFFF' }}
                  >
                    {user.userInfo.name}
                  </Navbar.Text> */}
                  <Navbar.Text
                    style={{ fontSize: '32px', background: '#FFFFFF' }}
                  >
                    {user.userInfo.email}
                  </Navbar.Text>
                  <NavDropdown
                    title={
                      <Avatar size={70} style={{ backgroundColor: 'red' }}>
                        {user.userInfo.name}
                      </Avatar>
                    }
                    id="basic-nav-dropdown"
                    style={{
                      background: '#FFFFFF',
                    }}
                  >
                    <NavDropdown.Item href="/app/myproject">
                      프로젝트
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href={`/app/info/user/${user.userInfo.id}`}
                    >
                      프로필 설정
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => {
                        handleLogout();
                      }}
                    >
                      로그아웃
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </>
          )}
          {user.userInfo === null && (
            <Button
              onClick={() => {
                props.history.push('/user/login');
              }}
            >
              로그인
            </Button>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default HeaderB;
