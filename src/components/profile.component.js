<<<<<<< HEAD
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";

import Dialog from "@material-ui/core/Dialog";

import CloseIcon from "@material-ui/icons/Close";

import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import DialogActions from "@material-ui/core/DialogActions";
import CreateIcon from "@material-ui/icons/Create";

import Typography from "@material-ui/core/Typography";

import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AuthService from "../services/auth.service";

const styles = (theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  root2: {
    width: "100%",
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper,
  },

  avatar: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    margin: theme.spacing(2),
  },
  grid: {
    height: "56vh",
  },
  lis: {
    felx: 1,
    width: "50%",
  },
  appBar: {
    position: "relative",
    backgroundColor: "black",
  },
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edited: false,
      CurrentUser: JSON.parse(localStorage.getItem("user")),
      open: false,
    };
    this.classes = this.props.classes;
    console.log(this.state.CurrentUser);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (e) => {
    return (input) => {
      this.setState({
        CurrentUser: {
          ...this.state.CurrentUser,
          [input]: e.target.value,
        },
      });
    };
  };

  render() {
    return (
      <>
        <Grid container alignContent="center">
          <Grid item xs={12} align="center">
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              className={this.classes.avatar}
            />
          </Grid>
          <Grid item xs={false} md={2} />
          <Grid item xs={12} md={8} className={this.classes.grid}>
            <br />

            <List dense className={this.classes.root2}>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <ListItem dense>
                <ListItemText
                  className={this.classes.lis}
                  align="center"
                  primary={<Typography variant="h6">Username :</Typography>}
                />
                <ListItemText
                  className={this.classes.lis}
                  primary={
                    <Grid container justify="center">
                      {this.state.edited ? (
                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          value={this.state.CurrentUser.username}
                          onChange={(e) => this.handleChange(e)("username")}
                        />
                      ) : (
                        <Typography variant="h6">
                          {this.state.CurrentUser.username}
                        </Typography>
                      )}
                    </Grid>
                  }
                />
              </ListItem>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <ListItem dense>
                <ListItemText
                  className={this.classes.lis}
                  align="center"
                  primary={<Typography variant="h6">Email :</Typography>}
                />
                <ListItemText
                  className={this.classes.lis}
                  primary={
                    <Grid container justify="center">
                      {this.state.edited ? (
                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          value={this.state.CurrentUser.email}
                          onChange={(e) => this.handleChange(e)("email")}
                        />
                      ) : (
                        <Typography variant="h6">
                          {this.state.CurrentUser.email}
                        </Typography>
                      )}
                    </Grid>
                  }
                />
              </ListItem>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <ListItem dense>
                <ListItemText
                  className={this.classes.lis}
                  align="center"
                  primary={<Typography variant="h6">Role :</Typography>}
                />
                <ListItemText
                  className={this.classes.lis}
                  primary={
                    <Grid container justify="center">
                      <Typography variant="h6">
                        {this.state.CurrentUser.role === 1
                          ? "ADMIN"
                          : this.state.CurrentUser.role === 2
                          ? "USER"
                          : "NONE"}
                      </Typography>
                    </Grid>
                  }
                />
              </ListItem>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </List>
          </Grid>

          <Grid item xs={false} md={2} />
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {this.state.edited ? (
            <>
              <Button
                variant="contained"
                color="primary"
                className={this.classes.button}
                startIcon={<CreateIcon />}
                onClick={() => {
                  this.handleClickOpen();
                }}
              >
                Confirm
              </Button>
              <Button
                variant="contained"
                color="default"
                onClick={() => {
                  this.setState({ edited: false });
                  this.setState({ CurrentUser: AuthService.CurrentUser });
                }}
                startIcon={<CloseIcon />}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                color="primary"
                className={this.classes.button}
                startIcon={<CreateIcon />}
                onClick={() => {
                  this.setState({ edited: true });
                }}
              >
                Edit
              </Button>
            </>
          )}
        </Grid>

        <Dialog
          open={this.state.open}
          TransitionComponent={this.Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            UPDATE WARNING !
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are you sure you want to edit ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="secondary"
              className={this.classes.button}
              startIcon={<CreateIcon />}
              onClick={() => {
                this.handleClose();
              }}
            >
              Confirm
            </Button>
            <Button
              variant="contained"
              color="default"
              onClick={() => {
                this.setState({ edited: false });
              }}
              startIcon={<CloseIcon />}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
<<<<<<< HEAD
=======
import React, { Component } from "react";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong>{" "}
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
      </div>
    );
  }
>>>>>>> 7f3007c919d03d4d348fe35cb0144c5d64a0938e
}
=======
}
export default withStyles(styles, { withTheme: true })(Profile);
>>>>>>> dashbordUserManager
