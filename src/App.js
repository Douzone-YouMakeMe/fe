import { BrowserRouter as Router, Route } from "react-router-dom";
import React from "react";
import P_list from "./view/project/P_list";
import P_detail from "./view/project/P_detail";
import P_apply from "./view/project/P_apply";
import U_info from "./view/user/U_info";
import C_projectArray_L from "./components/c_user/C_userApply_L";
import Header_f from "./components/v_frame/Header_f";
import CRouter from "./router";
function App(props) {
  return (
    <div>
      <CRouter></CRouter>
    </div>
  );
}

export default App;

/*
        <Route exact path="/card/:id" render={(props)=>{
          return <P_detail {...props} ></P_detail>
        }}></Route>
*/
