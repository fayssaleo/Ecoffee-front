import React from 'react';
import { Grid } from '@material-ui/core';
import { Tabs, Tab, AppBar } from "@material-ui/core";
import { makeStyles  } from '@material-ui/core/styles';
import UserManagement from './userManagement';

const useStyles = makeStyles({
    appNav : {
        background : "black"
    }
});
 
export default props => {
    const classes=useStyles();
    const [selectedTab, setSelectedTab] = React.useState(0);

    const handleChange = (event, newValue) => {
       
        setSelectedTab(newValue);
      };





        return (

            <>
            
      <AppBar position="static" className={classes.appNav}>
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab label="Dashbord" />
          <Tab label="Users" />
        </Tabs>
      </AppBar>
      {selectedTab === 0 && <Grid>hi dashbord</Grid>}
      {selectedTab === 1 && <UserManagement /> }
    </>
          
         
        );
    
}
