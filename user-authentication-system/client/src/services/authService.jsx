import axios from "axios";

const API = "http://localhost:5000/api/auth";

export const registerUser = (data) => axios.post(`${API}/register`, data);
export const loginUser = (data) => axios.post(`${API}/login`, data);
// for protected route
export const getDashboard = () => {
  const token = localStorage.getItem("token");
  return axios.get(`${API}/dashboard`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
