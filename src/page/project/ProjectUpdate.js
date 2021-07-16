import React, { Component, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CKEditor } from '@ckeditor/ckeditor5-react'; //ckeditor4->5로 변경(07.05 확인)
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from 'react-html-parser';
import { Link, useHistory } from 'react-router-dom';
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Typography,
  Upload,
  Space,
  Dragger,
  message,
} from 'antd';
import {
  UploadOutlined,
  InboxOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { projectAPI } from '../../api';
import moment from 'moment';
import { projectAction } from '../../redux/module/project/projectAction';
import Constant from '../../redux/actionType';
const { Option } = Select;
const { TextArea } = Input;
const { Title, Text } = Typography;

function ProjectCreate(props) {
  //유저의 정보들을 redux에서 받아오기
  const user = useSelector((state) => state.user);
  const project = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const history = useHistory(); //히스토리를 보고 뒤로가기 버튼 구현용.
  //각 db 컬럼들과 동일.
  const [thumbnail, setThumbnail] = useState(null);
  const [name, setName] = React.useState();
  const [description, setDescription] = React.useState('설명을 적어주세요.');
  const [total, setTotal] = React.useState();
  const [startedTime, setStartedTime] = useState(null); //
  const [finishedTime, setFinishedTime] = useState(null); //
  const [contents, setContents] = useState('');

  useEffect(() => {
    handleInit();
    return () => {
      handleLeave();
    };
  }, []);
  const handleLeave = () => {
    dispatch({ type: Constant.LEAVE_PROJECT });
  };
  const handleState = () => {
    if (project.currentProject !== null) {
      if (project.currentProject.userId !== user.userInfo.id) {
        alert('권한이 없습니다.');
        props.history.push('/app/myProject');
      } else {
        setName(project.currentProject.name);
        setDescription(project.currentProject.description);
        setTotal(project.currentProject.total);

        setStartedTime(moment(project.currentProject.startedTime));
        setFinishedTime(moment(project.currentProject.finishedTime)); //
        setContents(JSON.parse(project.currentProject.contents));
      }
    }
  };
  useEffect(() => {
    handleState();
  }, [project.currentProject]);
  const handleInit = () => {
    dispatch(projectAction.getCurrentProject(props.match.params.id));
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleThumbnailChange = (info) => {
    setThumbnail(info);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleTotalChange = (e) => {
    setTotal(e.target.value);
  };
  const handleStartedTimeChange = (e) => {
    setStartedTime(e);
  };
  const handleFinishedTimeChange = (e) => {
    setFinishedTime(e);
  };
  const handleContentsChange = (e) => {
    setContents(e.target.value);
  };
  //제출버튼 이벤트
  const handleSubmit = async () => {
    const formData = new FormData();
    //formData.append(name, value, filename);

    //timestamp-localdatetime-UTC 표준 변경!
    let utcFormat = 'yyyy-MM-DD HH:mm:ss';

    let startTime = moment
      .utc(startedTime, utcFormat)
      .local()
      .format(utcFormat);
    let finishTime = moment
      .utc(finishedTime, utcFormat)
      .local()
      .format(utcFormat);
    formData.append('projectId', props.match.params.id);
    formData.append('userId', user.userInfo.id); //이거 전역 redux store에서 받아와야...

    if (thumbnail !== null) {
      formData.append('thumbnail', thumbnail);
    }
    formData.append('name', name);
    formData.append('description', description);
    formData.append('total', total);
    formData.append('startedTime', startTime);
    formData.append('finishedTime', finishTime);
    // 컨텐츠는 JSON.stringify 필요.
    formData.append('contents', String(JSON.stringify(contents)));
    const res = await projectAPI.patchProject(formData);
    if (res.status === 200) {
      alert('프로젝트 내역 수정에 성공했습니다.');
      props.history.push(`/app/detail/${props.match.params.id}`);
    } else {
      alert('수정 중 오류 발생. 관리자에게 문의 바랍니다.');
    }
  };

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
        <Title level={3}>프로젝트 수정</Title>
      </Row>
      <hr></hr>
      <Row gutter={[]}>
        <Col span={8}>
          <Title level={5}>Thumbnail</Title>
        </Col>
        <Col span={10}>
          <input
            type="file"
            onChange={(e) => {
              handleThumbnailChange(e.target.files[0]);
            }}
          ></input>
        </Col>
      </Row>
      <br></br>
      <br></br>
      <Row gutter={[]}>
        <Col span={8}>
          <Title level={5}>프로젝트명</Title>
        </Col>
        <Col span={16}>
          <Input
            value={name}
            style={{ width: 280 }}
            onChange={handleNameChange}
          ></Input>
        </Col>
      </Row>
      <br></br>
      <Row gutter={[]}>
        <Col span={8}>
          <Title level={5}>프로젝트 설명</Title>
        </Col>
        <Col span={16}>
          <Input
            value={description}
            style={{ width: 280 }}
            onChange={handleDescriptionChange}
          ></Input>
        </Col>
      </Row>
      <br></br>
      <Input.Group size="large">
        <Row gutter={8}>
          <Col span={8}>
            <Title level={5}>구인수</Title>
          </Col>
          <Col span={3}>
            <Input value={total} onChange={handleTotalChange} />
          </Col>
          <Col span={5}>명</Col>
        </Row>
      </Input.Group>
      <br></br>
      <Row gutter={[]}>
        <Col span={8}>
          <Title level={5}>프로젝트 시작일</Title>
        </Col>
        <Col span={16}>
          <DatePicker
            showTime
            onChange={handleStartedTimeChange}
            value={startedTime}
          />
        </Col>
      </Row>
      <br></br>
      <Row gutter={[]}>
        <Col span={8}>
          <Title level={5}>모집 마감 기한</Title>
        </Col>
        <Col span={16}>
          <DatePicker
            showTime
            onChange={handleFinishedTimeChange}
            value={finishedTime}
          />
        </Col>
      </Row>
      <br></br>
      <Row gutter={[]}>
        <Col span={8}>
          <Title level={5}>모집 공고 내용</Title>
        </Col>
        <Col span={16}>
          <CKEditor
            editor={ClassicEditor}
            data={contents}
            onReady={(editor) => {}}
            onChange={(event, editor) => {
              setContents(editor.getData());
            }}
            onBlur={(event, editor) => {}}
            onFocus={(event, editor) => {}}
          >
            <div>
              <textarea></textarea>
            </div>
          </CKEditor>
        </Col>
      </Row>
      <br></br>
      <br></br>
      <Row gutter={[10, 10]} justify="center">
        <Col>
          <Button htmlType="submit" type="primary" onClick={handleSubmit}>
            수정하기
          </Button>
        </Col>
        <Col>
          <Button type="cancell" danger onClick={() => history.goBack()}>
            취소
          </Button>
        </Col>
      </Row>
    </div>
  );
}
export default ProjectCreate;
