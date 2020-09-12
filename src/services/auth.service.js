<<<<<<< HEAD
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
        console.log("sss");
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
    console.log({
      username: username,
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname,
      country: country,
      city: city,
      birthday: birthday,
    });
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

<<<<<<< HEAD
=======
import axios from "axios";

const API_URL = "/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "login", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "register", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

>>>>>>> 7f3007c919d03d4d348fe35cb0144c5d64a0938e
export default new AuthService();
=======
export default new AuthService();
>>>>>>> dashbordUserManager
