import React from "react";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(2),
    },
  },

  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  fields: {
    flex: 1,
  },
}));

export default (props) => {
  const contonue = (e) => {
    e.preventDefault();
    props.nextStep();
  };

  const classes = useStyles();
  const { values, handleChange } = props;

  const { Vusername, Vemail, Vpassword, Vpasswor } = values;

  return (
    <>
      <br />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid item xs={3}>
          <Avatar className={classes.large}>
            <AccountCircleIcon className={classes.large} />
          </Avatar>
        </Grid>
      </Grid>
      <br />

      <div className={classes.fields}>
        <Grid
          container
          spacing={2}
          alignItems="flex-end"
          className={classes.fields}
        >
          <Grid item xs={1}>
            <AccountCircleIcon />
          </Grid>
          <Grid item xs={11}>
            <TextField
              placeholder="Username"
              label="Username"
              onChange={handleChange("username")}
              defaultValue={values.username}
              {...Vusername}
              fullWidth
            />
          </Grid>
        </Grid>
      </div>

      <br />
      <div className={classes.fields}>
        <Grid
          container
          spacing={2}
          alignItems="flex-end"
          className={classes.fields}
        >
          <Grid item xs={1}>
            <EmailIcon />
          </Grid>
          <Grid item xs={11}>
            <TextField
              placeholder="Email"
              label="Email"
              onChange={handleChange("email")}
              defaultValue={values.email}
              {...Vemail}
              fullWidth
            />
          </Grid>
        </Grid>
      </div>
      <br />
      <div className={classes.fields}>
        <Grid
          container
          spacing={2}
          alignItems="flex-end"
          className={classes.fields}
        >
          <Grid item xs={1}>
            <LockIcon />
          </Grid>
          <Grid item xs={11}>
            <TextField
              placeholder="Password"
              label="Password"
              type="password"
              onChange={handleChange("password")}
              defaultValue={values.password}
              {...Vpassword}
              fullWidth
            />
          </Grid>
        </Grid>
      </div>
      <br />
      <div className={classes.fields}>
        <Grid
          container
          spacing={2}
          alignItems="flex-end"
          className={classes.fields}
        >
          <Grid item xs={1}>
            <LockIcon />
          </Grid>
          <Grid item xs={11}>
            <TextField
              placeholder="Confirm Password"
              label="Confirm Password"
              type="password"
              onChange={handleChange("passwor")}
              defaultValue={values.passwor}
              {...Vpasswor}
              fullWidth
            />
          </Grid>
        </Grid>
      </div>
      <br />
      <Box
        display="flex"
        justifyContent="center"
        m={1}
        p={1}
        bgcolor="background.paper"
      >
        <Box p={1} bgcolor="grey.300">
          <Button
            color="primary"
            variant="contained"
            onClick={contonue}
            align="right"
          >
            Continue
          </Button>
        </Box>
      </Box>
    </>
  );
};
