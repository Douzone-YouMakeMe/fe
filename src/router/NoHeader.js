import { Route } from "react-router-dom";

const NoHeader = () => {
  return (
    <>
      no header
      <Route path="/user/login">login</Route>
      <Route path="/user/condition">condition</Route>
      <Route path="/user/signup">signup</Route>
    </>
  );
};
export default NoHeader;
