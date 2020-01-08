import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withRouter, Link } from "react-router-dom";
import styles from "../modules/component-modules/account-menu-comp.module.css";
import NavBar from "./NavBar";

const useStyles = makeStyles({
  paper: {
    background: "rgb(85, 85, 85)",
    color: "white"
  }
});

function SimpleMenu({ anchorEl, setAnchorEl, history, setLoggedInUser }) {
  const classes = useStyles();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLinks = value => {
    history.replace(value);
  };

  return (
    <div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={anchorEl}
        onClose={handleClose}
        classes={{ paper: classes.paper }}
      >
        <Link to="/account" className={styles.linkStyles}>
          <MenuItem onClick={handleClose}>My account</MenuItem>
        </Link>
        <MenuItem
          onClick={() => {
            handleLinks("/");
            setLoggedInUser("");
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

export default withRouter(SimpleMenu);
