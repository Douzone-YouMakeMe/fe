import React ,{useState} from 'react'
import { useForm, useFormState } from 'react-hook-form';
import moment from "moment";

import { Button,Typography , Col, Row, Form, Input , InputNumber ,DatePicker,
        Radio,Space,Select,Upload,message
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import C_file_upload from './C_file_upload';
import { Link } from 'react-router-dom'
import {aaa} from '../../view/project/P_list'


//GrView ,TiDocumentText
const { Title , Text} = Typography;

const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 },
    };
    
    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: '${label}을 입력 해주세요',

    };
    /* eslint-enable no-template-curly-in-string */
    
/*
포토 폴리오 
*/
    const { Option } = Select;
    const selectBefore = (
        <Select defaultValue="http://" className="select-before">
        <Option value="http://">http://</Option>
        <Option value="https://">https://</Option>
        </Select>
    );
    const selectAfter = (
        <Select defaultValue=".com" className="select-after">
        <Option value=".com">.com</Option>
        <Option value=".kr">.kr</Option>
        <Option value=".org">.org</Option>
        </Select>
    );
/*
포토 폴리오 파일업로드
*/

function onChange(date, dateString) {
    console.log(date, dateString);
  }

function C_detail_p() {

    const {Title} = Typography;
    const [finished,setFinished]=useState("");
    
    const { register, handleSubmit, control } = useForm({
        defaultValues: {
        uName: "",
        aDate: "",

        }
      });

    const { dirtyFields } = useFormState({
    control
    });

    
    const onSubmit = (data) => console.log(data);

    const handleCaelendar= (e)=>{
        setFinished(e.format("YYYY-MM-DD"));
    }

    return (
       
        <>
            <Row justify="center" >
                <Title>프로젝트 지원하기 </Title>    
            </Row>        
            <hr></hr>
            <br></br>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Row gutter={100} justify="center" >
                    
                    <Col span={100}>
                        <Title level={5}>이름</Title>
                    </Col>

                    <Col>
                        <input {...register("uName")} />
                    </Col>
                </Row>

                <Row justify="center">
                    <Col>
                        <Title level={5}>프로젝트 참여 가능일</Title>
                    </Col>
                    <Col>

                    {/* <DatePicker format={"YYYY-MM-DD"} onChange={(e)=>{handleCaelendar(e)}}/> */}
                    <DatePicker format={"YYYY-MM-DD"} onChange={onChange}/>
                    </Col>
                </Row>

               
            <Radio.Group name="radiogroup" defaultValue={1}>
                <Space direction = "vertical">
                    <Radio value={1}>
                       <input />
                    </Radio>
                    <Radio value={2}>
                        <C_file_upload />
                    </Radio>
                </Space>
            </Radio.Group>


                <Input.TextArea />

                <Row gutter={10} justify="center">
                    <Col>

                    <Button type="primary" onClick="">
                        지원하기
                    </Button>
                    <button type="submit">지원하기</button>
                    </Col>
                    <Col>
                    <Link to="/card">
                    <Button type="primary" danger>
                    되돌아가기
                    </Button>
                    </Link>
                    </Col>

                </Row>
                </form>
 
        </>
    );
}


export default C_detail_p;

/*
함수를 만들어야 하는데 어떤 방식으로 만들지 모르겠다 

이름 = name  : 회원 가입 할때 이름 가지고 오는지
참여 가능일 = availave_d
지원 직무  = apply_job
포트폴리오 =  portfolio
하고 싶은말 = comment


<DatePicker /> 를 어떻게 값을 불러 오는지

    const[inputs, setInputs] = useState({
        name: ""
    })

    const {
        name,
    } = inputs;

    const handleChange = e =>{
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit=()=>{
        const body = new FormData();
        body.put("name",name);
   
    }


     body.put("availaveDate",availaveDate);
         <Input onChnage={(e)=>{setAvailaveDate(e.target.value)}} value={availaveDate} />d
*/