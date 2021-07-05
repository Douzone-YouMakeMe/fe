import React from 'react';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import ProfilePicAvater from '../../test_img/u_profile.jpg';
import Logo from '../../test_img/ymm_logo.png';
import {} from '../../css/Header.css';

const profileImage = (
  <div>
    <img className="profile" src={ProfilePicAvater} alt="user pic" />
  </div>
);

const logo = (
  <>
    <img src={Logo} alt="서비스 로고" style={{ maxWidth: '50vw' }} />
  </>
);

function HeaderB() {
  return (
    <>
      <Navbar
        bg="light"
        expand="lg"
        variant="light"
        style={{ height: '15vh', zIndex: 999 }}
      >
        <Container>
          <Navbar.Brand href="#home"> {logo}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            className="justify-content-end"
            id="basic-navbar-nav"
          >
            <Nav className="me-auto">
              <Navbar.Text style={{ fontSize: '32px', background: '#dcdcdc' }}>
                UserName
              </Navbar.Text>
              <NavDropdown
                title={profileImage}
                id="basic-nav-dropdown"
                style={{
                  background: '#dcdcdc',
                }}
              >
                <NavDropdown.Item href="#action/3.1">프로젝트</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  프로필 설정
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">로그아웃</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default HeaderB;
