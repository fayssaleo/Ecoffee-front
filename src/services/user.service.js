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
    console.log(user);
    return axios
      .post(API_URL + "user/" + user.id, {
        username: user.username,
        email: user.email,
        password: user.password,
        firstname: user.firstname,
        lastname: user.lastname,
        country: user.country,
        city: user.city,
        birthday: user.birthday,
      })
      .then(() => {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...JSON.parse(localStorage.setItem("user"), user) })
        );
      });
  }
}

export default new UserService();
