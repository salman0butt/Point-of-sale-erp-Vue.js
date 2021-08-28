import axios from "axios";

export default axios.create({
  baseURL: "http://sw-backend.test",
  headers: {
    "Content-type": "application/json",
    // "X-Tenant": window.location.hostname  
    "X-Tenant": "demo1.sw-backend.test"
  }
});
