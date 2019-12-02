import React from "react";
import NavBar from "../components/NavBar";
import SimpleMenu from "../components/AccountMenu";
import Paper from "@material-ui/core/Paper";

export default function About({ toggleDrawer, loggedInUser, setLoggedInUser }) {
  //!Simple menu click state
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <NavBar
        toggleDrawer={toggleDrawer}
        loggedInUser={loggedInUser}
        handleClick={handleClick}
      />
      <SimpleMenu
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        setLoggedInUser={setLoggedInUser}
      />
      <div style={{ height: "11vh" }} />
      
      <Paper style={{backgroundColor:'red'}}><h1>About Page</h1></Paper>
    </>
  );
}
