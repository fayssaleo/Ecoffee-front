import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import VisibilityIcon from "@material-ui/icons/Visibility";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Hidden from "@material-ui/core/Hidden";
import Profile from "./Profile";
import AddIcon from "@material-ui/icons/Add";

import UserService from "../../services/user.service";
import authService from "../../services/auth.service";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  body2: {
    fontWeight: "bold",
  },
  lis: {
    backgroundColor: "#616161 ",
  },
  lii: {
    flex: 1,
  },
  listHeader: {
    color: "white",
    fontSize: 90,
  },

  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

export default function UserManagements() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [add, setAdd] = React.useState(false);
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const getRole = (role) => {
    switch (role) {
      case "ROLE_ADMIN":
        return "ADMIN";
      case "ROLE_USER":
        return "USER";
      default:
        return "NO_ROLE";
    }
  };

  useEffect(() => {
    UserService.getUsersList()
      .then((res) =>
        res.data.map((user) => ({
          id: user.id,
          username: user.username,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          country: user.country,
          city: user.city,
          birthday: user.birthday,
          role: user.role,
        }))
      )
      .then((res) => {
        setUsers(res);
        console.log(res);
      });
  }, []);
  const handleClickOpen = (id) => {
    let u = users.find((user) => user.id === id);
    setUser({
      ...user,
      id: u.id,
      username: u.username,
      email: u.email,
      firstname: u.firstname,
      lastname: u.lastname,
      country: u.country,
      city: u.city,
      birthday: u.birthday,
      role: u.role,
    });

    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const updateUser = (u) => {
    UserService.updateUser2(u).then(() => {
      let usersUpdated = users;
      let index = users.findIndex((x) => u.id === x.id);
      usersUpdated[index] = u;
      setUsers([...usersUpdated]);
    });
  };

  const deleteUser = (u) => {
    UserService.deleteUser(u.id).then(() => {
      let usersUp = users.filter((user) => user.id !== u.id);

      setUsers([...usersUp]);
    });
  };
  const addUser = (u) => {
    UserService.addUser(u).then(() => {
      let usersUpdated = users;
      usersUpdated.push(u);
      setUsers([...usersUpdated]);
    });
  };

  return (
    <>
      <List dense className={classes.root}>
        <ListItem dense className={classes.lis}>
          <ListItemText
            align="center"
            primary={
              <Typography variant="h6" style={{ color: "#FFFFFF" }}>
                Username
              </Typography>
            }
            component="h2"
            className={classes.lii && classes.listHeader && classes.body2}
            style={{ color: "white" }}
          />
          <Hidden smDown>
            <ListItemText
              align="center"
              primary={
                <Typography variant="h6" style={{ color: "#FFFFFF" }}>
                  Email
                </Typography>
              }
              className={classes.lii && classes.listHeader}
            />
          </Hidden>
          <Hidden xsDown>
            <ListItemText
              align="center"
              primary={
                <Typography variant="h6" style={{ color: "#FFFFFF" }}>
                  Role
                </Typography>
              }
              className={classes.lii && classes.listHeader}
            />
          </Hidden>
          <ListItemSecondaryAction>
            <IconButton
              aria-label="view-more"
              onClick={() => {
                setUser({
                  id: "",
                  username: "",
                  email: "",
                  role: "",
                });
                setAdd(true);
                setOpen(true);
              }}
            >
              <AddIcon style={{ color: "white" }} />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        {users.map((user) => {
          const labelId = `checkbox-list-secondary-label-${user.id}`;
          return (
            <ListItem
              key={user.id}
              button
              onClick={() => handleClickOpen(user.id)}
            >
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${user.id}`}
                  src={`/static/images/avatar/${user.id}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText
                align="center"
                id={labelId}
                primary={user.username}
                className={classes.lii}
              />
              <Hidden smDown>
                <ListItemText
                  align="center"
                  primary={user.email}
                  className={classes.lii}
                />
              </Hidden>
              <Hidden xsDown>
                <ListItemText
                  align="center"
                  id={3}
                  primary={getRole(user.role)}
                  className={classes.lii}
                />
              </Hidden>
              <ListItemSecondaryAction>
                <IconButton aria-label="view-more">
                  <VisibilityIcon color="action" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>

      {open && (
        <Profile
          handleClose={handleClose}
          open={open}
          user={user}
          setUser={setUser}
          updateUser={updateUser}
          deleteUser={deleteUser}
          add={add}
          setAdd={setAdd}
          addUser={addUser}
        />
      )}
    </>
  );
}

/*

import MaterialTable from 'material-table';

export default props => {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Surname', field: 'surname' },
      { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
      {
        title: 'Birth Place',
        field: 'birthCity',
        lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
      },
    ],
    data: [
      { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
      {
        name: 'Zerya Betül',
        surname: 'Baran',
        birthYear: 2017,
        birthCity: 34,
      },
    ],
  });

  return (
    <MaterialTable
   
      title="Users list :"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}*/
