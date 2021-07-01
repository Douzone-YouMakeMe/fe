import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Card_view from "./components/Card_view";
import P_card from "./components/P_card";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import P_list from "./view/project/P_list";
import P_detail from "./view/project/P_detail";
import Card_view_b from "./components/c_project/Card_view_b";
/*
<Card_view_b />
<Card_view />

<P_list />
*/
ReactDOM.render(
  <App></App>,

  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
