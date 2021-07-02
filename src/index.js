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
import store from "./redux";
import { Provider } from "react-redux";
ReactDOM.render(
  <Provider store={store}>
    <App></App>
  </Provider>,
  document.getElementById("root"),
);

reportWebVitals();
