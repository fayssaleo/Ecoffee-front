import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import Dashbord from "./components/dashbord/Dashbord";
import CssBaseline from "@material-ui/core/CssBaseline";
import UserForm from "./components/register/UserForm";

class App extends Component {
  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.authorities === "ROLE_USER",
        showAdminBoard: user.authorities === "ROLE_ADMIN",
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              E-Coffee
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>

              {showModeratorBoard && (
                <li className="nav-item">
                  <Link to={"/mod"} className="nav-link">
                    Moderator Board
                  </Link>
                </li>
              )}

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )}

              {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User
                  </Link>
                </li>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={UserForm} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/user" component={BoardUser} />
              <Route path="/mod" component={BoardModerator} />
              <Route path="/admin" component={BoardAdmin} />

              <Route path="/dashbord">
                <CssBaseline />
                <Dashbord />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
/*

 <List dense className={this.classes.root2}>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <ListItem dense className={this.classes.lis}>
                    <ListItemText
                      align="center"
                      primary={
                        <Typography align="center" variant="h6">
                          Username :
                        </Typography>
                      }
                    />
                    <ListItemText
                      align="center"
                      primary={
                        this.state.edited ? (
                          <TextField
                            id="outlined-basic"
                            label="Username"
                            variant="outlined"
                          />
                        ) : (
                          <Typography align="left" variant="h6">
                            Fayssal Ourezzouq
                          </Typography>
                        )
                      }
                    />
                  </ListItem>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <ListItem dense className={this.classes.lis}>
                    <ListItemText
                      align="center"
                      primary={
                        <Typography align="center" variant="h6">
                          Email :
                        </Typography>
                      }
                    />
                    <ListItemText
                      align="center"
                      primary={
                        this.state.edited ? (
                          <TextField
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                          />
                        ) : (
                          <Typography align="left" variant="h6">
                            Fayssal.Ourezzouq@gmail.com
                          </Typography>
                        )
                      }
                    />
                  </ListItem>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <ListItem dense className={this.classes.lis}>
                    <ListItemText
                      align="center"
                      primary={
                        <Typography align="center" variant="h6">
                          Role :
                        </Typography>
                      }
                    />

                    <FormControl className={this.classes.formControl}>
                      <InputLabel id="demo-simple-select-label">
                        Role
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={10}
                        onChange={this.handleChange}
                      >
                        <MenuItem value={10}>Admin</MenuItem>
                        <MenuItem value={20}>User</MenuItem>
                      </Select>
                    </FormControl>
                  </ListItem>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                </List>
*/
