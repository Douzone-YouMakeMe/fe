import axios from "axios";
const USERAPI = {
  login: async (param) => {
    return await axios.get("url", { body: {}, header: {} });
  },
};
export default USERAPI;
