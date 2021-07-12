import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userAction } from '../../redux/module/user/userAction';
import { Link } from 'react-router-dom';
import { Input, Button, Space, Row, Col } from 'antd';
import Logo from '../../test_img/logoCenter.png';
const LoginPresenter = (props) => {
  const user = useSelector((state) => state.user);
  const localUserData = localStorage.getItem('userInfo');
  const dispatch = useDispatch();
  useEffect(() => {
    if (localUserData !== null) {
      props.history.push('/main');
    }
  }, [localUserData]);
  useEffect(() => {
    if (user.message !== '') {
      alert(user.message);
    }
  }, [user.message]);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const handleId = (e) => {
    setId(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = () => {
    dispatch(userAction.login({ email: id, password: password }));
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
            placeholder="paswword"
            type="password"
            value={password}
            onChange={handlePassword}
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
            로그인
          </Button>
        </Row>
        <Row justify="center">
          <Button
            style={{
              width: '60%',
              color: 'white',
              backgroundColor: '#D5CCFF',
              borderRadius: '10px',
            }}
            onClick={() => {
              props.history.push('/user/signup');
            }}
          >
            회원가입
          </Button>
        </Row>
      </Space>
    </Row>
  );
};
export default LoginPresenter;
