
import React, { Component, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CKEditor } from '@ckeditor/ckeditor5-react'; //ckeditor4->5로 변경(07.05 확인)
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from 'react-html-parser';
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
  message
} from 'antd';
import { UploadOutlined, InboxOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
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
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('Image must smaller than 5MB!');
    }
    return isJpgOrPng && isLt5M;
  }


function ProjectCreate(props) {
    const user = useSelector((state)=>state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = React.useState(0);
  const [thumbnail, setThumbnail] = useState([]);
  const [name, setName] = React.useState(2);
  const [description, setDescription] = React.useState("설명을 적어주세요.");
  const [total, setTotal] = React.useState(4);
  const [startedTime, setStartedTime] = useState(null); //
  const [finishedTime, setFinishedTime] = useState(null); //
  const [contents, setContents] = useState("");
  
  useEffect(()=>{
      //console.log("화면에서 나타날때": user);
      //return () =>{console.log("화면에서 사라질때");}
  },[])
  const handleNameChange = e =>{
    setName(e.target.value);
  }

  const handleThumbnailChange = info => {
    if (info.file.status === 'uploading') {
        setLoading(true);
      //setThumbnail({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      //const file = new File(info.file.originFileObj, "thumbnail.jpeg");
      setThumbnail(info.file.originFileObj);
      setLoading(false);
    //   getBase64(info.file.originFileObj, thumbnail =>
    //     setThumbnail({
    //       thumbnail,
    //       loading: false,
    //     }),
    //   );
    }
  };


  // 이미지 업로드용 버튼. 이거 어떻게 되돌려야 십자표가 다시 나올까?
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handleDescriptionChange = e =>{
    setDescription(e.target.value);
  }
  const handleTotalChange = e =>{
    setTotal(e.target.value);
  }
  const handleStartedTimeChange = e =>{
    setStartedTime(e);
  }
  const handleFinishedTimeChange = e =>{
    setFinishedTime(e);
  }
  const handleContentsChange = e =>{
    setContents(e.target.value);
  }
  //제출버튼 이벤트
  const handleSubmit=async()=>{
    const formData = new FormData();
    //formData.append(name, value, filename);
    
    //timestamp-localdatetime-UTC 표준 변경!
    let utcFormat = "yyyy-MM-DD HH:mm:ss";
    
    let startTime=  moment.utc(startedTime,utcFormat).local().format(utcFormat);
    let finishTime=  moment.utc(finishedTime,utcFormat).local().format(utcFormat);


    //console.log(thumbnail.thumbnail);
    //const buffer = Buffer.from(thumbnail.thumbnail, 'base64');
    //const blobNail =fetch(thumbnail).then(res => res.blob());
    //const file = new File([blobNail], "thumbnail.jpeg");
    //console.log(file);
    formData.append("userId", user.userInfo.id); //이거 전역 redux store에서 받아와야...
    formData.append("thumbnail", thumbnail);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("total", total);
    formData.append("startedTime", startTime);
    formData.append("finishedTime", finishTime );
    // 컨텐츠는 JSON.stringify 필요.
    formData.append("contents",JSON.stringify(contents));
    const res=await projectAPI.postProject(formData);
    
  }

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
        <Title level={3}>프로젝트 개설</Title>
      </Row>
      <hr></hr>
      <Row gutter={[]}>
          <Col span={8}>
            <Title level={5}>Thumbnail</Title>
          </Col>
          <Col span={10}>
          <Upload
            name="thumbnail"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={true}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleThumbnailChange}
          >
            {thumbnail ? <img src={thumbnail} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
          


          {/* <Upload.Dragger action={null} style={{width:"30vh"}} name="files" getValueFromEvent={(e)=>{console.log(e)}}> 
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
          </Upload.Dragger> */}
          </Col>
        </Row>
        <br></br>
        <br></br>
        <Row gutter={[]}>
          <Col span={8}>
            <Title level={5} >
              프로젝트명 name
            </Title>
          </Col>
          <Col span={16}>
            <Input style={{ width: 280 }} onChange={handleNameChange} defaultValue="project.name"></Input>
          </Col>
        </Row>
        <br></br>
        <Row gutter={[]}>
          <Col span={8}>
            <Title level={5} >
              프로젝트 설명 description
            </Title>
          </Col>
          <Col span={16}>
            <Input style={{ width: 280 }} onChange={handleDescriptionChange} defaultValue="project.description"></Input>
          </Col>
        </Row>
        <br></br>
        <Input.Group size="large">
      <Row gutter={8}>
      <Col span={8}>
            <Title level={5} >
              구인 직무
            </Title>
          </Col>
        <Col span={5}>
          <Input defaultValue="웹 개발자" />
        </Col>
        <Col span={3}>
          <Input onChange={handleTotalChange} defaultValue="4" />
        </Col>
        <Col span={5}>명</Col>
      </Row>
    </Input.Group>
    <br></br>
        <Row gutter={[]}>
          <Col span={8}>
            <Title level={5}>프로젝트 시작일 project.started_time</Title>
          </Col>
          <Col span={16}>
          <DatePicker showTime onChange={handleStartedTimeChange} value={startedTime}/>
          </Col>
        </Row>
        <br></br>
        <Row gutter={[]}>
          <Col span={8}>
            <Title level={5}>모집 마감 기한 project.finished_time</Title>
          </Col>
          <Col span={16}>
          <DatePicker showTime onChange={handleFinishedTimeChange} value={finishedTime}/>
          </Col>
        </Row>
        <br></br>
        <Row gutter={[]}>
          <Col span={8}>
            <Title level={5}>컨텐츠 contents</Title>
          </Col>
          <Col span={16}>
            
                <CKEditor 
                    editor={ ClassicEditor }
                    data={contents}
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        //console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                       //console.log(editor.getData())
                       setContents(editor.getData());
                    } }
                    onBlur={ ( event, editor ) => {
                        //console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        //console.log( 'Focus.', editor );
                    } }
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
            <Button htmlType="submit" type="primary" onClick={handleSubmit}>등록하기</Button>
          </Col>
          <Col>
            <Button type="cancell" danger onClick={handleSubmit} >
              취소
            </Button>
          </Col>
        </Row>
      
    </div>
  );
}
export default ProjectCreate;

// append해도 map이나 reduce를 해서 뽑아내야만 값이 보인다.
// 그냥 console formData 찍으면 생성자만 나옴.
// console.log(...formData); //+formData.values+formData.keys entires
// return formData; //제출은 projectAPI로?

{/* {contents!==""&&(
      <div>
            {ReactHtmlParser(JSON.stringify(contents))}
        </div>)} */}

        {/* <Row gutter={[]}>
          <Col span={8}>
            <Title level={5}>지원 직무 applied_position</Title>
          </Col>
          <Col span={16}>
            <Select
              defaultValue="Frontend"
              style={{ width: 120 }}
              onChange={handleChange}
            >
              <Option value="Frontend">Frontend</Option>
              <Option value="Backend">Backend</Option>
            </Select>
          </Col>
        </Row>
        <br></br> */}

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