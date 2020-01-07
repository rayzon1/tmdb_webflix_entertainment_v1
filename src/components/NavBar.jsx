import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { withRouter } from "react-router-dom";
import popcorn_clickart from "../images/popcorn_clickart.png";
import styles from "../modules/component-modules/navbar-comp.module.css";


function ButtonAppBar({ toggleDrawer, history, loggedInUser, handleClick, setLoggedInUser }) {
  // const classes = useStyles();
  const [elWidth, setElWidth] = React.useState(null);

  const handleLinks = value => {
    history.replace(value);
  };

  const loginRef = React.createRef();

  React.useEffect(() => {
    loggedInUser &&
      loggedInUser.length > 0 &&
      window.screen.width > 800 &&
      setElWidth(loginRef.current.offsetWidth);
      return () => console.log('user logged in')
  }, [loggedInUser]);
  

  return (
    <div className={styles.root}>
      <AppBar position="fixed" style={{ background: "rgb(20, 20, 20)" }}>
        <Toolbar>
          <IconButton
            edge="start"
            // className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" className={styles.title}>
            <span
              onClick={() => handleLinks("/home")}
              style={
                !loggedInUser
                  ? {
                      cursor: "pointer",
                      position: "relative",
                      letterSpacing: "3.2px",
                      fontSize: "28px"
                    }
                  : {
                      cursor: "pointer",
                      position: "relative",
                      marginLeft: "auto",
                      letterSpacing: "3.2px",
                      fontSize: "28px"
                    }
              }
            >
              WEBFLIX
            </span>
            <img src={popcorn_clickart} className={styles.icon} alt="popcorn" />
          </Typography>

          {loggedInUser && loggedInUser.length > 0 ? (
            <>
              {window.screen.width > 800 && (
                <div
                  color="inherit"
                  style={{
                    marginRight: "7px",
                    marginLeft: `-${elWidth !== null && elWidth - 15}px`,
                    fontSize: "18px",
                    letterSpacing: "1px"
                  }}
                  ref={loginRef}
                >{`${loggedInUser}`}</div>
              )}
              <button
                style={{
                  height: "30px",
                  width: "30px",
                  borderRadius: "50%",
                  backgroundColor: "red",
                  fontSize: "21px",
                  fontWeight: "900",
                  marginLeft: `${window.screen.width < 800 && 30}px`
                }}
                //! Provide new component for user account menu.
                onClick={handleClick}
              >
                {loggedInUser[0]}
              </button>
            </>
          ) : (
            <Button
              color="inherit"
              onClick={() => handleLinks("/")}
              style={{ letterSpacing: "3px", fontSize: "20px" }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(ButtonAppBar);
