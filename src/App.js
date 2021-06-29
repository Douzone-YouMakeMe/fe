import { BrowserRouter as Router, Route } from "react-router-dom";
import React from "react";
import P_list from "./view/project/P_list";
import P_detail from "./view/project/P_detail";
import P_apply from "./view/project/P_apply";
import U_info from "./view/user/U_info";
import C_projectArray_L from "./components/c_user/C_userApply_L";
import Header_f from "./components/v_frame/Header_f";
function App(props) {
  return (
    <div>
      <Router>
        <Route path="/" component={Header_f}></Route>
        <Route exact path="/card" component={P_list} />
        <Route exact path="/pal" component={C_projectArray_L} />
        <Route exact path="/user_info" component={U_info} />
        <Route
          exact
          path="/card/1"
          render={(props) => {
            return <P_detail {...props}></P_detail>;
          }}
        ></Route>
        <Route
          exact
          path="/card/2"
          render={(props) => {
            return <P_apply {...props}></P_apply>;
          }}
        ></Route>
        <Route
          exact
          path="/card/3"
          render={(props) => {
            return <U_info {...props}></U_info>;
          }}
        ></Route>
      </Router>
    </div>
  );
}

export default App;

/*
        <Route exact path="/card/:id" render={(props)=>{
          return <P_detail {...props} ></P_detail>
        }}></Route>
*/
