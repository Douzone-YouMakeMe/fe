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
import { Card, CardGroup, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { projectAction } from '../../redux/module/project/projectAction';
import { projectAPI } from '../../api';
import moment from 'moment';

const { TextArea } = Input;
const { Title, Text } = Typography;

function ProjectApply(props) {
  const user = useSelector((state) => {
    console.log(state);
    return state.user;
  });

  const list = useSelector((state) => {
    return state.project;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    initProjectApply();
    return () => {};
  }, []);
  useEffect(() => {
    handleCheck();
  }, [list.currentProject]);
  const handleCheck = () => {
    if (list.currentProject !== null && user.userInfo !== null) {
      if (list.currentProject.userId === user.userInfo.id) {
        alert('만든사람은 지원할 수 없습니다.');
        props.history.push(`/app/detail/${props.match.params.id}`);
      }
    }
  };
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
  const initProjectApply = async () => {
    if (user.userInfo !== null) {
      await dispatch(projectAction.getProjectOne(props.match.params.id));
    } else {
      alert('로그인이 필요한 기능입니다.');
      props.history.push('/user/login');
    }
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

  // 지원 하기 버튼 함수
  const handleSubmit = async () => {
    if (appliedTime === '') {
    }
    const formData = new FormData();
    let res = null;
    let utcFormat = 'yyyy-MM-DD HH:mm:ss';

    let applyDate = moment
      .utc(appliedTime, utcFormat)
      .local()
      .format(utcFormat);
    if (appliedTime === null) {
      alert('참여 가능일을 입력해주세요');
    } else if (appliedPosition === '') {
      alert('희망 직무를 입력해 주세요');
    } else if (radio === 'url') {
      if (portfolioUrl !== '') {
        formData.append('portfolioUrl', portfolioUrl);
        formData.append('userId', user.userInfo.id);
        formData.append('projectId', list.currentProject.id);
        formData.append('name', user.userInfo.name);
        formData.append('appliedTime', applyDate);
        formData.append('appliedPosition', appliedPosition);
        formData.append('comments', comments);
        res = await projectAPI.postApplyProject(formData);
      } else {
        alert('유알엘을 입력해 주세요');
      }
    } else {
      if (portfolioFile !== null) {
        formData.append('portfolioFile', portfolioFile); //[null]
        formData.append('userId', user.userInfo.id);
        formData.append('projectId', list.currentProject.id);
        formData.append('name', user.userInfo.name);
        formData.append('appliedTime', applyDate);
        formData.append('appliedPosition', appliedPosition);
        formData.append('comments', comments);
        res = await projectAPI.postApplyProject(formData);
      } else {
        alert('포트 폴리오 파일을 입력해주세요');
      }
    }
    if (res !== null && res.status === 201) {
      alert('프로젝트 지원 성공');
      props.history.push(`/app/info/user/${user.userInfo.id}`);
    } else {
      // alert('다시');
    }
  };

  if (list.currentProject !== null && user.userInfo !== null) {
    return (
      <div
        style={{
          alignItems: 'center',
          marginTop: 30,
          // marginBottom: 50,
        }}
      >
        <Card
          style={{
            backgroundColor: '#00BFFF',
            borderColor: ' #00BFFF',
            marginLeft: '20%',
            marginRight: '20%',
            borderRadius: '30px',
          }}
        >
          <Row justify="center" style={{}}>
            <Title
              style={{
                fontSize: '70px',
                color: '#FFFF',
                textShadow: ' 0 1px #00BFFF, 1px 0 #00BFFF',
                marginTop: '3.5%',
              }}
            >
              {list.currentProject.name}
            </Title>
          </Row>
        </Card>
        <br></br>
        <Row justify="center">
          <Title level={3}>프로젝트 지원하기</Title>
        </Row>
        <hr></hr>
        <Card
          style={{
            border: '1.5px solid ',
            borderColor: ' #00BFFF',
            backgroundColor: 'transparent',

            marginLeft: '10%',
            marginRight: '10%',
          }}
        >
          <form>
            <Row
              style={{ marginTop: '2%', marginLeft: '30%', marginRight: '30%' }}
            >
              <Col span={10}>
                <Title level={5}>참여가능일</Title>
              </Col>
              <Col span={14}>
                <DatePicker
                  showTime
                  onChange={handleAppliedTime}
                  value={appliedTime}
                />
              </Col>
            </Row>
            <br></br>
            <Row gutter={[]} style={{ marginLeft: '30%', marginRight: '30%' }}>
              <Col span={10}>
                <Title level={5}>희망 직무</Title>
              </Col>
              <Col span={14}>
                <Input
                  style={{ width: '200px' }}
                  onChange={handleAppliedPosition}
                />
              </Col>
            </Row>
            <br></br>
            <Row gutter={[]} style={{ marginLeft: '30%', marginRight: '30%' }}>
              <Col span={10}>
                <Title level={5}>포트폴리오</Title>
              </Col>
              <Col span={14}>
                <Radio.Group value={radio} onChange={handleRadio}>
                  <Space direction="vertical">
                    <Radio value={'url'}>
                      url
                      {radio === 'url' ? (
                        <Input
                          placeholder="url을 입력 해주세요 "
                          style={{ width: 300 }}
                          onChange={handlePortfolioUrl}
                        />
                      ) : null}
                    </Radio>
                    <Radio value={'file'}>
                      pdf 업로드
                      {radio === 'file' ? (
                        <input
                          style={{ width: 250 }}
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
            <Row
              gutter={[]}
              style={{
                marginLeft: '30%',
                marginRight: '30%',
                marginBottom: '2%',
              }}
            >
              <Col span={10}>
                <Title level={5}>하고싶은말</Title>
              </Col>
              <Col span={14}>
                <TextArea
                  onChange={handleComments}
                  rows={4}
                  style={{ width: 290 }}
                  placeholder="100자 이내로 입력해주세요 // 글자 수 더이상 입력안되게 하기 "
                />
              </Col>
            </Row>
          </form>
        </Card>
        <br></br>
        <Row gutter={[10, 10]} justify="center">
          <Col>
            <Button
              style={{ backgroundColor: '#00BFFF', color: '#FFFF' }}
              onClick={handleSubmit}
            >
              지원하기
            </Button>
          </Col>
          <Col>
            <Link to={{ pathname: `/main` }}>
              <Button type="primary" danger>
                취소
              </Button>
            </Link>
          </Col>
        </Row>
      </div>
    );
  } else {
    return <></>;
  }
}
export default ProjectApply;

// <Row gutter={[100, 0]} align="middle" justify="center">
//       <Col>
//         <Title level={5}>이름</Title>
//       </Col>
//       <Col>
//         <Input placeholder="Basic usage" />
//       </Col>
//     </Row>
//     <br></br>
//     <Row gutter={[100, 0]} justify="center">
//       <Col>
//         <Title level={5}>참여 가능일</Title>
//       </Col>
//       <Col>
//         <DatePicker onChange={onChange} />
//       </Col>
//     </Row>
//     <br></br>
//     <Row gutter={[100, 0]} justify="center">
//       <Col>
//         <Title level={5}>지원 포지션</Title>
//       </Col>
//       <Col>
//         <Select
//           defaultValue="fe"
//           style={{ width: 120 }}
//           onChange={handleChange}
//         >
//           {/* 프로젝트 생성자가 지원 포지션 설정 한 값나 나오기 */}
//           <Option value="fe">프론트엔드</Option>
//           <Option value="bk">백앤드</Option>
//         </Select>
//       </Col>
//     </Row>
//     <br></br>
//     <Row gutter={[100, 0]} justify="center">
//       <Col>
//         <Title level={5}>포트 폴리오</Title>
//       </Col>
//       <Col></Col>
//     </Row>

//  <Row justify="center">
//         <Col>
//           <Space direction="vertical">
//             <Title level={5}>이름:</Title>
//             <Title level={5}>프로젝트 참여 가능일:</Title>
//             <Title level={5}>지원 직무:</Title>
//             <Title level={5}>포토폴리오:</Title>
//             <Title level={5}>하고싶은말:</Title>
//           </Space>
//         </Col>
//         <Col>
//           <Space direction="vertical">
//             <Title level={5}>이름:</Title>
//             <Title level={5}>프로젝트 참여 가능일:</Title>
//             <Title level={5}>지원 직무:</Title>
//             <Title level={5}>포토폴리오:</Title>
//             <Title level={5}>하고싶은말:</Title>
//           </Space>
//         </Col>
//       </Row>

//    // for (var value of formData.values()) {
//   console.log(value);
// }
