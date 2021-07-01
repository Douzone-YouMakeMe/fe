import { BrowserRouter as Router, Route } from "react-router-dom";
import NoHeader from "./NoHeader";
import WithSidebar from "./WithSidebar";

const CRouter = (props) => {
  return (
    <Router>
      <Route path="/user" component={NoHeader}></Route>
      <Route path="/main">main</Route>
      <Route path="/member">member</Route>
      <Route
        path="/project"
        render={(props) => {
          return <WithSidebar {...props}></WithSidebar>;
        }}
      ></Route>
    </Router>
  );
};
export default CRouter;
