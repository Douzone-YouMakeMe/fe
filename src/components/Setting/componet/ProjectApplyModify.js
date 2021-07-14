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
import { projectAction } from '../../../redux/module/project/projectAction';
import { projectAPI } from '../../../api';
import moment from 'moment';
import { s3Bucket } from '../../../util';

const { Option } = Select;
const { TextArea } = Input;
const { Title, Text } = Typography;

function ProjectApply(props) {
  // usestate 는 배열 객체 안에 첫 번째 값이 변수의 이름 / 변수의 값을 변경해 주길 위한 함수 / usestate 안에 괄호는 초기 값
  const user = useSelector((state) => {
    console.log(state);
    return state.user;
  });
  const list = useSelector((state) => {
    return state.project;
  });
  const dispatch = useDispatch();
  console.log(props);
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

    const res = await projectAPI.postApplyProject(formData);
    //console.log(res);
  };
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
          <Title>{list.currentProject.name}</Title>
        </Row>
        <Row justify="center">
          <Title level={3}> 지원서</Title>
        </Row>
        <hr></hr>
        <form>
          <Row gutter={[]}>
            <Col span={8}>
              <Title level={5}>이름</Title>
            </Col>
            <Col span={16}>{props.record.name}</Col>
          </Row>
          <br></br>
          <Row gutter={[]}>
            <Col span={8}>
              <Title level={5}>프로젝트 참여가능일</Title>
            </Col>
            <Col span={16}>
              <div>{props.record.appliedTime}</div>
            </Col>
          </Row>
          <br></br>
          <Row gutter={[]}>
            <Col span={8}>
              <Title level={5}>희망 직무</Title>
            </Col>
            <Col span={16}>
              <div>{props.record.appliedPosition}</div>
            </Col>
          </Row>
          <br></br>
          <Row gutter={[]}>
            <Col span={8}>
              <Title level={5}>포트폴리오</Title>
            </Col>
            <Col span={16}>
              <Space direction="vertical">
                {props.record.portfolioUrl !== null ? (
                  <div>
                    <a
                      href={`${s3Bucket}${props.record.portfolioUrl}`}
                      target="_blank"
                    >
                      포트폴리오 url
                    </a>
                  </div>
                ) : (
                  <div>
                    <a
                      download
                      href={`${s3Bucket}${props.record.portfolioFile}`}
                    >
                      포트폴리오 파일
                    </a>
                  </div>
                )}
              </Space>
            </Col>
          </Row>
          <br></br>
          <Row gutter={[]}>
            <Col span={8}>
              <Title level={5}>하고싶은말</Title>
            </Col>
            <Col span={16}>
              <div>{props.record.comments}</div>
            </Col>
          </Row>
          <br></br>
          <br></br>
          <Row gutter={[80]} justify="center">
            <Col>
              <Button
                type="primary"
                onClick={() => {
                  props.handleOk();
                }}
              >
                승인
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                danger
                onClick={() => {
                  props.handleReject();
                }}
              >
                거절하기
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
