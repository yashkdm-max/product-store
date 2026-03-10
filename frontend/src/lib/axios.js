import axios from "axios";

const api = axios.create({
//  baseURL: "http://localhost:3000"
  baseURL:"https://product-store-315o.onrender.com"
});

export default api;

