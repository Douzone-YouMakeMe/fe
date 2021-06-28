import React,{Component,Fragment} from 'react'

import { Button,Avatar ,Typography , Col, Row } from 'antd';
import {Card, CardGroup} from 'react-bootstrap';
import{UserOutlined ,DownloadOutlined}from '@ant-design/icons';
import { GrView } from 'react-icons/gr';
import { TiDocumentText } from 'react-icons/ti';


import { Link } from 'react-router-dom'
//GrView ,TiDocumentText
const { Title , Text} = Typography;

function C_detail_p() {
    return (
        <div style={{alignItems:"center"}}>

            <Row justify="center" >
                <Title>프로젝트 상세보기</Title>    
            </Row>
            <Row gutter = {20}  justify="end">
                <Col>
                    <GrView />
                    <Text>&nbsp;&nbsp;
                        조회: 10 회
                    </Text>
                </Col>
                <Col>
                    <TiDocumentText />
                    <Text>&nbsp;&nbsp;
                        지원: 10 회
                    </Text>
                </Col>
                <Col>
                    <Text>created- 2021-06-15</Text>
                </Col>
                <Col>
                    <Text>updated- 2021-07-28</Text>
                </Col>                
            </Row>

            <hr></hr>
            
            <Title level={4}>Project Summary </Title>
                <Text>
                    우리 프로젝트는......
                </Text>
            <Title level={4}>프론트앤드 개발자 </Title>
                <Row>
                    <Text>우대사항 :</Text>
                </Row>
                <Row>
                    <Text>자격요건 :</Text>
                </Row>
               <br></br>
               <Row>
                    <Text>개발스택 :</Text>
                </Row>
                <br></br>
            <Title level={4}>백엔드 개발자</Title>
                <Row>
                    <Text>우대사항 :</Text>
                </Row>
                <Row>
                    <Text>자격요건 :</Text>
                </Row>
                <br></br>
                <Row>
                    <Text>개발스택 :</Text>
                </Row>

            <hr></hr>
        <CardGroup>
            <Card border="dark">
                <Card.Header>프로잭트 리더</Card.Header>
                <Card.Body>
                <Card.Title>리더 닉네임  또는 이름</Card.Title>
                <Card.Text>리더 정보</Card.Text>
                </Card.Body>
            </Card>
            <Card border="dark" >
                <Card.Header>프로젝트 상세보기</Card.Header>
                <Card.Body>
                <Card.Title>문서자료</Card.Title>
                <Card.Text>문서 다운로드</Card.Text>
                <Button type="primary" shape="round" icon={<DownloadOutlined />}/>
                </Card.Body>
            </Card>
        </CardGroup>
            <hr></hr>
            <Row gutter = {20} justify="center">
                <Col> 
                    <Avatar size={100} icon={<UserOutlined />} />
                    <Row justify="center"> <Text>front-dev</Text></Row>
                    <Row justify="center"> <Text>이균환</Text></Row>
                </Col>
                <Col> 
                    <Avatar size={100} icon={<UserOutlined />} />
                    <Row justify="center"> <Text>back-dev</Text></Row>
                    <Row justify="center"> <Text>모집중</Text></Row>
                </Col>
                <Col> 
                    <Avatar size={100} icon={<UserOutlined />} />
                    <Row justify="center"> <Text>back-dev</Text></Row>
                    <Row justify="center"> <Text>모집중</Text></Row>
                </Col>
                <Col> 
                    <Avatar size={100} icon={<UserOutlined />} />
                    <Row justify="center"> <Text>front-dev</Text></Row>
                    <Row justify="center"> <Text>모집중</Text></Row>
                </Col>
                <Col> 
                    <Avatar size={100} icon={<UserOutlined />} />
                    <Row justify="center"> <Text>back-dev</Text></Row>
                    <Row justify="center"> <Text>모집중</Text></Row>
                </Col>
                <Col> 
                    <Avatar size={100} icon={<UserOutlined />} />
                    <Row justify="center"> <Text>back-dev</Text></Row>
                    <Row justify="center"> <Text>모집중</Text></Row>
                </Col>
            </Row>
            <br></br><br></br>
            <Row justify="center">
                <Link to ="">
                    <Button type="primary" shape="round">지원하기</Button>
                </Link>
            
            </Row>
            
         
        </div>
    )
}


export default C_detail_p

