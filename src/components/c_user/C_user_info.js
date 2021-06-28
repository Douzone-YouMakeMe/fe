/*
접근 경로 
헤더 프로필 드롭 다운 -> 프로필 설정

사용자 정보 화면 모달에 들어갈 components

*/

import React from 'react'
import { Collapse,Row,Col,Typography,Input,Button,Select} from 'antd';
import { useForm, useFormState } from 'react-hook-form';
import {DeleteOutlined} from '@ant-design/icons'
import ProfilePicAvater from '../../test_img/u_profile.jpg';
import C_userApply_L from './C_userApply_L';


const { Panel } = Collapse;

const { Title,Paragraph,Text } = Typography;

const { Option } = Select;


const profileImage = (
    <div>
        <img className="profile" 
            src={ProfilePicAvater} 
            alt="user pic"
        />
    </div>
    );

    function handleChange(value) {
        console.log(`selected ${value}`);
      }

      function callback(key) {
        console.log(key);
      }

     
      const del_msg = '계정을 삭제하면 더 이상 저장소에 남겨진 메시지 또는 파일에 접근할 수 없지만, 현재 팀 멤버들은 사용자님이 남긴 메시지 또는 파일에 계속해서 접근할 수 있습니다';

    function C_user_info() {
    return (
        <div>
            <Row justify="center">
                <Title level={2}>프로필 설정</Title>
            </Row>
            <hr/><br/>
            <Row>
                <Title level={4}>프로필 사진</Title>
                {profileImage}
            </Row>
            <hr></hr>
            <Row>
                <Col>
                    <Title level={4}>이름 </Title>
                </Col>
               <Col>
                    <Input placeholder="UeserName" />
               </Col>
               <Col>
                    <Button>확인</Button>
                    <Button>취소</Button>
               </Col>
            </Row>
            <hr></hr>
            <Collapse defaultActiveKey={['4']} onChange={callback}>
                
                <Panel header="이메일" key="1" >
                    <Col>
                        <Title level={5}> 기본 이메일 주소</Title>
                        <Select defaultValue="mmmm@mmmm.com" style={{ width: 200 }} onChange={handleChange}>
                            <Option value="">mmmm@mmmm.com</Option>
                            <Option value="">mmmm@mmmm.com</Option>

                        </Select>
                    </Col>

                    <Title level={5}> 다른 이메일 주소</Title>

                        <Row>
                        <Col>  <Input defaultValue="매일 " /> </Col>
 
                        <Button  icon={<DeleteOutlined />}></Button>
                        </Row>
                    
                    
                    <Col>
                        <Input placeholder="새 이메일 주소" />
                    </Col>  
                    <Col>
                        <Button>이메일 추가하기</Button>
                    </Col>
                    <Row>
                        <Col>
                            <Button>확인</Button>
                        </Col>
                        <Col>
                            <Button>취소</Button>
                        </Col>
                    </Row>

                </Panel>
                <Panel header="비밀번호 변경하기" key="2">
    
                <Row>
                    <Col md={10}>
                        <Title level={5}>현재 비밀번호</Title>
                                <Input placeholder="현재 비밀번호를 입력해주세요"></Input>
                        <Title level={5}>새 비밀번호</Title>
                        <Input placeholder="새로운 비밀번호를 입력해주세요"></Input>
                    </Col>
                
                    <Col>
                        <Button>확인</Button>
                    </Col>
                    <Col>
                        <Button>취소</Button>
                    </Col>
                </Row>
            
                </Panel>
                <Panel header="직무" key="3">
                <Select defaultValue="" style={{ width: 120 }} onChange={handleChange}>
                    <Option value="">백엔드</Option>
                    <Option value="">프론트엔드</Option>
                    {/* <Option value="disabled" disabled>
                        Disabled
                    </Option> */}
                    <Option value="">PM</Option>
                </Select>
               
                <Button>확인</Button>
                <Button>취소</Button>
                </Panel>

                <Panel header="내 지원 리스트" key="4">
                        <C_userApply_L />
                </Panel>
                <Panel header="계정 삭제" key="5">
                    <Paragraph>
                    <pre>{del_msg}</pre>
                    </Paragraph>
                    <Row justify="center">
                    <Button>확인</Button>
                    <Button>취소</Button>
                    </Row>
                    
                </Panel>
            </Collapse>
        </div>
    )
}

export default C_user_info


    // <Collapsible trigger="Start here">
    //             <p>
    //                 This is the collapsible content. It can be any element or React
    //                 component you like.
    //             </p>
    //             <p>
    //                 It can even be another Collapsible component. Check out the next
    //                 section!
    //             </p>
    // </Collapsible>
