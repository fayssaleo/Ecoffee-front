import React from "react";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import { List, ListItem, ListItemText } from "@material-ui/core/";
import Button from "@material-ui/core/Button";

export default (props) => {
  const { values } = props;
  return (
    <>
      <>
        <Dialog open fullWidth maxWidth="sm">
          <AppBar title="Confirm User Data" />
          <List>
            <ListItem>
              <ListItemText primary="Username" secondary={values.username} />
            </ListItem>
            <ListItem>
              <ListItemText primary="First Name" secondary={values.firstname} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Last Name" secondary={values.lastname} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Email" secondary={values.email} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Country" secondary={values.country} />
            </ListItem>
            <ListItem>
              <ListItemText primary="City" secondary={values.city} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Birthday" secondary={values.birthday} />
            </ListItem>
          </List>
          <br />

          <Button
            color="secondary"
            variant="contained"
            onClick={props.prevStep}
          >
            Back
          </Button>

          <Button color="primary" variant="contained" onClick={props.nextStep}>
            Confirm
          </Button>
        </Dialog>
      </>
    </>
  );
};
