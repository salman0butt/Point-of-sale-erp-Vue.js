import axios from "axios";

export default axios.create({
  baseURL: "http://switcher.one/api",
  headers: {
    "Content-type": "application/json"
  }
});