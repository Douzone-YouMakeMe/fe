/*
import React, { Component } from 'react'
import { Row, Col ,Button,Card, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Title=()=>{
    return (<div>프로젝트 카드 </div>);
}

class P_card extends Component {


    render() {
        return (
         <Card
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
          >
    
        <Row gutter={12}>
                <Meta
                    title={<Title />}
                    description={"잡코리아는 취업 지원 서비스를 전개하는 대한민국의 기업이다. 1998년 칼스텍이 개설한 웹사이트에서 시작됐다. 이후 2000년 5월에 잡코리아로 사명을 변경했다"}
                />
        </Row>
        <Row gutter = {10}>
            <Col span={2}> <Avatar icon={<UserOutlined />} /></Col>
            <Col span={2}> <Avatar icon={<UserOutlined />} /></Col>
            <Col span={2}> <Avatar icon={<UserOutlined />} /></Col>
            
            <Col span={18} style={{textAlign:"right"}} ><Button  type="dashed">디테일</Button></Col>
            
        </Row>
          </Card>
        )
    }
}

export default P_card
*/