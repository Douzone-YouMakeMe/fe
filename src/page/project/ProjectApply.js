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
  Checkbox,
  Space,
  Modal,
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
  const [onModal, setOnModal] = useState(false);
  const [agree, setAgree] = useState(false);
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
    const formData = new FormData();
    let res = null;
    let utcFormat = 'yyyy-MM-DD HH:mm:ss';

    let applyDate = moment
      .utc(appliedTime, utcFormat)
      .local()
      .format(utcFormat);
    if (agree === false) {
      alert('이용약관에 동의해주세요');
    } else if (appliedTime === null) {
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

            marginLeft: '10%',
            marginRight: '10%',
          }}
        >
          <form>
            <Row
              style={{ marginTop: '2%', marginLeft: '30%', marginRight: '30%' }}
            >
              <Col span={10}>
                <Title level={5}>이용약관</Title>
              </Col>
              <Col span={14}>
                <a
                  onClick={() => {
                    setOnModal(true);
                  }}
                  style={{}}
                >
                  약관 보기
                </a>
              </Col>
            </Row>
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
                      파일 업로드
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
                  placeholder="하고 싶은말을 적어주세요 "
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
        <Modal
          footer={[]}
          title={'이용약관'}
          visible={onModal}
          width="1100px"
          onCancel={() => setOnModal(false)}
          style={{ overflowY: 'scroll' }}
        >
          <Checkbox
            value={agree}
            onClick={() => {
              setAgree(!agree);
            }}
          >
            약관동의하기
          </Checkbox>

          <div style={{ padding: '20px', background: 'rgb(240, 248, 255)' }}>
            <h5>
              프로젝트 지원시 이용 약관
              <br></br> You Make Me 는 사이드 프로젝트의 지원과 업무를 관리할 수
              있는 워크스페이스를 제공합니다.
            </h5>
            <br></br>
            <h5>제 1조 (목적) </h5>본 프로젝트 팀 신청 시 이용 약관은 팀 생성자
            리더 (이하 ' 갑'라 한다) 이 운영하는 팀 프로젝트 관련 서비스
            (이하'프로젝트'라 한다)를 이용함에 있어 이용자의 (이하'회원'라
            한다)의 권리,의무 및 책임사항을 규정함을 목적으로 한다.
            <br></br>
            <br></br>
            <h5>제 2조 (회원 의무)</h5>
            1.회원은 프로젝트 참여시 프로젝트 참여자는 임의로 팀에서 나갈 수
            없습니다. 2.회원은 프로젝트에 탈퇴 희망 원할 시 프로젝트 리더에게 팀
            채팅을 통해 요청할 수 있습니다. 3.회원은 책임감을 가지고 프로젝트를
            성실히 수행할 의무가 있다.
            <br></br>
            <br></br>
            <h5>제 3 조(팀 또는 내용물의 삭제 )</h5>
            '갑' 은 서비스의 팀 프로젝트와 참여 회원을 임의로 삭제할 수
            있습니다.
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              disabled={!agree}
              onClick={() => {
                setOnModal(false);
              }}
            >
              확인
            </Button>
          </div>
        </Modal>
      </div>
    );
  } else {
    return <></>;
  }
}
export default ProjectApply;
