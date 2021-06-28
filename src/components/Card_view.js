import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col ,Button,Card, Avatar, Divider } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import p_img from '../test_img/card_test.png';

import P_card from './P_card';

// 이미지 사이즈 고정 하기 
const { Meta } = Card;
 class Card_view extends Component{
    render(){
        return(
        <div>
            <Row gutter={[48, 24]}>
                <Col span={8}>
                    <_Card></_Card>
                </Col>
                <Col span={8}>
                    <_Card></_Card>
                </Col>
                <Col span={8}>
                    <_Card></_Card>
                </Col>
            </Row>

            <Row gutter={[48, 24]}>
                <Col span={8}>
                    <_Card></_Card>
                </Col>
                <Col span={8}>
                    <_Card></_Card>
                </Col>
                <Col span={8}>
                    <_Card></_Card>
                </Col>
            </Row>
      </div>
      )
    }
}

const _Card =()=>{
    return (
    <Card

    style={{width : "31.1vw"}}
        cover={
          <img
            alt="example"
            //src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            src={p_img}
            style ={{width : "100%"}}
          />
        }
      >

    <Row gutter={12}    style ={{width : "100%"}}>
        
            <Meta
                title={<Title />}
                description={"잡코리아는 취업 지원 서비스를 전개하는 대한민국의 기업이다. 1998년 칼스텍이 개설한 웹사이트에서 시작됐다. 이후 2000년 5월에 잡코리아로 사명을 변경했다"}
            />
    </Row>
    <Row gutter = {10}    style ={{width : "100%"}}>
        <Col span={2}> <Avatar icon={<UserOutlined />} /></Col>
        <Col span={2}> <Avatar icon={<UserOutlined />} /></Col>
        <Col span={2}> <Avatar icon={<UserOutlined />} /></Col>
        
        <Col span={18} style={{textAlign:"right"}} ><Button  type="dashed">디테일</Button></Col>
        
    </Row>
      </Card>)
}

const Title=()=>{
    return (<div>프로젝트 카드 </div>);
}
export default Card_view