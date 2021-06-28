import React from 'react'
import {Card ,Row ,Col , Button} from 'react-bootstrap';
import p_img from '../../test_img/card_test.png';
import {Avatar} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'

/*
 아바타 이미지 컴퍼 화면 6개 
 반응형 두줄로 바낌
*/
function Card_view_b() {
    return (
        <Row xs={1} md={3} className="g-4">
        {Array.from({ length: 4 }).map((_, idx) => (
            <Col>
            <Card>
                <Card.Img variant="top" src={p_img} />
                <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                        This is a longer card with supporting text below as a natural
                        lead-in to additional content. This content is a little bit longer.
                    </Card.Text>
                    
                    <Row xs={2} md={6}>
                        <Col> <Avatar icon={<UserOutlined />} />
                        <Card.Text>
                            
                        </Card.Text>
                        </Col>
                        <Col> <Avatar icon={<UserOutlined />} /></Col>
                        <Col> <Avatar icon={<UserOutlined />} /></Col>
                        <Col> <Avatar icon={<UserOutlined />} /></Col>
                        <Col> <Avatar icon={<UserOutlined />} /></Col>
                        <Col> <Avatar icon={<UserOutlined />} /></Col>
                    </Row>
                        <br></br>
                    <Link to="/card/2"> 
                        <Button  variant="primary">자세히</Button>
                    </Link>
            
                </Card.Body>
            </Card>
            </Col>
        ))}
        </Row>
    )
}


export default Card_view_b

/*
md={{ span: 3, offset: 9}}
*/