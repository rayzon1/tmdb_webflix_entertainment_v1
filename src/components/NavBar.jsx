import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { withRouter } from "react-router-dom";
import popcorn_clickart from "../images/popcorn_clickart.png";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    // marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "red",
    marginLeft: "30px",
    marginLeft: "auto",
    marginRight: "auto"
  }
}));

//TODO: CREATE LOGOUT FEATURE FOR LOGGED IN USER. LOGOUT POPPER WILL CLEAR LOGGEDINUSER STATE AND SEND BACK TO SIGN-IN PAGE.
function ButtonAppBar({
  toggleDrawer,
  history,
  loggedInUser,
  setLoggedInUser
}) {
  const classes = useStyles();

  const handleLinks = value => {
    history.replace(value);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" style={{ background: "rgb(20, 20, 20)" }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" className={classes.title}>
            <span
              onClick={() => handleLinks("/home")}
              style={
                // section === "sign-in" || section === "home"
                !loggedInUser
                  ? { cursor: "pointer", position: "relative" }
                  : {
                      cursor: "pointer",
                      position: "relative",
                      marginLeft: "8.3rem"
                    }
              }
            >
              WEBFLIX
            </span>
            <img
              src={popcorn_clickart}
              style={{
                width: "30px",
                height: "30px",
                marginLeft: "10px",
                marginBottom: "5px",
                position: "absolute"
              }}
            />
          </Typography>

          {loggedInUser && loggedInUser.length > 0 ? (
            <>
            <Button
              color="inherit"
              onClick={() => {
                handleLinks("/");
                setLoggedInUser("");
              }}
            >{`Welcome, ${loggedInUser}`}</Button>
            <button style={{height: '30px', width: '30px', borderRadius: '50%', backgroundColor: 'red', fontSize: '21px', fontWeight: '900'}}>{loggedInUser[0]}</button>
            </>
          ) : (
            <Button color="inherit" onClick={() => handleLinks("/")}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(ButtonAppBar);
