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

import { useSelector, useDispatch } from 'react-redux';
import { projectAction } from '../../redux/module/project/projectAction';
import { projectAPI } from '../../api';
import moment from 'moment';
import { s3Bucket } from '../../util';

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
  const [name, setName] = useState('');
  const [appliedTime, setAppliedTime] = useState(null);
  const [appliedPosition, setAppliedPosition] = useState(null);
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [portfolioFile, setPortfolioFile] = useState(null);
  const [comments, setComments] = useState(null);

  const [radio, setRadio] = useState('url');
  useEffect(() => {
    handleInit();
  }, []);
  const handleInit = () => {
    setName(props.record.name);
    setAppliedTime(moment(props.record.appliedTime));
    setComments(props.record.comments);
    setAppliedPosition(props.record.appliedPosition);
    setPortfolioUrl(props.record.portfolioUrl);
  };

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
  const handleName = (e) => {
    setName(e.target.value);
  };
  // 수정 하기 버튼 함수
  const handleSubmit = async () => {
    const formData = new FormData();
    let utcFormat = 'yyyy-MM-DD HH:mm:ss';

    let applyDate = moment
      .utc(appliedTime, utcFormat)
      .local()
      .format(utcFormat);
    formData.append('id', props.record.id);
    formData.append('userId', user.userInfo.id);
    formData.append('projectId', props.record.projectId);
    formData.append('name', user.userInfo.name);
    formData.append('appliedTime', applyDate);
    formData.append('appliedPosition', appliedPosition);

    if (radio === 'url') {
      formData.append('portfolioUrl', portfolioUrl);
    } else {
      formData.append('portfolioFile', portfolioFile); //[null]
    }
    formData.append('comments', comments);
    const res = await dispatch(projectAction.modifyMember(formData));
    if (res.status === 201) {
      alert('수정 지원 성공');
      props.onCancel();
      // props.history.push(`/app/info/user/${user.userInfo.id}`);/
    } else {
      alert(JSON.stringify(res.data));
    }
  };
  const handleDelete = async () => {
    const res = await dispatch(
      projectAction.dropMember({ id: props.record.id, user: user.userInfo.id }),
    );
    if (res.status === 200) {
      props.onCancel();
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
          <Title>{name} </Title>
        </Row>
        <Row justify="center">
          <Title level={3}> 지원서 보기 및 수정</Title>
        </Row>
        <hr></hr>
        <form>
          <br></br>

          <Row gutter={[]}>
            <div
              style={{
                width: '40%',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Title level={5}>참여가능일</Title>
            </div>
            <div
              style={{
                width: '50%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <DatePicker
                showTime
                style={{ width: '280px' }}
                onChange={handleAppliedTime}
                value={appliedTime}
              />
            </div>
          </Row>
          <br></br>
          <Row gutter={[]}>
            <div
              style={{
                width: '40%',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Title level={5}>희망 직무</Title>
            </div>
            <div
              style={{
                width: '50%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Input
                value={appliedPosition}
                style={{ width: 280 }}
                onChange={handleAppliedPosition}
              />
            </div>
          </Row>
          <br></br>
          <Row gutter={[]}>
            <div
              style={{
                width: '40%',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Title level={5}>포트폴리오</Title>
            </div>
            <div
              style={{
                width: '50%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Radio.Group value={radio} onChange={handleRadio}>
                <Space direction="vertical">
                  <Radio value={'url'}>
                    url
                    {radio === 'url' ? (
                      <Input
                        placeholder="url을 입력 해주세요 "
                        value={portfolioUrl}
                        style={{ width: 220, marginLeft: 10 }}
                        onChange={handlePortfolioUrl}
                      />
                    ) : null}
                  </Radio>
                  <Radio value={'file'}>
                    pdf 업로드
                    {radio === 'file' ? (
                      <div>
                        <a href={`${s3Bucket}${props.portfolioFile}`} download>
                          {props.portfolioFile}
                        </a>
                        <input
                          style={{ width: 220, marginLeft: 10 }}
                          type="file"
                          onChange={(e) => {
                            handlePortfolioFile(e.target.files[0]);
                          }}
                        ></input>
                      </div>
                    ) : null}
                  </Radio>
                </Space>
              </Radio.Group>
            </div>
          </Row>
          <br></br>
          <Row gutter={[]}>
            <div
              style={{
                width: '40%',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Title level={5}>하고싶은말</Title>
            </div>
            <div
              style={{
                width: '50%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <TextArea
                onChange={handleComments}
                value={comments}
                rows={4}
                style={{ width: 290 }}
                placeholder="100자 이내로 입력해주세요 // 글자 수 더이상 입력안되게 하기 "
              />
            </div>
          </Row>
          <br></br>
          <br></br>
          <Row gutter={[80]} justify="center">
            <Col>
              <Button
                onClick={handleSubmit}
                style={{ backgroundColor: '#00BFFF', color: '#ffff' }}
              >
                수정
              </Button>
            </Col>
            <Col>
              <Button onClick={handleDelete} type="primary" danger>
                삭제
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
