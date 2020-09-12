import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { Grid, Button } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { Redirect } from "react-router-dom";

export class Success extends Component {
  state = {
    success: false,
  };
  continue = (e) => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };
  reloadAfterSuccees = () => {
    if (this.props.erro === "") this.setState({ success: true });
    else this.props.toFirstStep();
  };
  render() {
    return (
      <>
        {this.state.success === true ? <Redirect to="/login" /> : ""}
        <>
          <Dialog open fullWidth maxWidth="sm">
            <AppBar title="Success" />
            <Typography
              variant="h6"
              gutterBottom
              align="center"
              style={{ marginLeft: 5 }}
            >
              {this.props.erro === "" ? (
                <>
                  <CheckIcon fontSize="small" style={{ color: "green" }} />{" "}
                  Thank You For Your Submission
                </>
              ) : (
                <>
                  <ErrorOutlineIcon fontSize="small" color="secondary" /> Error
                  !
                </>
              )}
            </Typography>
            <br />
            <Typography variant="body1" gutterBottom style={{ marginLeft: 5 }}>
              {this.props.erro === ""
                ? "You will get an email with further instructions."
                : this.props.erro}

              <br />

              <Grid container>
                <Grid item xs={12} align="center">
                  <Button
                    variant="contained"
                    onClick={() => this.reloadAfterSuccees()}
                  >
                    OK
                  </Button>
                </Grid>
              </Grid>
            </Typography>
          </Dialog>
        </>
      </>
    );
  }
}

export default Success;
