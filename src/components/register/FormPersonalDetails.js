import React from "react";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "date-fns";

import "react-datepicker/dist/react-datepicker.css";

import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import FlagIcon from "@material-ui/icons/Flag";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import CakeIcon from "@material-ui/icons/Cake";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(2),
    },
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
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
  button: {
    marginRight: theme.spacing(1),
  },
}));
let countries = "";
if (countries === "") {
  var unirest = require("unirest");
  var req = unirest(
    "GET",
    "https://countries-cities.p.rapidapi.com/location/country/list"
  );

  req.query({
    format: "json",
  });

  req.headers({
    "x-rapidapi-host": "countries-cities.p.rapidapi.com",
    "x-rapidapi-key": "52f588c3f2mshfb7c116957c5368p1c111fjsn5142cdf75f43",
    useQueryString: true,
  });

  req.end(function (res) {
    if (res.error) throw new Error(res.error);

    let a = res.body.countries;
    countries = Object.keys(a).map((key) => ({
      key: key,
      country: a[key],
    }));
  });
}

export default (props) => {
  const defaultProps = {
    options: countries,
    getOptionLabel: (option) => option.country,
  };

  const classes = useStyles();
  const { values, handleChange, handleChangeCountry } = props;
  const {
    Vfirstname,
    Vlastname,

    Vbirthday,
    Vcity,
    Vcountry,
  } = values;

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
      <Grid container>
        <Grid item xs={12}>
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
                placeholder="First Name"
                label="First Name"
                onChange={handleChange("firstname")}
                defaultValue={values.firstname}
                {...Vfirstname}
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>

        <br />
        <Grid item xs={12}>
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
                placeholder="FLast Name"
                label="Last Name"
                onChange={handleChange("lastname")}
                defaultValue={values.lastname}
                {...Vlastname}
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>

        <br />
        <Grid item xs={12}>
          <Grid
            container
            spacing={2}
            alignItems="flex-end"
            className={classes.fields}
          >
            <Grid item xs={1}>
              <FlagIcon />
            </Grid>
            <Grid item xs={11} style={{ margin: 0 }}>
              <Autocomplete
                inputValue={values.country + ""}
                style={{ margin: 0 }}
                {...defaultProps}
                id="countries"
                countries
                onChange={(event, newInputValue) => {
                  handleChangeCountry(newInputValue);
                }}
                onInputChange={(event, newInputValue) => {
                  handleChangeCountry(newInputValue);
                }}
                {...Vcountry}
                renderInput={(params) => (
                  <TextField
                    style={{ margin: 0 }}
                    {...params}
                    label="Country"
                    margin="normal"
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>

        <br />
        <Grid item xs={12}>
          <Grid
            container
            spacing={2}
            alignItems="flex-end"
            className={classes.fields}
          >
            <Grid item xs={1}>
              <LocationCityIcon />
            </Grid>
            <Grid item xs={11}>
              <TextField
                placeholder="City"
                label="City"
                onChange={handleChange("city")}
                defaultValue={values.city}
                {...Vcity}
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>

        <br />
        <Grid item xs={12}>
          <Grid
            container
            spacing={2}
            alignItems="flex-end"
            className={classes.fields}
          >
            <Grid item xs={1}>
              <CakeIcon />
            </Grid>
            <Grid item xs={11}>
              <form className={classes.container} noValidate>
                <TextField
                  id="date"
                  label="Birthday"
                  type="date"
                  defaultValue={values.birthday}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleChange("birthday")}
                  {...Vbirthday}
                  fullWidth
                />
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box
        display="flex"
        justifyContent="center"
        m={1}
        p={1}
        bgcolor="background.paper"
      >
        <Box p={1} bgcolor="grey.300">
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<SkipPreviousIcon />}
            onClick={props.prevStep}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            endIcon={<SkipNextIcon />}
            onClick={props.nextStep}
          >
            Next
          </Button>
        </Box>
      </Box>
    </>
  );
};
