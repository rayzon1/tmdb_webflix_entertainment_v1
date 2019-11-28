import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withRouter } from "react-router-dom";


const useStyles = makeStyles({
    paper: {
      background: 'rgb(85, 85, 85)',
      color: 'white'
    },
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
        open={Boolean(anchorEl)}
        onClose={handleClose}
        classes={{paper: classes.paper}}
      >
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={() => {
            handleLinks('/');
            setLoggedInUser("");
        }}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default withRouter(SimpleMenu);
