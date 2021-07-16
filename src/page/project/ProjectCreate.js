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
const { Option } = Select;
const { TextArea } = Input;
const { Title, Text } = Typography;

// function getBase64(img, callback) {
//     const reader = new FileReader();
//     // const reader = new File();
//     reader.addEventListener('load', () => callback(reader.result));
//     reader.readAsDataURL(img);
//     //reader.readAsBinaryString(img);
//   }

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt5M = file.size / 1024 / 1024 < 100;
  if (!isLt5M) {
    message.error('Image must smaller than 5MB!');
  }
  return isJpgOrPng && isLt5M;
}

function ProjectCreate(props) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  //const [value, setValue] = React.useState(0);
  const history = useHistory(); //히스토리를 보고 뒤로가기 버튼 구현용.
  const [thumbnail, setThumbnail] = useState(null);
  const [name, setName] = React.useState(2);
  const [description, setDescription] = React.useState('설명을 적어주세요.');
  const [total, setTotal] = React.useState(4);
  const [startedTime, setStartedTime] = useState(null); //
  const [finishedTime, setFinishedTime] = useState(null); //
  const [contents, setContents] = useState('모집공고의 내용을 적어주세요.');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleThumbnailChange = (info) => {
    setThumbnail(info);
  };

  // 이미지 업로드용 버튼. 이거 어떻게 되돌려야 십자표가 다시 나올까?
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
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

    formData.append('userId', user.userInfo.id); //이거 전역 redux store에서 받아와야...
    formData.append('thumbnail', thumbnail);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('total', total);
    formData.append('startedTime', startTime);
    formData.append('finishedTime', finishTime);

    formData.append('contents', String(JSON.stringify(contents)));
    const res = await projectAPI.postProject(formData);
    if (res.status === 201) {
      alert('프로젝트 생성 성공');
      props.history.push('/main');
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
        <Title level={3}>프로젝트 모집 공고</Title>
      </Row>
      <hr></hr>
      <Row gutter={[]}>
        <Col span={8} style={{ textAlign: 'center' }}>
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
        <Col span={8} style={{ textAlign: 'center' }}>
          <Title level={5}>프로젝트명</Title>
        </Col>
        <Col span={16}>
          <Input
            style={{ width: 280 }}
            onChange={handleNameChange}
            placeholder="프로젝트 이름입니다."
          ></Input>
        </Col>
      </Row>
      <br></br>
      <Row gutter={[]}>
        <Col span={8} style={{ textAlign: 'center' }}>
          <Title level={5}>프로젝트 설명</Title>
        </Col>
        <Col span={16}>
          <Input
            style={{ width: 280 }}
            onChange={handleDescriptionChange}
            placeholder="프로젝트에 대한 설명을 적어주세요."
          ></Input>
        </Col>
      </Row>
      <br></br>
      <Input.Group size="large">
        <Row gutter={8}>
          <Col span={8} style={{ textAlign: 'center' }}>
            <Title level={5}>구인수</Title>
          </Col>
          <Col span={3}>
            <Input onChange={handleTotalChange} defaultValue="4" />
          </Col>
          <Col span={5}>명</Col>
        </Row>
      </Input.Group>
      <br></br>
      <Row gutter={[]}>
        <Col span={8} style={{ textAlign: 'center' }}>
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
        <Col span={8} style={{ textAlign: 'center' }}>
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
        <Col span={8} style={{ textAlign: 'center' }}>
          <Title level={5}>모집공고 내용</Title>
        </Col>
        <Col span={16}>
          <CKEditor
            editor={ClassicEditor}
            data={contents}
            config={{}}
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
            등록하기
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
