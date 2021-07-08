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
    //console.log("화면에서 나타날때": user);
    //return () =>{console.log("화면에서 사라질때");}
  }, []);
  const handleState = () => {
    console.log(project.currentProject);
    if (project.currentProject !== null) {
      setName(project.currentProject.name);
      setDescription(project.currentProject.description);
      setTotal(project.currentProject.total);
      console.log(project.currentProject);
      // multipart에서는 순수 datetime 객체화 시켜야 합니다. moment() 필수
      setStartedTime(moment(project.currentProject.startedTime));
      setFinishedTime(moment(project.currentProject.finishedTime)); //
      setContents(project.currentProject.contents);
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
    //console.log(user.userInfo.id+"-----입니다");
    formData.append('thumbnail', thumbnail);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('total', total);
    formData.append('startedTime', startTime);
    formData.append('finishedTime', finishTime);
    // 컨텐츠는 JSON.stringify 필요.
    formData.append('contents', JSON.stringify(contents));
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
            <Title level={5}>구인 직군</Title>
          </Col>
          <Col span={5}>
            <Input defaultValue="웹 개발자" />
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
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              //console.log( 'Editor is ready to use!', editor );
            }}
            onChange={(event, editor) => {
              //console.log(editor.getData())
              setContents(editor.getData());
            }}
            onBlur={(event, editor) => {
              //console.log( 'Blur.', editor );
            }}
            onFocus={(event, editor) => {
              //console.log( 'Focus.', editor );
            }}
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

// (deprecated)이미지 업로드용 버튼. 이거 어떻게 되돌려야 십자표가 다시 나올까?
// const uploadButton = (
//   <div>
//     {loading ? <LoadingOutlined /> : <PlusOutlined />}
//     <div style={{ marginTop: 8 }}>Upload</div>
//   </div>
// );

////deprecated
// function getBase64(img, callback) {
//     const reader = new FileReader();
//     // const reader = new File();
//     reader.addEventListener('load', () => callback(reader.result));
//     reader.readAsDataURL(img);
//     //reader.readAsBinaryString(img);
//   }

// function beforeUpload(file) {
//   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//   if (!isJpgOrPng) {
//     message.error('You can only upload JPG/PNG file!');
//   }
//   const isLt5M = file.size / 1024 / 1024 < 100;
//   if (!isLt5M) {
//     message.error('Image must smaller than 5MB!');
//   }
//   return isJpgOrPng && isLt5M;
// }

// append해도 map이나 reduce를 해서 뽑아내야만 값이 보인다.
// 그냥 console formData 찍으면 생성자만 나옴.
// console.log(...formData); //+formData.values+formData.keys entires
// return formData; //제출은 projectAPI로?

// {/* {contents!==""&&(
//       <div>
//             {ReactHtmlParser(JSON.stringify(contents))}
//         </div>)} */}

//         {/* <Row gutter={[]}>
//           <Col span={8}>
//             <Title level={5}>지원 직무 applied_position</Title>
//           </Col>
//           <Col span={16}>
//             <Select
//               defaultValue="Frontend"
//               style={{ width: 120 }}
//               onChange={handleChange}
//             >
//               <Option value="Frontend">Frontend</Option>
//               <Option value="Backend">Backend</Option>
//             </Select>
//           </Col>
//         </Row>
//         <br></br> */}

// 순수 base64인코딩 파일은 java에서 String 파일로 받아들인다. Blob가지고 File로 변환해서 multipart/formData로 보내야...
// function dataURItoBlob(dataURI) {
//     // convert base64/URLEncoded data component to raw binary data held in a string
//     var byteString;
//     if (dataURI.split(',')[0].indexOf('base64') >= 0)
//         byteString = atob(dataURI.split(',')[1]);
//     else
//         byteString = unescape(dataURI.split(',')[1]);

//     // separate out the mime component
//     var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

//     // write the bytes of the string to a typed array
//     var ia = new Uint8Array(byteString.length);
//     for (var i = 0; i < byteString.length; i++) {
//         ia[i] = byteString.charCodeAt(i);
//     }

//     return new Blob([ia], {type:mimeString});
// }

// {/* <Upload
//   name="thumbnail"
//   listType="picture-card"
//   className="avatar-uploader"
//   showUploadList={true}
//   action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//   beforeUpload={beforeUpload}
//   onChange={handleThumbnailChange}
// >
//   {thumbnail ? <img src={thumbnail} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
// </Upload> */}

//           {/* <Upload.Dragger action={null} style={{width:"30vh"}} name="files" getValueFromEvent={(e)=>{console.log(e)}}>
//   <p className="ant-upload-drag-icon">
//     <InboxOutlined />
//   </p>
//   <p className="ant-upload-text">Click or drag file to this area to upload</p>
//   <p className="ant-upload-hint">Support for a single or bulk upload.</p>
// </Upload.Dragger> */}
