import axios from "axios";

const API_URL = "http://localhost:8080/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "login", {
        username,
        password,
      })
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(
    username,
    email,
    password,
    firstname,
    lastname,
    country,
    city,
    birthday
  ) {
    return axios.post(API_URL + "register", {
      username: username,
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname,
      country: country,
      city: city,
      birthday: birthday,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
