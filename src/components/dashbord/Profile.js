import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import Slide from "@material-ui/core/Slide";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import DialogActions from "@material-ui/core/DialogActions";
import CreateIcon from "@material-ui/icons/Create";

import Typography from "@material-ui/core/Typography";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import userService from "../../services/user.service";

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
  grid: {},
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
      CurrentUser: this.props.user,
      open: false,
    };
    this.classes = this.props.classes;
  }
  Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
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
  formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  render() {
    return (
      <>
        <Dialog
          fullScreen
          open={this.props.open}
          onClose={this.props.handleClose}
          TransitionComponent={this.Transition}
        >
          <AppBar className={this.classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.props.handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={this.classes.title}>
                {this.props.add ? "Add New USER : " : "Profile"}
              </Typography>
            </Toolbar>
          </AppBar>
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
                        {this.state.edited || this.props.add ? (
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
                        {this.state.edited || this.props.add ? (
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
                    primary={<Typography variant="h6">First name :</Typography>}
                  />
                  <ListItemText
                    className={this.classes.lis}
                    primary={
                      <Grid container justify="center">
                        {this.state.edited || this.props.add ? (
                          <TextField
                            id="outlined-basic"
                            variant="outlined"
                            value={this.state.CurrentUser.firstname}
                            onChange={(e) => this.handleChange(e)("firstname")}
                          />
                        ) : (
                          <Typography variant="h6">
                            {this.state.CurrentUser.firstname}
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
                    primary={<Typography variant="h6">Last name :</Typography>}
                  />
                  <ListItemText
                    className={this.classes.lis}
                    primary={
                      <Grid container justify="center">
                        {this.state.edited || this.props.add ? (
                          <TextField
                            id="outlined-basic"
                            variant="outlined"
                            value={this.state.CurrentUser.lastname}
                            onChange={(e) => this.handleChange(e)("lastname")}
                          />
                        ) : (
                          <Typography variant="h6">
                            {this.state.CurrentUser.lastname}
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
                    primary={<Typography variant="h6">Country :</Typography>}
                  />
                  <ListItemText
                    className={this.classes.lis}
                    primary={
                      <Grid container justify="center">
                        {this.state.edited || this.props.add ? (
                          <TextField
                            id="outlined-basic"
                            variant="outlined"
                            value={this.state.CurrentUser.country}
                            onChange={(e) => this.handleChange(e)("country")}
                          />
                        ) : (
                          <Typography variant="h6">
                            {this.state.CurrentUser.country}
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
                    primary={<Typography variant="h6">City :</Typography>}
                  />
                  <ListItemText
                    className={this.classes.lis}
                    primary={
                      <Grid container justify="center">
                        {this.state.edited || this.props.add ? (
                          <TextField
                            id="outlined-basic"
                            variant="outlined"
                            value={this.state.CurrentUser.city}
                            onChange={(e) => this.handleChange(e)("city")}
                          />
                        ) : (
                          <Typography variant="h6">
                            {this.state.CurrentUser.city}
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
                    primary={<Typography variant="h6">Birthday :</Typography>}
                  />
                  <ListItemText
                    className={this.classes.lis}
                    primary={
                      <Grid container justify="center">
                        {this.state.edited || this.props.add ? (
                          <form className={this.classes.container} noValidate>
                            <TextField
                              id="date"
                              label="Birthday"
                              type="date"
                              defaultValue={this.formatDate(
                                this.state.CurrentUser.birthday
                              )}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              onChange={(e) => this.handleChange(e)("birthday")}
                              fullWidth
                            />
                          </form>
                        ) : (
                          <Typography variant="h6">
                            {this.formatDate(this.state.CurrentUser.birthday)}
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
                        {this.state.edited || this.props.add ? (
                          <FormControl style={{ width: "30%" }}>
                            <InputLabel id="demo-simple-select-label">
                              Role
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={this.state.CurrentUser.role}
                              onChange={(e) => this.handleChange(e)("role")}
                            >
                              <MenuItem value={"ROLE_ADMIN"}>ADMIN</MenuItem>
                              <MenuItem value={"ROLE_USER"}>USER</MenuItem>
                            </Select>
                          </FormControl>
                        ) : (
                          <Typography variant="h6">
                            {this.state.CurrentUser.role === "ROLE_ADMIN"
                              ? "ADMIN"
                              : this.state.CurrentUser.role === "ROLE_USER"
                              ? "USER"
                              : "NONE"}
                          </Typography>
                        )}
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
          <DialogActions>
            {this.state.edited || this.props.add ? (
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
                  {this.props.add ? "ADD" : "Confirm"}
                </Button>
                <Button
                  variant="contained"
                  color="default"
                  onClick={() => {
                    if (this.state.edited) {
                      this.setState({ edited: false });
                      this.setState({ CurrentUser: this.props.user });
                    } else if (this.props.add) {
                      this.props.setAdd(false);
                      this.props.handleClose();
                    }
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
                  color="secondary"
                  style={{ backgroundColor: "red" }}
                  startIcon={<DeleteIcon />}
                  onClick={() => this.handleClickOpen()}
                >
                  Delete
                </Button>

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
                <Button
                  variant="contained"
                  color="default"
                  onClick={this.props.handleClose}
                  startIcon={<CloseIcon />}
                >
                  Cancel
                </Button>
              </>
            )}
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.open}
          TransitionComponent={this.Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {this.state.edited
              ? " UPDATE WARNING ! "
              : this.props.add
              ? "ADD  !"
              : "DELETE WARNING !"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {this.state.edited
                ? " Are you sure you want to edit this user "
                : this.props.add
                ? "Are you sure you want to ADD this user"
                : "Are you sure you want to delete this user"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="secondary"
              className={this.classes.button}
              startIcon={<CreateIcon />}
              onClick={() => {
                if (this.state.edited) {
                  this.props.updateUser(this.state.CurrentUser);
                  this.setState({ edited: false });
                } else if (this.props.add) {
                  this.props.addUser(this.state.CurrentUser);
                } else {
                  this.props.deleteUser(this.state.CurrentUser);
                }

                this.handleClose();
                this.props.handleClose();
              }}
            >
              Confirm
            </Button>
            <Button
              variant="contained"
              color="default"
              onClick={() => {
                this.handleClose();
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
}
export default withStyles(styles, { withTheme: true })(Profile);
