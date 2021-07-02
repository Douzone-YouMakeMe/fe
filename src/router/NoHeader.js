import { Route } from "react-router-dom";
import LoginPresenter from "../components/Login/Login";
const NoHeader = () => {
  return (
    <>
      no header
      <Route
        path="/user/login"
        render={(props) => {
          return <LoginPresenter {...props}></LoginPresenter>;
        }}
      ></Route>
      <Route path="/user/condition">condition</Route>
      <Route path="/user/signup">signup</Route>
    </>
  );
};
export default NoHeader;
