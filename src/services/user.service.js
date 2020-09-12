<<<<<<< HEAD
import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }
  getUsersList() {
    return axios.get(`https://jsonplaceholder.typicode.com/users`);
  }

  updateUser(user) {
    return axios.post(`https://jsonplaceholder.typicode.com/users`, { user });
  }
}

export default new UserService();
=======
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
>>>>>>> 7f3007c919d03d4d348fe35cb0144c5d64a0938e
