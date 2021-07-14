import React from 'react';

import { Button, Avatar } from 'antd';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import ProfilePicAvater from '../../test_img/u_profile.jpg';
//import Logo from '../../test_img/logoHeader.png';
import Logo from '../../test_img/ymm_logo.png';
import {} from '../../css/Header.css';
import { useSelector, useDispatch } from 'react-redux';
import { userAction } from '../../redux/module/user/userAction';

const profileImage = (
  <div>
    <img className="profile" src={ProfilePicAvater} alt="user pic" />
  </div>
);

const LogoImg = (props) => {
  return (
    <img
      onClick={() => {
        props.history.push('/');
      }}
      src={Logo}
      alt="서비스 로고"
      style={{ height: '8vh', objectFit: 'cover' }}
    />
  );
};

function HeaderB(props) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userAction.logout());
    props.history.push('/');
  };
  return (
    <>
      <Navbar
        expand="lg"
        variant="light"
        style={{
          height: '11vh',
          zIndex: 999,
          backgroundColor: '#FFFFFF',
          border: '0.1px solid lightgray',
          borderWidth: '0px 0px 0.1px',
        }}
      >
        <Container>
          <Navbar.Brand>
            <LogoImg {...props}></LogoImg>
          </Navbar.Brand>
          <div></div>

          {user.userInfo !== null && (
            <>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse
                className="justify-content-end"
                id="basic-navbar-nav"
              >
                <Nav className="me-auto">
                  <Navbar.Text
                    style={{ fontSize: '22px', background: '#FFFFFF' }}
                  >
                    {user.userInfo.email}
                  </Navbar.Text>
                  <NavDropdown
                    title={
                      <Avatar
                        size={50}
                        style={{ backgroundColor: user.userInfo.color }}
                      >
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
