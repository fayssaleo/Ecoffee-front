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
    return axios.get(API_URL + "users");
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
        let uu = JSON.parse(localStorage.getItem("user"));
        uu.username = user.username;
        uu.email = user.email;
        uu.password = user.password;
        uu.firstname = user.firstname;
        uu.lastname = user.lastname;
        uu.country = user.country;
        uu.city = user.city;
        uu.birthday = user.birthday;
        localStorage.setItem("user", JSON.stringify(uu));
        window.location.reload(false);
      });
  }

  updateUser2(user) {
    console.log(user);
    return axios.post(
      API_URL +
        "user/" +
        user.id +
        "/" +
        (user.role === "ROLE_ADMIN" ? "1" : "2"),
      {
        username: user.username,
        email: user.email,
        password: user.password,
        firstname: user.firstname,
        lastname: user.lastname,
        country: user.country,
        city: user.city,
        birthday: user.birthday,
      }
    );
  }

  deleteUser(id) {
    return axios.post(API_URL + "userd/" + id);
  }

  addUser(user) {
    console.log(user);
    return axios.post(
      API_URL + "create-user/" + (user.role === "ROLE_ADMIN" ? "1" : "2"),
      {
        username: user.username,
        email: user.email,
        password: user.password,
        firstname: user.firstname,
        lastname: user.lastname,
        country: user.country,
        city: user.city,
        birthday: user.birthday,
      }
    );
  }
}

export default new UserService();
