import axios from "axios";

export default axios.create({
  baseURL: "http://sw-backend.test",
  // baseURL: "http://switcher.one",
  headers: {
    "Accept": "application/json",
    "Content-type": "application/json",
    // "X-Tenant": window.location.hostname,
    "X-Tenant": "demo1.sw-backend.test",
    "Cache-Control": "no-cache",
  }
});
