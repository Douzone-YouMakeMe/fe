import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Input, Button, Space, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../../test_img/logoCenter.png';
import { checkEmail } from '../../util/checkEmail';
import { userAPI } from '../../api';
const SignUp = (props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const handleId = (e) => {
    setId(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleSubmit = async () => {
    if (id === '') {
      alert('email은 필수입니다.');
    } else if (!checkEmail(id)) {
      alert('잘못된 이메일 형식');
    } else if (name === '') {
      alert('name은 필수입니다.');
    } else if (password === '') {
      alert('password는 필수입니다.');
    } else if (password !== passwordConfirm) {
      alert('password가 다릅니다.');
    } else {
      let parma = {
        email: id,
        password,
        name,
      };
      const res = await userAPI.signUp(parma);
      if (res.status === 409) {
        alert(JSON.stringify(res.data));
      } else if (res.status === 201) {
        alert('가입 성공');
        props.history.push('/user/login');
      } else {
        alert('가입 실패');
      }
    }
  };

  return (
    <Row
      justify="center"
      style={{ width: '100%', height: '100%', backgroundColor: '#F7F7FF' }}
    >
      <Space
        direction={'vertical'}
        style={{
          height: '80vh',
          maxWidth: '500px',
          minWidth: '360px',
          width: '50vw',
        }}
      >
        <Row justify="center">
          <Col
            style={{
              marginTop: '3vh',
              width: '300px',
              height: '300px',
              textAlign: 'center',
              backgroundColor: 'white',
              borderRadius: '100%',
              overflow: 'hidden',
            }}
          >
            <Link to={{ pathname: '/main' }}>
              <img
                src={Logo}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              ></img>
            </Link>
          </Col>
        </Row>
        <Row style={{ marginTop: '50px' }} justify="center">
          <Input
            style={{ borderRadius: '10px', width: '60%' }}
            placeholder="email"
            type="text"
            value={id}
            onChange={handleId}
          ></Input>
        </Row>
        <Row justify="center">
          <Input
            style={{ borderRadius: '10px', width: '60%' }}
            placeholder="name"
            type="text"
            value={name}
            onChange={handleName}
          ></Input>
        </Row>
        <Row justify="center">
          <Input
            style={{ borderRadius: '10px', width: '60%' }}
            placeholder="paswword"
            type="password"
            value={password}
            onChange={handlePassword}
          ></Input>
        </Row>
        <Row justify="center">
          <Input
            style={{ borderRadius: '10px', width: '60%' }}
            placeholder="paswword"
            type="password"
            value={passwordConfirm}
            onChange={handlePasswordConfirm}
          ></Input>
        </Row>
        <Row justify="center" style={{ marginTop: '30px' }}>
          <Button
            style={{
              width: '60%',

              color: 'white',
              backgroundColor: '#B8D6D9',
              borderRadius: '10px',
            }}
            onClick={handleSubmit}
          >
            회원가입
          </Button>
        </Row>
      </Space>
    </Row>
  );
};
export default SignUp;
