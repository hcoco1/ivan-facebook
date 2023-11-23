// api.js
import axios from './axiosConfig';

const api = {

    // User related routes
    register: (userData) => axios.post('/register', userData),
    login: (userData) => axios.post('/login', userData, { withCredentials: true }),
    checkSession: () => axios.get('/check_session', { withCredentials: true }),
    logout: () => axios.get('/logout', { withCredentials: true }),
    getUser: () => axios.get('/user', { withCredentials: true }),


};

export default api;