import axios from "axios"

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
})

// Add token to requests automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default API
