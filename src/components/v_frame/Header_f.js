import { Typography ,Space ,Layout, Menu, Dropdown, message} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {Nav,Navbar,NavDropdown,Container } from 'react-bootstrap';
import ProfilePicAvater from '../../test_img/u_profile.jpg';
import Logo from '../../test_img/ymm_logo.png'

import Card_view_b from '../c_project/Card_view_b';

import 'bootstrap/dist/css/bootstrap.css'
import '../../css/Header.css';


const { Header, Footer, Sider, Content } = Layout;
const { Text } = Typography;


const profileImage = (
            <div>
                <img className="profile" 
                    src={ProfilePicAvater} 
                    alt="user pic"
                />
            </div>
            );

            

const logo = (

                <>
                <img
                    src={Logo}
                
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                />
            </>

            );
            


    const onClick = ({ key }) => {
        message.info(`Click on item ${key}`);
    };
    
    const menu = (
        <Menu onClick={onClick}>
        <Menu.Item key="1">1st menu item</Menu.Item>
        <Menu.Item key="2">2nd menu item</Menu.Item>
        <Menu.Item key="3">3rd menu item</Menu.Item>
        </Menu>
    );


function Header_f() {
    return (
        
        <>
        <Layout>
       

            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">
                        {logo}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                    <Nav className="me-auto">
                    <Navbar.Text>UserName</Navbar.Text>
                    <NavDropdown title={profileImage} id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">프로젝트</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">프로필 설정</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">로그아웃</NavDropdown.Item>
                    </NavDropdown>

                    </Nav>
                    </Navbar.Collapse>
                </Container>
                </Navbar>
        </Layout>
    
      </>
    )
}

export default Header_f


/*
샘플
navDrodown 원본
<NavDropdown title="Dropdown" id="basic-nav-dropdown">
<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
</NavDropdown>




*/