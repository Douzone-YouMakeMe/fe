import { BrowserRouter as Router, Route } from "react-router-dom";

const NoHeader = () => {
  return (
    <>
      header
      <Route path="/user/login">login</Route>
      <Route path="/user/condition">condition</Route>
      <Route path="/user/signup">signup</Route>
    </>
  );
};
export default NoHeader;
