import React, { Component } from "react";
import FormUserDetails from "./FormUserDetails";
import FormPersonalDetails from "./FormPersonalDetails";
import Confirm from "./Confirm";
import Success from "./Success";
import Grid from "@material-ui/core/Grid";
import { orange } from "@material-ui/core/colors";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { isEmail } from "validator";
import AuthService from "../../services/auth.service";

const theme = createMuiTheme({
  status: {
    danger: orange[500],
  },
});
export default class UserForm extends Component {
  state = {
    step: 1,
    username: "",
    email: "",
    password: "",
    passwor: "",

    firstname: "",
    lastname: "",

    birthday: "",
    city: "",
    country: "",
    Vusername: "",
    Vemail: "",
    Vpassword: "",
    Vpasswor: "",
    Vfirstname: "",
    Vlastname: "",

    Vbirthday: "",
    Vcity: "",
    Vcountry: "",
    message: "",
  };
  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    if (this.CheckValidation()) {
      if (step === 3) this.handelSubmit();

      this.setState({
        step: step + 1,
      });
    }
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  //if somthing goes wrong
  toFirstStep = () => {
    const { step } = this.state;
    this.setState({
      step: 1,
    });
  };

  // Handle fields change
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  handleChangeCountry = (value) => {
    if (typeof value === "object" && value !== null)
      this.setState({ country: value.country });
    else if (value !== null) this.setState({ country: value });
    else this.setState({ country: "" });
  };

  CheckValidation = () => {
    let decision = true;
    const { step } = this.state;
    const {
      username,
      email,
      password,
      passwor,
      firstname,
      lastname,

      birthday,
      city,
      country,
      Vusername,
      Vemail,
      Vpassword,
      Vpasswor,
      Vfirstname,
      Vlastname,

      Vbirthday,
      Vcity,
      Vcountry,
    } = this.state;
    this.setState({
      Vusername: "",
      Vemail: "",
      Vpassword: "",
      Vpasswor: "",
      Vfirstname: "",
      Vlastname: "",
      Vbirthday: "",
      Vcity: "",
      Vcountry: "",
    });
    if (step === 1) {
      if (!username) {
        decision = false;
        this.setState({
          Vusername: {
            error: true,
            helperText: "The username field is required.",
          },
        });
      } else if (username.length < 3 || username.length > 20) {
        decision = false;
        this.setState({
          Vusername: {
            error: true,
            helperText: "The username must be between 3 and 20 characters..",
          },
        });
      }

      if (!email) {
        decision = false;
        this.setState({
          Vemail: { error: true, helperText: "The email field is required." },
        });
      } else if (!isEmail(email)) {
        decision = false;
        this.setState({
          Vemail: { error: true, helperText: "This is not a valid email." },
        });
      }

      if (!password) {
        decision = false;
        this.setState({
          Vpassword: {
            error: true,
            helperText: "The Password field is required.",
          },
        });
      } else if (password.length < 6 || password.length > 40) {
        decision = false;
        this.setState({
          Vpassword: {
            error: true,
            helperText: "The password must be between 6 and 40 characters.",
          },
        });
      }

      if (!passwor) {
        decision = false;
        this.setState({
          Vpasswor: {
            error: true,
            helperText: "The Password confirmation field is required.",
          },
        });
      } else if (password !== passwor) {
        decision = false;
        this.setState({
          Vpasswor: {
            error: true,
            helperText: "You entered a deffirent password.",
          },
        });
      }
    } else if (step === 2) {
      if (!firstname) {
        decision = false;
        this.setState({
          Vfirstname: {
            error: "true",
            helperText: "The firstname field is required.",
          },
        });
      }

      if (!lastname) {
        decision = false;
        this.setState({
          Vlastname: {
            error: "true",
            helperText: "The lastname field is required.",
          },
        });
      }

      if (!country) {
        decision = false;
        this.setState({
          Vcountry: {
            error: "true",
            helperText: "The country field is required.",
          },
        });
      }
      if (!city) {
        decision = false;
        this.setState({
          Vcity: { error: "true", helperText: "The city field is required." },
        });
      }

      if (!birthday) {
        decision = false;
        this.setState({
          Vbirthday: {
            error: "true",
            helperText: "The birthday field is required.",
          },
        });
      }
    }

    return decision;
  };

  handelSubmit = () => {
    const {
      username,
      email,
      password,
      passwor,
      firstname,
      lastname,

      birthday,
      city,
      country,
    } = this.state;
    AuthService.register(
      username,
      email,
      password,
      firstname,
      lastname,
      country,
      city,
      birthday
    ).then(
      (response) => {},
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          message: resMessage,
        });
      }
    );
  };

  render() {
    const { step } = this.state;
    const {
      username,
      email,
      password,
      passwor,
      firstname,
      lastname,

      birthday,
      city,
      country,
      Vusername,
      Vemail,
      Vpassword,
      Vpasswor,
      Vfirstname,
      Vlastname,

      Vbirthday,
      Vcity,
      Vcountry,
    } = this.state;
    const values = {
      username,
      email,
      password,
      passwor,
      firstname,
      lastname,

      birthday,
      city,
      country,
      Vusername,
      Vemail,
      Vpassword,
      Vpasswor,
      Vfirstname,
      Vlastname,

      Vbirthday,
      Vcity,
      Vcountry,
    };
    switch (step) {
      case 1:
        return (
          <ThemeProvider theme={theme}>
            <Grid container>
              <Grid item xs={12}>
                <FormUserDetails
                  nextStep={this.nextStep}
                  prevStep={this.prevStep}
                  handleChange={this.handleChange}
                  values={values}
                />
              </Grid>
            </Grid>
          </ThemeProvider>
        );
      case 2:
        return (
          <ThemeProvider theme={theme}>
            <Grid container>
              <Grid item xs={12}>
                <FormPersonalDetails
                  nextStep={this.nextStep}
                  prevStep={this.prevStep}
                  handleChange={this.handleChange}
                  handleChangeCountry={this.handleChangeCountry}
                  values={values}
                />
              </Grid>
            </Grid>
          </ThemeProvider>
        );
      case 3:
        return (
          <ThemeProvider theme={theme}>
            <Grid container>
              <Grid item xs={12}>
                <Confirm
                  nextStep={this.nextStep}
                  prevStep={this.prevStep}
                  values={values}
                />
              </Grid>
            </Grid>
          </ThemeProvider>
        );
      case 4:
        return (
          <ThemeProvider theme={theme}>
            <Grid container>
              <Grid item xs={12}>
                <Success
                  erro={this.state.message}
                  toFirstStep={this.toFirstStep}
                />
              </Grid>
            </Grid>
          </ThemeProvider>
        );

      default:
        console.log("Registeration.");
    }
  }
}
