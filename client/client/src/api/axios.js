import axios from 'axios'

const API = axios.create({
    baseURL: "http://localhost:5000/api", // 1. Set to base /api so both /auth and /trip work!
    headers: {
        "Content-Type": 'application/json'
    }
})

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    }, 
    (error) => { // 2. Added the comma here!
        return Promise.reject(error)
    }
)

export default API