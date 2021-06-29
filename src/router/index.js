import { BrowserRouter as Router, Route } from "react-router-dom";
import NoHeader from "./NoHeader";
const CRouter = (props) => {
  return (
    <Router>
      <Route path="/user" component={NoHeader}></Route>
      <Route path="/main">main</Route>
      <Route path="/member">member</Route>
      <Route path="/project">project</Route>
    </Router>
  );
};
export default CRouter;
