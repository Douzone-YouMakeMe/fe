import { BrowserRouter as Router, Route } from "react-router-dom";
import React from "react";

import CRouter from "./router";
import "./App.css";

import "antd/dist/antd.css";
function App(props) {
  return (
    <div>
      <CRouter {...props}></CRouter>
    </div>
  );
}

export default App;

/*
        <Route exact path="/card/:id" render={(props)=>{
          return <P_detail {...props} ></P_detail>
        }}></Route>
*/
