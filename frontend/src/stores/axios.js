import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

console.log("baseUrl: ", baseUrl);

axios.defaults.baseURL = baseUrl;