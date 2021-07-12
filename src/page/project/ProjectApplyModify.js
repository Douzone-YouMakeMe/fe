/*
작성일자 : 2021.07.08
작업명   : 유저가 지원한 해당 프로젝트 수정 모달 화면

*/
import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import {
  Row,
  Col,
  Input,
  Button,
  Radio,
  Select,
  DatePicker,
  Typography,
  Space,
} from 'antd';
import { Link } from 'react-router-dom';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { projectAction } from '../../redux/module/project/projectAction';
import { projectAPI } from '../../api';
import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input;
const { Title, Text } = Typography;

function ProjectApply(props) {
  // usestate 는 배열 객체 안에 첫 번째 값이 변수의 이름 / 변수의 값을 변경해 주길 위한 함수 / usestate 안에 괄호는 초기 값
  const user = useSelector((state) => {
    return state.user;
  });
  const list = useSelector((state) => {
    return state.project;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    //initProjectApply();
    return () => {};
  }, []);

  // 지원한 해당프로젝트의 유저의 지원 정보를 보내주는 객체
  const memberApplyL = list.memberList;
  //console.log({memberApplyL});
  memberApplyL.forEach((applyInfo) => console.log(applyInfo));
  // memberApplyL.forEach(toUeserL =>console.log(toUeserL));

  // userId,      //user 아이디 리덕스에서 보내기
  //   projectId, //프로젝트 아이디 리덕스 상태에서 보내기
  //   name       //지원자 이름 리덕스에서
  //   appliedTime //참여가능일
  //   appliedPosition, //희망 직무
  //   comments,        //하고 싶은말
  //   portfolioFile,   //포토폴리오 파일 업로드
  //   portfolioUrl,    //url 업로드
  //   description;     // 대비 칼럼

  const [appliedTime, setAppliedTime] = useState(null);
  const [appliedPosition, setAppliedPosition] = useState(null);
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [portfolioFile, setPortfolioFile] = useState(null);
  const [comments, setComments] = useState(null);

  const [radio, setRadio] = useState('url');

  // 리덕스에서 프로젝트 값 받아오기
  // const initProjectApply = async () => {
  //    const infoApplyL = await projectAPI.getInfoApplyList();
  // };

  //참여 가능일
  const handleAppliedTime = (e) => {
    setAppliedTime(e);
  };
  //희망 직무
  const handleAppliedPosition = (e) => {
    setAppliedPosition(e.target.value);
  };
  //포토 폴리오
  const handleRadio = (e) => {
    setRadio(e.target.value);
  };
  //하고 싶은말
  const handleComments = (e) => {
    setComments(e.target.value);
  };

  const handlePortfolioUrl = (e) => {
    setPortfolioUrl(e.target.value);
  };

  const handlePortfolioFile = (e) => {
    setPortfolioFile(e);
  };

  // 수정 하기 버튼 함수
  const handleSubmit = async () => {
    const formData = new FormData();
    let utcFormat = 'yyyy-MM-DD HH:mm:ss';

    let applyDate = moment
      .utc(appliedTime, utcFormat)
      .local()
      .format(utcFormat);

    formData.append('userId', user.userInfo.id);
    formData.append('projectId', list.currentProject.id);
    formData.append('name', user.userInfo.name);
    formData.append('appliedTime', applyDate);
    formData.append('appliedPosition', appliedPosition);

    if (radio === 'url') {
      formData.append('portfolioUrl', portfolioUrl);
    } else {
      formData.append('portfolioFile', portfolioFile); //[null]
    }

    formData.append('comments', comments);

    const res = await projectAPI.pathchApplyProject(formData);
    console.log(res);

    if (res.status === 201) {
      alert('프로젝트 지원 수정 및 저장 되었습니다');
      props.history.push(`/app/info/user/${user.userInfo.id}`);
    } else {
      alert('수정 안됨 다시');
    }
  };
  //console.log(list.memberList[0].name);
  if (list.currentProject !== null) {
    return (
      <div
        style={{
          alignItems: 'center',
          marginLeft: 40,
          marginRight: 40,
          marginTop: 50,
          marginBottom: 50,
        }}
      >
        <Row justify="center">
          {/* 프로젝트 이름 */}
          <Title>해당 프로젝트 이름 </Title>
        </Row>
        <Row justify="center">
          <Title level={3}> 지원서 보기 및 수정</Title>
        </Row>
        <hr></hr>
        <form>
          <Row gutter={[]}>
            <Col span={8}>
              <Title level={5}>이름</Title>
            </Col>
            <Col span={16}>
              <Input style={{ width: 280 }} value={user.userInfo.name} />
            </Col>
          </Row>
          <br></br>
          <Row gutter={[]}>
            <Col span={8}>
              <Title level={5}>프로젝트 참여가능일</Title>
            </Col>
            <Col span={16}>
              <DatePicker
                showTime
                onChange={handleAppliedTime}
                value={appliedTime}
              />
            </Col>
          </Row>
          <br></br>
          <Row gutter={[]}>
            <Col span={8}>
              <Title level={5}>희망 직무</Title>
            </Col>
            <Col span={16}>
              <Input style={{ width: 280 }} onChange={handleAppliedPosition} />
            </Col>
          </Row>
          <br></br>
          <Row gutter={[]}>
            <Col span={8}>
              <Title level={5}>포트폴리오</Title>
            </Col>
            <Col span={16}>
              <Radio.Group value={radio} onChange={handleRadio}>
                <Space direction="vertical">
                  <Radio value={'url'}>
                    url
                    {radio === 'url' ? (
                      <Input
                        placeholder="url을 입력 해주세요 "
                        style={{ width: 250, marginLeft: 10 }}
                        onChange={handlePortfolioUrl}
                      />
                    ) : null}
                  </Radio>
                  <Radio value={'file'}>
                    pdf 업로드
                    {radio === 'file' ? (
                      <input
                        style={{ width: 250, marginLeft: 10 }}
                        type="file"
                        onChange={(e) => {
                          handlePortfolioFile(e.target.files[0]);
                        }}
                      ></input>
                    ) : null}
                  </Radio>
                </Space>
              </Radio.Group>
            </Col>
          </Row>
          <br></br>
          <Row gutter={[]}>
            <Col span={8}>
              <Title level={5}>하고싶은말</Title>
            </Col>
            <Col span={16}>
              <TextArea
                onChange={handleComments}
                rows={4}
                style={{ width: 290 }}
                placeholder="100자 이내로 입력해주세요 // 글자 수 더이상 입력안되게 하기 "
              />
            </Col>
          </Row>
          <br></br>
          <br></br>
          <Row gutter={[80]} justify="center">
            <Col>
              <Button type="primary" onClick={handleSubmit}>
                수정
              </Button>
            </Col>
            <Col>
              <Button type="primary" danger>
                취소
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    );
  } else {
    return <></>;
  }
}
export default ProjectApply;
