import axios from "axios";
import { serverUrl } from "../util";

const USERAPI = {
  login: async (param) => {
    let data = null;
    try {
      data = await axios.post(
        `${serverUrl}/user/login`,
        { ...param },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Accept: "*/*",
          },
        },
      );
    } catch (e) {
      console.error(e);
    }
    return data;
  },
};
export default USERAPI;
