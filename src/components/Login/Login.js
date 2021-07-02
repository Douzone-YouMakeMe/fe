import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as UserAction } from "../../redux/module/user/userAction";
import { Input } from "antd";
const LoginPresenter = (props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(props);
  useEffect(() => {
    if (user.isLogined !== false) {
      props.history.push("/");
    }
  }, [user.isLogined]);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const handleId = (e) => {
    setId(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = () => {
    dispatch(UserAction.login({ email: id, password: password }));
  };
  return (
    <div>
      <Input type="text" value={id} onChange={handleId}></Input>
      <input type="password" value={password} onChange={handlePassword}></input>
      <button onClick={handleSubmit}>rr</button>
    </div>
  );
};
export default LoginPresenter;
