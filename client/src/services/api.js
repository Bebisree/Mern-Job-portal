import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-job-portal-5ph0.onrender.com/api"
});

export default API;